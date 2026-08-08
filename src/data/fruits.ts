export type FruitCategory = "mangoes" | "combos" | "exotic" | "baskets";

export interface FruitProduct {
  slug: string;
  name: string;
  category: FruitCategory;
  categoryLabel: string;
  image: string;
  price: number;
  originalPrice: number;
  weight: string;
  blurb: string;
  story: string;
  outOfStock?: boolean;
}

export const FRUIT_CATEGORIES: { id: FruitCategory; label: string; blurb: string }[] = [
  { id: "mangoes", label: "Single Origin Mangoes", blurb: "Tree-ripened, hand-picked from small orchards." },
  { id: "combos", label: "Curated Combos", blurb: "Multi-varietal boxes for the true mango season." },
  { id: "exotic", label: "Exotic Organic Fruits", blurb: "Beyond mangoes — the rare and the seasonal." },
  { id: "baskets", label: "Fruit Baskets", blurb: "A little of everything, thoughtfully arranged." },
];

export const FRUIT_PRODUCTS: FruitProduct[] = [
  {
    slug: "combo-mallika-daseri-langra",
    name: "Combo — 1kg Mallika, 1kg Daseri, 1kg Langra",
    category: "combos",
    categoryLabel: "Combos",
    image: "https://berryncurry.com/wp-content/uploads/2025/05/Untitled-design-1-300x300.png",
    price: 899,
    originalPrice: 1200,
    weight: "3 kg",
    blurb: "Three heritage varietals in one box — the perfect introduction.",
    story: "A tasting flight of North and South India's finest. Mallika for depth, Daseri for perfume, Langra for that classic tang.",
    outOfStock: true,
  },
  {
    slug: "combo-langra-daseri",
    name: "Combo — 1.5kg Langra, 1.5kg Daseri",
    category: "combos",
    categoryLabel: "Combos",
    image: "https://berryncurry.com/wp-content/uploads/2025/05/Untitled-design-300x300.png",
    price: 899,
    originalPrice: 1200,
    weight: "3 kg",
    blurb: "For lovers of the classic North Indian pairing.",
    story: "Langra's honeyed tang meets Daseri's floral sweetness. A study in contrast.",
    outOfStock: true,
  },
  {
    slug: "dasheri-3kg",
    name: "Dasheri Mango",
    category: "mangoes",
    categoryLabel: "Mangoes",
    image: "https://berryncurry.com/wp-content/uploads/2025/06/dasheri-300x300.webp",
    price: 899,
    originalPrice: 999,
    weight: "3 kg",
    blurb: "Fibreless, fragrant, and endlessly juicy.",
    story: "The heirloom mango of Uttar Pradesh — long, slender, and dripping with sugar.",
    outOfStock: true,
  },
  {
    slug: "dhaseri",
    name: "Dhaseri",
    category: "mangoes",
    categoryLabel: "Mangoes",
    image: "https://berryncurry.com/wp-content/uploads/2025/02/dasheri-mango-500x500-1-300x300.webp",
    price: 899,
    originalPrice: 1200,
    weight: "3 kg",
    blurb: "Small orchard batch. Naturally ripened.",
    story: "Picked at peak by hand, boxed and shipped within the day. No calcium carbide, ever.",
    outOfStock: true,
  },
  {
    slug: "langra",
    name: "Langra",
    category: "mangoes",
    categoryLabel: "Mangoes",
    image: "https://berryncurry.com/wp-content/uploads/2025/02/langda-300x300.jpg",
    price: 999,
    originalPrice: 1199,
    weight: "3 kg",
    blurb: "Green-skinned, gold-fleshed, iconic Varanasi variety.",
    story: "Named for the limping farmer who first cultivated it — a Banarasi legend for good reason.",
    outOfStock: true,
  },
  {
    slug: "mallika",
    name: "Mallika",
    category: "mangoes",
    categoryLabel: "Mangoes",
    image: "https://berryncurry.com/wp-content/uploads/2025/02/fresh-mallika-mango-300x300.jpg",
    price: 799,
    originalPrice: 1200,
    weight: "3 kg",
    blurb: "Neelam × Dasheri hybrid. Deep, dense, honeyed.",
    story: "Late-season mango with unmatched sweetness. Fibreless, thick-fleshed, and unforgettable.",
    outOfStock: true,
  },
  {
    slug: "avocado-500g",
    name: "Avocado",
    category: "exotic",
    categoryLabel: "Exotic Organic Fruits",
    image: "https://berryncurry.com/wp-content/uploads/2025/06/avacado-300x300.jpg",
    price: 225,
    originalPrice: 399,
    weight: "500 g",
    blurb: "Buttery, ripened just-so.",
    story: "Grown in the Nilgiri hills. Ready-to-eat within two days of arrival.",
  },
  {
    slug: "beauty-pear-1kg",
    name: "Beauty Pear",
    category: "exotic",
    categoryLabel: "Exotic Organic Fruits",
    image: "https://berryncurry.com/wp-content/uploads/2025/05/img1-300x300.jpg",
    price: 499,
    originalPrice: 600,
    weight: "1 kg",
    blurb: "Crisp, blush-skinned, subtly floral.",
    story: "A late-summer specialty from the Himalayan foothills.",
  },
  {
    slug: "blueberry-125g",
    name: "Blueberry",
    category: "exotic",
    categoryLabel: "Exotic Organic Fruits",
    image: "https://berryncurry.com/wp-content/uploads/2025/05/pexels-krsvch-1153655-300x300.jpg",
    price: 349,
    originalPrice: 500,
    weight: "125 g",
    blurb: "Deep-blue, wild-forward.",
    story: "Cool-climate berries, chilled in transit for maximum bloom.",
  },
  {
    slug: "dragon-1kg",
    name: "Dragon Fruit",
    category: "exotic",
    categoryLabel: "Exotic Organic Fruits",
    image: "https://berryncurry.com/wp-content/uploads/2025/05/pexels-lovefoodart-1437598-300x300.jpg",
    price: 299,
    originalPrice: 400,
    weight: "1 kg",
    blurb: "Magenta skin, jet-flecked pearl flesh.",
    story: "Grown organically in Andhra Pradesh — the freshest cross-cultural fruit on the shelf.",
  },
  {
    slug: "pomegranate-1kg",
    name: "Pomegranate",
    category: "exotic",
    categoryLabel: "Exotic Organic Fruits",
    image: "https://berryncurry.com/wp-content/uploads/2025/05/pomegranate-300x300.jpg",
    price: 99,
    originalPrice: 150,
    weight: "1 kg",
    blurb: "Ruby-red arils, sweet and tart.",
    story: "Fresh from the orchard, packed with antioxidants and natural sweetness.",
  },
  {
    slug: "fruit-basket-1kg",
    name: "Fruit Basket",
    category: "baskets",
    categoryLabel: "Fruit Basket",
    image: "https://berryncurry.com/wp-content/uploads/2025/06/fruit-basket-1-300x300.webp",
    price: 1299,
    originalPrice: 1499,
    weight: "1 kg each",
    blurb: "A generous mixed basket — hand-composed.",
    story: "The gift box of choice. Composition varies weekly with what's at peak.",
  },
  {
    slug: "fruit-basket-half",
    name: "Fruit Basket (half kg each)",
    category: "baskets",
    categoryLabel: "Fruit Basket",
    image: "https://berryncurry.com/wp-content/uploads/2025/06/fruit-basket-300x300.webp",
    price: 699,
    originalPrice: 999,
    weight: "500 g each",
    blurb: "A tasting basket for smaller households.",
    story: "Same thoughtful curation, half the portion.",
  },
];

