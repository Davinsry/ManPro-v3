"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCMSContent(key: string) {
    const content = await prisma.pageContent.findUnique({
        where: { key },
    });
    return content ? JSON.parse(content.value) : null;
}

export async function updateCMSContent(key: string, value: any) {
    try {
        await prisma.pageContent.upsert({
            where: { key },
            update: { value: JSON.stringify(value) },
            create: { key, value: JSON.stringify(value) },
        });
        revalidatePath("/"); // Revalidate landing page
        revalidatePath("/dashboard/settings");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update content" };
    }
}
