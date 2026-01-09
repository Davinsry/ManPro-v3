"use server";

import { prisma } from "@/lib/prisma";
import { TenantSchema, ExtendSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function bookRoom(roomId: string, data: z.infer<typeof TenantSchema>) {
    // Booking Dulu: Status BOOKED. No Finance.
    // Create Tenant with status BOOKED.

    try {
        await prisma.$transaction(async (tx) => {
            // Update Room
            await tx.room.update({
                where: { id: roomId },
                data: { status: "BOOKED" }
            });

            // Create Tenant
            await tx.tenant.create({
                data: {
                    name: data.name,
                    contact: data.contact,
                    checkInDate: data.checkInDate,
                    checkOutDate: data.checkOutDate,
                    status: "BOOKED",
                    room: { connect: { id: roomId } }
                }
            });
        });
        revalidatePath("/dashboard/rooms");
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to book room" };
    }
}

export async function checkInRoom(roomId: string, data: z.infer<typeof TenantSchema> & { amount: number }) {
    // Check-in Langsung: Status OCCUPIED. Finance Income.
    try {
        await prisma.$transaction(async (tx) => {
            await tx.room.update({
                where: { id: roomId },
                data: { status: "OCCUPIED" }
            });

            await tx.tenant.create({
                data: {
                    name: data.name,
                    contact: data.contact,
                    checkInDate: data.checkInDate,
                    checkOutDate: data.checkOutDate,
                    status: "ACTIVE",
                    room: { connect: { id: roomId } }
                }
            });

            // Finance
            await tx.transaction.create({
                data: {
                    amount: data.amount,
                    type: "INCOME",
                    category: "RENT",
                    description: `Check-in Room (Direct) - ${data.name}`,
                    date: new Date()
                }
            });
        });
        revalidatePath("/dashboard/rooms");
        revalidatePath("/dashboard/finance");
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to check-in" };
    }
}

export async function confirmBooking(roomId: string, tenantId: string, amount: number) {
    // Booked -> Occupied. Finance Income.
    try {
        await prisma.$transaction(async (tx) => {
            await tx.room.update({
                where: { id: roomId },
                data: { status: "OCCUPIED" }
            });

            await tx.tenant.update({
                where: { id: tenantId },
                data: { status: "ACTIVE" }
            });

            // Finance
            await tx.transaction.create({
                data: {
                    amount: amount,
                    type: "INCOME",
                    category: "RENT",
                    description: `Check-in Room (Booking Confirmed)`,
                    date: new Date()
                }
            });
        });
        revalidatePath("/dashboard/rooms");
        revalidatePath("/dashboard/finance");
        return { success: true };
    } catch (e) {
        return { error: "Failed to confirm booking" };
    }
}

export async function cancelBooking(roomId: string, tenantId: string) {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.room.update({
                where: { id: roomId },
                data: { status: "EMPTY" }
            });

            await tx.tenant.delete({
                where: { id: tenantId }
            });
        });
        revalidatePath("/dashboard/rooms");
        return { success: true };
    } catch (e) {
        return { error: "Failed to cancel booking" };
    }
}

export async function checkOutRoom(roomId: string, tenantId: string) {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.room.update({
                where: { id: roomId },
                data: { status: "EMPTY" }
            });

            // Should we delete tenant or keep history? 
            // For now, let's keep them but unlink room? 
            // Or just delete if schema requires unique roomId and room status is EMPTY.
            // Schema: Tenant roomId is unique. Room has relation.
            // If I set Room status EMPTY, tenant still points to it.
            // I should either delete Tenant OR make roomId optional OR move to "HistoryTenant" table.
            // Given "Delete room only if empty", simpler to Delete Tenant record for now (as per "Data Penyewa" might be active only).
            // Actually, keep history is better, but schema constraint: `roomId String @unique`.
            // So one room can have only one tenant.
            // I will Delete the Tenant record for simplicity in this iteration, 
            // OR I can nullify `roomId` if I make it optional in schema.
            // Converting schema to optional roomId is better for history.
            // BUT, current schema has `roomId String @unique`.
            // I will delete the tenant record for now to avoid schema migration issues (simplicity).
            // IF I want to modify schema, I have to run push again.
            // Let's delete for now, assuming "Data Penyewa" means "Active Tenants".

            await tx.tenant.delete({ where: { id: tenantId } });
        });
        revalidatePath("/dashboard/rooms");
        revalidatePath("/dashboard/tenants");
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to checkout" };
    }
}

export async function extendRoom(tenantId: string, newCheckOutDate: Date, amount: number) {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.tenant.update({
                where: { id: tenantId },
                data: { checkOutDate: newCheckOutDate }
            });

            // Finance
            await tx.transaction.create({
                data: {
                    amount: amount,
                    type: "INCOME",
                    category: "RENT",
                    description: `Extend Room`,
                    date: new Date()
                }
            });
        });
        revalidatePath("/dashboard/rooms");
        revalidatePath("/dashboard/finance");
        return { success: true };
    } catch (e) {
        return { error: "Failed to extend room" };
    }
}
