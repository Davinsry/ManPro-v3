"use client";

import { useState, useTransition } from "react";
import { Transaction } from "@prisma/client";
import { createExpense } from "@/app/actions/finance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Installed
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Plus, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { CurrencyInput } from "@/components/ui/currency-input";

interface FinanceClientProps {
    transactions: Transaction[];
}

export function FinanceClient({ transactions }: FinanceClientProps) {
    const [isPending, startTransition] = useTransition();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("ELECTRICITY");

    const income = transactions.filter((t) => t.type === "INCOME");
    const expense = transactions.filter((t) => t.type === "EXPENSE");

    const totalIncome = income.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalExpense = expense.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const netProfit = totalIncome - totalExpense;

    const handleCreateExpense = () => {
        if (!amount || parseFloat(amount) === 0 || !description.trim()) {
            alert("Mohon isi semua field: Deskripsi dan Jumlah");
            return;
        }
        startTransition(async () => {
            const res = await createExpense({
                amount: parseFloat(amount),
                description,
                category,
            });
            if (res.success) {
                setIsAddOpen(false);
                setAmount("");
                setDescription("");
                setCategory("ELECTRICITY");
            } else {
                alert(res.error);
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">+Rp {formatRupiah(totalIncome)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">-Rp {formatRupiah(totalExpense)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                        <Wallet className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-primary" : "text-red-500"}`}>
                            {netProfit >= 0 ? "+" : ""}Rp {formatRupiah(netProfit)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="income" className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="all">Semua</TabsTrigger>
                        <TabsTrigger value="income">Pemasukan</TabsTrigger>
                        <TabsTrigger value="expense">Pengeluaran</TabsTrigger>
                    </TabsList>
                    <Button onClick={() => setIsAddOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Catat Pengeluaran
                    </Button>
                </div>

                <TabsContent value="all">
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No transactions found.</TableCell>
                                    </TableRow>
                                )}
                                {[...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell>{format(new Date(t.date), "dd MMM yyyy")}</TableCell>
                                        <TableCell>
                                            <Badge variant={t.type === "INCOME" ? "outline" : "destructive"} className={t.type === "INCOME" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : ""}>
                                                {t.type === "INCOME" ? "Pemasukan" : "Pengeluaran"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{t.description}</TableCell>
                                        <TableCell><Badge variant="secondary">{t.category}</Badge></TableCell>
                                        <TableCell className={`text-right font-medium ${t.type === "INCOME" ? "text-emerald-600" : "text-red-600"}`}>
                                            {t.type === "INCOME" ? "+" : "-"}Rp {formatRupiah(t.amount)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="income">
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {income.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">No income records found.</TableCell>
                                    </TableRow>
                                )}
                                {income.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell>{format(new Date(t.date), "dd MMM yyyy")}</TableCell>
                                        <TableCell>{t.description}</TableCell>
                                        <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                                        <TableCell className="text-right font-medium text-emerald-600">+Rp {formatRupiah(t.amount)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="expense">
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expense.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">No expense records found.</TableCell>
                                    </TableRow>
                                )}
                                {expense.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell>{format(new Date(t.date), "dd MMM yyyy")}</TableCell>
                                        <TableCell>{t.description}</TableCell>
                                        <TableCell><Badge variant="destructive">{t.category}</Badge></TableCell>
                                        <TableCell className="text-right font-medium text-red-600">-Rp {formatRupiah(t.amount)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Catat Pengeluaran Baru</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Kategori</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ELECTRICITY">Listrik</SelectItem>
                                    <SelectItem value="WATER">Air</SelectItem>
                                    <SelectItem value="WIFI">WiFi</SelectItem>
                                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                    <SelectItem value="OTHER">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Deskripsi</Label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Contoh: Beli pulsa listrik" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Jumlah (Rp)</Label>
                            <CurrencyInput value={amount} onChange={setAmount} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>Batal</Button>
                        <Button onClick={handleCreateExpense} disabled={isPending}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

import { Badge } from "@/components/ui/badge";