export const fruitsByCategory = (id: FruitCategory) =>
  FRUIT_PRODUCTS.filter((p) => p.category === id);

export const getFruit = (slug: string) =>
  FRUIT_PRODUCTS.find((p) => p.slug === slug);

export interface FruitTestimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const FRUIT_TESTIMONIALS: FruitTestimonial[] = [
  {
    name: "Sneha Reddy",
    location: "Bangalore",
    text: "The mangoes were absolutely divine! The Langra variety was perfectly ripe and so sweet. Best mangoes I've had in years.",
    rating: 5,
  },
  {
    name: "Karthik Nair",
    location: "Bangalore",
    text: "Ordered the fruit basket for a gift and it was beautifully arranged. Fresh, seasonal fruits and excellent presentation!",
    rating: 5,
  },
  {
    name: "Divya Patel",
    location: "Bangalore",
    text: "The exotic fruits are top quality. The avocados were perfectly ripe and the dragon fruit was so fresh. Will order again!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore",
    text: "The mango combo box was a great idea. Got to try different varieties and each one was better than the last. Highly recommend!",
    rating: 5,
  },
  {
    name: "Anita Desai",
    location: "Bangalore",
    text: "Finally found a place with authentic, naturally ripened mangoes. No chemicals, just pure taste. My family loved them!",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    location: "Bangalore",
    text: "The blueberries were amazing - so fresh and sweet. Great quality exotic fruits that are hard to find elsewhere.",
    rating: 5,
  },
];