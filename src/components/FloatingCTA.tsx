import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface FloatingCTAProps {
    link: string;
}

export default function FloatingCTA({ link }: FloatingCTAProps) {
    return (
        <Link
            href={link || "#"}
            target="_blank"
            className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 animate-bounce-slow"
            aria-label="Chat WhatsApp"
        >
            <MessageCircle size={28} />
            <span className="hidden md:inline font-semibold">Chat Kami</span>
        </Link>
    );
}
