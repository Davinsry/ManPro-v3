import { Check, Star } from "lucide-react";
import Link from "next/link";

interface PricingProps {
    tiers: any[];
    ctaLink: string;
}

export default function Pricing({ tiers, ctaLink }: PricingProps) {
    const tier = tiers[0];

    return (
        <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Harga Sewa</h2>
                    <p className="text-lg text-gray-600">Investasi terbaik untuk kenyamanan belajar dan bekerja.</p>
                </div>

                <div className="max-w-lg mx-auto">
                    <div className={`relative bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 md:p-12 overflow-hidden`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Star size={120} className="text-emerald-500" />
                        </div>

                        <div className="relative text-center mb-8">
                            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-600 text-sm font-semibold tracking-wide uppercase mb-4">
                                Most Popular
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                            <p className="text-gray-500 mb-6">{tier.description}</p>

                            <div className="flex flex-col items-center justify-center gap-1">
                                {tier.discountPrice ? (
                                    <>
                                        <span className="text-xl font-medium text-gray-400 line-through decoration-red-400 decoration-2">
                                            {tier.price}
                                        </span>
                                        <span className="text-4xl md:text-5xl font-extrabold text-emerald-600 tracking-tight">
                                            {tier.discountPrice}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                                        {tier.price}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            {tier.features.map((feature: string, fIndex: number) => (
                                <div key={fIndex} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                        <Check size={18} strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href={ctaLink || "#"}
                            target="_blank"
                            className="w-full block text-center py-4 px-8 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1 hover:shadow-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                        >
                            Booking Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
