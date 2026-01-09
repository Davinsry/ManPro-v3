"use server";

import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export async function getDashboardStats() {
    const today = new Date();
    const firstDay = startOfMonth(today);
    const lastDay = endOfMonth(today);

    // 1. Total Kamar
    const totalRooms = await prisma.room.count();

    // 2. Terisi (Occupied)
    const occupiedRooms = await prisma.room.count({
        where: { status: "OCCUPIED" }
    });

    // 3. Sisa Hari Ini (Available) OR "Sisa Hari Ini" could mean "Remaining Check-ins today"? 
    // User context: "Sisa Hari Ini" usually means "Available Rooms" in kost context, or "Remaining Checkouts". 
    // Given "Total" and "Terisi", "Sisa" likely means "Empty/Available".
    const emptyRooms = await prisma.room.count({
        where: { status: "EMPTY" }
    });

    // 4. Pendapatan Bulan Ini (Income - Expense?) OR just Income?
    // User said "Pendapatan Bulan Ini", usually means Gross Income or Net. I'll show Net for "Profit" or Gross for "Revenue".
    // Let's calculate both or just "Income".
    const transactions = await prisma.transaction.findMany({
        where: {
            date: {
                gte: firstDay,
                lte: lastDay,
            }
        }
    });

    const income = transactions
        .filter(t => t.type === "INCOME")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
        .filter(t => t.type === "EXPENSE")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
        totalRooms,
        occupiedRooms,
        emptyRooms,
        monthlyIncome: income,
        monthlyExpense: expense,
        netProfit: income - expense
    };
}
