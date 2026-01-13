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
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit3, Globe, Save, RefreshCcw, Search, Eye, ArrowRight } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/Loader";

interface Page {
    _id: string;
    title: string;
    slug: string;
    content: any;
    isActive: boolean;
}

const PageManager = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<Page | null>(null);
    const [pageContent, setPageContent] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchPages = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/pages");
            setPages(data);
        } catch (error) {
            toast.error("Failed to fetch pages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleEditPage = (page: Page) => {
        setEditingPage(page);
        setPageContent(page.content);
        setIsDialogOpen(true);
    };

    const handleUpdateContent = (path: string, value: any) => {
        const newContent = { ...pageContent };
        const keys = path.split('.');
        let current = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setPageContent(newContent);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

    const renderEditorFields = (obj: any, prefix = "") => {
        return Object.keys(obj).map((key) => {
            const fullPath = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];

            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                return (
                    <div key={fullPath} className="space-y-4 border-l-2 border-slate-100 pl-4 py-2">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600">{key}</h4>
                        {renderEditorFields(value, fullPath)}
                    </div>
                );
            }

            if (Array.isArray(value)) {
                return (
                    <div key={fullPath} className="space-y-4 border-l-2 border-indigo-100 pl-4 py-2 bg-slate-50/50 rounded-r-lg">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600">{key} (Array)</h4>
                        {value.map((item, index) => (
                            <div key={`${fullPath}.${index}`} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400">Item #{index + 1}</span>
                                </div>
                                {typeof item === "object" ? renderEditorFields(item, `${fullPath}.${index}`) : (
                                    <Input
                                        value={item}
                                        onChange={(e) => handleUpdateContent(`${fullPath}.${index}`, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                );
            }

            return (
                <div key={fullPath} className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    {value.length > 100 || key.toLowerCase().includes('content') || key.toLowerCase().includes('description') ? (
                        <Textarea
                            value={value}
                            onChange={(e) => handleUpdateContent(fullPath, e.target.value)}
                            className="text-sm border-slate-200 focus:ring-indigo-500/20 min-h-[80px]"
                        />
                    ) : (
                        <Input
                            value={value}
                            onChange={(e) => handleUpdateContent(fullPath, e.target.value)}
                            className="text-sm border-slate-200 focus:ring-indigo-500/20"
                        />
                    )}
                </div>
            );
        });
    };

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading && pages.length === 0) return <Loader />;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Page Content Editor</h1>
                    <p className="text-slate-500 text-sm">Manage dynamic content for all public-facing pages.</p>
                </div>
                <Button onClick={fetchPages} variant="outline" className="gap-2">
                    <RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} /> Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPages.map((page) => (
                    <Card key={page._id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-sm overflow-hidden bg-white">
                        <CardHeader className="bg-slate-900 text-white pb-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                                <Globe size={80} />
                            </div>
                            <div className="relative z-10 flex flex-col gap-1">
                                <CardTitle className="text-xl font-bold">{page.title}</CardTitle>
                                <CardDescription className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                                    /{page.slug === 'home' ? '' : page.slug}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Sections Managed</p>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.keys(page.content).map(section => (
                                            <span key={section} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium border border-slate-200">
                                                {section}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                                    <Button
                                        variant="default"
                                        onClick={() => handleEditPage(page)}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2"
                                    >
                                        <Edit3 size={16} /> Edit Content
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                    <div className="bg-slate-900 px-8 py-6 flex items-center justify-between shrink-0">
                        <div className="space-y-1">
                            <DialogTitle className="text-white text-2xl font-bold flex items-center gap-3">
                                <Globe className="text-indigo-400" />
                                Editing {editingPage?.title}
                            </DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Update the textual and visual content for this page. Changes will reflect immediately on the site.
                            </DialogDescription>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden bg-white">
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
                            {pageContent && renderEditorFields(pageContent)}
                        </div>
                        <div className="shrink-0 px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-8 gap-2">
                                <Save size={18} /> Save All Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PageManager;
