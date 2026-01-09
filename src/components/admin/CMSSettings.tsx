"use client";

import { useState, useTransition } from "react";
import { updateCMSContent } from "@/app/actions/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit2, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface CMSSettingsProps {
    content: any; // The full public content object
}

export function CMSSettings({ content }: CMSSettingsProps) {
    const [isPending, startTransition] = useTransition();

    // Local state
    const [hero, setHero] = useState(content.hero);
    const [pricing, setPricing] = useState(content.pricing);
    const [facilities, setFacilities] = useState(content.facilities);
    const [gallery, setGallery] = useState(content.gallery);
    const [contact, setContact] = useState(content.contact);

    // Gallery Edit Modal State
    const [editingImageIdx, setEditingImageIdx] = useState<number | null>(null);
    const [tempImage, setTempImage] = useState({ src: "", alt: "" });

    const handleSave = (key: string, value: any) => {
        startTransition(async () => {
            const res = await updateCMSContent(key === "hero" ? "HERO_CONTENT" :
                key === "pricing" ? "PRICING_TIERS" :
                    key === "facilities" ? "FACILITY_CATEGORIES" :
                        key === "gallery" ? "ROOM_IMAGES" :
                            key === "contact" ? "CONTACT_INFO" : key, value);
            if (res.success) {
                alert("Saved successfully!");
            } else {
                alert("Failed to save.");
            }
        });
    };

    // Hero Updates
    const updateHero = (field: string, val: string) => setHero({ ...hero, [field]: val });
    const updateContact = (field: string, val: string) => setContact({ ...contact, [field]: val });

    // Pricing Updates
    const updatePricingFeature = (tierIdx: number, featIdx: number, val: string) => {
        const newPricing = [...pricing];
        newPricing[tierIdx].features[featIdx] = val;
        setPricing(newPricing);
    };

    // Gallery Updates
    const openGalleryEdit = (idx: number) => {
        setEditingImageIdx(idx);
        setTempImage({ ...gallery[idx] });
    };

    const saveGalleryImage = () => {
        if (editingImageIdx === null) return;
        const newGallery = [...gallery];
        newGallery[editingImageIdx] = tempImage;
        setGallery(newGallery);
        setEditingImageIdx(null);
        // Auto save to DB? User prompt says "Each card has an Edit button". Usually implicit save or explicit. I'll stick to explicit save for now to match other tabs, or I can auto-save here depending on preference. I'll let user click strict "Save Gallery" button for safety.
    };

    return (
        <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
                <Card>
                    <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Headline</Label>
                            <Input value={hero.headline} onChange={(e) => updateHero("headline", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subheadline</Label>
                            <Textarea value={hero.subheadline} onChange={(e) => updateHero("subheadline", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA Text</Label>
                            <Input value={hero.ctaText} onChange={(e) => updateHero("ctaText", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA Link</Label>
                            <Input value={hero.ctaLink} onChange={(e) => updateHero("ctaLink", e.target.value)} />
                        </div>
                        <Button onClick={() => handleSave("hero", hero)} disabled={isPending}>Save Hero</Button>
                    </CardContent>
                </Card>
                <Card className="mt-4">
                    <CardHeader><CardTitle>Contact Info</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input value={contact.name} onChange={(e) => updateContact("name", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input value={contact.phone} onChange={(e) => updateContact("phone", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Textarea value={contact.address} onChange={(e) => updateContact("address", e.target.value)} />
                        </div>
                        <Button onClick={() => handleSave("contact", contact)} disabled={isPending}>Save Contact</Button>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="pricing">
                <Card>
                    <CardHeader><CardTitle>Pricing Tiers</CardTitle></CardHeader>
                    <CardContent>
                        {pricing.map((tier: any, idx: number) => (
                            <div key={idx} className="space-y-4 mb-8 border-b pb-8 last:border-0">
                                <div className="grid gap-2">
                                    <Label>Tier Name</Label>
                                    <Input value={tier.name} onChange={(e) => {
                                        const newP = [...pricing]; newP[idx].name = e.target.value; setPricing(newP);
                                    }} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Normal Price</Label>
                                        <Input value={tier.price} onChange={(e) => {
                                            const newP = [...pricing]; newP[idx].price = e.target.value; setPricing(newP);
                                        }} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Discount Price (Optional)</Label>
                                        <Input
                                            placeholder="e.g. Rp 1.500.000"
                                            value={tier.discountPrice || ""}
                                            onChange={(e) => {
                                                const newP = [...pricing]; newP[idx].discountPrice = e.target.value; setPricing(newP);
                                            }}
                                        />
                                        <p className="text-xs text-muted-foreground">If filled, original price will be crossed out.</p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Description</Label>
                                    <Input value={tier.description} onChange={(e) => {
                                        const newP = [...pricing]; newP[idx].description = e.target.value; setPricing(newP);
                                    }} />
                                </div>
                                <div>
                                    <Label>Features</Label>
                                    <div className="space-y-2 mt-2">
                                        {tier.features.map((feat: string, fIdx: number) => (
                                            <Input key={fIdx} value={feat} onChange={(e) => updatePricingFeature(idx, fIdx, e.target.value)} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button onClick={() => handleSave("pricing", pricing)} disabled={isPending}>Save Pricing</Button>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="facilities">
                <Card>
                    <CardHeader><CardTitle>Facilities Editor</CardTitle></CardHeader>
                    <CardContent>
                        {facilities.map((cat: any, cIdx: number) => (
                            <div key={cIdx} className="mb-6">
                                <h3 className="font-semibold mb-2">{cat.title}</h3>
                                <div className="space-y-2">
                                    {cat.items.map((item: any, iIdx: number) => (
                                        <div key={iIdx} className="flex gap-2">
                                            <Input value={item.name} onChange={(e) => {
                                                const newF = [...facilities];
                                                newF[cIdx].items[iIdx].name = e.target.value;
                                                setFacilities(newF);
                                            }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Button onClick={() => handleSave("facilities", facilities)} disabled={isPending}>Save Facilities</Button>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="gallery">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Room Gallery</CardTitle>
                        <Badge variant="outline">Limit: {gallery.length} / 6</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {gallery.map((img: any, idx: number) => (
                                <div key={idx} className="group relative aspect-[4/3] rounded-lg overflow-hidden border bg-gray-100">
                                    {img.src ? (
                                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button variant="secondary" size="sm" onClick={() => openGalleryEdit(idx)}>
                                            <Edit2 className="w-4 h-4 mr-2" /> Edit
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs truncate">
                                        {img.alt || "No Caption"}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Button onClick={() => handleSave("gallery", gallery)} disabled={isPending}>Save Gallery</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Gallery Modal */}
                <Dialog open={editingImageIdx !== null} onOpenChange={(open) => !open && setEditingImageIdx(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Image {editingImageIdx !== null ? editingImageIdx + 1 : ""}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid gap-2">
                                <Label>Upload Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const formData = new FormData();
                                        formData.append("file", file);

                                        try {
                                            const res = await fetch("/api/upload", {
                                                method: "POST",
                                                body: formData,
                                            });
                                            const data = await res.json();
                                            if (data.success && data.url) {
                                                setTempImage({ ...tempImage, src: data.url });
                                            } else {
                                                alert(data.error || "Upload failed");
                                            }
                                        } catch (err) {
                                            alert("Upload failed");
                                        }
                                    }}
                                />
                                <p className="text-xs text-muted-foreground">atau masukkan URL secara manual:</p>
                            </div>
                            <div className="grid gap-2">
                                <Label>Image URL</Label>
                                <Input value={tempImage.src} onChange={(e) => setTempImage({ ...tempImage, src: e.target.value })} />
                                {tempImage.src && (
                                    <img src={tempImage.src} alt="Preview" className="w-full h-32 object-cover rounded-md border" />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Caption (Alt Text)</Label>
                                <Input value={tempImage.alt} onChange={(e) => setTempImage({ ...tempImage, alt: e.target.value })} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingImageIdx(null)}>Cancel</Button>
                            <Button onClick={saveGalleryImage}>Update Card</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TabsContent>
        </Tabs>
    );
}
