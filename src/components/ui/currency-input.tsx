"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { formatRupiah, parseRupiah } from "@/lib/format";

interface CurrencyInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

/**
 * Input that auto-formats numbers with Indonesian thousand separators
 * Displays: 1.500.000
 * Stores: "1500000"
 */
export function CurrencyInput({ value, onChange, placeholder, className }: CurrencyInputProps) {
    const [displayValue, setDisplayValue] = useState("");

    // Sync display value when external value changes
    useEffect(() => {
        if (value) {
            const num = parseFloat(value);
            if (!isNaN(num)) {
                setDisplayValue(formatRupiah(num));
            }
        } else {
            setDisplayValue("");
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        // Remove all non-digit characters except dots (which we'll also remove)
        const digits = raw.replace(/[^\d]/g, "");

        // Update the actual value (raw number string)
        onChange(digits);

        // Format for display
        if (digits) {
            const num = parseFloat(digits);
            if (!isNaN(num)) {
                setDisplayValue(formatRupiah(num));
            }
        } else {
            setDisplayValue("");
        }
    };

    return (
        <Input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder || "0"}
            className={className}
        />
    );
}
