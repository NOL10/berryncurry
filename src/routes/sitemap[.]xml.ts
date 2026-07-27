import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { FRUIT_PRODUCTS } from "@/data/fruits";
import { BAKERY_PRODUCTS } from "@/data/bakery";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/fruits",
          "/fruits/shop",
          "/bakery",
          "/bakery/shop",
          "/about",
          "/contact",
          ...FRUIT_PRODUCTS.map((p) => `/fruits/product/${p.slug}`),
          ...BAKERY_PRODUCTS.map((p) => `/bakery/product/${p.slug}`),
        ];

        const urls = paths
          .map((path) => `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`)
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
