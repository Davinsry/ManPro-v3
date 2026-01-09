"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
    navLinks: { name: string; href: string }[];
}

export default function Navbar({ navLinks }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
                            Pandawa<span className="text-emerald-600">X45</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-emerald-600 focus:outline-none p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 bg-opacity-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
