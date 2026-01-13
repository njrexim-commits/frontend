import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
    Edit3, Globe, Save, Layers, Search, LayoutTemplate,
    ChevronRight, Image as ImageIcon, Type, List, CheckCircle2,
    Plus, Trash2, GripVertical, Eye, ArrowLeft, UploadCloud
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import StatsCard from "@/components/admin/StatsCard";
import ImageSelector from "@/components/admin/ImageSelector";

interface Page {
    _id: string;
    title: string;
    slug: string;
    content: Record<string, any>;
    isActive: boolean;
}

interface ImageFieldState {
    section: string;
    key: string;
    index?: number;
    subField?: string;
}

const PageManager = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<Page | null>(null);
    const [pageContent, setPageContent] = useState<Record<string, any> | null>(null);
    const [activeSection, setActiveSection] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");

    // Image Selector State
    const [showImageSelector, setShowImageSelector] = useState(false);
    const [activeImageField, setActiveImageField] = useState<ImageFieldState | null>(null);

    const fetchPages = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/pages");
            setPages(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Failed to fetch pages");
            setPages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleEditPage = (page: Page) => {
        setEditingPage(page);
        setPageContent(JSON.parse(JSON.stringify(page.content))); // Deep copy

        // precise initial section selection
        const firstKey = Object.keys(page.content)[0];
        setActiveSection(firstKey || "");

        setIsDialogOpen(true);
    };

    const handleUpdateContent = (section: string, field: string, value: any, index?: number, subField?: string) => {
        if (!pageContent) return;

        const newContent = { ...pageContent };

        if (index !== undefined && subField) {
            // Updating an item in an array of objects
            newContent[section][field][index][subField] = value;
        } else if (index !== undefined) {
            // Updating an item in a simple array
            newContent[section][field][index] = value;
        } else {
            // Updating a direct field
            if (!newContent[section]) newContent[section] = {};
            newContent[section][field] = value;
        }

        setPageContent(newContent);
    };

    const handleAddItem = (section: string, field: string, template: any) => {
        if (!pageContent) return;
        const newContent = { ...pageContent };
        if (!Array.isArray(newContent[section][field])) {
            newContent[section][field] = [];
        }
        newContent[section][field].push(template);
        setPageContent(newContent);
    };

    const handleRemoveItem = (section: string, field: string, index: number) => {
        if (!pageContent) return;
        const newContent = { ...pageContent };
        if (Array.isArray(newContent[section][field])) {
            newContent[section][field].splice(index, 1);
        }
        setPageContent(newContent);
    };

    const openImageSelector = (section: string, key: string, index?: number, subField?: string) => {
        setActiveImageField({ section, key, index, subField });
        setShowImageSelector(true);
    };

    const handleImageSelect = (url: string) => {
        if (activeImageField) {
            handleUpdateContent(
                activeImageField.section,
                activeImageField.key,
                url,
                activeImageField.index,
                activeImageField.subField
            );
        }
        setShowImageSelector(false);
        setActiveImageField(null);
    };

    const handleSubmit = async () => {
        try {
            await api.put(`/pages/${editingPage?.slug}`, {
                content: pageContent
            });
            toast.success("Page content updated successfully");
            setIsDialogOpen(false);
            fetchPages();
        } catch (error) {
            toast.error("Failed to update page content");
        }
    };

    // Helper to format keys (e.g., "heroTitle" -> "Hero Title")
    const formatLabel = (key: string) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    const renderField = (section: string, key: string, value: any, index?: number) => {
        const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('src') || key.toLowerCase().includes('url') || key.toLowerCase().includes('img');
        const isLongText = typeof value === 'string' && (value.length > 50 || key.toLowerCase().includes('description') || key.toLowerCase().includes('content') || key.toLowerCase().includes('bio'));
        const label = formatLabel(key);

        if (typeof value === 'boolean') {
            return (
                <div key={`${section}-${key}-${index}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Label className="text-sm font-bold text-slate-700">{label}</Label>
                    <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleUpdateContent(section, key, checked, index)}
                    />
                </div>
            );
        }

        if (isImage) {
            return (
                <div key={`${section}-${key}-${index}`} className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <ImageIcon className="w-3.5 h-3.5" />
                            {label}
                        </Label>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openImageSelector(section, key, index)}
                            className="h-6 text-[10px] uppercase font-bold tracking-wider"
                        >
                            <UploadCloud className="w-3 h-3 mr-1.5" />
                            Change Image
                        </Button>
                    </div>

                    <div className="flex gap-4 items-start p-3 bg-slate-50/50 rounded-xl border border-slate-100 group hover:border-primary/20 transition-all">
                        {value ? (
                            <div className="w-24 h-24 rounded-lg border border-slate-200 bg-white shrink-0 overflow-hidden relative cursor-pointer" onClick={() => openImageSelector(section, key, index)}>
                                <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Edit3 className="text-white w-5 h-5" />
                                </div>
                            </div>
                        ) : (
                            <div
                                className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 shrink-0 flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
                                onClick={() => openImageSelector(section, key, index)}
                            >
                                <ImageIcon className="w-8 h-8 text-slate-300" />
                            </div>
                        )}
                        <div className="flex-1 space-y-2 pt-1">
                            <Input
                                value={value}
                                onChange={(e) => handleUpdateContent(section, key, e.target.value, index)}
                                className="font-mono text-xs bg-white h-8"
                                placeholder="Image URL (https://...)"
                            />
                            <p className="text-[10px] text-slate-400">
                                Select from gallery or paste a direct URL.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <div key={`${section}-${key}`} className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <List className="w-3.5 h-3.5" />
                            {label} List
                        </Label>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddItem(section, key, typeof value[0] === 'object' ? { title: "New Item", description: "Description" } : "New Item")}
                            className="h-7 text-xs border-dashed border-primary/40 text-primary hover:bg-primary/5"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Add Item
                        </Button>
                    </div>

                    <div className="space-y-3 pl-2 border-l-2 border-slate-100">
                        {value.map((item, idx) => (
                            <div key={idx} className="relative group bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors shadow-sm">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(section, key, idx)}
                                    className="absolute top-2 right-2 h-6 w-6 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>

                                {typeof item === 'object' ? (
                                    <div className="space-y-3 pr-8">
                                        {Object.entries(item).map(([subKey, subValue]) => {
                                            const isSubImage = subKey.toLowerCase().includes('image') || subKey.toLowerCase().includes('src');

                                            if (isSubImage) {
                                                // Special handling for images inside arrays (e.g. features list icons)
                                                return (
                                                    <div key={`${section}-${key}-${idx}-${subKey}`} className="space-y-1.5">
                                                        <div className="flex items-center justify-between">
                                                            <Label className="text-[10px] font-bold text-slate-400 block">{formatLabel(subKey)}</Label>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-5 text-[10px] px-2 text-primary hover:bg-primary/5"
                                                                onClick={() => openImageSelector(section, key, idx, subKey)}
                                                            >
                                                                Select
                                                            </Button>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {subValue && (
                                                                <div className="w-8 h-8 rounded border border-slate-200 bg-white shrink-0">
                                                                    <img src={subValue as string} className="w-full h-full object-cover rounded" />
                                                                </div>
                                                            )}
                                                            <Input
                                                                value={subValue as string}
                                                                onChange={(e) => handleUpdateContent(section, key, e.target.value, idx, subKey)}
                                                                className="h-8 text-xs bg-white flex-1"
                                                                placeholder="Image URL"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={`${section}-${key}-${idx}-${subKey}`}>
                                                    <Label className="text-[10px] font-bold text-slate-400 mb-1 block">{formatLabel(subKey)}</Label>
                                                    {subKey.toLowerCase().includes('description') ? (
                                                        <Textarea
                                                            value={subValue as string}
                                                            onChange={(e) => handleUpdateContent(section, key, e.target.value, idx, subKey)}
                                                            className="h-20 text-xs bg-white resize-none"
                                                        />
                                                    ) : (
                                                        <Input
                                                            value={subValue as string}
                                                            onChange={(e) => handleUpdateContent(section, key, e.target.value, idx, subKey)}
                                                            className="h-8 text-xs bg-white"
                                                        />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <Input
                                        value={item as string}
                                        onChange={(e) => handleUpdateContent(section, key, e.target.value, idx)}
                                        className="h-9 bg-white pr-8"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Default Text Input
        return (
            <div key={`${section}-${key}-${index}`} className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Type className="w-3.5 h-3.5" />
                    {label}
                </Label>
                {isLongText ? (
                    <Textarea
                        value={value}
                        onChange={(e) => handleUpdateContent(section, key, e.target.value, index)}
                        className="min-h-[100px] border-slate-200 focus:ring-primary/20 bg-slate-50/50 resize-y font-medium text-slate-700"
                    />
                ) : (
                    <Input
                        value={value}
                        onChange={(e) => handleUpdateContent(section, key, e.target.value, index)}
                        className="h-10 border-slate-200 focus:ring-primary/20 bg-slate-50/50 font-bold text-slate-700"
                    />
                )}
            </div>
        );
    };

    const filteredPages = Array.isArray(pages) ? pages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Content Management</h1>
                    <p className="text-slate-500 text-sm">Edit and manage the static content across your website pages.</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Active Pages"
                    value={pages.length}
                    icon={LayoutTemplate}
                    description="Editable site pages"
                />
                <StatsCard
                    title="Global Content"
                    value="Synced"
                    icon={Globe}
                    className="border-primary/20"
                    description="All regions up-to-date"
                    trendDirection="neutral"
                />
                <StatsCard
                    title="Last Edit"
                    value="Just now"
                    icon={Edit3}
                    className="border-emerald-100"
                    description="System generated"
                />
            </div>

            {/* Main Content */}
            <div className="relative max-w-sm mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 border-slate-200 bg-white"
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : filteredPages.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-slate-400 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <LayoutTemplate size={48} className="opacity-20 mb-4" />
                    <p className="font-bold text-slate-600">No pages found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPages.map((page) => (
                        <Card key={page._id} className="group border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white hover:-translate-y-1">
                            <div className="h-2 w-full bg-primary/80 group-hover:bg-primary transition-colors" />
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="p-2.5 bg-slate-50 rounded-xl text-primary mb-3">
                                        <LayoutTemplate size={24} />
                                    </div>
                                    <div className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                                        Published
                                    </div>
                                </div>
                                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {page.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1">
                                    <Globe className="w-3 h-3 text-slate-400" />
                                    /{page.slug}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="text-xs text-slate-400 mb-6 line-clamp-2">
                                    Manage hero sections, intro text, and key content blocks for the {page.title} page.
                                </div>
                                <Button
                                    onClick={() => handleEditPage(page)}
                                    className="w-full bg-slate-900 hover:bg-primary text-white font-bold h-10 shadow-lg shadow-slate-900/10 group-hover:shadow-primary/20 transition-all"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Content
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* CMS Editor Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 gap-0 overflow-hidden flex flex-col bg-slate-50/50 backdrop-blur-xl border-none outline-none">
                    {/* Header */}
                    <div className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Edit3 size={20} />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-bold text-slate-900">
                                    Edit {editingPage?.title}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-slate-500 font-medium">
                                    Make live changes to your page content.
                                </DialogDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-slate-500 font-bold">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg shadow-primary/20">
                                <Save className="w-4 h-4 mr-2" />
                                Publish Changes
                            </Button>
                        </div>
                    </div>

                    {/* Editor Body */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Sidebar: Sections */}
                        <div className="w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col">
                            <div className="p-4 border-b border-slate-100">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Page Sections</h3>
                            </div>
                            <ScrollArea className="flex-1 p-3">
                                <div className="space-y-1">
                                    {pageContent && Object.keys(pageContent).map((sectionKey) => (
                                        <button
                                            key={sectionKey}
                                            onClick={() => setActiveSection(sectionKey)}
                                            className={cn(
                                                "w-full flex items-center justify-between text-left px-4 py-3 rounded-lg text-sm font-bold transition-all",
                                                activeSection === sectionKey
                                                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            )}
                                        >
                                            <span className="capitalize">{formatLabel(sectionKey)}</span>
                                            {activeSection === sectionKey && <ChevronRight className="w-4 h-4 text-white/50" />}
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 bg-slate-50/50 flex flex-col min-w-0">
                            <div className="h-14 border-b border-slate-200/60 bg-white/50 px-8 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-slate-400" />
                                    {activeSection ? formatLabel(activeSection) : "Select a Section"}
                                </h2>
                            </div>

                            <ScrollArea className="flex-1 p-8">
                                <div className="max-w-3xl mx-auto space-y-8 pb-20">
                                    {activeSection && pageContent && pageContent[activeSection] ? (
                                        Object.entries(pageContent[activeSection]).map(([key, value]) => (
                                            <Card key={key} className="border-none shadow-sm ring-1 ring-slate-200/60 bg-white">
                                                <CardContent className="p-6">
                                                    {renderField(activeSection, key, value)}
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                            <Layers size={64} className="opacity-10 mb-4" />
                                            <p className="font-bold">Select a section from the sidebar to start editing.</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ImageSelector
                open={showImageSelector}
                onOpenChange={setShowImageSelector}
                onSelect={handleImageSelect}
            />
        </div>
    );
};

export default PageManager;
