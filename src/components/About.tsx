import { ShieldCheck, MapPin, Smile } from "lucide-react";

export default function About() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Kost Davin?</h2>
                    <p className="text-lg text-gray-600">
                        Kami menawarkan lebih dari sekadar tempat tidur. Kami memberikan pengalaman tinggal yang nyaman, aman, dan mendukung produktivitasmu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Aman & Terpercaya</h3>
                        <p className="text-gray-600">
                            Lingkungan aman dengan pengawasan CCTV 24 jam dan akses gerbang terkontrol.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Lokasi Strategis</h3>
                        <p className="text-gray-600">
                            Dekat dengan kampus, perkantoran, dan pusat perbelanjaan. Hemat waktu perjalananmu.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                            <Smile size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Komunitas Positif</h3>
                        <p className="text-gray-600">
                            Lingkungan yang tenang dan kondusif, cocok untuk mahasiswa dan profesional muda.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
