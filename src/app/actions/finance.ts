"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTransactions() {
    return await prisma.transaction.findMany({
        orderBy: { date: "desc" },
    });
}

export async function createExpense(data: {
    amount: number;
    category: string;
    description: string;
}) {
    try {
        await prisma.transaction.create({
            data: {
                amount: data.amount,
                type: "EXPENSE",
                category: data.category,
                description: data.description,
                date: new Date(),
            },
        });
        revalidatePath("/dashboard/finance");
        return { success: true };
    } catch (error) {
        return { error: "Failed to create expense" };
    }
}
