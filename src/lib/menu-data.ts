import { Category, MenuItem } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Burgers", slug: "burgers", display_order: 1, icon: "🍔", created_at: "" },
  { id: "2", name: "Sandwiches", slug: "sandwiches", display_order: 2, icon: "🥪", created_at: "" },
  { id: "3", name: "Broast", slug: "broast", display_order: 3, icon: "🍗", created_at: "" },
  { id: "4", name: "BBQ", slug: "bbq", display_order: 4, icon: "🔥", created_at: "" },
  { id: "5", name: "Chargha", slug: "chargha", display_order: 5, icon: "🍗", created_at: "" },
  { id: "6", name: "Karahi", slug: "karahi", display_order: 6, icon: "🍲", created_at: "" },
  { id: "7", name: "Handi", slug: "handi", display_order: 7, icon: "🥘", created_at: "" },
  { id: "8", name: "Chinese", slug: "chinese", display_order: 8, icon: "🥡", created_at: "" },
  { id: "9", name: "Rolls", slug: "rolls", display_order: 9, icon: "🌯", created_at: "" },
  { id: "10", name: "Pasta", slug: "pasta", display_order: 10, icon: "🍝", created_at: "" },
  { id: "11", name: "Extras", slug: "extras", display_order: 11, icon: "🍟", created_at: "" },
  { id: "12", name: "Paratha & Breads", slug: "paratha-breads", display_order: 12, icon: "🫓", created_at: "" },
  { id: "13", name: "Desserts", slug: "desserts", display_order: 13, icon: "🍮", created_at: "" },
];

