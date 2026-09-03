export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export const CATEGORIES = [
  "All Honeys",
  "Raw Wildflower",
  "Manuka & Medicinal",
  "Infused & Artisanal",
  "Hive & Gifts"
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Golden Reserve Raw Wildflower Honey",
    slug: "golden-reserve-raw-wildflower-honey",
    price: 34.99,
    originalPrice: 42.99,
    category: "Raw Wildflower",
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Harvested from pristine alpine meadows blooming with wild clover and mountain wildflowers. Unfiltered, unheated, and raw to preserve natural enzymes, pollen, and delicate floral notes.",
    features: [
      "100% Raw, unfiltered, and unheated pure honey",
      "Sourced sustainably from high-altitude wildflower meadows",
      "Rich in natural antioxidants, enzymes, and raw pollen",
      "Exquisite floral aroma with a velvety smooth finish",
      "Comes in a reusable, UV-protected amber glass jar"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "MGO 550+ Certified Organic Manuka Honey",
    slug: "mgo-550-certified-organic-manuka-honey",
    price: 89.99,
    originalPrice: 105.00,
    category: "Manuka & Medicinal",
    rating: 5.0,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1587049352851-8c4e89133924?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1587049352851-8c4e89133924?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sourced from the remote, unpolluted native forests of New Zealand. Certified MGO 550+ guaranteeing exceptionally high dietary methylglyoxal for superior wellness and immune support.",
    features: [
      "Certified MGO 550+ high potency Manuka honey",
      "Harvested and packed in New Zealand under strict UMF guidelines",
      "Powerful natural antibacterial and immune-boosting properties",
      "Rich, earthy caramel flavor profile with a robust finish",
      "Tamper-evident seal and BPA-free artisanal jar"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Artisanal Lavender Infused Honey",
    slug: "artisanal-lavender-infused-honey",
    price: 28.99,
    category: "Infused & Artisanal",
    rating: 4.8,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Slow-infused with organic culinary French lavender blossoms. Creates a heavenly pairing that elevates artisanal teas, warm baking recipes, and gourmet cheese boards.",
    features: [
      "Infused with organic culinary-grade French lavender",
      "Gentle cold-infusion process preserving raw honey properties",
      "Calming floral aroma ideal for evening teas and lattes",
      "Exceptional drizzled over goat cheese or Greek yogurt"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-4",
    name: "Raw Pure Honeycomb Cut in Wood Frame",
    slug: "raw-pure-honeycomb-cut-in-wood-frame",
    price: 45.99,
    originalPrice: 52.00,
    category: "Hive & Gifts",
    rating: 4.9,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "The purest way to experience honey just as the bees made it. Edible raw beeswax comb filled with liquid golden acacia honey. A stunning centerpiece for any charcuterie board.",
    features: [
      "100% Natural edible honeycomb straight from the hive",
      "Untouched by machines or processing filters",
      "Rich in natural propolis and pure beeswax",
      "Includes an artisan wooden serving knife"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-5",
    name: "Organic Acacia Blossom Golden Nectar",
    slug: "organic-acacia-blossom-golden-nectar",
    price: 32.99,
    category: "Raw Wildflower",
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Renowned for its crystal-clear golden hue and slow crystallization. Smooth, delicate, and mild sweetness that never overpowers your morning coffee or herbal infusions.",
    features: [
      "Single-origin acacia blossom honey",
      "Stays liquid longer naturally due to high fructose content",
      "Delicate, light floral sweetness suitable for baking",
      "Low glycemic index compared to refined sugars"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-6",
    name: "Spiced Cinnamon Infused Raw Honey",
    slug: "spiced-cinnamon-infused-raw-honey",
    price: 29.99,
    originalPrice: 35.00,
    category: "Infused & Artisanal",
    rating: 4.8,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A warming blend of raw summer wildflower honey infused with organic Ceylon true cinnamon. Perfect for oatmeal, toast, hot apple cider, or natural soothing sore throat relief.",
    features: [
      "Infused with premium organic Ceylon cinnamon",
      "Warm aromatic spice notes balanced with rich honey sweetness",
      "Natural synergy of antioxidants and anti-inflammatory compounds",
      "Hand-poured in small artisanal batches"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "prod-7",
    name: "Royal Jelly & Bee Pollen Wellness Elixir",
    slug: "royal-jelly-bee-pollen-wellness-elixir",
    price: 64.99,
    category: "Manuka & Medicinal",
    rating: 4.9,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587049352851-8c4e89133924?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Our ultimate vitality formula combining pure fresh royal jelly, nutrient-dense bee pollen, and propolis in raw organic honey. Designed to support energy, focus, and longevity.",
    features: [
      "Contains 100% pure fresh royal jelly and multifloral bee pollen",
      "Packed with B-vitamins, amino acids, and vital nutrients",
      "Boosts natural daily energy and immune resilience",
      "Cold-blended to protect delicate bioactive compounds"
    ],
    inStock: false,
    isFeatured: false
  },
  {
    id: "prod-8",
    name: "Golden Hive Luxury Gift Box",
    slug: "golden-hive-luxury-gift-box",
    price: 79.99,
    category: "Hive & Gifts",
    rating: 5.0,
    reviewsCount: 130,
    image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An exquisite curation of three artisanal honeys, a handcrafted wooden honey dipper, and a pure beeswax pillar candle, presented in an embossed magnetic closure gift box.",
    features: [
      "Includes 3 jars of our most popular award-winning raw honeys (250g each)",
      "Handcrafted olivewood honey dipper included",
      "100% Pure handmade beeswax candle with natural honey scent",
      "Luxury keepsake gift box with custom gold foil stamping"
    ],
    inStock: true,
    isFeatured: false
  }
];
