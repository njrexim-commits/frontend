import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
    Save,
    Globe,
    Mail,
    Phone,
    MapPin,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Settings as SettingsIcon,
    Loader2,
    ShieldCheck,
    Smartphone,
    CheckCircle
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import StatsCard from "@/components/admin/StatsCard";

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        siteName: "",
        siteDescription: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        facebookUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
        instagramUrl: "",
    });

    const fetchSettings = async () => {
        try {
            const { data } = await api.get("/settings");
            setFormData({
                siteName: data.siteName || "",
                siteDescription: data.siteDescription || "",
                contactEmail: data.contactEmail || "",
                contactPhone: data.contactPhone || "",
                address: data.address || "",
                facebookUrl: data.facebookUrl || "",
                twitterUrl: data.twitterUrl || "",
                linkedinUrl: data.linkedinUrl || "",
                instagramUrl: data.instagramUrl || "",
            });
        } catch (error: any) {
            console.error("Settings fetch error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch system settings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put("/settings", formData);
            toast.success("System configuration updated");
        } catch (error: any) {
            console.error("Settings save error:", error);
            toast.error(error.response?.data?.message || "Failed to persist changes");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4 animate-pulse">
                <SettingsIcon className="w-12 h-12 text-slate-200 animate-spin-slow" />
                <p className="text-slate-400 font-medium">Synchronizing system settings...</p>
            </div>
        );
    }

    // Stats
    const completedFields = Object.values(formData).filter(Boolean).length;
    const totalFields = Object.keys(formData).length;
    const completionPercentage = Math.round((completedFields / totalFields) * 100);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">System Configuration</h1>
                    <p className="text-slate-500 text-sm">Manage your global application identity and public contact nodes.</p>
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-slate-900/10 px-8 font-bold h-11 transition-all hover:scale-105"
                >
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Synchronizing...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Save Configuration
                        </>
                    )}
                </Button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Profile Completion"
                    value={`${completionPercentage}%`}
                    icon={CheckCircle}
                    description="System readiness"
                />
                <StatsCard
                    title="Public Visibility"
                    value="Active"
                    icon={Globe}
                    className="border-indigo-100"
                    description="Site is reachable"
                />
                <StatsCard
                    title="Security Status"
                    value="Encrypted"
                    icon={ShieldCheck}
                    className="border-emerald-100"
                    description="Data is secure"
                    trendDirection="neutral"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    {/* General Organization Identity */}
                    <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                        <CardHeader className="border-b border-slate-100 bg-white/80">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
                                <Globe className="w-5 h-5 text-primary" />
                                Brand Identity
                            </CardTitle>
                            <CardDescription className="text-xs font-medium">Configure how your organization appears to the public.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal Entity / Site Name</Label>
                                <Input
                                    value={formData.siteName}
                                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                                    className="border-slate-200 focus:ring-primary/20 h-11 bg-slate-50/50 font-bold text-slate-800"
                                    placeholder="e.g. Acme Global Industries"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Corporate Vision / Description</Label>
                                <Textarea
                                    className="min-h-[120px] border-slate-200 focus:ring-primary/20 bg-slate-50/50 font-medium leading-relaxed italic resize-y"
                                    value={formData.siteDescription}
                                    onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                                    placeholder="Describe your organization's core values and public message..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Communication Nodes */}
                    <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                        <CardHeader className="border-b border-slate-100 bg-white/80">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
                                <Phone className="w-5 h-5 text-emerald-500" />
                                Communication Points
                            </CardTitle>
                            <CardDescription className="text-xs font-medium">Official endpoints for customer and business inquiries.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Mail className="w-3 h-3 text-slate-400" /> Official Email
                                    </Label>
                                    <Input
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        className="border-slate-200 focus:ring-primary/20 h-11 bg-slate-50/50 font-medium"
                                        placeholder="contact@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Smartphone className="w-3 h-3 text-slate-400" /> Business Hotline
                                    </Label>
                                    <Input
                                        value={formData.contactPhone}
                                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                        className="border-slate-200 focus:ring-primary/20 h-11 bg-slate-50/50 font-medium"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-slate-400" /> Registered Headquarters
                                    </Label>
                                    <Textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="min-h-[100px] border-slate-200 focus:ring-primary/20 bg-slate-50/50 font-medium resize-y"
                                        placeholder="Street, City, State, ZIP, Country"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* Social Footprint */}
                    <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm h-full">
                        <CardHeader className="border-b border-slate-100 bg-white/80">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
                                <Share2 className="w-5 h-5 text-indigo-500" />
                                Social Reach
                            </CardTitle>
                            <CardDescription className="text-xs font-medium">Manage cross-platform social identity links.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-1.5 group">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Facebook className="w-3 h-3 text-[#1877F2]" /> Facebook Business
                                </Label>
                                <Input
                                    value={formData.facebookUrl}
                                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                                    className="border-slate-200 focus:ring-primary/20 h-10 bg-white font-medium text-[13px]"
                                    placeholder="https://facebook.com/acme"
                                />
                            </div>
                            <div className="space-y-1.5 group">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Twitter className="w-3 h-3 text-[#1DA1F2]" /> Twitter / X Profile
                                </Label>
                                <Input
                                    value={formData.twitterUrl}
                                    onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                                    className="border-slate-200 focus:ring-primary/20 h-10 bg-white font-medium text-[13px]"
                                    placeholder="https://twitter.com/acme"
                                />
                            </div>
                            <div className="space-y-1.5 group">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Linkedin className="w-3 h-3 text-[#0A66C2]" /> LinkedIn Page
                                </Label>
                                <Input
                                    value={formData.linkedinUrl}
                                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                    className="border-slate-200 focus:ring-primary/20 h-10 bg-white font-medium text-[13px]"
                                    placeholder="https://linkedin.com/company/acme"
                                />
                            </div>
                            <div className="space-y-1.5 group">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Instagram className="w-3 h-3 text-[#E4405F]" /> Instagram Handle
                                </Label>
                                <Input
                                    value={formData.instagramUrl}
                                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                                    className="border-slate-200 focus:ring-primary/20 h-10 bg-white font-medium text-[13px]"
                                    placeholder="https://instagram.com/acme"
                                />
                            </div>

                            <div className="pt-6">
                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4">
                                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-bold text-primary uppercase tracking-tight">Security Check</p>
                                        <p className="text-[10px] text-primary/80 leading-tight">All social links are verified for HTTPS compliance before being served to end-users.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Floating Save Bar for better UX */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="rounded-full h-14 w-14 p-0 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 ring-4 ring-white transition-all hover:scale-110"
                >
                    {saving ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
                </Button>
            </div>
        </div>
    );
};

export default Settings;
