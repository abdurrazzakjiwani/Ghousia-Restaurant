import { categories, menuItems } from "@/lib/menu-data";
import { branches, familyHalls } from "@/lib/branches-data";
import { testimonials } from "@/lib/testimonials-data";

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

export function buildBranchContext(): string {
  const lines: string[] = ["Our Branches:"];
  for (const branch of branches) {
    lines.push(`  - ${branch.name}: ${branch.address}`);
  }
  lines.push("\nFamily Halls:");
  for (const hall of familyHalls) {
    lines.push(`  - ${hall.name}`);
  }
  return lines.join("\n");
}

export function buildAboutContext(): string {
  return `About Ghousia Golden Spoon:
- Ghousia Golden Spoon is a renowned Pakistani restaurant in Karachi, established over a decade ago.
- We specialize in authentic Pakistani cuisine including BBQ, Karahi, Handi, Broast, Chinese, and fast food.
- Our cooking philosophy: traditional recipes with fresh, high-quality ingredients, generous portions, and authentic Pakistani flavors.
- We are committed to hygiene, quality, and customer satisfaction.
- Three branches in Hussainabad area with family halls available for gatherings and events.
- Open daily from 5:30 PM to 2:00 AM — perfect for late-night cravings.
- Delivery available across all areas of Karachi.`;
}

export function buildFAQContext(): string {
  return `Frequently Asked Questions:
Q: What are your opening hours?
A: We are open daily from 5:30 PM to 2:00 AM.

Q: Do you deliver?
A: Yes! We deliver across all areas of Karachi.

Q: What are your phone numbers?
A: 0321-8221010 and 0301-3631555. You can also order via WhatsApp.

Q: Do you have family seating?
A: Yes, we have family halls available at our branches.

Q: Do you accept card payments?
A: Yes, we accept both cash and card payments. COD (Cash on Delivery) is also available.

Q: Do you have vegetarian options?
A: Yes, we have Paneer Karahi, Chinese dishes, and various sides that are vegetarian.

Q: What is your most popular item?
A: Our Chicken Karahi and Tikka Platter are customer favorites. The Zinger Burger is also very popular.

Q: Can I place a bulk or catering order?
A: Yes! Please contact us directly at 0321-8221010 for bulk orders and catering.

Q: Where are your branches located?
A: All branches are in Hussainabad, Federal B Area, Karachi. The main branch is opposite Masjid Hall, Block-3.

Q: Is parking available?
A: Yes, parking is available near all our branches.`;
}

export function buildTestimonialContext(): string {
  const sampled = testimonials.slice(0, 10);
  const lines = ["Customer Reviews (selected):"];
  for (const t of sampled) {
    lines.push(`  - ${t.name} (${t.rating}/5): "${t.comment}"`);
  }
  return lines.join("\n");
}

export function buildWebsiteContext(): string {
  return [
    buildAboutContext(),
    "",
    buildBranchContext(),
    "",
    buildMenuContext(),
    "",
    buildFAQContext(),
    "",
    buildTestimonialContext(),
  ].join("\n");
}
