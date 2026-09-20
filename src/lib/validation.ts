// Address validation utilities

export function validateAddress(address: string): { valid: boolean; error?: string } {
  const trimmed = address.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Address is required" };
  }
  if (trimmed.length < 3) {
    return { valid: false, error: "Address must be at least 3 characters" };
  }
  return { valid: true };
}