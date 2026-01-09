/**
 * Format a number to Indonesian Rupiah style (dots as thousand separators)
 * Example: 1500000 -> "1.500.000"
 */
export function formatRupiah(amount: any): string {
    if (amount === undefined || amount === null) return "0";
    // Handle Prisma Decimal objects and other types
    const num = typeof amount === "object" && amount.toNumber
        ? amount.toNumber()
        : typeof amount === "string"
            ? parseFloat(amount)
            : Number(amount);
    if (isNaN(num)) return "0";
    return num.toLocaleString("id-ID");
}

/**
 * Parse a formatted Rupiah string back to a number
 * Example: "1.500.000" -> 1500000
 */
export function parseRupiah(formatted: string): number {
    if (!formatted) return 0;
    // Remove dots (thousand separators) and parse
    const cleaned = formatted.replace(/\./g, "").replace(/,/g, ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
}
