"use client";

import { useState, useTransition } from "react";
import { Room, Tenant } from "@prisma/client";
import { createRoom, deleteRoom, updateRoom } from "@/app/actions/rooms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { RoomCard } from "./RoomCard";
import { BookingDialog } from "./BookingDialog";

interface SerializedRoom extends Omit<Room, "priceMonthly" | "priceWeekly" | "priceDaily"> {
    priceMonthly: number;
    priceWeekly: number;
    priceDaily: number;
    tenant: Tenant | null;
}

interface RoomListProps {
    rooms: SerializedRoom[];
}

export function RoomList({ rooms }: RoomListProps) {
    const [isPending, startTransition] = useTransition();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Selection state
    const [selectedRoom, setSelectedRoom] = useState<SerializedRoom | null>(null);
    const [selectedBookingRoom, setSelectedBookingRoom] = useState<SerializedRoom | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        number: "",
        priceMonthly: "",
        priceWeekly: "",
        priceDaily: "",
    });

    // Handlers
    const handleCardClick = (room: SerializedRoom) => {
        setSelectedBookingRoom(room);
        setIsBookingOpen(true);
    };

    const handleCreate = () => {
        startTransition(async () => {
            const res = await createRoom({
                number: formData.number,
                priceMonthly: parseFloat(formData.priceMonthly),
                priceWeekly: parseFloat(formData.priceWeekly),
                priceDaily: parseFloat(formData.priceDaily),
            });
            if (res.success) {
                setIsCreateOpen(false);
                setFormData({ number: "", priceMonthly: "", priceWeekly: "", priceDaily: "" });
            } else {
                alert(res.error);
            }
        });
    };

    const handleUpdate = () => {
        if (!selectedRoom) return;
        startTransition(async () => {
            const res = await updateRoom(selectedRoom.id, {
                number: formData.number,
                priceMonthly: parseFloat(formData.priceMonthly),
                priceWeekly: parseFloat(formData.priceWeekly),
                priceDaily: parseFloat(formData.priceDaily),
            });
            if (res.success) {
                setIsEditOpen(false);
                setSelectedRoom(null);
            } else {
                alert(res.error);
            }
        });
    };

    const handleDelete = () => {
        if (!selectedRoom) return;
        startTransition(async () => {
            const res = await deleteRoom(selectedRoom.id);
            if (res.success) {
                setIsDeleteOpen(false);
                setSelectedRoom(null);
            } else {
                alert(res.error);
            }
        });
    };

    const openEdit = (room: SerializedRoom) => {
        setSelectedRoom(room);
        setFormData({
            number: room.number,
            priceMonthly: room.priceMonthly.toString(),
            priceWeekly: room.priceWeekly.toString(),
            priceDaily: room.priceDaily.toString(),
        });
        setIsEditOpen(true);
    };

    const openDelete = (room: SerializedRoom) => {
        setSelectedRoom(room);
        setIsDeleteOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Kamar</h2>
                    <p className="text-gray-500">Kelola kamar, booking, dan penyewa.</p>
                </div>
                <Button onClick={() => setIsCreateOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 shadow-md">
                    <Plus className="mr-2 h-4 w-4" /> Tambah Kamar
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        room={room}
                        onClick={handleCardClick}
                        onEdit={openEdit}
                        onDelete={openDelete}
                    />
                ))}
            </div>

            {/* Create Modal */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Kamar Baru</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="num">Nomor Kamar</Label>
                            <Input id="num" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="pm">Harga Bulanan</Label>
                            <Input id="pm" type="number" value={formData.priceMonthly} onChange={(e) => setFormData({ ...formData, priceMonthly: e.target.value })} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="pw">Harga Mingguan</Label>
                            <Input id="pw" type="number" value={formData.priceWeekly} onChange={(e) => setFormData({ ...formData, priceWeekly: e.target.value })} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="pd">Harga Harian</Label>
                            <Input id="pd" type="number" value={formData.priceDaily} onChange={(e) => setFormData({ ...formData, priceDaily: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                        <Button onClick={handleCreate} disabled={isPending}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Kamar {selectedRoom?.number}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="edit-num">Nomor Kamar</Label>
                            <Input id="edit-num" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="edit-pm">Harga Bulanan</Label>
                            <Input id="edit-pm" type="number" value={formData.priceMonthly} onChange={(e) => setFormData({ ...formData, priceMonthly: e.target.value })} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="edit-pw">Harga Mingguan</Label>
                            <Input id="edit-pw" type="number" value={formData.priceWeekly} onChange={(e) => setFormData({ ...formData, priceWeekly: e.target.value })} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="edit-pd">Harga Harian</Label>
                            <Input id="edit-pd" type="number" value={formData.priceDaily} onChange={(e) => setFormData({ ...formData, priceDaily: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
                        <Button onClick={handleUpdate} disabled={isPending}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Alert */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete room {selectedRoom?.number}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Booking Dialog */}
            {selectedBookingRoom && (
                <BookingDialog
                    room={selectedBookingRoom as any}
                    open={isBookingOpen}
                    onOpenChange={setIsBookingOpen}
                />
            )}
        </div>
    );
}

// Re-export specific styles if needed or kept simple
