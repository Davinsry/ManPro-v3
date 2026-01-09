import { getRooms } from "@/app/actions/rooms";
import { RoomList } from "@/components/admin/RoomList";

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
    const rawRooms = await getRooms();
    const rooms = rawRooms.map(room => ({
        ...room,
        priceMonthly: Number(room.priceMonthly),
        priceWeekly: Number(room.priceWeekly),
        priceDaily: Number(room.priceDaily),
    }));

    return (
        <div className="space-y-6">
            <RoomList rooms={rooms} />
        </div>
    );
}
