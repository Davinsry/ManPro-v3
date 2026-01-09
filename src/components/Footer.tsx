import Link from "next/link";
import { Instagram, Phone, MapPin } from "lucide-react";

interface FooterProps {
    contact: any;
    navLinks: any[];
}

export default function Footer({ contact, navLinks }: FooterProps) {
    if (!contact) return null;
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{contact.name}</h3>
                        <p className="text-gray-400 mb-4">
                            Hunian nyaman dan strategis untuk mahasiswa dan profesional muda.
                        </p>
                        <div className="flex space-x-4">
                            {contact.socials.map((social: any) => (
                                <Link key={social.name} href={social.href} target="_blank" className="hover:text-emerald-500 transition-colors">
                                    {social.name === "Instagram" && <Instagram size={24} />}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-emerald-500 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="shrink-0 text-emerald-500" size={20} />
                                <span>{contact.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="shrink-0 text-emerald-500" size={20} />
                                <Link href={contact.address} className="hover:text-emerald-500 transition-colors">
                                    {contact.phone}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {contact.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
