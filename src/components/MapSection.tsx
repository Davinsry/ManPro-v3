import { MapPin, Navigation } from "lucide-react";

interface MapSectionProps {
    contact: {
        address: string;
        mapsEmbedUrl: string;
        nearby: { name: string; time: string }[];
    }
}

export default function MapSection({ contact }: MapSectionProps) {
    if (!contact) return null;
    return (
        <section id="location" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Lokasi Strategis</h2>
                    <p className="text-lg text-gray-600">Akses mudah ke berbagai tempat penting.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm shrink-0">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Alamat Lengkap</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {contact.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Navigation className="text-emerald-500" />
                                Jarak Tempuh
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contact.nearby.map((place, idx) => (
                                    <div key={idx} className="flex flex-col justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors h-full">
                                        <span className="font-medium text-gray-800 mb-2">{place.name}</span>
                                        <span className="self-start text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full whitespace-nowrap">{place.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                        <iframe
                            src={contact.mapsEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
