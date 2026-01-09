import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface HeroProps {
    content: {
        headline: string;
        subheadline: string;
        ctaText: string;
        ctaLink: string;
        usps: string[];
    }
}

export default function Hero({ content }: HeroProps) {
    if (!content) return null; // Safe guard
    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000&auto=format&fit=crop")',
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg tracking-tight">
                        {content.headline}
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 drop-shadow-md max-w-2xl mx-auto font-light">
                        {content.subheadline}
                    </p>
                </div>

                {/* USPs */}
                <div className="flex flex-wrap justify-center gap-4 text-emerald-100/90 text-sm md:text-base font-medium">
                    {content.usps.map((usp, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            <CheckCircle2 size={18} className="text-emerald-400" />
                            <span>{usp}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <Link
                        href={content.ctaLink}
                        target="_blank"
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
                    >
                        {content.ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
