import * as Icons from "lucide-react";

function getIcon(iconNameOrComponent: any) {
    if (typeof iconNameOrComponent === 'string') {
        const Icon = (Icons as any)[iconNameOrComponent];
        return Icon || Icons.HelpCircle;
    }
    return iconNameOrComponent; // Fallback if it's already a component (from data.ts)
}

interface RulesProps {
    rules: any[];
}

export default function Rules({ rules }: RulesProps) {
    return (
        <section id="rules" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Peraturan Kost</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Demi kenyamanan dan keamanan bersama, kami menerapkan beberapa aturan penting.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {rules.map((item, idx) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <div key={idx} className="flex items-start gap-4 p-6 bg-red-50/50 rounded-xl border border-red-100 hover:border-red-200 transition-colors">
                                <div className="p-3 bg-red-100 text-red-600 rounded-full shrink-0">
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 pt-2">{item.rule}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
