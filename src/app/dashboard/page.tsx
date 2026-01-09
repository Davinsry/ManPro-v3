import { getDashboardStats } from "@/app/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Users, Wallet, TrendingUp } from "lucide-react";
import { formatRupiah } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Kamar
                        </CardTitle>
                        <Bed className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalRooms}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.emptyRooms} kamar kosong
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Terisi
                        </CardTitle>
                        <Users className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{stats.occupiedRooms}</div>
                        <p className="text-xs text-muted-foreground">
                            Occupancy Rate: {stats.totalRooms > 0 ? Math.round((stats.occupiedRooms / stats.totalRooms) * 100) : 0}%
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pendapatan (Bulan Ini)
                        </CardTitle>
                        <Wallet className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            Rp {formatRupiah(stats.monthlyIncome)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Gross Income
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Net Profit
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">
                            Rp {formatRupiah(stats.netProfit)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            After Expenses (Rp {formatRupiah(stats.monthlyExpense)})
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
