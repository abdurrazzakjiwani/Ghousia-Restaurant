export interface Branch {
  name: string;
  address: string;
  image: string;
  mapQuery: string;
}

export interface FamilyHall {
  name: string;
  image: string;
}

export const branches: Branch[] = [
  {
    name: "Ghousia Golden Spoon",
    address: "Hussainabad, Opp. Masjid Hall, Block-3 FB Area, Karachi",
    image: "/images/branches/golden-spoon.png",
    mapQuery: "Ghousia Golden Spoon Hussainabad Karachi",
  },
  {
    name: "Ghousia Silver Spoon",
    address: "914/3 Hussainabad, Karachi",
    image: "/images/branches/silver-spoon.jpg",
    mapQuery: "Ghousia Silver Spoon Hussainabad Karachi",
  },
  {
    name: "Ghousia Fast Food & Chinese",
    address: "914/3, Opposite Silver Spoon, Hussainabad, Karachi",
    image: "/images/branches/fast-food-chinese.jpg",
    mapQuery: "Ghousia Fast Food Chinese Hussainabad Karachi",
  },
];

export const familyHalls: FamilyHall[] = [
  {
    name: "Family Hall 1",
    image: "/images/branches/family-hall-1.jpg",
  },
  {
    name: "Family Hall 2",
    image: "/images/branches/family-hall-2.jpg",
  },
];

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
