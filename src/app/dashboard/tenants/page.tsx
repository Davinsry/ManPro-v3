import { getTenants } from "@/app/actions/tenants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays } from "date-fns";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TenantsPage() {
    const tenants = await getTenants();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Data Penyewa</h1>
                    <p className="text-gray-500">Daftar semua penyewa aktif dan booking.</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{tenants.length} Penyewa</span>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Semua Penyewa</CardTitle>
                </CardHeader>
                <CardContent>
                    {tenants.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">Belum ada data penyewa.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Kamar</TableHead>
                                    <TableHead>Kontak</TableHead>
                                    <TableHead>Check-In</TableHead>
                                    <TableHead>Check-Out</TableHead>
                                    <TableHead>Sisa Hari</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tenants.map((tenant) => {
                                    const today = new Date();
                                    const daysLeft = differenceInDays(new Date(tenant.checkOutDate), today);
                                    const isOverdue = daysLeft < 0;
                                    const isNearDue = daysLeft <= 3 && daysLeft >= 0;

                                    return (
                                        <TableRow key={tenant.id}>
                                            <TableCell className="font-medium">{tenant.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{tenant.room.number}</Badge>
                                            </TableCell>
                                            <TableCell>{tenant.contact}</TableCell>
                                            <TableCell>{format(new Date(tenant.checkInDate), "dd MMM yyyy")}</TableCell>
                                            <TableCell>{format(new Date(tenant.checkOutDate), "dd MMM yyyy")}</TableCell>
                                            <TableCell>
                                                <span className={`font-semibold ${isOverdue ? 'text-red-600' : isNearDue ? 'text-orange-500' : 'text-emerald-600'}`}>
                                                    {isOverdue ? `${Math.abs(daysLeft)} hari lewat` : `${daysLeft} hari`}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={tenant.status === "ACTIVE" ? "default" : "secondary"}
                                                    className={tenant.status === "ACTIVE" ? "bg-emerald-500" : ""}>
                                                    {tenant.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
