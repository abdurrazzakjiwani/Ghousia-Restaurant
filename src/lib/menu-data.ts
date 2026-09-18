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
  { id: "12", name: "Fried", slug: "fried", display_order: 12, icon: "🐟", created_at: "" },
  { id: "13", name: "Beverages", slug: "beverages", display_order: 13, icon: "🥤", created_at: "" },
];

export const menuItems: MenuItem[] = [
  // Burgers
  { id: "101", category_id: "1", name: "Zinger Burger", description: "Crispy chicken fillet with special sauce", price: 600, image_url: "/images/food/burgers/Zinger Burger.png", is_available: true, is_featured: true, created_at: "" },
  { id: "102", category_id: "1", name: "Chicken Burger", description: "Grilled chicken patty with fresh veggies", price: 550, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "103", category_id: "1", name: "Beef Burger", description: "Juicy beef patty with cheese", price: 650, image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Sandwiches
  { id: "201", category_id: "2", name: "Club Sandwich", description: "Triple-layered with chicken, egg, and veggies", price: 500, image_url: "/images/food/sandwiches/Club Sandwitch.png", is_available: true, is_featured: true, created_at: "" },
  { id: "202", category_id: "2", name: "Chicken Sandwich", description: "Grilled chicken with mayo and lettuce", price: 450, image_url: "https://images.unsplash.com/photo-1539252554453-80ab60e39eb9?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Broast
  { id: "301", category_id: "3", name: "Full Broast", description: "Whole crispy broast with coleslaw", price: 900, image_url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: true, created_at: "" },
  { id: "302", category_id: "3", name: "Half Broast", description: "Half portion crispy broast", price: 550, image_url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "303", category_id: "3", name: "Broast Leg Piece", description: "Crispy broast leg piece", price: 350, image_url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // BBQ
  { id: "401", category_id: "4", name: "Tikka Platter", description: "Mixed BBQ platter with naan", price: 1200, image_url: "/images/food/bbq/Tikka.png", is_available: true, is_featured: true, created_at: "" },
  { id: "402", category_id: "4", name: "Seekh Kebab", description: "Minced meat kebabs on skewers", price: 800, image_url: "/images/food/bbq/Gola Kabab.png", is_available: true, is_featured: false, created_at: "" },
  { id: "403", category_id: "4", name: "Reshmi Kebab", description: "Silky smooth chicken kebabs", price: 850, image_url: "/images/food/bbq/Malai Boti.png", is_available: true, is_featured: false, created_at: "" },
  // Chargha
  { id: "501", category_id: "5", name: "Grill Chargha", description: "Whole grilled chicken with spices", price: 1100, image_url: "/images/food/chargha/Grill Chargha.png", is_available: true, is_featured: true, created_at: "" },
  { id: "502", category_id: "5", name: "Fried Chargha", description: "Deep fried whole chicken", price: 1000, image_url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Karahi
  { id: "601", category_id: "6", name: "Chicken Karahi", description: "Traditional chicken karahi", price: 1400, image_url: "/images/food/karahi/Karahi.png", is_available: true, is_featured: true, created_at: "" },
  { id: "602", category_id: "6", name: "Mutton Karahi", description: "Rich mutton karahi", price: 1800, image_url: "https://images.unsplash.com/photo-1645177628172-a94c1f96b546?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "603", category_id: "6", name: "Paneer Karahi", description: "Vegetarian paneer karahi", price: 1200, image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Handi
  { id: "701", category_id: "7", name: "Chicken Handi", description: "Creamy chicken handi", price: 1300, image_url: "https://images.unsplash.com/photo-1645177628172-a94c1f96b546?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "702", category_id: "7", name: "Mutton Handi", description: "Slow-cooked mutton handi", price: 1700, image_url: "https://images.unsplash.com/photo-1645177628172-a94c1f96b546?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "703", category_id: "7", name: "Keema Handi", description: "Minced meat handi", price: 1200, image_url: "https://images.unsplash.com/photo-1645177628172-a94c1f96b546?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Chinese
  { id: "801", category_id: "8", name: "Fried Rice", description: "Chicken fried rice", price: 650, image_url: "/images/food/chinese/Fried Rice.png", is_available: true, is_featured: true, created_at: "" },
  { id: "802", category_id: "8", name: "Manchurian", description: "Chicken manchurian", price: 750, image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "803", category_id: "8", name: "Chili Chicken", description: "Spicy chili chicken", price: 800, image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "804", category_id: "8", name: "Noodles", description: "Chicken noodles", price: 600, image_url: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Rolls
  { id: "901", category_id: "9", name: "Chicken Roll", description: "Chicken paratha roll", price: 350, image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "902", category_id: "9", name: "Seekh Kebab Roll", description: "Seekh kebab paratha roll", price: 400, image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "903", category_id: "9", name: "Paratha Roll", description: "Plain paratha roll", price: 300, image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Pasta
  { id: "1001", category_id: "10", name: "Chicken Pasta", description: "Creamy chicken pasta", price: 700, image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1002", category_id: "10", name: "White Sauce Pasta", description: "White sauce pasta with chicken", price: 650, image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Extras
  { id: "1101", category_id: "11", name: "French Fries", description: "Crispy french fries", price: 300, image_url: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1102", category_id: "11", name: "Naan", description: "Fresh tandoori naan", price: 60, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1103", category_id: "11", name: "Raita", description: "Yogurt raita", price: 80, image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1104", category_id: "11", name: "Salad", description: "Fresh green salad", price: 100, image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Fried
  { id: "1201", category_id: "12", name: "Fish Fry", description: "Crispy fried fish", price: 800, image_url: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1202", category_id: "12", name: "Prawn Fry", description: "Crispy fried prawns", price: 900, image_url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  // Beverages
  { id: "1301", category_id: "13", name: "Coke", description: "Cold drink", price: 80, image_url: "https://images.unsplash.com/photo-1629203851122-3710db9575d8?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1302", category_id: "13", name: "Sprite", description: "Lemon drink", price: 80, image_url: "https://images.unsplash.com/photo-1629203851122-3710db9575d8?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1303", category_id: "13", name: "Water", description: "Mineral water", price: 50, image_url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
  { id: "1304", category_id: "13", name: "Lassi", description: "Traditional yogurt drink", price: 150, image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop&auto=format&q=80", is_available: true, is_featured: false, created_at: "" },
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