export const menuItems: MenuItem[] = [
  // Burgers (5)
  { id: "101", category_id: "1", name: "Zinger Burger", description: "Crispy chicken fillet with special sauce", price: 600, image_url: "/images/food/burgers/Zinger Burger.png", is_available: true, is_featured: true, created_at: "" },
  { id: "102", category_id: "1", name: "Chicken Burger", description: "Grilled chicken patty with fresh veggies", price: 550, image_url: "/images/food/burgers/Chicken Burger.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "103", category_id: "1", name: "Beef Burger", description: "Juicy beef patty with lettuce and tomato", price: 650, image_url: "/images/food/burgers/Beef Burger.avif", is_available: true, is_featured: false, created_at: "" },
  { id: "104", category_id: "1", name: "Beef Cheese Burger", description: "Beef patty with melted cheese slice", price: 700, image_url: "/images/food/burgers/Beef Cheese Burger.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "105", category_id: "1", name: "Grilled Chicken Burger", description: "Grilled chicken breast with herbs", price: 600, image_url: "/images/food/burgers/Grilled Chicken Burger.jpg", is_available: true, is_featured: false, created_at: "" },

  // Sandwiches (11)
  { id: "201", category_id: "2", name: "Club Sandwich", description: "Triple-layered with chicken, egg, and veggies", price: 500, image_url: "/images/food/sandwiches/Club Sandwitch.png", is_available: true, is_featured: true, created_at: "" },
  { id: "202", category_id: "2", name: "Crispy Club Sandwich", description: "Crispy chicken fillet club sandwich", price: 550, image_url: "/images/food/sandwiches/Crispy Club Sandwitch.png", is_available: true, is_featured: false, created_at: "" },
  { id: "203", category_id: "2", name: "Chicken Sandwich", description: "Grilled chicken with mayo and lettuce", price: 450, image_url: "/images/food/sandwiches/Chicken Sandwitch.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "204", category_id: "2", name: "Chicken Cheese Sandwich", description: "Chicken with melted cheese", price: 500, image_url: "/images/food/sandwiches/Chicken Cheese Sandwitch.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "205", category_id: "2", name: "BBQ Grilled Sandwich", description: "BBQ grilled chicken sandwich", price: 550, image_url: "/images/food/sandwiches/BBQ Grilled Sandwitch.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "206", category_id: "2", name: "BBQ Sandwich", description: "BBQ chicken sandwich", price: 500, image_url: "/images/food/sandwiches/BBQ Sandwitch.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "207", category_id: "2", name: "BBQ Cheese Sandwich", description: "BBQ chicken with cheese", price: 550, image_url: "/images/food/sandwiches/BBQ Cheese Sandwitch.webp", is_available: true, is_featured: false, created_at: "" },
  { id: "208", category_id: "2", name: "Grilled Chicken Sandwich", description: "Grilled chicken breast sandwich", price: 500, image_url: "/images/food/sandwiches/Grilled Chicken Sandwitch.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "209", category_id: "2", name: "Malai Club Sandwich", description: "Creamy malai chicken club sandwich", price: 500, image_url: "/images/food/sandwiches/Malai Club Sandwitch.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "210", category_id: "2", name: "Malai Club Cheese Sandwich", description: "Malai chicken club with cheese", price: 550, image_url: "/images/food/sandwiches/Malai Club Cheese Sandwitch.jpg", is_available: true, is_featured: false, created_at: "" },
  { id: "211", category_id: "2", name: "Club Cheese Sandwich", description: "Club sandwich with extra cheese", price: 520, image_url: "/images/food/sandwiches/Club Cheese Sandwitch.avif", is_available: true, is_featured: false, created_at: "" },

  // Broast (4)
  { id: "301", category_id: "3", name: "Fried Chicken Breast Broast", description: "Crispy fried chicken breast piece", price: 900, image_url: "/images/food/broast/Fried chicken breast broast.jpg", is_available: true, is_featured: true, created_at: "" },
  { id: "302", category_id: "3", name: "Chatpata Masala Broast", description: "Spiced masala broast chicken", price: 950, image_url: "/images/food/broast/Chatpata Masala Broast.webp", is_available: true, is_featured: false, created_at: "" },
  { id: "303", category_id: "3", name: "Dynamite Chicken Broast", description: "Fiery dynamite flavored broast", price: 1000, image_url: "/images/food/broast/Dynamite Chicken Broast.webp", is_available: true, is_featured: false, created_at: "" },
  { id: "304", category_id: "3", name: "Fried Chicken Leg Broast", description: "Crispy fried chicken leg piece", price: 550, image_url: "/images/food/broast/Fried Chicken Leg Broast.webp", is_available: true, is_featured: false, created_at: "" },

  // BBQ (16)
  { id: "401", category_id: "4", name: "BBQ Platter", description: "Mixed BBQ platter with naan", price: 1500, image_url: "/images/food/bbq/BBQ Platter.png", is_available: true, is_featured: true, created_at: "" },
  { id: "402", category_id: "4", name: "BBQ Sauce", description: "House-made BBQ dipping sauce", price: 100, image_url: "/images/food/bbq/BBQ Sauce.png", is_available: true, is_featured: false, created_at: "" },
  { id: "403", category_id: "4", name: "Beef Bihari Boti", description: "Tender beef boti with Bihari spices", price: 1200, image_url: "/images/food/bbq/Beef Bihari Boti.png", is_available: true, is_featured: false, created_at: "" },
  { id: "404", category_id: "4", name: "Beef Dhaga Kabab", description: "Thread-wrapped beef kabab", price: 1100, image_url: "/images/food/bbq/Beef Dhaga Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "405", category_id: "4", name: "Beef Gola Kabab", description: "Round-shaped beef kabab", price: 1000, image_url: "/images/food/bbq/Beef Gola Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "406", category_id: "4", name: "Beef Seekh Kabab", description: "Minced beef seekh kabab", price: 1000, image_url: "/images/food/bbq/Beef Seekh Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "407", category_id: "4", name: "Chandan Gola Kabab", description: "Sandalwood-scented gola kabab", price: 900, image_url: "/images/food/bbq/Chandan Gola Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "408", category_id: "4", name: "Chicken Bihari Tikka Chest", description: "Bihari-style chicken tikka chest", price: 1100, image_url: "/images/food/bbq/Chicken Bihari Tikka Chest.png", is_available: true, is_featured: false, created_at: "" },
  { id: "409", category_id: "4", name: "Chicken Chandan Kabab", description: "Sandalwood-scented chicken kabab", price: 900, image_url: "/images/food/bbq/Chicken Chandan Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "410", category_id: "4", name: "Chicken Green Malai Boti", description: "Green herb marinated malai boti", price: 1000, image_url: "/images/food/bbq/Chicken Green Malai Boti.png", is_available: true, is_featured: false, created_at: "" },
  { id: "411", category_id: "4", name: "Chicken Malai Boti", description: "Creamy malai chicken boti", price: 1000, image_url: "/images/food/bbq/Chicken Malai Boti.png", is_available: true, is_featured: false, created_at: "" },
  { id: "412", category_id: "4", name: "Chicken Reshmi Gola Kabab", description: "Silky reshmi gola kabab", price: 900, image_url: "/images/food/bbq/Chicken Reshmi Gola Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "413", category_id: "4", name: "Chicken Reshmi Kabab", description: "Silky smooth chicken kabab", price: 900, image_url: "/images/food/bbq/Chicken Reshmi Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "414", category_id: "4", name: "Sizzling Malai Boti", description: "Hot sizzling malai boti platter", price: 1200, image_url: "/images/food/bbq/Sizzling Malai Boti.png", is_available: true, is_featured: false, created_at: "" },
  { id: "415", category_id: "4", name: "Sizzling Tikka", description: "Hot sizzling chicken tikka", price: 1200, image_url: "/images/food/bbq/Sizzling Tikka.png", is_available: true, is_featured: false, created_at: "" },
  { id: "416", category_id: "4", name: "Spicy Chicken Boti", description: "Spicy marinated chicken boti", price: 900, image_url: "/images/food/bbq/Spicy Cicken Boti.png", is_available: true, is_featured: false, created_at: "" },

  // Chargha (1)
  { id: "501", category_id: "5", name: "Grill Chargha", description: "Whole grilled chicken with spices", price: 1100, image_url: "/images/food/chargha/Grill Chargha.png", is_available: true, is_featured: true, created_at: "" },

  // Karahi (6)
  { id: "601", category_id: "6", name: "Boneless Chicken Red Karahi", description: "Boneless chicken in red tomato karahi", price: 1600, image_url: "/images/food/karahi/Boneless Chicken Red Karahi.png", is_available: true, is_featured: true, created_at: "" },
  { id: "602", category_id: "6", name: "Boneless Chicken White Karahi", description: "Boneless chicken in creamy white karahi", price: 1600, image_url: "/images/food/karahi/Boneless Chicken White Karahi.png", is_available: true, is_featured: false, created_at: "" },
  { id: "603", category_id: "6", name: "Chicken Green Karahi", description: "Chicken karahi with green herbs", price: 1400, image_url: "/images/food/karahi/Chicken Green Karahi.png", is_available: true, is_featured: false, created_at: "" },
  { id: "604", category_id: "6", name: "Chicken Red Karahi", description: "Traditional chicken red karahi", price: 1400, image_url: "/images/food/karahi/Chicken Red Karahi.png", is_available: true, is_featured: false, created_at: "" },
  { id: "605", category_id: "6", name: "Chicken White Karahi", description: "Creamy white chicken karahi", price: 1400, image_url: "/images/food/karahi/Chicken White Karahi.png", is_available: true, is_featured: false, created_at: "" },
  { id: "606", category_id: "6", name: "Shahi Chicken Karahi", description: "Royal shahi chicken karahi", price: 1800, image_url: "/images/food/karahi/Shahi Chicken Karahi.png", is_available: true, is_featured: false, created_at: "" },

  // Handi (3)
  { id: "701", category_id: "7", name: "Boneless Chicken Creamy Handi", description: "Creamy boneless chicken handi", price: 1500, image_url: "/images/food/handi/Boneless Chicken Creamy Handi.png", is_available: true, is_featured: true, created_at: "" },
  { id: "702", category_id: "7", name: "Boneless Chicken Handi", description: "Classic boneless chicken handi", price: 1300, image_url: "/images/food/handi/Boneless Chicken Handi.png", is_available: true, is_featured: false, created_at: "" },
  { id: "703", category_id: "7", name: "Boneless Chicken Kashmiri Handi", description: "Kashmiri-style boneless chicken handi", price: 1600, image_url: "/images/food/handi/Boneless Chicken Kashmiri Handi.png", is_available: true, is_featured: false, created_at: "" },

  // Chinese (11)
  { id: "801", category_id: "8", name: "Chicken Chilli with Rice", description: "Spicy chicken chilli with steamed rice", price: 800, image_url: "/images/food/chinese/Chicken Chilli with rice.png", is_available: true, is_featured: true, created_at: "" },
  { id: "802", category_id: "8", name: "Chicken Dry Chilli with Rice", description: "Dry chicken chilli with rice", price: 800, image_url: "/images/food/chinese/Chicken Dry Chilli with rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "803", category_id: "8", name: "Chicken Fried Rice", description: "Classic chicken fried rice", price: 650, image_url: "/images/food/chinese/Chicken Fried Rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "804", category_id: "8", name: "Chicken Ginger with Rice", description: "Ginger chicken with steamed rice", price: 750, image_url: "/images/food/chinese/Chicken Ginger with rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "805", category_id: "8", name: "Chicken Jalfrezi with Rice", description: "Jalfrezi chicken with rice", price: 800, image_url: "/images/food/chinese/Chicken Jalfrezi with rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "806", category_id: "8", name: "Chicken Manchurian with Rice", description: "Sweet and sour chicken manchurian", price: 750, image_url: "/images/food/chinese/Chicken Manchurian with Rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "807", category_id: "8", name: "Chicken Sauce with Rice", description: "Chicken in savory sauce with rice", price: 700, image_url: "/images/food/chinese/Chicken Sauce with rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "808", category_id: "8", name: "Chicken Shashlik with Rice", description: "Shashlik chicken with rice", price: 850, image_url: "/images/food/chinese/Chicken Shashlik with rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "809", category_id: "8", name: "Garlic Chicken with Rice", description: "Garlic flavored chicken with rice", price: 800, image_url: "/images/food/chinese/Garlic Chicken with Rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "810", category_id: "8", name: "Singaporean Chicken with Rice", description: "Singaporean-style chicken with rice", price: 850, image_url: "/images/food/chinese/Singaporean Chicken with rice.png", is_available: true, is_featured: false, created_at: "" },
  { id: "811", category_id: "8", name: "Vegetable Fried Rice", description: "Mixed vegetable fried rice", price: 600, image_url: "/images/food/chinese/Vegetable Fried Rice.png", is_available: true, is_featured: false, created_at: "" },

  // Rolls (19)
  { id: "901", category_id: "9", name: "Beef Boti Chutney Roll", description: "Beef boti with chutney in paratha roll", price: 450, image_url: "/images/food/rolls/Beef boti chutney roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "902", category_id: "9", name: "Beef Boti Mayo Garlic Roll", description: "Beef boti with mayo garlic sauce roll", price: 480, image_url: "/images/food/rolls/Beef boti mayo garlic Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "903", category_id: "9", name: "Beef Kabab Chutney Roll", description: "Beef kabab with chutney roll", price: 420, image_url: "/images/food/rolls/Beef kabab chutney Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "904", category_id: "9", name: "Beef Kabab Mayo Garlic Roll", description: "Beef kabab with mayo garlic roll", price: 450, image_url: "/images/food/rolls/Beef kabab mayo garlic Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "905", category_id: "9", name: "Chicken Cheese Roll", description: "Chicken with cheese in paratha roll", price: 400, image_url: "/images/food/rolls/Chicken cheese roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "906", category_id: "9", name: "Chicken Malai Boti Roll", description: "Creamy malai chicken boti roll", price: 450, image_url: "/images/food/rolls/Chicken Malai boti roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "907", category_id: "9", name: "Chicken Mayo Garlic Roll", description: "Chicken with mayo garlic sauce roll", price: 400, image_url: "/images/food/rolls/Chicken Mayo Garlic Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "908", category_id: "9", name: "Chicken Reshmi Kabab Garlic Mayo Roll", description: "Reshmi kabab with garlic mayo roll", price: 420, image_url: "/images/food/rolls/Chicken Reshmi Kabab Garlic Mayo Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "909", category_id: "9", name: "Chicken Reshmi Kabab Roll", description: "Reshmi kabab paratha roll", price: 400, image_url: "/images/food/rolls/Chicken Reshmi kabab Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "910", category_id: "9", name: "Jumbo Beef Boti Roll", description: "Jumbo beef boti paratha roll", price: 550, image_url: "/images/food/rolls/Jumbo Beef boti Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "911", category_id: "9", name: "Jumbo Beef Kabab Mayo Roll", description: "Jumbo beef kabab with mayo roll", price: 520, image_url: "/images/food/rolls/Jumbo Beef kabab mayo Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "912", category_id: "9", name: "Jumbo Beef Kabab Roll", description: "Jumbo beef kabab paratha roll", price: 500, image_url: "/images/food/rolls/Jumbo Beef kabab Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "913", category_id: "9", name: "Jumbo Beef Mayo Roll", description: "Jumbo beef with mayo roll", price: 520, image_url: "/images/food/rolls/Jumbo Beef mayo Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "914", category_id: "9", name: "Jumbo Chicken Chutney Roll", description: "Jumbo chicken with chutney roll", price: 500, image_url: "/images/food/rolls/Jumbo chicken chutney Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "915", category_id: "9", name: "Jumbo Chicken Mayo Roll", description: "Jumbo chicken with mayo roll", price: 500, image_url: "/images/food/rolls/Jumbo chicken mayo Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "916", category_id: "9", name: "Jumbo Chicken Reshmi Kabab Mayo Roll", description: "Jumbo reshmi kabab with mayo roll", price: 520, image_url: "/images/food/rolls/Jumbo chicken reshmi kabab mayo Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "917", category_id: "9", name: "Jumbo Chicken Reshmi Kabab Roll", description: "Jumbo reshmi kabab paratha roll", price: 500, image_url: "/images/food/rolls/Jumbo chicken reshmi kabab Roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "918", category_id: "9", name: "Spicy Chicken Chutney Roll", description: "Spicy chicken with chutney roll", price: 420, image_url: "/images/food/rolls/Spicy Chicken Chutney roll.png", is_available: true, is_featured: false, created_at: "" },
  { id: "919", category_id: "9", name: "Zinger Roll", description: "Crispy zinger chicken paratha roll", price: 400, image_url: "/images/food/rolls/Zinger roll.png", is_available: true, is_featured: false, created_at: "" },

  // Pasta (2)
  { id: "1001", category_id: "10", name: "Chicken Creamy Pasta", description: "Creamy white sauce chicken pasta", price: 700, image_url: "/images/food/pasta/Chicken creamy pasta.png", is_available: true, is_featured: true, created_at: "" },
  { id: "1002", category_id: "10", name: "Chicken Pasta", description: "Classic chicken pasta", price: 700, image_url: "/images/food/pasta/Chicken Pasta.png", is_available: true, is_featured: false, created_at: "" },

  // Extras (4)
  { id: "1101", category_id: "11", name: "Extra Bun", description: "Additional burger bun", price: 50, image_url: "/images/food/extras/Extra Bun.png", is_available: true, is_featured: false, created_at: "" },
  { id: "1102", category_id: "11", name: "French Fries", description: "Crispy golden french fries", price: 300, image_url: "/images/food/extras/French Fries.png", is_available: true, is_featured: false, created_at: "" },
  { id: "1103", category_id: "11", name: "Raita", description: "Cool yogurt raita", price: 80, image_url: "/images/food/extras/Raita.png", is_available: true, is_featured: false, created_at: "" },
  { id: "1104", category_id: "11", name: "Salad", description: "Fresh green salad", price: 100, image_url: "/images/food/extras/Salad.png", is_available: true, is_featured: false, created_at: "" },

  // Paratha & Breads (2)
  { id: "1201", category_id: "12", name: "Puri Paratha", description: "Crispy layered puri paratha", price: 120, image_url: "/images/food/paratha-breads/Puri Paratha.png", is_available: true, is_featured: true, created_at: "" },
  { id: "1202", category_id: "12", name: "Roghni Kulcha", description: "Soft roghni kulcha bread", price: 100, image_url: "/images/food/paratha-breads/Roghni Kulcha.png", is_available: true, is_featured: false, created_at: "" },

  // Desserts (1)
  { id: "1301", category_id: "13", name: "Halwa", description: "Traditional sweet halwa", price: 150, image_url: "/images/food/desserts/Halwa.png", is_available: true, is_featured: true, created_at: "" },
];

export function getItemsByCategory(categorySlug: string): MenuItem[] {
  const cat = categories.find((c) => c.slug === categorySlug);
  if (!cat) return [];
  return menuItems.filter((item) => item.category_id === cat.id && item.is_available);
}

export function getFeaturedItems(): MenuItem[] {
  return menuItems.filter((item) => item.is_featured && item.is_available);
}

export function searchItems(query: string): MenuItem[] {
  const lower = query.toLowerCase();
  return menuItems.filter(
    (item) =>
      item.is_available &&
      (item.name.toLowerCase().includes(lower) ||
        item.description?.toLowerCase().includes(lower))
  );
}

export function buildMenuContext(): string {
  const lines: string[] = ["Full Menu (all prices in PKR):"];
  for (const cat of categories) {
    const items = menuItems.filter(
      (item) => item.category_id === cat.id && item.is_available
    );
    if (items.length === 0) continue;
    lines.push(`\n${cat.icon} ${cat.name}:`);
    for (const item of items) {
      const desc = item.description ? ` — ${item.description}` : "";
      lines.push(`  - ${item.name} (Rs. ${item.price})${desc}`);
    }
  }
  return lines.join("\n");
}
