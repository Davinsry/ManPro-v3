import Image from "next/image";

interface RoomGalleryProps {
    images: { src: string; alt: string }[];
}

export default function RoomGallery({ images }: RoomGalleryProps) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Galeri Kamar</h2>
                    <p className="text-lg text-gray-600">Intip suasana kamar yang bersih dan estetik.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`relative overflow-hidden rounded-2xl shadow-md group ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'
                                }`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium">{img.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
