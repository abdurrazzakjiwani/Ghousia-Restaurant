import { MenuItem, OrderIntent, OrderIntentItem } from "@/types";
import { menuItems } from "@/lib/menu-data";

const ORDER_KEYWORDS = [
  "order", "want", "buy", "give", "add", "get", "have", "take",
  "please", "send", "bring", "i need", "i'd like", "i would like",
  "can i get", "can i have", "let me get", "let me have",
];

const CONJUNCTIONS = /\s+(?:and|&|\+|,|\+)\s+|\s+with\s+/i;

const QUANTITY_PATTERN = /^(\d+)\s*[xX×]\s*/;
const QUANTITY_BEFORE_NAME = /^(\d+)\s+/;

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function matchMenuItem(text: string): MenuItem | null {
  const normalized = normalizeText(text);

  for (const item of menuItems) {
    if (!item.is_available) continue;
    const itemName = normalizeText(item.name);
    if (normalized.includes(itemName) || itemName.includes(normalized)) {
      return item;
    }
  }

  for (const item of menuItems) {
    if (!item.is_available) continue;
    const itemName = normalizeText(item.name);
    const words = itemName.split(" ");
    const hasAllWords = words.every((w) => normalized.includes(w));
    if (hasAllWords && words.length >= 2) {
      return item;
    }
  }

  for (const item of menuItems) {
    if (!item.is_available) continue;
    const itemName = normalizeText(item.name);
    const distance = levenshteinDistance(normalized, itemName);
    const maxLen = Math.max(normalized.length, itemName.length);
    if (distance <= Math.floor(maxLen * 0.3) && distance <= 3) {
      return item;
    }
  }

  return null;
}

function extractQuantity(text: string): { quantity: number; remaining: string } {
  let remaining = text.trim();

  let match = remaining.match(QUANTITY_PATTERN);
  if (match) {
    return { quantity: parseInt(match[1], 10), remaining: remaining.slice(match[0].length) };
  }

  match = remaining.match(QUANTITY_BEFORE_NAME);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= 20) {
      return { quantity: num, remaining: remaining.slice(match[0].length) };
    }
  }

  return { quantity: 1, remaining };
}

function hasOrderIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return ORDER_KEYWORDS.some((kw) => lower.includes(kw));
}

export function detectOrderIntent(message: string): OrderIntent {
  const lower = message.toLowerCase();

  if (!hasOrderIntent(lower)) {
    return { items: [], total: 0, is_valid: false, unmatched_text: message };
  }

  const parts = message.split(CONJUNCTIONS);
  const items: OrderIntentItem[] = [];
  const unmatchedParts: string[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const { quantity, remaining } = extractQuantity(trimmed);
    const matchedItem = matchMenuItem(remaining);

    if (matchedItem) {
      items.push({
        menu_item_id: matchedItem.id,
        name: matchedItem.name,
        quantity,
        price: matchedItem.price,
        subtotal: matchedItem.price * quantity,
      });
    } else {
      unmatchedParts.push(trimmed);
    }
  }

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items,
    total,
    is_valid: items.length > 0,
    unmatched_text: unmatchedParts.length > 0 ? unmatchedParts.join(", ") : null,
  };
}
