export interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  seed: string;
}

const firstNames = [
  "Ahmed", "Fatima", "Usman", "Ayesha", "Ali", "Sara", "Hassan", "Zainab",
  "Bilal", "Maria", "Omar", "Hira", "Khalid", "Nadia", "Tariq", "Amna",
  "Faisal", "Sana", "Imran", "Rabia", "Asif", "Mehreen", "Naeem", "Bushra",
  "Shahid", "Farah", "Jamal", "Rubab", "Daniyal", "Iqra", "Rizwan", "Tooba",
  "Farhan", "Maham", "Saad", "Aleeza", "Hamza", "Laiba", "Danish", "Sobia",
  "Rashid", "Simra", "Yasir", "Arfa", "Waqar", "Dania", "Sameer", "Kinza",
  "Taimoor", "Malaika", "Burhan", "Ayesha", "Subhan", "Hania", "Kamran", "Zoya",
  "Shoaib", "Rida", "Adil", "Noor", "Waleed", "Mahnoor", "Faizan", "Eshaal",
  "Haris", "Amber", "Shehryar", "Isha", "Bilal", "Zunaira", "Mansoor", "Sumbal",
  "Aftab", "Fizza", "Rauf", "Tasneem", "Noman", "Maheen", "Azhar", "Rimsha",
  "Zubair", "Alina", "Irfan", "Fatima", "Sultan", "Mishal", "Javed", "Aqsa",
  "Kamal", "Maira", "Saleem", "Parisa", "Ashraf", "Gul", "Muneer", "Tania",
  "Rashid", "Anam", "Ijaz", "Saima",
];

const lastNames = [
  "Khan", "Malik", "Ali", "Ahmed", "Hussain", "Shaikh", "Butt", "Chaudhry",
  "Raza", "Javed", "Siddiqui", "Ansari", "Qureshi", "Farooqi", "Niazi", "Bhatti",
  "Gillani", "Durrani", "Khawaja", "Naqvi", "Abbas", "Raza", "Memon", "Awan",
  "Tirmizi", "Yousufzai", "Bangash", "Orakzai", "Mandokhail", "Kakar", "Rind", "Leghari",
  "Shar", "Junejo", "Talpur", "Panhwar", "Mahesar", "Buriro", "Khowaja", "Ghaffar",
  "Bhutto", "Zardari", "Mastoi", "Chachar", "Jamali", "Khattak", "Marwat", "Mohib",
  "Yusufzai", "Swati", "Shinwari", "Tareen", "Hotaki", "Noorzai", "Achakzai", "Barbzoi",
];

