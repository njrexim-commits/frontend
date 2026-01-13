import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Plus, Edit, Trash, Package, Search, MoreVertical, Star, Layers, ImageIcon, X, ChevronRight, LayoutGrid } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    images: string[];
    isFeatured: boolean;
}

const ProductManager = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        isFeatured: false,
    });
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products");
            setProducts(data);
        } catch (error) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenDialog = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                category: product.category,
                isFeatured: product.isFeatured,
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: "", description: "", category: "", isFeatured: false });
        }
        setSelectedFiles(null);
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("isFeatured", String(formData.isFeatured));

        if (selectedFiles) {
            Array.from(selectedFiles).forEach((file) => {
                data.append("images", file);
            });
        }

        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct._id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Product updated successfully");
            } else {
                await api.post("/products", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Product created successfully");
            }
            setIsDialogOpen(false);
            fetchProducts();
        } catch (error) {
            toast.error("Failed to save product");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/products/${id}`);
                toast.success("Product deleted");
                fetchProducts();
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-secondary">Product Catalog</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Package className="w-4 h-4" />
                        <span>Manage your export product inventory and featured items.</span>
                    </div>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90 shadow-md shadow-blue-600/20">
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-0 border-b border-slate-100 bg-white/80">
                    <div className="flex items-center gap-4 pb-4">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                placeholder="Search by name or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-blue-500/30"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-slate-100">
                                <TableHead className="w-[80px] font-bold text-slate-700">Image</TableHead>
                                <TableHead className="font-bold text-slate-700">Product Info</TableHead>
                                <TableHead className="font-bold text-slate-700">Category</TableHead>
                                <TableHead className="font-bold text-slate-700 text-center">Featured</TableHead>
                                <TableHead className="text-right font-bold text-slate-700 px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <TableRow key={i} className="animate-pulse">
                                        <TableCell><div className="w-12 h-12 bg-slate-100 rounded"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-48"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-24"></div></TableCell>
                                        <TableCell><div className="h-5 bg-slate-100 rounded-full w-12 mx-auto"></div></TableCell>
                                        <TableCell className="text-right"><div className="h-8 bg-slate-100 rounded-full w-8 ml-auto"></div></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Package size={48} className="mb-2 opacity-20" />
                                            <p className="font-medium">No products found</p>
                                            <p className="text-xs">Start building your catalog by adding a new product.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow key={product._id} className="group hover:bg-slate-50/80 transition-colors border-slate-50">
                                        <TableCell>
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Package size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-slate-800">{product.name}</span>
                                                <span className="text-xs text-slate-400 line-clamp-1 max-w-xs">{product.description}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <Layers className="w-3 h-3 text-slate-400" />
                                                <span className="text-sm text-slate-600 font-medium">{product.category}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {product.isFeatured ? (
                                                <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-100 px-2 py-0 h-6">
                                                    <Star className="w-3 h-3 mr-1 fill-amber-500" />
                                                    Featured
                                                </Badge>
                                            ) : (
                                                <span className="text-xs text-slate-300">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200">
                                                        <MoreVertical className="h-4 w-4 text-slate-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => handleOpenDialog(product)} className="cursor-pointer">
                                                        <Edit className="mr-2 h-4 w-4" /> Edit Product
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleDelete(product._id)} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                                        <Trash className="mr-2 h-4 w-4" /> Delete Product
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-2xl overflow-hidden p-0 border-none shadow-2xl">
                    <div className="bg-secondary px-6 py-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-white flex items-center gap-2 text-xl font-bold">
                                <Package className="w-5 h-5 text-blue-400" />
                                {editingProduct ? "Update Product" : "New Inventory Item"}
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 text-xs">
                                Enter precise details for the international market catalog.
                            </DialogDescription>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Product Identity</Label>
                                    <Input
                                        placeholder="Product Name (e.g. Basmati Rice Extra Long)"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="border-slate-200 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Market Category</Label>
                                    <Input
                                        placeholder="Category (e.g. Grains, Spices)"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                        className="border-slate-200 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Visual Assets (Multi-upload)</Label>
                                    <div className="relative group min-h-[140px] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 transition-all hover:bg-slate-100 hover:border-blue-300">
                                        <LayoutGrid className="w-8 h-8 text-slate-300 mb-2" />
                                        <p className="text-xs font-medium text-slate-500">Select up to 5 images</p>
                                        <p className="text-[10px] text-slate-400 mt-1">Drag and drop or click to browse</p>
                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => setSelectedFiles(e.target.files)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    {selectedFiles && selectedFiles.length > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                                {selectedFiles.length} files selected
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Detailed Description</Label>
                                    <Textarea
                                        placeholder="Technical specifications, origin, and quality standards..."
                                        rows={8}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        className="border-slate-200 focus:ring-blue-500/20 resize-none h-[210px]"
                                    />
                                </div>

                                <div
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer",
                                        formData.isFeatured ? "bg-amber-50/50 border-amber-200" : "bg-slate-50 border-slate-100"
                                    )}
                                    onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            formData.isFeatured ? "bg-amber-100 text-amber-600" : "bg-slate-200 text-slate-400"
                                        )}>
                                            <Star className={cn("w-5 h-5", formData.isFeatured && "fill-amber-500")} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Featured Product</p>
                                            <p className="text-[10px] text-slate-500">Display prominently on home page</p>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "w-10 h-5 rounded-full relative transition-colors",
                                        formData.isFeatured ? "bg-amber-500" : "bg-slate-300"
                                    )}>
                                        <div className={cn(
                                            "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                            formData.isFeatured ? "right-1" : "left-1"
                                        )} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-slate-500 px-6">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white px-8 min-w-[140px] shadow-lg shadow-slate-900/10">
                                {editingProduct ? "Update Catalog" : "Add to Catalog"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductManager;
