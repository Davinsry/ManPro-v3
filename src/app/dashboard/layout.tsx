import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <Sidebar />
            <div className="lg:pl-64 flex flex-col min-h-screen">
                <main className="flex-1 p-6 md:p-8 pt-16 lg:pt-8 animate-in fade-in zoom-in-95 duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
