"use client";

import { Room, Tenant } from "@prisma/client";
import { format, differenceInDays } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CalendarClock, User, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";

interface RoomCardProps {
    room: {
        id: string;
        number: string;
        status: string;
        priceMonthly: number | any; // Accept number (serialized) or Decimal
        tenant: Tenant | null;
        [key: string]: any;
    };
    onClick: (room: any) => void;
    onEdit: (room: any) => void;
    onDelete: (room: any) => void;
}

export function RoomCard({ room, onClick, onEdit, onDelete }: RoomCardProps) {
    const isOccupied = room.status === "OCCUPIED" && room.tenant;
    const isBooked = room.status === "BOOKED" && room.tenant;

    // Logic for Color Coding
    let statusColor = "secondary"; // Default gray for unknown
    let daysLeft = 0;

    if (isOccupied) {
        const today = new Date();
        const endDate = new Date(room.tenant!.checkOutDate!);
        daysLeft = differenceInDays(endDate, today);

        if (daysLeft > 7) statusColor = "success"; // Green
        else if (daysLeft <= 3) statusColor = "destructive"; // Red
        else statusColor = "warning"; // Yellow/Orange for in-between (optional, but good UX)
    }

    // Badge styling mapping
    const badgeVariant =
        room.status === "EMPTY" ? "outline" :
            room.status === "BOOKED" ? "secondary" :
                statusColor === "success" ? "default" : // Shadcn default is black usually, we need custom green class
                    statusColor === "destructive" ? "destructive" : "secondary";

    const badgeClass =
        room.status === "EMPTY" ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
            room.status === "BOOKED" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                statusColor === "success" ? "bg-emerald-500 hover:bg-emerald-600 border-transparent text-white shadow" :
                    statusColor === "warning" ? "bg-orange-500 hover:bg-orange-600 text-white" :
                        "";

    return (
        <Card
            className={cn(
                "relative transition-all duration-200 cursor-pointer group hover:shadow-lg border-l-4",
                room.status === "EMPTY" ? "border-l-emerald-500" :
                    room.status === "BOOKED" ? "border-l-yellow-400" :
                        statusColor === "success" ? "border-l-emerald-600" :
                            statusColor === "destructive" ? "border-l-red-500" : "border-l-gray-300"
            )}
            onClick={() => onClick(room)}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold text-gray-800">
                    {room.number}
                </CardTitle>
                <Badge variant="outline" className={cn("font-semibold px-3 py-1", badgeClass)}>
                    {room.status === "EMPTY" ? "KOSONG" : room.status}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
                {room.status === "EMPTY" && (
                    <div className="space-y-1 text-gray-500">
                        <p className="text-sm">Siap huni</p>
                        <p className="font-semibold text-lg text-emerald-600">Rp {formatRupiah(room.priceMonthly)}</p>
                    </div>
                )}

                {isBooked && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-2 rounded-md">
                            <CalendarClock size={16} />
                            <span className="text-sm font-medium">Booked by {room.tenant?.name}</span>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">Click to confirm check-in</p>
                    </div>
                )}

                {isOccupied && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                            <User size={16} className="text-gray-400" />
                            <span className="font-medium">{room.tenant?.name}</span>
                        </div>
                        <div className={cn(
                            "flex items-center gap-2 p-2 rounded-md text-sm font-medium",
                            daysLeft <= 3 ? "bg-red-50 text-red-700 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        )}>
                            <CalendarClock size={16} />
                            <span>
                                {daysLeft < 0 ? `Overdue ${Math.abs(daysLeft)} days` : `${daysLeft} Hari Lagi`}
                            </span>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between items-center bg-gray-50/50 py-3 px-6 mt-2" onClick={(e) => e.stopPropagation()}>
                <span className="text-xs text-gray-400 font-mono">ID: {room.id.slice(0, 4)}</span>
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-emerald-600" onClick={() => onEdit(room)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    {room.status === "EMPTY" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600" onClick={() => onDelete(room)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