const comments = [
  "Best karahi in Federal B Area! The chicken karahi is always perfectly spiced and fresh.",
  "Love the BBQ platter! The seekh kebabs are melt-in-your-mouth delicious. Highly recommended.",
  "Great zinger burgers and fast delivery. The staff is very friendly and professional.",
  "The tikka platter is absolutely amazing. Every piece is perfectly grilled and flavorful.",
  "Ordered the full broast for a family dinner. Everyone loved it! Crispy outside, juicy inside.",
  "Their chicken karahi is the best I've had in Karachi. Rich, creamy, and full of flavor.",
  "The fried rice and manchurian combo is perfect for Chinese food cravings. Great portion size.",
  "Amazing food quality at very reasonable prices. The grill chargha is a must-try!",
  "Been ordering from here for months. Consistent quality every single time. Love it!",
  "The seekh kebabs are absolutely phenomenal. Best I've had anywhere in the city.",
  "Perfect late-night food spot. The flavors are authentic and the portions are generous.",
  "The club sandwich is my go-to lunch order. Fresh ingredients and great taste.",
  "Tried the mutton karahi for the first time. Incredibly tender and well-cooked.",
  "Fast delivery and the food arrived hot. The zinger burger was crispy and delicious.",
  "The BBQ platter for two is perfect for date night. Great variety and excellent taste.",
  "Their naan is always fresh and soft. Pairs perfectly with any curry dish.",
  "The pasta is surprisingly good for a Pakistani restaurant. Creamy and flavorful.",
  "Love the family atmosphere. Great place to bring the whole family for dinner.",
  "The chicken handi is so creamy and rich. One of the best comfort foods ever.",
  "Quick service and the food quality is consistently excellent. Highly recommend!",
  "The roll paratha is my favorite quick snack. Fresh and tasty every time.",
  "Excellent fish fry! Crispy coating with perfectly cooked fish inside.",
  "The lassi is refreshing and pairs perfectly with spicy karahi dishes.",
  "Best restaurant in Hussainabad area. No competition when it comes to taste.",
  "The chargha is always perfectly spiced. A true delight for spice lovers.",
  "Love how they maintain hygiene standards. Clean restaurant and professional staff.",
  "The beef burger is juicy and flavorful. Great value for money.",
  "Ordered the mutton handi for a special occasion. It was the highlight of the dinner.",
  "Their french fries are always crispy and perfectly seasoned. Great side dish.",
  "The salad is always fresh. Nice to have healthy options alongside the main dishes.",
  "Amazing chicken noodles! Authentic Chinese flavors with a Pakistani twist.",
  "The prawn fry is excellent. Crispy and full of flavor. A must-try seafood option.",
  "Been a loyal customer for 3 years. Never disappointed with the quality.",
  "The paratha roll is the perfect quick meal. Filling and delicious.",
  "Love the variety in their menu. Something for everyone in the family.",
  "The white sauce pasta is creamy and delicious. Great for pasta lovers.",
  "Reserve a table for family gatherings. The ambiance is warm and welcoming.",
  "The raita is fresh and complements the spicy dishes perfectly.",
  "Best place for late-night food cravings. Open till 2 AM with fresh food!",
  "The keema handi is a hidden gem on the menu. Must try for minced meat lovers.",
  "Delivery is always on time. Food arrives hot and fresh every single time.",
  "The chicken sandwich is my everyday lunch. Fresh bread, quality chicken, perfect mayo.",
  "Their water and beverages are always chilled. Small details that matter.",
  "The paneer karahi is perfect for vegetarians. Full of flavor and well-seasoned.",
  "Great restaurant for dawat and family events. The food is always a hit!",
  "Love the generous portions. You definitely get value for your money here.",
  "The malai boti is incredibly tender and flavorful. A true BBQ delight.",
  "Tried the chili chicken — perfectly spicy with a great balance of flavors.",
  "The food reminds me of homemade cooking. Authentic Pakistani flavors at their best.",
  "Their combo deals are very economical. Perfect for students and budget-conscious diners.",
  "The spring rolls are crispy and the filling is always generous. Great appetizer.",
  "Excellent customer service. The staff always greets with a smile.",
  "The chicken biryani is aromatic and full of flavor. One of the best in the area.",
  "Love the outdoor seating area. Perfect for pleasant weather evenings.",
  "The seekh kebab roll is my road trip essential. Delicious and filling.",
  "Fresh ingredients really make a difference. You can taste the quality in every bite.",
  "The sweet and sour chicken is tangy and perfectly balanced. Great Chinese option.",
  "Celebrated my birthday here. The special dinner arrangement was fantastic!",
  "The beef chapli kebab is amazing. Crispy on the outside, juicy inside.",
  "Their chana chaat is the perfect light meal for summer afternoons.",
  "The chicken biryani portions are generous. One plate is enough for a full meal.",
  "Love the clean and hygienic kitchen. You can see the food being prepared.",
  "The paratha with dal is the ultimate desi breakfast. Simple and satisfying.",
  "The mutton chops are perfectly cooked. Tender and full of smoky flavor.",
  "Great place for office lunch orders. They handle bulk orders efficiently.",
  "The fish tikka is unique and delicious. A rare find in Pakistani restaurants.",
  "The butter chicken is rich and creamy. Perfect for those who love mild flavors.",
  "Their delivery packaging keeps the food fresh and hot. Impressive service.",
  "The egg paratha is my comfort food. Simple, fresh, and satisfying.",
  "Love the variety of chutneys they serve. Each one is uniquely delicious.",
  "The chicken wings are crispy and the sauce options are fantastic.",
  "The mutton pulao is aromatic and the meat is incredibly tender.",
  "Great value lunch deals. Perfect for a quick and satisfying meal.",
  "The cheese naan is a game changer. Gooey cheese inside fresh naan bread.",
  "The beef nihari is slow-cooked perfection. Rich, flavorful, and authentic.",
  "Ordered for a party of 20. Everyone was impressed with the food quality.",
  "The samosas are crispy and the filling is perfectly spiced. Great tea-time snack.",
  "The chicken tikka pizza fusion is creative and delicious. Unique menu items!",
  "Love how they accommodate special dietary requests. Very customer-friendly.",
  "The mutton seekh kebab platter is perfect for sharing. Great for groups.",
  "The daal makhani is creamy and well-seasoned. Comfort food at its finest.",
  "The food quality has been consistently excellent over the past 2 years.",
  "The fried chicken is perfectly seasoned with a crispy coating. Finger-licking good!",
  "The BBQ ribs are smoky and tender. A must-try for meat lovers.",
  "The mint margarita is refreshing and the perfect complement to spicy food.",
  "The vegetable spring rolls are a great vegetarian option. Crispy and flavorful.",
  "Love the late-night menu. Perfect for those midnight cravings.",
  "The chicken tikka masala is rich and well-spiced. Authentic Mughlai flavors.",
  "The food presentation is beautiful. Each dish looks as good as it tastes.",
  "The malai boti platter is perfect for two. Generous portions and great taste.",
  "The chana masala is flavorful and the chickpeas are perfectly cooked.",
  "The restaurant ambiance is perfect for both casual and formal dining.",
  "The kebab platter is a meat lover's dream. Every variety is excellent.",
  "The garlic naan is freshly made and pairs perfectly with any curry.",
  "The tandoori chicken is perfectly marinated and cooked. Smoky and delicious!",
  "The food delivery app integration makes ordering so convenient.",
  "The chicken shawarma is a great fusion dish. Middle Eastern meets Pakistani!",
  "The mutton korma is rich and aromatic. A true celebration of Pakistani cuisine.",
  "Love the weekend special deals. Great food at even better prices!",
  "The vegetable biryani is flavorful and packed with fresh vegetables.",
  "The food is always consistent. Whatever I order, it's always great!",
];

function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    hash ^= hash >>> 16;
    return (hash >>> 0) / 4294967296;
  };
}

export const testimonials: Testimonial[] = Array.from({ length: 100 }, (_, i) => {
  const rng = seededRandom(`testimonial-${i}`);
  const firstName = firstNames[Math.floor(rng() * firstNames.length)];
  const lastName = lastNames[Math.floor(rng() * lastNames.length)];
  const comment = comments[i % comments.length];
  const rating = rng() > 0.3 ? 5 : 4;

  return {
    name: `${firstName} ${lastName}`,
    rating,
    comment,
    seed: `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i}`,
  };
});

export function buildTestimonialContext(): string {
  const sampled = testimonials.slice(0, 10);
  const lines = ["Customer Reviews (selected):"];
  for (const t of sampled) {
    lines.push(`  - ${t.name} (${t.rating}/5): "${t.comment}"`);
  }
  return lines.join("\n");
}
