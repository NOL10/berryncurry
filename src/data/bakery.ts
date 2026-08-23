import catBreads from "@/assets/cat-breads.jpg";
import catBuns from "@/assets/cat-buns.jpg";
import catRusk from "@/assets/cat-rusk.jpg";
import catCrunch from "@/assets/cat-crunch.jpg";

export type BakeCategory =
  | "pav-bases"
  | "breads"
  | "buns"
  | "rusk"
  | "bites"
  | "cookies"
  | "cakes"
  | "muffins"
  | "donuts";

export interface BakeProduct {
  slug: string;
  name: string;
  category: BakeCategory;
  categoryLabel: string;
  image: string;
  price: number;
  weight: string;
  blurb: string;
  story: string;
  ingredients: string[];
  outOfStock?: boolean;
}

export const BAKERY_CATEGORIES: { id: BakeCategory; label: string; blurb: string }[] = [
  { id: "pav-bases", label: "Pav & Pizza Bases", blurb: "Soft pav and ready-to-top pizza bases — classic and wholewheat." },
  { id: "breads", label: "Fresh Breads", blurb: "Soft, fluffy loaves baked fresh every single morning." },
  { id: "buns", label: "Soft Buns", blurb: "Pillowy buns — plain, cream, and our fluffy Korean bun." },
  { id: "rusk", label: "Rusk, Khari & Sticks", blurb: "The perfect crunchy companion for your chai." },
  { id: "bites", label: "Savoury Bites", blurb: "Bold, snackable bites for teatime cravings." },
  { id: "cookies", label: "Cookies & Biscuits", blurb: "Classic bakes, healthy millets, and everything in between." },
  { id: "cakes", label: "Cakes & Rolls", blurb: "Slices, forest cakes and rolls — baked fresh in-house." },
  { id: "muffins", label: "Muffins & Brownies", blurb: "Rich, fudgy brownies and fluffy iced muffins." },
  { id: "donuts", label: "Donuts", blurb: "Sweet, glazed donuts — classic and chocolate varieties." },
];

const mk = (
  slug: string,
  name: string,
  category: BakeCategory,
  price: number,
  weight: string,
  blurb: string,
  image: string,
  ingredients: string[] = [],
  outOfStock?: boolean,
): BakeProduct => {
  const label = BAKERY_CATEGORIES.find((c) => c.id === category)!.label;
  return {
    slug,
    name,
    category,
    categoryLabel: label,
    image,
    price,
    weight,
    blurb,
    story: `${name} — baked fresh in-house with premium ingredients and old-school care.`,
    ingredients,
    outOfStock,
  };
};

