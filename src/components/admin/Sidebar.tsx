"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, BedDouble, Users, Wallet, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const routes = [
        {
            label: "Dashboard",
            icon: Home,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Kelola Kamar",
            icon: BedDouble,
            href: "/dashboard/rooms",
            active: pathname === "/dashboard/rooms",
        },
        {
            label: "Data Penyewa",
            icon: Users,
            href: "/dashboard/tenants",
            active: pathname === "/dashboard/tenants",
        },
        {
            label: "Keuangan",
            icon: Wallet,
            href: "/dashboard/finance",
            active: pathname === "/dashboard/finance",
        },
        {
            label: "Pengaturan Web",
            icon: Settings,
            href: "/dashboard/settings",
            active: pathname === "/dashboard/settings",
        },
    ];

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };

    const SidebarContent = () => (
        <div className="space-y-4 py-4 max-h-screen flex flex-col h-full">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-emerald-600">
                    PandawaX45
                </h2>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            onClick={() => setOpen(false)}
                        >
                            <Button
                                variant={route.active ? "secondary" : "ghost"}
                                className={cn("w-full justify-start", route.active && "bg-emerald-50 text-emerald-900")}
                            >
                                <route.icon className="mr-2 h-4 w-4" />
                                {route.label}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-auto px-3 py-2 border-t">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="lg:hidden fixed top-4 left-4 z-40">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className={cn("hidden lg:block w-64 border-r bg-gray-50/40 h-screen fixed left-0 top-0 overflow-y-auto", className)}>
                <SidebarContent />
            </div>
        </>
    );
}
