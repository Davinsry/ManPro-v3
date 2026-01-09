"use client";

import { useState, useTransition } from "react";
import { Room, Tenant } from "@prisma/client";
import { bookRoom, checkInRoom, checkOutRoom, extendRoom, cancelBooking, confirmBooking } from "@/app/actions/booking"; // confirmBooking logic needed?
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/ui/currency-input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingDialogProps {
    room: {
        id: string;
        number: string;
        status: string;
        tenant: Tenant | null;
        priceMonthly: number | any;
        priceWeekly: number | any;
        priceDaily: number | any;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ room, open, onOpenChange }: BookingDialogProps) {
    const [isPending, startTransition] = useTransition();

    // States
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
    const [checkOut, setCheckOut] = useState<Date | undefined>();
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CASH");

    const resetForm = () => {
        setName("");
        setContact("");
        setCheckIn(new Date());
        setCheckOut(undefined);
        setAmount("");
        setPaymentMethod("CASH");
    };

    const handleBook = () => {
        if (!checkIn || !checkOut || !name || !contact) return alert("Please fill all fields");
        startTransition(async () => {
            const res = await bookRoom(room.id, {
                name,
                contact,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                paymentMethod: paymentMethod as any,
            });
            if (res.success) {
                onOpenChange(false);
                resetForm();
            } else {
                alert(res.error);
            }
        });
    };

    const handleCheckIn = () => { // Direct Check-in
        if (!checkIn || !checkOut || !name || !contact || !amount) return alert("Please fill all fields");
        startTransition(async () => {
            const res = await checkInRoom(room.id, {
                name,
                contact,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                paymentMethod: paymentMethod as any,
                amount: parseFloat(amount)
            });
            if (res.success) {
                onOpenChange(false);
                resetForm();
            } else {
                alert(res.error);
            }
        });
    };

    const handleConfirmBooking = () => { // Booked -> Occupied
        if (!room.tenant) return;
        if (!amount) return alert("Please enter payment amount");

        startTransition(async () => {
            const res = await confirmBooking(room.id, room.tenant!.id, parseFloat(amount));
            if (res.success) {
                onOpenChange(false);
                resetForm();
            } else {
                alert(res.error);
            }
        });
    };

    const handleCancel = () => {
        if (!room.tenant) return;
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        startTransition(async () => {
            const res = await cancelBooking(room.id, room.tenant!.id);
            if (res.success) {
                onOpenChange(false);
            }
        });
    };

    const handleCheckout = () => {
        if (!room.tenant) return;
        if (!confirm("Confirm Checkout?")) return;
        startTransition(async () => {
            const res = await checkOutRoom(room.id, room.tenant!.id);
            if (res.success) {
                onOpenChange(false);
            }
        });
    };

    const handleExtend = () => {
        if (!checkOut || !amount) return alert("Please select new date and amount");
        if (!room.tenant) return;
        startTransition(async () => {
            const res = await extendRoom(room.tenant!.id, checkOut, parseFloat(amount));
            if (res.success) {
                onOpenChange(false);
                resetForm();
            } else {
                alert(res.error);
            }
        });
    };

    // Render logic based on Room Status
    const renderContent = () => {
        if (room.status === "EMPTY") {
            return (
                <Tabs defaultValue="booking" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="booking">Booking Dulu</TabsTrigger>
                        <TabsTrigger value="checkin">Check-in Langsung</TabsTrigger>
                    </TabsList>

                    {/* Shared Function for Date Picker */}

                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label>Nama Penyewa</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label>WhatsApp / Kontak</Label>
                            <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="08xxx" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid gap-2">
                                <Label>Check In</Label>
                                <CalendarPopup
                                    date={checkIn}
                                    setDate={setCheckIn}
                                    disabledDays={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Check Out</Label>
                                <CalendarPopup
                                    date={checkOut}
                                    setDate={setCheckOut}
                                    disabledDays={(date) => checkIn ? date <= checkIn : date < new Date()}
                                />
                            </div>
                        </div>
                    </div>

                    <TabsContent value="booking" className="space-y-4">
                        <p className="text-sm text-muted-foreground">Booking hanya menandai kamar. Uang belum masuk ke Keuangan.</p>
                        <Button className="w-full" onClick={handleBook} disabled={isPending}>Booking Sekarang</Button>
                    </TabsContent>
                    <TabsContent value="checkin" className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Jumlah Bayar (Rp)</Label>
                            <CurrencyInput value={amount} onChange={setAmount} />
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleCheckIn} disabled={isPending}>Check-in & Bayar</Button>
                    </TabsContent>
                </Tabs>
            );
        }

        if (room.status === "BOOKED") {
            return (
                <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-md">
                        <h3 className="font-semibold text-yellow-800">Booking Info</h3>
                        <p className="text-sm">Nama: {room.tenant?.name}</p>
                        <p className="text-sm">Check-in: {room.tenant?.checkInDate && format(new Date(room.tenant.checkInDate), "PP")}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Pelunasan (Rp)</Label>
                        <CurrencyInput value={amount} onChange={setAmount} />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50" onClick={handleCancel} disabled={isPending}>Batal Booking</Button>
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleConfirmBooking} disabled={isPending}>Lunas & Check-in</Button>
                    </div>
                </div>
            );
        }

        if (room.status === "OCCUPIED") {
            return (
                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Info / Checkout</TabsTrigger>
                        <TabsTrigger value="extend">Perpanjang</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="space-y-4 pt-4">
                        <div className="bg-green-50 p-4 rounded-md">
                            <p className="text-sm font-medium">Penyewa: {room.tenant?.name}</p>
                            <p className="text-sm">Check-out: {room.tenant?.checkOutDate && format(new Date(room.tenant.checkOutDate), "PP")}</p>
                        </div>
                        <Button variant="destructive" className="w-full" onClick={handleCheckout} disabled={isPending}>Checkout Kamar</Button>
                    </TabsContent>

                    <TabsContent value="extend" className="space-y-4 pt-4">
                        <div className="grid gap-2">
                            <Label>New Check Out Date</Label>
                            <CalendarPopup
                                date={checkOut}
                                setDate={setCheckOut}
                                disabledDays={(date) => room.tenant?.checkOutDate ? date <= new Date(room.tenant.checkOutDate) : date < new Date()}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Biaya Perpanjang (Rp)</Label>
                            <CurrencyInput value={amount} onChange={setAmount} />
                        </div>
                        <Button className="w-full" onClick={handleExtend} disabled={isPending}>Simpan Perpanjangan</Button>
                    </TabsContent>
                </Tabs>
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Kamar {room.number} - {room.status}</DialogTitle>
                </DialogHeader>
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
}

function CalendarPopup({ date, setDate, disabledDays }: { date: Date | undefined, setDate: (d: Date | undefined) => void, disabledDays?: (date: Date) => boolean }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={disabledDays}
                />
            </PopoverContent>
        </Popover>
    )
}
