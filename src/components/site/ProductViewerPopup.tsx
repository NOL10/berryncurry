import { useState, useEffect } from "react";
import { BAKERY_PRODUCTS } from "@/data/bakery";
import { FRUIT_PRODUCTS } from "@/data/fruits";
import { X } from "lucide-react";

interface ViewerPopupProps {
  show?: boolean;
}

export function ProductViewerPopup({ show = true }: ViewerPopupProps) {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState<(typeof BAKERY_PRODUCTS)[0] | (typeof FRUIT_PRODUCTS)[0] | null>(null);
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    if (!show) return;

    // Show popup after a delay
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Randomly select a product
    const allProducts = [...BAKERY_PRODUCTS, ...FRUIT_PRODUCTS];
    const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
    setProduct(randomProduct);

    // Generate random viewer count (between 10 and 200)
    const randomViewers = Math.floor(Math.random() * 190) + 10;
    setViewerCount(randomViewers);

    // Hide popup after 8 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 11000);

    // Show new popup every 10 seconds
    const cycleTimer = setInterval(() => {
      const newProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      setProduct(newProduct);
      const newViewers = Math.floor(Math.random() * 190) + 10;
      setViewerCount(newViewers);
      setVisible(true);
      
      setTimeout(() => {
        setVisible(false);
      }, 8000);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(cycleTimer);
    };
  }, [show]);

  if (!visible || !product) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
      <div className="relative flex max-w-xs items-center gap-3 rounded-lg border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur-sm">
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-border text-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <X className="size-3" />
        </button>
        <div className="size-16 shrink-0 overflow-hidden rounded-md bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <p className="text-xs font-semibold text-foreground">
            {viewerCount} people viewing this
          </p>
          <p className="mt-0.5 truncate text-sm font-medium text-primary">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            right now
          </p>
        </div>
      </div>
    </div>
  );
}
