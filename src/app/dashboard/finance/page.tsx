import { getTransactions } from "@/app/actions/finance";
import { FinanceClient } from "@/components/admin/FinanceClient";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
    const rawTransactions = await getTransactions();
    // Serialize Decimal to number for client component compatibility
    const transactions = rawTransactions.map(t => ({
        ...t,
        amount: Number(t.amount)
    }));
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Laporan Keuangan</h1>
            <FinanceClient transactions={transactions as any} />
        </div>
    );
}
