const ENGLISH_PROFANITY = [
  "fuck", "shit", "ass", "asshole", "bitch", "bastard", "damn", "crap",
  "dick", "piss", "cock", "pussy", "whore", "slut", "retard", "idiot",
  "moron", "stupid", "dumbass", "jackass", "motherfucker", "bullshit",
  "douchebag", "prick", "twat", "wanker", "bollocks", "bugger",
];

const ROMAN_URDU_PROFANITY = [
  "bhenchod", "bhenchod", "madarchod", "madarchod", "gaandu", "gandu",
  "chutiya", "chutia", "kutta", "kutte", "harami", "haramkhor",
  "bewakoof", "bewaqoof", "ludda", "jhatu", "suwar", "kameena",
  "kaminay", "namak Haram", "raand", "randi", "topi baaz",
];

const RESTAURANT_KEYWORDS = [
  "menu", "food", "order", "deliver", "delivery", "restaurant", "branch",
  "branches", "hour", "hours", "open", "closed", "timing", "location",
  "address", "phone", "contact", "price", "prices", "special", "recommend",
  "recommendation", "popular", "best", "bestseller", "combo", "deal", "deals",
  "burger", "sandwich", "broast", "bbq", "chargha", "karahi", "handi",
  "chinese", "roll", "pasta", "fries", "naan", "raita", "salad",
  "beverage", "drink", "coke", "sprite", "water", "lassi", "biryani",
  "tikka", "kebab", "kebab", "seekh", "reshmi", "grill", "fried",
  "chicken", "beef", "mutton", "fish", "prawn", "paneer", "egg",
  "rice", "noodles", "manchurian", "chili", "paratha", "wrap",
  "zinger", "club", "fish fry", "prawn fry", "french fries",
  "samosa", "chaat", "daal", "nihari", "korma", "pulao",
  "sharwarma", "shawarma", "wings", "tender", "fillet",
  "ghousia", "golden spoon", "silver spoon", "hussainabad",
  "karachi", "federal b area", "gulberg", "dining", "family hall",
  "reservation", "table", "visit", "feedback", "review", "reviews",
  "whatsapp", "place order", "cancel", "refund", "tip",
  "vegetarian", "veg", "spicy", "mild", "medium spicy",
  "portion", "serving", "plate", "half", "full", "quarter",
  "snack", "lunch", "dinner", "breakfast", "late night", "late-night",
  "late night food", "midnight", "takeaway", "take out", "takeout",
  "eat", "hungry", "craving", "taste", "flavor", "fresh", "hot",
  "cold", "chilled", "seasoning", "masala", "spice", "herb",
  "appetizer", "starter", "main course", "dessert", "sweet",
  "payment", "cash", "card", "online payment", "cod", "discount",
  "sale", "offer", "promotion", "gift", "voucher", "coupon",
  "catering", "bulk order", "party", "event", "birthday", "celebration",
];

const OFFTOPIC_REFUSALS = [
  "I apologize, but I can only assist with questions about Ghousia Golden Spoon restaurant. Feel free to ask about our menu, branches, or delivery!",
  "I'm here to help with everything related to Ghousia Golden Spoon — our menu, branches, hours, and orders. How can I assist you today?",
  "Sorry, I can only answer questions about Ghousia Golden Spoon restaurant. Would you like to know about our menu or delivery options?",
  "I appreciate your question, but I'm limited to restaurant-related queries. Let me know if you'd like to explore our menu or place an order!",
  "That's outside my area of expertise. I'm designed to help with Ghousia Golden Spoon menu, orders, branches, and delivery. What would you like to know?",
];

const ABUSE_REFUSALS = [
  "I'm sorry, but I can't engage with that type of language. I'm here to help with Ghousia Golden Spoon restaurant questions. How can I assist you?",
  "Please keep the conversation respectful. I'd be happy to help you with our menu, branches, or any restaurant-related question.",
  "I'm not able to respond to that. If you have any questions about Ghousia Golden Spoon, I'm here to help!",
];

let lastOffTopicIndex = -1;

export function isAbusive(message: string): boolean {
  const lower = message.toLowerCase();
  const allProfanity = [...ENGLISH_PROFANITY, ...ROMAN_URDU_PROFANITY];
  for (const word of allProfanity) {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    if (regex.test(lower)) return true;
  }
  return false;
}

export function isRestaurantContext(message: string): boolean {
  const lower = message.toLowerCase();
  return RESTAURANT_KEYWORDS.some((keyword) => lower.includes(keyword));
}

export function getOffTopicRefusal(): string {
  let index: number;
  do {
    index = Math.floor(Math.random() * OFFTOPIC_REFUSALS.length);
  } while (index === lastOffTopicIndex && OFFTOPIC_REFUSALS.length > 1);
  lastOffTopicIndex = index;
  return OFFTOPIC_REFUSALS[index];
}

export function getAbuseRefusal(): string {
  const index = Math.floor(Math.random() * ABUSE_REFUSALS.length);
  return ABUSE_REFUSALS[index];
}

export { OFFTOPIC_REFUSALS, ABUSE_REFUSALS };
