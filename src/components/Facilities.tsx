import { LucideIcon } from "lucide-react";

interface FacilityItem {
    icon: any; // LucideIcon type is tricky to serialize/unserialize if passing bare JSON, but here we pass the object from data.ts or reconstructed. 
    // Wait, DB stores JSON. I cannot store "Lucide Icon Component" in DB.
    // I store "icon name" (string).
    // I need a mapper from String to Icon Component.
    // Major issue: CMS cannot store functions/components.
    // Solution: Map icon names to components.
    name: string;
}

interface FacilityCategory {
    title: string;
    items: { icon: any; name: string }[];
}

// Accessing Icon from mapped string will be done here?
// If data comes from DB, 'icon' is a string like "Wifi".
// If data comes from 'data.ts', 'icon' is a Component.
// I need to standardize. 
// For now, I'll assume 'data.ts' style (Component) is passed because 'cms-helper' merges defaults.
// BUT if 'getCMSContent' returns JSON, it will be strings.
// I need a IconMapper.

import * as Icons from "lucide-react";

function getIcon(iconNameOrComponent: any) {
    if (typeof iconNameOrComponent === 'string') {
        const Icon = (Icons as any)[iconNameOrComponent];
        return Icon || Icons.HelpCircle;
    }
    return iconNameOrComponent;
}

interface FacilitiesProps {
    categories: any[]; // Using any to handle mixed types (DB string vs Local Component)
    specs: { size: string; type: string };
}

export default function Facilities({ categories, specs }: FacilitiesProps) {
    return (
        <section id="facilities" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Fasilitas Lengkap</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Nikmati kenyamanan maksimal dengan fasilitas Executive yang kami sediakan untuk Anda.
                    </p>
                    <div className="inline-block bg-white px-6 py-3 rounded-lg border border-gray-200 shadow-sm mt-4">
                        <span className="font-semibold text-gray-900">Spesifikasi Kamar: </span>
                        <span className="text-gray-600">{specs.size} — {specs.type}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, catIdx) => (
                        <div key={catIdx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                {category.title}
                            </h3>
                            <ul className="space-y-4">
                                {category.items.map((item: any, itemIdx: number) => {
                                    const Icon = getIcon(item.icon);
                                    return (
                                        <li key={itemIdx} className="flex items-center gap-3 text-gray-700">
                                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                                                <Icon size={20} />
                                            </div>
                                            <span className="font-medium">{item.name}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
