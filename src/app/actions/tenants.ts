"use server";

import { prisma } from "@/lib/prisma";

export async function getTenants() {
    const tenants = await prisma.tenant.findMany({
        include: { room: true },
        orderBy: { checkInDate: "desc" },
    });
    return tenants;
}
