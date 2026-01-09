"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Lock, User } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop")',
                    filter: "blur(4px)"
                }}
            />
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="z-10 w-full max-w-md px-4 animate-fade-in-up">
                <Card className="w-full bg-white/95 backdrop-blur-md shadow-2xl border-0 ring-1 ring-white/20">
                    <CardHeader className="space-y-2 text-center pb-8 pt-10">
                        <div className="mx-auto bg-emerald-100 p-3 rounded-full w-fit mb-2">
                            <Lock className="w-8 h-8 text-emerald-600" />
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">Admin Login</CardTitle>
                        <CardDescription className="text-gray-500 text-base">
                            PandawaX45 Management System
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 font-medium">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10 h-11 border-gray-200 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" class="text-gray-700 font-medium">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-11 border-gray-200 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pb-10 pt-2">
                            <Button
                                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg hover:shadow-emerald-500/30 transition-all"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In to Dashboard"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
