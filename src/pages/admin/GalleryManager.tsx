import React, { useState, useEffect } from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { badgeVariants } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Plus,
    Trash,
    Image as ImageIcon,
    Search,
    MoreVertical,
    Filter,
    Maximize2,
    X,
    UploadCloud,
    LayoutGrid,
    Tag
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface GalleryItem {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
}

const GalleryManager = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [formData, setFormData] = useState({ title: "", category: "General" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const categories = ["All", "General", "Infrastructure", "Products", "Events", "Certifications"];

    const fetchItems = async () => {
        try {
            const { data } = await api.get("/gallery");
            setItems(data);
        } catch (error) {
            toast.error("Failed to fetch gallery items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return toast.error("Please select an image");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("image", selectedFile);

        try {
            await api.post("/gallery", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Image added to gallery");
            setIsDialogOpen(false);
            setFormData({ title: "", category: "General" });
            setSelectedFile(null);
            setImagePreview(null);
            fetchItems();
        } catch (error) {
            toast.error("Failed to add image");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to remove this image from gallery?")) {
            try {
                await api.delete(`/gallery/${id}`);
                toast.success("Image removed successfully");
                fetchItems();
            } catch (error) {
                toast.error("Failed to remove image");
            }
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Visual Gallery</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <ImageIcon className="w-4 h-4 text-pink-500" />
                        <span>Showcase your company's journey and achievements.</span>
                    </div>
                </div>
                <Button onClick={() => setIsDialogOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 px-6 font-bold">
                    <Plus className="mr-2 h-4 w-4" /> Add Image
                </Button>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-4 border-b border-slate-100 bg-white/80">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                placeholder="Search gallery by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500/30 font-medium h-10 shadow-inner"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2 whitespace-nowrap hidden sm:block">Filter:</Label>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                                        selectedCategory === cat
                                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {Array(12).fill(0).map((_, i) => (
                                <div key={i} className="aspect-square bg-slate-100 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="py-24 flex flex-col items-center justify-center text-slate-400 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                <LayoutGrid size={32} className="opacity-20" />
                            </div>
                            <p className="font-bold text-slate-600">No images found</p>
                            <p className="text-xs max-w-[200px] mt-1">Try adjusting your search or category filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {filteredItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="group relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <p className="text-white text-xs font-bold truncate mb-1">{item.title}</p>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="text-[9px] h-4 border-white/20 text-white/90 bg-white/10 uppercase tracking-tighter">
                                                {item.category}
                                            </Badge>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-1.5 bg-red-500/20 hover:bg-red-500 text-white rounded-lg transition-colors border border-red-500/20"
                                                    title="Delete Image"
                                                >
                                                    <Trash size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg text-slate-900 border border-white/40">
                                            <Maximize2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-xl overflow-hidden p-0 border-none shadow-2xl">
                    <div className="bg-slate-900 px-8 py-6 flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-white flex items-center gap-2 text-xl font-extrabold tracking-tight">
                                <ImageIcon className="w-5 h-5 text-pink-400" />
                                Portfolio Upload
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 text-xs text-balance font-medium">
                                Add a high-quality visual to your public gallery portfolio.
                            </DialogDescription>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Image Title</Label>
                                    <Input
                                        placeholder="e.g. Modern Architecture"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        className="border-slate-200 focus:ring-indigo-500/20 h-11 bg-slate-50/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Classification</Label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full h-11 px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-md text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-700"
                                    >
                                        {categories.filter(c => c !== "All").map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Visual Asset</Label>
                                <div className="relative group min-h-[148px] h-full">
                                    <div className={cn(
                                        "h-full bg-slate-50 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:bg-slate-100 group-hover:border-indigo-300",
                                        imagePreview ? "border-emerald-200 bg-emerald-50/10" : "border-slate-200"
                                    )}>
                                        {imagePreview ? (
                                            <div className="relative w-full h-full">
                                                <img src={imagePreview} className="w-full h-24 object-cover rounded-lg shadow-sm" alt="Preview" />
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setSelectedFile(null); setImagePreview(null); }}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                                >
                                                    <X size={12} />
                                                </button>
                                                <p className="text-[9px] text-center font-bold text-emerald-600 mt-2 flex items-center justify-center gap-1 uppercase tracking-tighter">
                                                    Asset Ready For Upload
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 text-indigo-500 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                                                    <UploadCloud size={20} />
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-600 text-center uppercase tracking-tighter">Drag Asset Here</p>
                                                <p className="text-[8px] text-slate-400 mt-1">High resolution JPG/PNG</p>
                                            </>
                                        )}
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required={!selectedFile}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 font-extrabold shadow-xl shadow-slate-900/20 text-sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add To Gallery
                            </Button>
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="w-full text-slate-400 h-10 text-xs font-bold tracking-widest uppercase hover:bg-slate-50">
                                Discard Change
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GalleryManager;
