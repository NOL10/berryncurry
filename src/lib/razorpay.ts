import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { BAKERY_PRODUCTS } from "@/data/bakery";
import { FRUIT_PRODUCTS } from "@/data/fruits";
import type { CartDept } from "@/lib/cart";

const CURRENCY = "INR";
const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";
const DEFAULT_ORDER_NOTIFICATION_URL = "https://hello.berryncurry.com";

const checkoutCartItemSchema = z.object({
  dept: z.enum(["fruits", "bakery"]),
  slug: z.string().min(1),
  qty: z.number().int().positive().max(99),
});

const customerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(160),
  phone: z.string().min(6).max(20),
  address1: z.string().min(1).max(180),
  address2: z.string().max(180).optional(),
  city: z.string().min(1).max(80),
  state: z.string().min(1).max(80),
  pin: z.string().min(4).max(12),
});

const createOrderSchema = z.object({
  items: z.array(checkoutCartItemSchema).min(1),
  customer: customerSchema,
  expectedTotal: z.number().int().positive(),
});

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  customer: customerSchema,
  items: z.array(checkoutCartItemSchema).min(1),
  expectedTotal: z.number().int().positive(),
  receipt: z.string().min(1),
});

type CheckoutCartItem = z.infer<typeof checkoutCartItemSchema>;

const productLookup = new Map<string, { name: string; price: number }>([
  ...FRUIT_PRODUCTS.map(
    (product) =>
      [productKey("fruits", product.slug), { name: product.name, price: product.price }] as const,
  ),
  ...BAKERY_PRODUCTS.map(
    (product) =>
      [productKey("bakery", product.slug), { name: product.name, price: product.price }] as const,
  ),
]);

function productKey(dept: CartDept, slug: string) {
  return `${dept}:${slug}`;
}

function getEnv(name: string) {
  const nodeEnv = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;

  return nodeEnv?.[name] ?? (import.meta.env[name] as string | undefined);
}

function getRazorpayCredentials() {
  const keyId = getEnv("RAZORPAY_KEY_ID");
  const keySecret = getEnv("RAZORPAY_KEY_SECRET");

  if (!keyId || !keySecret) {
    throw new Error("Razorpay test keys are not configured.");
  }

  return { keyId, keySecret };
}

function getOrderNotificationUrl() {
  return getEnv("ORDER_NOTIFICATION_URL") ?? DEFAULT_ORDER_NOTIFICATION_URL;
}

function calculateOrder(items: CheckoutCartItem[]) {
  const normalizedItems = items.map((item) => {
    const product = productLookup.get(productKey(item.dept, item.slug));
    if (!product) {
      throw new Error("One or more items in your cart are no longer available.");
    }

    return {
      ...item,
      name: product.name,
      price: product.price,
      lineTotal: product.price * item.qty,
    };
  });

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const delivery = subtotal >= 500 || subtotal === 0 ? 0 : 49;

  return {
    items: normalizedItems,
    subtotal,
    delivery,
    total: subtotal + delivery,
  };
}

function createReceiptId() {
  return `BNC-${Date.now().toString(36).toUpperCase()}`;
}

async function hmacSha256Hex(secret: string, message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function notifyOrderPlaced({
  customer,
  order,
  payment,
}: {
  customer: z.infer<typeof customerSchema>;
  order: ReturnType<typeof calculateOrder> & { receipt: string };
  payment: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
  };
}) {
  const notificationUrl = getOrderNotificationUrl();
  const response = await fetch(notificationUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      event: "order.placed",
      source: "berry-and-curry-checkout",
      placedAt: new Date().toISOString(),
      customer,
      order: {
        receipt: order.receipt,
        currency: CURRENCY,
        subtotal: order.subtotal,
        delivery: order.delivery,
        total: order.total,
        items: order.items,
      },
      payment,
    }),
  });

  if (!response.ok) {
    throw new Error(`Order notification failed with status ${response.status}.`);
  }
}

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator((data: z.input<typeof createOrderSchema>) => createOrderSchema.parse(data))
  .handler(async ({ data }) => {
    const { keyId, keySecret } = getRazorpayCredentials();
    const order = calculateOrder(data.items);

    if (order.total !== data.expectedTotal) {
      throw new Error("Your cart total changed. Please review your cart and try again.");
    }

    const receipt = createReceiptId();
    const amount = order.total * 100;
    const auth = btoa(`${keyId}:${keySecret}`);
    const response = await fetch(RAZORPAY_ORDERS_URL, {
      method: "POST",
      headers: {
        authorization: `Basic ${auth}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: CURRENCY,
        receipt,
        notes: {
          customer_name: data.customer.name,
          customer_phone: data.customer.phone,
          customer_city: data.customer.city,
          item_count: String(order.items.reduce((sum, item) => sum + item.qty, 0)),
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => undefined);
      const message =
        errorBody?.error?.description ??
        errorBody?.message ??
        "Razorpay could not create the order.";
      throw new Error(message);
    }

    const razorpayOrder = (await response.json()) as {
      id: string;
      amount: number;
      currency: string;
      receipt: string;
    };

    return {
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      keyId,
    };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator((data: z.input<typeof verifyPaymentSchema>) => verifyPaymentSchema.parse(data))
  .handler(async ({ data }) => {
    const { keySecret } = getRazorpayCredentials();
    const order = calculateOrder(data.items);

    if (order.total !== data.expectedTotal) {
      throw new Error("Your cart total changed. Please review your cart and try again.");
    }

    const payload = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;
    const expectedSignature = await hmacSha256Hex(keySecret, payload);

    if (expectedSignature !== data.razorpay_signature) {
      throw new Error("Razorpay payment verification failed.");
    }

    await notifyOrderPlaced({
      customer: data.customer,
      order: { ...order, receipt: data.receipt },
      payment: {
        razorpayOrderId: data.razorpay_order_id,
        razorpayPaymentId: data.razorpay_payment_id,
      },
    });

    return {
      verified: true,
      notified: true,
      paymentId: data.razorpay_payment_id,
      orderId: data.razorpay_order_id,
    };
  });
