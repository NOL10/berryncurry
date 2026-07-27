// Deterministic pseudo-rating between 4.5 and 4.9 derived from a stable key
// (product slug). Kept client-safe and dependency-free.
export function ratingFor(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const bucket = hash % 5; // 0..4  → 4.5, 4.6, 4.7, 4.8, 4.9
  return 4.5 + bucket / 10;
}

export function reviewCountFor(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 33 + key.charCodeAt(i)) >>> 0;
  }
  return 40 + (hash % 260); // 40..299 reviews
}