export const BAKERY_PRODUCTS: BakeProduct[] = [
  // Pav & Bases
  mk("bombay-pav", "Bombay Pav", "pav-bases", 45, "per pack", "Soft, glossy classic Bombay pav.", "/produts/pav_buns.jpeg", ["Maida", "Yeast", "Sugar", "Salt", "Water", "Butter"]),
  mk("ww-bombay-pav", "Whole Wheat Bombay Pav", "pav-bases", 50, "per pack", "The classic pav, gone wholewheat.", "/produts/pav_buns.jpeg", ["Whole Wheat Flour", "Yeast", "Sugar", "Salt", "Water", "Butter"]),
  mk("pizza-base", "Pizza Base", "pav-bases", 40, "per pack", "Ready-to-top, evenly baked base.", "/produts/pizza_base.jpeg", ["Maida", "Yeast", "Sugar", "Salt", "Water", "Olive Oil"]),
  mk("ww-pizza-base", "Whole Wheat Pizza Base", "pav-bases", 45, "per pack", "Nutty wholewheat base for guilt-free pizzas.", "/produts/wheat_pizza_base.jpeg", ["Whole Wheat Flour", "Yeast", "Sugar", "Salt", "Water", "Olive Oil"]),

  // Breads
  mk("whole-wheat-bread", "Whole Wheat Bread", "breads", 90, "400 g", "Our everyday loaf — soft and versatile.", "/produts/whole_wheat_bread.jpeg", ["Whole Wheat Flour", "Yeast", "Sugar", "Salt", "Water", "Butter"]),
  mk("milk-bread", "Milk Bread", "breads", 70, "400 g", "Cloud-soft, milky and lightly sweet.", "/produts/milk_bread.jpeg", ["Maida", "Milk", "Yeast", "Sugar", "Salt", "Butter"]),
  mk("sandwich-bread", "Sandwich Bread", "breads", 70, "400 g", "Perfectly square, endlessly versatile.", "/produts/sandwich_bread.png", ["Maida", "Yeast", "Sugar", "Salt", "Water", "Butter"]),
  mk("fruit-bread", "Fruit Bread", "breads", 50, "300 g", "Studded with sweet dried fruit.", "/produts/fruit_bread.jpeg", ["Maida", "Mixed Dry Fruits", "Yeast", "Sugar", "Salt", "Water", "Butter"]),
  mk("chocochip-bread", "Chocochip Bread", "breads", 55, "300 g", "Melty chocochips baked through.", "/produts/chocochip bread .png", ["Maida", "Chocolate Chips", "Yeast", "Sugar", "Salt", "Water", "Butter"], true),
  mk("multigrain-bread", "Multigrain Bread", "breads", 60, "400 g", "Wholesome multigrain goodness.", "/produts/multigrain_bread.jpeg", ["Multigrain Flour", "Yeast", "Sugar", "Salt", "Water", "Butter", "Seeds"]),
  mk("garlic-bread", "Garlic Bread", "breads", 99, "300 g", "Buttery, golden, garlicky.", "/produts/garlic bread .jpeg", ["Maida", "Garlic", "Butter", "Yeast", "Sugar", "Salt", "Water"]),
  mk("cheese-garlic-bread", "Cheese Garlic Bread", "breads", 120, "300 g", "Cheesy, garlicky, unmissable.", "/produts/cheese garlic bread.png", ["Maida", "Garlic", "Cheese", "Butter", "Yeast", "Sugar", "Salt", "Water"]),
  mk("focaccia-bread", "Focaccia Bread", "breads", 99, "300 g", "Herbed, olive-oiled Italian classic.", "/produts/foccacia_raed.jpeg", ["Maida", "Olive Oil", "Herbs", "Yeast", "Sugar", "Salt", "Water"]),

  // Buns
  mk("special-bun", "Special Bun", "buns", 45, "per piece", "Our house-special sweet bun.", "/produts/special_buns.jpeg", ["Maida", "Sugar", "Butter", "Yeast", "Milk", "Salt"]),
  mk("chocolate-cream-bun", "Chocolate Cream Bun", "buns", 45, "per piece", "Pillowy bun filled with chocolate cream.", "/produts/chocolate cream bn.png", ["Maida", "Chocolate Cream", "Sugar", "Butter", "Yeast", "Milk", "Salt"]),
  // mk("cream-bun", "Cream Bun", "buns", 40, "per piece", "Soft bun with a sweet cream heart.", catBuns, ["Maida", "Vanilla Cream", "Sugar", "Butter", "Yeast", "Milk", "Salt"]),
  mk("mini-buns", "Mini Buns", "buns", 45, "6 pcs", "Pack of six soft mini buns.", "/produts/mini_buns.jpeg", ["Maida", "Sugar", "Butter", "Yeast", "Milk", "Salt"]),
  mk("mini-cream-buns", "Mini Cream Buns", "buns", 50, "6 pcs", "Six mini buns, each with a cream centre.", "/produts/mini cream bun.jpeg", ["Maida", "Vanilla Cream", "Sugar", "Butter", "Yeast", "Milk", "Salt"]),
  mk("korean-bun", "Korean Bun", "buns", 150, "per piece", "Big, fluffy, cream-cheese-style Korean bun.", "/produts/bnc_korean_bun.jpeg", ["Maida", "Cream Cheese", "Sugar", "Butter", "Yeast", "Milk", "Salt"]),

  // Rusk, Khari & Sticks
  mk("mini-rusk", "Mini Rusk", "rusk", 100, "200 g", "Bite-sized, twice-baked crunch.", "/produts/mini_rusk.jpeg", ["Maida", "Sugar", "Butter", "Ghee", "Cardamom"]),
  mk("rusk", "Rusk", "rusk", 80, "250 g", "Crisp, golden, chai's best friend.", "/produts/rusk.jpeg", ["Maida", "Sugar", "Butter", "Ghee", "Cardamom"]),
  mk("ww-rusk", "Whole Wheat Rusk", "rusk", 110, "200 g", "Wholewheat crunch for the wholesome tea break.", "/produts/wheat rusk.jpeg", ["Whole Wheat Flour", "Sugar", "Butter", "Ghee", "Cardamom"]),
  mk("butter-sticks", "Butter Sticks", "rusk", 80, "250 g", "Rich, buttery, snappable sticks.", "/produts/butter_sticks.jpeg", ["Maida", "Butter", "Sugar", "Salt"]),
  mk("soup-sticks", "Soup Sticks", "rusk", 80, "250 g", "Slender, crisp — perfect with soup.", "/produts/butter_sticks.jpeg", ["Maida", "Butter", "Sugar", "Salt"]),
  mk("plain-khari", "Plain Khari", "rusk", 110, "250 g", "Flaky, layered puff pastry khari.", "/produts/khari.jpeg", ["Maida", "Butter", "Salt", "Carom Seeds"]),

  // Bites
  // mk("indian-bites", "Indian Bites", "bites", 75, "200 g", "Warm spices in every crunchy bite.", catCrunch, ["Maida", "Indian Spices", "Butter", "Salt"]),
  // mk("mexican-bites", "Mexican Bites", "bites", 75, "200 g", "Bold, tangy Mexican-spiced bites.", catCrunch, ["Maida", "Mexican Spices", "Butter", "Salt"]),
  mk("papdi", "Papdi", "bites", 80, 'pack', "Crisp, savoury papdi perfect for snacking.", "/produts/papdi.jpeg", ["Maida", "Cumin", "Butter", "Salt"]),
  mk("banana-chips", "Banana Chips", "bites", 85, 'pack', "Crispy, sweet banana chips for snacking.", "/produts/Banana Chips.jpeg", ["Raw Banana", "Salt", "Turmeric", "Oil"]),
  mk("cashew-mixture", "Cashew Mixture", "bites", 150, 'pack', "Premium cashew mixture with savoury spices.", "/produts/Cashew Mixture.jpeg", ["Cashews", "Spices", "Salt", "Oil"]),
  mk("broccoli-vacuum-fried-chips", "Broccoli Vacuum Fried Chips", "bites", 150, 'pack', "Crispy, healthy vacuum-fried broccoli chips.", "/produts/Broccoli Vaccam fried Chips..jpeg", ["Broccoli", "Salt", "Oil"]),
  mk("khakhra", "Khakhra", "bites", 95, 'pack', "Traditional crispy Gujarati snack.", "/produts/Khakhra mobile.jpeg", ["Whole Wheat Flour", "Oil", "Salt", "Cumin"]),
  mk("whole-wheat-khakhra", "Whole Wheat Khakhra", "bites", 95, 'pack', "Healthy whole wheat khakhra.", "/produts/Whole wheat khakhra.jpeg", ["Whole Wheat Flour", "Oil", "Salt", "Cumin"]),

  // Cookies & Biscuits
  mk("almond-crunch", "Almond Crunch", "cookies", 125, "200 g", "Buttery almond cookies with a satisfying snap.", "/produts/almond crunch cookies.jpeg", ["Maida", "Almonds", "Butter", "Sugar", "Salt"]),
  mk("cashew-crunch", "Cashew Crunch", "cookies", 125, "200 g", "Loaded with real cashew for a premium bite.", "/produts/cashew crunch cookies.jpeg", ["Maida", "Cashews", "Butter", "Sugar", "Salt"]),
  mk("chocochips-cookies", "Chocochips Cookies", "cookies", 135, "200 g", "Classic cookie packed with chocochips.", "/produts/chocochip cookies.jpeg", ["Maida", "Chocolate Chips", "Butter", "Sugar", "Salt"]),
  mk("coconut-cookies", "Coconut Cookies", "cookies", 110, "200 g", "Toasty coconut in every bite.", "/produts/coconut cookies.jpeg", ["Maida", "Coconut", "Butter", "Sugar", "Salt"]),
  mk("choco-vanilla-biscuits", "Choco Vanilla Biscuits", "cookies", 125, "200 g", "Chocolate and vanilla, side by side.", "/produts/choco vanilla cookies.jpeg", ["Maida", "Cocoa", "Vanilla", "Butter", "Sugar", "Salt"]),
  mk("fruit-nuts-biscuits", "Fruit & Nuts Biscuits", "cookies", 135, "200 g", "Loaded with dried fruit and nuts.", "/produts/fruitnnut cookies.jpeg", ["Maida", "Dry Fruits", "Nuts", "Butter", "Sugar", "Salt"]),
  // mk("masala-biscuits", "Masala Biscuits", "cookies", 95, "200 g", "Savoury-sweet with a masala kick.", catCrunch, ["Maida", "Masala Spices", "Butter", "Sugar", "Salt"]),
  mk("jeera-biscuits", "Jeera Biscuits", "cookies", 95, "200 g", "Toasted-cumin classic teatime biscuit.", "/produts/jeera cookies.jpeg", ["Maida", "Cumin", "Butter", "Sugar", "Salt"]),
  mk("nankhatai-biscuits", "Nankhatai Biscuits", "cookies", 95, "200 g", "The melt-in-mouth ghee nankhatai.", "/produts/nankhatai cookies.jpeg", ["Maida", "Ghee", "Sugar", "Cardamom", "Salt"]),
  mk("sweet-salt-biscuits", "Sweet & Salt Biscuits", "cookies", 110, "200 g", "Sweet and salty in perfect balance.", "/produts/sweetnsalt cookies.jpeg", ["Maida", "Sugar", "Salt", "Butter"]),
  mk("pineapple-cream-biscuits", "Pineapple Cream Biscuits", "cookies", 110, "200 g", "Tangy pineapple cream sandwich biscuit.", "/produts/pineapple cream cookies.jpeg", ["Maida", "Pineapple Cream", "Butter", "Sugar", "Salt"]),
  mk("ajwain-biscuits", "Ajwain Biscuits", "cookies", 95, "200 g", "Savoury, herby ajwain crunch.", "/produts/ajwain cookies.jpeg", ["Maida", "Ajwain", "Butter", "Sugar", "Salt"]),
  mk("ragi-cookies", "Ragi Cookies", "cookies", 110, "200 g", "Healthy ragi cookies with a nutty flavour.", "/produts/ragi cookies.jpeg", ["Ragi Flour", "Butter", "Sugar", "Salt"]),
  mk("millet-jaggery-cookies", "Millet Jaggery Cookies", "cookies", 125, "200 g", "Millets sweetened with pure jaggery.", '/produts/millet jaggery cookies.png', ["Millet Flour", "Jaggery", "Butter", "Salt"]),
  mk("oats-raisins-cookies", "Oats Raisins Cookies", "cookies", 110, "200 g", "Hearty oats and juicy raisins.", '/produts/oats rasin cookies.png', ["Maida", "Oats", "Raisins", "Butter", "Sugar", "Salt"]),
  // mk("millets-cookies", "Millets Cookies", "cookies", 115, "200 g", "Wholesome multi-millet cookies.", '/produts/millet cookies.png', ["Millet Flour", "Butter", "Sugar", "Salt"]),

  // Cakes & Rolls
  mk("chocolate-cake-slice", "Chocolate Cake Slice", "cakes", 90, "per slice", "Rich, moist chocolate slice.", "/produts/chocolate_slice_cake.jpeg", ["Maida", "Cocoa", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("fruit-cake-slice", "Fruit Cake Slice", "cakes", 80, "per slice", "Buttery cake studded with fruit.", "/produts/Fruit Cake Slice.jpeg", ["Maida", "Dry Fruits", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("marble-cake-slice", "Marble Cake Slice", "cakes", 90, "per slice", "Chocolate and vanilla, swirled.", "/produts/marble_slice_cake.jpeg", ["Maida", "Cocoa", "Vanilla", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("vanilla-cake-slice", "Vanilla Cake Slice", "cakes", 80, "per slice", "Soft, classic vanilla slice.", "/produts/vanilla_cake_slice.jpeg", ["Maida", "Vanilla", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("wheat-cake-slice", "Wheat Cake Slice", "cakes", 99, "per slice", "Wholewheat cake — softer than you'd expect.", "/produts/wheat_slice_cake.jpeg", ["Whole Wheat Flour", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("millets-cake-slice", "Millets Cake Slice", "cakes", 99, "per slice", "Nutty millets in a tender crumb.", "/produts/millets cake slice.png", ["Millet Flour", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("banana-walnut-cake-slice", "Banana Walnut Cake Slice", "cakes", 105, "per slice", "Ripe banana and crunchy walnut.", "/produts/banana_walunut_cake_slice.jpeg", ["Maida", "Banana", "Walnuts", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("swiss-roll", "Swiss Roll", "cakes", 145, "per roll", "Light sponge rolled around jammy cream.", "/produts/swiss_roll.jpeg", ["Maida", "Jam", "Cream", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("cream-rolls", "Cream Rolls", "cakes", 140, "per roll", "Sweet cream-filled pastry rolls.", "/produts/cream_rolls.jpeg", ["Maida", "Cream", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("jam-roll", "Jam Roll", "cakes", 135, "per roll", "The teatime jam roll classic.", "/produts/jam roll.png", ["Maida", "Jam", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("black-forest-cake", "Black Forest Cake", "cakes", 75, "per slice", "Chocolate, cherry and cream.", "/produts/black forest cake .png", ["Maida", "Cocoa", "Cherries", "Cream", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("white-forest-cake", "White Forest Cake", "cakes", 85, "per slice", "White chocolate, cherry and cream.", "/produts/white forest cake .png", ["Maida", "White Chocolate", "Cherries", "Cream", "Butter", "Sugar", "Eggs", "Milk"]),

  // Muffins & Brownies
  mk("choco-walnut-brownie", "Choco Walnut Brownie", "muffins", 110, "per piece", "Fudgy chocolate brownie with walnuts.", "/produts/Choco walnut brownie.jpeg", ["Maida", "Cocoa", "Walnuts", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("chocolate-brownie", "Chocolate Brownie", "muffins", 100, "per piece", "The rich, chewy classic.", "/produts/chocolate brownie.png", ["Maida", "Cocoa", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("chocolate-icing-muffin", "Chocolate Icing Muffin", "muffins", 170, "per piece", "Chocolate muffin, iced.", "/produts/chocolate_icing_muffin.jpeg", ["Maida", "Cocoa", "Chocolate Icing", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("chocolate-muffin", "Chocolate Muffin", "muffins", 110, "per piece", "Deep-chocolate everyday muffin.", "/produts/chocolate muffin.png", ["Maida", "Cocoa", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("fruit-muffin", "Fruit Muffin", "muffins", 90, "per piece", "Soft muffin flecked with fruit.", "/produts/fruitmuffin.jpeg", ["Maida", "Dry Fruits", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("icing-muffin", "Icing Muffin", "muffins", 150, "per piece", "Vanilla muffin, iced.", "/produts/iceing_muffin.jpeg", ["Maida", "Vanilla", "Icing", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("red-velvet-icing-muffin", "Red Velvet Icing Muffin", "muffins", 185, "per piece", "Red velvet with cream cheese icing.", "/produts/Red velvet iceing Muffin.jpeg", ["Maida", "Cocoa", "Red Velvet", "Cream Cheese Icing", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("red-velvet-muffin", "Red Velvet Muffin", "muffins", 120, "per piece", "The moist, cocoa-tinged classic.", "/produts/red velvet muffin.jpeg", ["Maida", "Cocoa", "Red Velvet", "Butter", "Sugar", "Eggs", "Milk"]),
  mk("vanilla-muffin", "Vanilla Muffin", "muffins", 90, "per piece", "Soft, buttery vanilla muffin.", "/produts/vanilla_muffins.jpeg", ["Maida", "Vanilla", "Butter", "Sugar", "Eggs", "Milk"]),

  // Donuts
  mk("mini-donuts", "Mini Donuts", "donuts", 120, "per piece", "Pack of six sweet mini donuts.", "/produts/mini donuts.jpeg", ["Maida", "Sugar", "Butter", "Yeast", "Milk", "Glaze"]),
  mk("chocolate-donuts", "Chocolate Donuts", "donuts", 150, "per piece", "Chocolate-glazed mini donuts.", "/produts/chocloate donuts.jpeg", ["Maida", "Cocoa", "Sugar", "Butter", "Yeast", "Milk", "Chocolate Glaze"]),
  mk("kitkat-donuts", "KitKat Donuts", "donuts", 180, "per piece", "KitKat-topped chocolate donuts.", "/produts/kitkat dounuts.jpeg", ["Maida", "Cocoa", "Sugar", "Butter", "Yeast", "Milk", "KitKat", "Chocolate Glaze"]),
  // mk("mini-donuts-2", "Mini Donuts", "donuts", 120, "6 pcs", "Classic glazed mini donuts.", "/produts/minidonoguts.jpeg", ["Maida", "Sugar", "Butter", "Yeast", "Milk", "Glaze"]),
];

export const bakeryByCategory = (id: BakeCategory) =>
  BAKERY_PRODUCTS.filter((p) => p.category === id);

export const getBake = (slug: string) =>
  BAKERY_PRODUCTS.find((p) => p.slug === slug);

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const BAKERY_TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    location: "Bangalore",
    text: "The bread is so soft and fresh! My family loves the milk bread - it's become our daily breakfast staple.",
    rating: 5,
  },
  {
    name: "Rahul Menon",
    location: "Bangalore",
    text: "Best bakery in town! The Korean bun is absolutely amazing - so fluffy and creamy. Highly recommend!",
    rating: 5,
  },
  {
    name: "Anjali Desai",
    location: "Bangalore",
    text: "The crunch collection is addictive! Can't stop snacking on the almond crunch. Perfect with evening tea.",
    rating: 5,
  },
  {
    name: "Vikram Gowda",
    location: "bangalore",
    text: "Ordered a cake for my daughter's birthday - it was fresh, delicious, and beautifully presented. Thank you!",
    rating: 5,
  },
  {
    name: "Meera Nair",
    location: "Bangalore",
    text: "The whole wheat pav is a game changer! Finally a healthy option that actually tastes great.",
    rating: 5,
  },
  {
    name: "Arjun Pai",
    location: "Bangalore",
    text: "Their rusk is perfect for chai time. Crisp, not too sweet, and the quality is consistent every time.",
    rating: 5,
  },
];