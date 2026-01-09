import { z } from "zod";

export const RoomSchema = z.object({
    number: z.string().min(1, "Room number is required"),
    priceMonthly: z.coerce.number().min(0),
    priceWeekly: z.coerce.number().min(0),
    priceDaily: z.coerce.number().min(0),
});

export const TenantSchema = z.object({
    name: z.string().min(1, "Name is required"),
    contact: z.string().min(1, "Contact is required"),
    checkInDate: z.date(),
    checkOutDate: z.date(),
    paymentMethod: z.enum(["CASH", "TRANSFER", "QRIS"]),
});

export const ExtendSchema = z.object({
    checkOutDate: z.date(),
    amount: z.coerce.number().min(0),
});

export type RoomFormValues = z.infer<typeof RoomSchema>;
export type TenantFormValues = z.infer<typeof TenantSchema>;
