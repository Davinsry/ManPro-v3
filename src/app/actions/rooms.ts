"use server";

import { prisma } from "@/lib/prisma";
import { RoomSchema, RoomFormValues } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function getRooms() {
    return await prisma.room.findMany({
        include: { tenant: true },
        orderBy: { number: "asc" },
    });
}

export async function createRoom(data: RoomFormValues) {
    const result = RoomSchema.safeParse(data);
    if (!result.success) {
        return { error: "Validation failed" };
    }

    try {
        await prisma.room.create({
            data: {
                number: result.data.number,
                priceMonthly: result.data.priceMonthly,
                priceWeekly: result.data.priceWeekly,
                priceDaily: result.data.priceDaily,
                status: "EMPTY",
            },
        });
        revalidatePath("/dashboard/rooms");
        return { success: true };
    } catch (error) {
        return { error: "Failed to create room. Room number might properly exist." };
    }
}

export async function deleteRoom(id: string) {
    try {
        const room = await prisma.room.findUnique({ where: { id } });
        if (!room) return { error: "Room not found" };
        if (room.status !== "EMPTY") return { error: "Cannot delete occupied/booked room" };

        await prisma.room.delete({ where: { id } });
        revalidatePath("/dashboard/rooms");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete room" };
    }
}

export async function updateRoom(id: string, data: RoomFormValues) {
    const result = RoomSchema.safeParse(data);
    if (!result.success) {
        return { error: "Validation failed" };
    }

    try {
        await prisma.room.update({
            where: { id },
            data: {
                number: result.data.number,
                priceMonthly: result.data.priceMonthly,
                priceWeekly: result.data.priceWeekly,
                priceDaily: result.data.priceDaily,
            },
        });
        revalidatePath("/dashboard/rooms");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update room" };
    }
}
