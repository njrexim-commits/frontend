import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Loader2, Search, UploadCloud, Image as ImageIcon, CheckCircle } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface GalleryItem {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
}

interface ImageSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (imageUrl: string) => void;
}

const ImageSelector = ({ open, onOpenChange, onSelect }: ImageSelectorProps) => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadTab, setUploadTab] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/gallery");
            setItems(data);
        } catch (error) {
            toast.error("Failed to load gallery");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) fetchItems();
    }, [open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("title", selectedFile.name.split('.')[0]); // Default title
        formData.append("category", "Page Assets");

        try {
            const { data } = await api.post("/gallery", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Image uploaded!");
            setPreviewUrl(null);
            setSelectedFile(null);
            setUploadTab(false);
            fetchItems();
            onSelect(data.imageUrl); // Auto-select the uploaded image
            onOpenChange(false);
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-white">
                <DialogHeader className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <ImageIcon className="text-primary" size={24} />
                        Image Manager
                    </DialogTitle>
                    <DialogDescription>
                        Select an image from the gallery or upload a new one.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex border-b border-slate-100">
                    <button
                        onClick={() => setUploadTab(false)}
                        className={cn("flex-1 py-3 text-sm font-bold border-b-2 transition-colors", !uploadTab ? "border-primary text-primary bg-primary/5" : "border-transparent text-slate-500 hover:bg-slate-50")}
                    >
                        Browse Gallery
                    </button>
                    <button
                        onClick={() => setUploadTab(true)}
                        className={cn("flex-1 py-3 text-sm font-bold border-b-2 transition-colors", uploadTab ? "border-primary text-primary bg-primary/5" : "border-transparent text-slate-500 hover:bg-slate-50")}
                    >
                        Upload New
                    </button>
                </div>

                {uploadTab ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/30">
                        <div className="max-w-md w-full bg-white p-8 rounded-2xl border-2 border-dashed border-slate-200 shadow-sm text-center">
                            {previewUrl ? (
                                <div className="space-y-4">
                                    <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-slate-200" />
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="w-full font-bold"
                                        >
                                            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Confirm Upload
                                        </Button>
                                        <Button variant="outline" onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 py-8">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                                        <UploadCloud size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-slate-900">Click to upload</h3>
                                        <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max 800x400px)</p>
                                    </div>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="image-upload"
                                        onChange={handleFileChange}
                                    />
                                    <Label htmlFor="image-upload" className="block">
                                        <Button variant="outline" className="pointer-events-none" asChild>
                                            <span>Select File</span>
                                        </Button>
                                    </Label>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/30">
                        <div className="p-4 bg-white border-b border-slate-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    placeholder="Search images..."
                                    className="pl-10 bg-slate-50 border-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <ScrollArea className="flex-1 p-4">
                            {loading ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {Array(8).fill(0).map((_, i) => (
                                        <div key={i} className="aspect-square bg-slate-200 rounded-lg animate-pulse" />
                                    ))}
                                </div>
                            ) : filteredItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                    <ImageIcon size={48} className="opacity-20 mb-4" />
                                    <p>No images found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {filteredItems.map((item) => (
                                        <button
                                            key={item._id}
                                            onClick={() => { onSelect(item.imageUrl); onOpenChange(false); }}
                                            className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all bg-white hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-[10px] text-white font-bold truncate">{item.title}</p>
                                            </div>
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="bg-white/90 rounded-full p-2 text-primary shadow-sm">
                                                    <CheckCircle size={20} />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ImageSelector;
