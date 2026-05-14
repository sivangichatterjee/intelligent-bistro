import type { MenuItem } from "../types/index.js";

export const menu: MenuItem[] = [
  // ── Appetizers ───────────────────────────────────────────────────────────────
  {
    id: "miso_glazed_edamame",
    name: "Miso-Glazed Edamame",
    description:
      "Steamed edamame tossed in a rich white miso and sesame glaze, finished with a pinch of flaky sea salt for a savory, umami-packed starter.",
    price: 7.5,
    category: "appetizers",
    image_url:
      "https://plus.unsplash.com/premium_photo-1666318300338-51c7bfcffd56?w=800&auto=format&fit=crop&q=60",
    tags: ["vegan", "gluten-free"],
    notes: "Served warm; shells are not eaten.",
    spice_level: 0,
    calories: 220,
    allergens: ["soy", "sesame"],
    dietary: ["vegan", "gluten-free"],
  },
  {
    id: "crispy_spring_rolls",
    name: "Crispy Spring Rolls",
    description:
      "Golden rice-paper rolls stuffed with glass noodles, shiitake mushroom, and cabbage, served alongside a tangy sweet chili dipping sauce.",
    price: 10.0,
    category: "appetizers",
    image_url:
      "https://plus.unsplash.com/premium_photo-1695756121533-3f60bee7ba7b?w=800&auto=format&fit=crop&q=60",
    tags: ["vegan"],
    notes: "Two spring rolls per order with sweet chili sauce.",
    spice_level: 1,
    calories: 310,
    allergens: ["soy"],
    dietary: ["vegan"],
  },
  {
    id: "tangy_chicken_bao_buns",
    name: "Tangy Chicken Bao Buns",
    description:
      "Pillowy steamed bao cradling tender soy-glazed chicken thigh, pickled daikon, fresh cilantro, and a drizzle of chili-lime aioli.",
    price: 12.0,
    category: "appetizers",
    image_url:
      "https://images.unsplash.com/photo-1734365080631-c78fc21da45c?w=800&auto=format&fit=crop&q=60",
    tags: ["chef's pick"],
    notes: "Two buns per order; can be made with tofu on request.",
    spice_level: 1,
    calories: 380,
    allergens: ["gluten", "soy", "sesame", "eggs"],
    dietary: [],
  },

  // ── Bowls ────────────────────────────────────────────────────────────────────
  {
    id: "spicy_tuna_bowl",
    name: "Spicy Tuna Bowl",
    description:
      "Sushi-grade tuna over seasoned sushi rice with creamy avocado, crisp cucumber, edamame, tobiko, and a punchy sriracha aioli.",
    price: 18.5,
    category: "bowls",
    image_url:
      "https://images.unsplash.com/photo-1597958792579-bd3517df6399?w=800&auto=format&fit=crop&q=60",
    tags: ["spicy", "gluten-free", "chef's pick"],
    notes: "Raw fish — not suitable for pregnant guests; moderate heat from sriracha aioli.",
    spice_level: 2,
    calories: 620,
    allergens: ["fish", "soy", "sesame", "eggs"],
    dietary: ["gluten-free"],
  },
  {
    id: "teriyaki_chicken_bowl",
    name: "Teriyaki Chicken Bowl",
    description:
      "Juicy grilled free-range chicken thighs glazed in house teriyaki, served over steamed jasmine rice with broccolini and sesame seeds.",
    price: 16.0,
    category: "bowls",
    image_url:
      "https://images.unsplash.com/photo-1771384552858-feb0574f958d?w=800&auto=format&fit=crop&q=60",
    tags: ["popular", "gluten-free"],
    notes: "House teriyaki is lightly sweet; served with pickled ginger.",
    spice_level: 0,
    calories: 580,
    allergens: ["soy", "sesame"],
    dietary: ["gluten-free"],
  },
  {
    id: "tofu_buddha_bowl",
    name: "Tofu Buddha Bowl",
    description:
      "Crispy baked tofu nestled over nutty brown rice with roasted sweet potato, shredded kale, pickled red cabbage, and a zesty ginger-miso dressing.",
    price: 15.0,
    category: "bowls",
    image_url:
      "https://plus.unsplash.com/premium_photo-1664648005739-ce9a51e31952?w=800&auto=format&fit=crop&q=60",
    tags: ["vegan", "gluten-free", "vegetarian"],
    notes: "Completely plant-based; dressing served on the side.",
    spice_level: 0,
    calories: 520,
    allergens: ["soy", "sesame"],
    dietary: ["vegan", "vegetarian", "gluten-free"],
  },
  {
    id: "beef_bulgogi_bowl",
    name: "Beef Bulgogi Bowl",
    description:
      "Smoky Korean BBQ beef marinated in soy and pear, served over steamed rice with caramelised onions, shredded carrots, a soft-poached egg, and gochujang sauce.",
    price: 19.0,
    category: "bowls",
    image_url:
      "https://images.unsplash.com/photo-1646299501330-c46c84c0c936?w=800&auto=format&fit=crop&q=60",
    tags: ["spicy", "chef's pick"],
    notes: "Bulgogi marinade contains soy (gluten); gochujang sauce is spicy.",
    spice_level: 2,
    calories: 720,
    allergens: ["soy", "gluten", "eggs", "sesame"],
    dietary: [],
  },

  // ── Dumplings ────────────────────────────────────────────────────────────────
  {
    id: "steamed_pork_dumplings",
    name: "Steamed Pork Dumplings",
    description:
      "Handcrafted pork-and-ginger dumplings steamed to silky perfection, served with black vinegar and a side of chili oil for dipping.",
    price: 12.5,
    category: "dumplings",
    image_url:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=60",
    tags: ["popular"],
    notes: "Six dumplings per order; black vinegar and chili oil on the side.",
    spice_level: 1,
    calories: 380,
    allergens: ["gluten", "soy"],
    dietary: [],
  },
  {
    id: "pan_fried_veggie_dumplings",
    name: "Pan-Fried Veggie Dumplings",
    description:
      "Crispy golden-bottomed potstickers filled with tofu, shiitake, water chestnut, and ginger, served with a soy-ginger dipping sauce.",
    price: 11.5,
    category: "dumplings",
    image_url:
      "https://images.unsplash.com/photo-1638502521795-89107ac5e246?w=800&auto=format&fit=crop&q=60",
    tags: ["vegetarian", "popular"],
    notes: "Six dumplings per order; pan-fried on one side for a golden crust.",
    spice_level: 0,
    calories: 340,
    allergens: ["gluten", "soy", "sesame"],
    dietary: ["vegetarian"],
  },
  {
    id: "xiao_long_bao",
    name: "Xiao Long Bao",
    description:
      "Traditional Shanghai soup dumplings with a luxurious pork-and-gelatin broth filling, steamed to order in bamboo baskets.",
    price: 14.0,
    category: "dumplings",
    image_url:
      "https://images.unsplash.com/photo-1678026582164-24a5460c447a?w=800&auto=format&fit=crop&q=60",
    tags: ["chef's pick"],
    notes: "Six per basket; bite carefully — the broth inside is very hot. Served with ginger julienne and black vinegar.",
    spice_level: 0,
    calories: 420,
    allergens: ["gluten", "soy"],
    dietary: [],
  },

  // ── Noodles ──────────────────────────────────────────────────────────────────
  {
    id: "tonkotsu_ramen",
    name: "Tonkotsu Ramen",
    description:
      "A deeply rich 12-hour pork bone broth with wavy ramen noodles, chashu pork, a marinated soft-boiled egg, nori, and bamboo shoots.",
    price: 17.5,
    category: "noodles",
    image_url:
      "https://images.unsplash.com/photo-1638866281450-3933540af86a?w=800&auto=format&fit=crop&q=60",
    tags: ["chef's pick"],
    notes: "Very rich broth; contains sesame, soy, and egg.",
    spice_level: 1,
    calories: 680,
    allergens: ["gluten", "soy", "sesame", "eggs"],
    dietary: [],
  },
  {
    id: "pad_thai",
    name: "Pad Thai",
    description:
      "Wok-tossed rice noodles with plump tiger prawns, egg, bean sprouts, and green onion in a tamarind-fish sauce glaze, crowned with crushed peanuts.",
    price: 16.5,
    category: "noodles",
    image_url:
      "https://images.unsplash.com/photo-1645500498403-970672caf43e?w=800&auto=format&fit=crop&q=60",
    tags: ["popular", "gluten-free"],
    notes: "Gluten-free as served; can be made vegetarian on request. Contains peanuts.",
    spice_level: 1,
    calories: 640,
    allergens: ["peanuts", "shellfish", "fish", "eggs"],
    dietary: ["gluten-free"],
  },
  {
    id: "dan_dan_noodles",
    name: "Dan Dan Noodles",
    description:
      "Sichuan-style wheat noodles bathed in a bold, numbing chili-sesame sauce with minced pork, preserved vegetables, and fresh scallion.",
    price: 15.5,
    category: "noodles",
    image_url:
      "https://plus.unsplash.com/premium_photo-1694670234085-4f38b261ce5b?w=800&auto=format&fit=crop&q=60",
    tags: ["spicy"],
    notes: "Notably spicy from doubanjiang and chili oil; contains peanuts and sesame.",
    spice_level: 3,
    calories: 580,
    allergens: ["gluten", "peanuts", "sesame", "soy"],
    dietary: [],
  },
  {
    id: "cold_sesame_noodles",
    name: "Cold Sesame Noodles",
    description:
      "Chilled wheat noodles dressed in a creamy sesame-peanut sauce with julienned cucumber, shredded chicken, and a drizzle of chili oil.",
    price: 14.5,
    category: "noodles",
    image_url:
      "https://images.unsplash.com/photo-1516901121982-4ba280115a36?w=800&auto=format&fit=crop&q=60",
    tags: [],
    notes: "Served cold; contains peanuts and sesame. Can be made vegetarian without chicken.",
    spice_level: 1,
    calories: 520,
    allergens: ["gluten", "peanuts", "sesame"],
    dietary: [],
  },

  // ── Rice ─────────────────────────────────────────────────────────────────────
  {
    id: "garlic_egg_fried_rice",
    name: "Garlic Egg Fried Rice",
    description:
      "Day-old jasmine rice wok-fried over high heat with garlic confit, scrambled egg, scallion, and a splash of soy, finished with toasted sesame oil.",
    price: 10.5,
    category: "rice",
    image_url:
      "https://images.unsplash.com/photo-1664717698774-84f62382613b?w=800&auto=format&fit=crop&q=60",
    tags: ["vegetarian"],
    notes: "Can be made vegan without egg; great as a side or base.",
    spice_level: 0,
    calories: 480,
    allergens: ["soy", "sesame", "eggs"],
    dietary: ["vegetarian"],
  },
  {
    id: "shrimp_fried_rice",
    name: "Shrimp Fried Rice",
    description:
      "Wok-tossed jasmine rice with tender shrimp, egg, snap peas, and carrots, seasoned with oyster sauce and a drizzle of sesame oil.",
    price: 14.0,
    category: "rice",
    image_url:
      "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=800&auto=format&fit=crop&q=60",
    tags: ["popular"],
    notes: "Contains shellfish and egg; oyster sauce contains gluten.",
    spice_level: 0,
    calories: 540,
    allergens: ["shellfish", "soy", "sesame", "eggs", "gluten"],
    dietary: [],
  },

  // ── Main Course ───────────────────────────────────────────────────────────────
  {
    id: "general_tsos_chicken",
    name: "General Tso's Chicken",
    description:
      "Crispy twice-fried chicken tossed in a glossy sweet-and-spicy sauce of soy, rice vinegar, and dried chilies, garnished with sesame seeds and scallion.",
    price: 18.0,
    category: "main_course",
    image_url:
      "https://images.unsplash.com/photo-1710508774177-7ac2f3492675?w=800&auto=format&fit=crop&q=60",
    tags: ["spicy", "chef's pick"],
    notes: "Medium heat; sauce contains soy (gluten). Served with steamed jasmine rice.",
    spice_level: 2,
    calories: 720,
    allergens: ["soy", "gluten", "sesame", "eggs"],
    dietary: [],
  },
  {
    id: "kung_pao_chicken",
    name: "Kung Pao Chicken",
    description:
      "Classic Sichuan stir-fry of diced chicken, roasted peanuts, and dried chilies in a savory-sweet sauce with a satisfying tongue-tingling heat.",
    price: 17.5,
    category: "main_course",
    image_url:
      "https://images.unsplash.com/photo-1776729851079-686daa8ff9aa?w=800&auto=format&fit=crop&q=60",
    tags: ["spicy", "popular"],
    notes: "Contains peanuts and soy; heat level is medium-high. Served with steamed rice.",
    spice_level: 3,
    calories: 650,
    allergens: ["peanuts", "soy", "sesame"],
    dietary: [],
  },
  {
    id: "chilli_tofu",
    name: "Chilli Tofu",
    description:
      "Silken tofu simmered in a fiery Sichuan doubanjiang and black bean sauce with garlic, ginger, and scallion — a plant-based showstopper.",
    price: 15.0,
    category: "main_course",
    image_url:
      "https://images.unsplash.com/photo-1707967933821-809de732e50f?w=800&auto=format&fit=crop&q=60",
    tags: ["vegan", "spicy", "vegetarian"],
    notes: "Spicy; contains soy. Served with steamed jasmine rice.",
    spice_level: 3,
    calories: 420,
    allergens: ["soy"],
    dietary: ["vegan", "vegetarian"],
  },

  // ── Sides ────────────────────────────────────────────────────────────────────
  {
    id: "house_kimchi",
    name: "House Kimchi",
    description:
      "House-fermented napa cabbage kimchi seasoned with gochugaru, garlic, and ginger — tangy, deeply spicy, and alive with probiotic character.",
    price: 5.0,
    category: "sides",
    image_url:
      "https://plus.unsplash.com/premium_photo-1700947159865-ff672d12903c?w=800&auto=format&fit=crop&q=60",
    tags: ["spicy", "gluten-free"],
    notes: "Contains fish sauce (not vegan); fermented in-house weekly.",
    spice_level: 3,
    calories: 35,
    allergens: ["fish"],
    dietary: ["gluten-free"],
  },
  {
    id: "miso_soup",
    name: "Miso Soup",
    description:
      "Classic white shiro miso broth with pillowy silken tofu, delicate wakame seaweed, and a scattering of fresh scallion.",
    price: 4.5,
    category: "sides",
    image_url:
      "https://images.unsplash.com/photo-1591224876006-be862c0f1d7a?w=800&auto=format&fit=crop&q=60",
    tags: ["vegetarian", "vegan", "gluten-free"],
    notes: "Served hot; dashi is kombu-based (vegan).",
    spice_level: 0,
    calories: 80,
    allergens: ["soy"],
    dietary: ["vegan", "vegetarian", "gluten-free"],
  },
  {
    id: "smashed_cucumber_salad",
    name: "Smashed Cucumber Salad",
    description:
      "Smashed Persian cucumbers dressed in a bright, garlicky rice vinegar and sesame oil vinaigrette with chili flakes and a touch of sugar.",
    price: 7.0,
    category: "sides",
    image_url:
      "https://images.unsplash.com/photo-1652088083542-dae1576b7232?w=800&auto=format&fit=crop&q=60",
    tags: ["vegan", "gluten-free"],
    notes: "Served cold; refreshing and light.",
    spice_level: 1,
    calories: 110,
    allergens: ["sesame"],
    dietary: ["vegan", "gluten-free"],
  },

  // ── Drinks ───────────────────────────────────────────────────────────────────
  {
    id: "matcha_latte",
    name: "Matcha Latte",
    description:
      "Ceremonial-grade Japanese matcha whisked with silky steamed oat milk and a touch of honey — earthy, creamy, and vividly green.",
    price: 6.5,
    category: "drinks",
    image_url:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&auto=format&fit=crop&q=60",
    tags: ["vegetarian"],
    notes: "Oat milk by default; can be made with dairy or almond milk. Served hot or iced.",
    spice_level: 0,
    calories: 180,
    allergens: [],
    dietary: ["vegetarian"],
  },
  {
    id: "taro_bubble_tea",
    name: "Taro Bubble Tea",
    description:
      "Dreamy purple taro milk tea with chewy tapioca pearls, lightly sweetened and poured over ice for a refreshing and indulgent sip.",
    price: 7.0,
    category: "drinks",
    image_url:
      "https://images.unsplash.com/photo-1734770580735-796a00e42cb2?w=800&auto=format&fit=crop&q=60",
    tags: ["vegetarian"],
    notes: "Sweetness and ice level adjustable; tapioca pearls cooked fresh daily.",
    spice_level: 0,
    calories: 250,
    allergens: [],
    dietary: ["vegetarian"],
  },
  {
    id: "yuzu_lemonade",
    name: "Yuzu Lemonade",
    description:
      "House-made sparkling lemonade brightened with floral Japanese yuzu citrus and lightly sweetened with agave — endlessly refreshing.",
    price: 5.5,
    category: "drinks",
    image_url:
      "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=800&auto=format&fit=crop&q=60",
    tags: ["vegan", "gluten-free"],
    notes: "Served over ice with a yuzu zest garnish; naturally caffeine-free.",
    spice_level: 0,
    calories: 110,
    allergens: [],
    dietary: ["vegan", "gluten-free"],
  },
];
