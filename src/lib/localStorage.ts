// LocalStorage utilities for delivery address persistence

const DELIVERY_ADDRESS_KEY = "ghousia-delivery-address";

export function getDeliveryAddress(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(DELIVERY_ADDRESS_KEY);
  } catch {
    return null;
  }
}

export function setDeliveryAddress(address: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DELIVERY_ADDRESS_KEY, address);
  } catch {
    // silent fail
  }
}

export function clearDeliveryAddress(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DELIVERY_ADDRESS_KEY);
  } catch {
    // silent fail
  }
}