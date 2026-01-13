import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash, Image as ImageIcon, Search, FileText, Calendar, MoreVertical, ExternalLink } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
    isPublished: boolean;
    createdAt: string;
}

const BlogManager = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        isPublished: true,
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fetchBlogs = async () => {
        try {
            const { data } = await api.get("/blogs");
            setBlogs(data);
        } catch (error) {
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleOpenDialog = (blog?: Blog) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                content: blog.content,
                isPublished: blog.isPublished,
            });
        } else {
            setEditingBlog(null);
            setFormData({ title: "", content: "", isPublished: true });
        }
        setSelectedFile(null);
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("content", formData.content);
        data.append("isPublished", String(formData.isPublished));
        if (selectedFile) {
            data.append("image", selectedFile);
        }

        try {
            if (editingBlog) {
                await api.put(`/blogs/${editingBlog._id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Blog updated successfully");
            } else {
                await api.post("/blogs", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Blog created successfully");
            }
            setIsDialogOpen(false);
            fetchBlogs();
        } catch (error) {
            toast.error("Failed to save blog");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await api.delete(`/blogs/${id}`);
                toast.success("Blog deleted");
                fetchBlogs();
            } catch (error) {
                toast.error("Failed to delete blog");
            }
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-secondary">Manage Blogs</h1>
                    <p className="text-slate-500 text-sm">Create, edit, and manage your company blog posts.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90 shadow-md shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" /> Add New Post
                </Button>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-0 border-b border-slate-100 bg-white/80">
                    <div className="flex items-center gap-4 pb-4">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500/30"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-slate-100">
                                <TableHead className="w-[100px] font-bold text-slate-700">Preview</TableHead>
                                <TableHead className="font-bold text-slate-700">Post Details</TableHead>
                                <TableHead className="font-bold text-slate-700">Status</TableHead>
                                <TableHead className="font-bold text-slate-700">Date</TableHead>
                                <TableHead className="text-right font-bold text-slate-700 px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <TableRow key={i} className="animate-pulse">
                                        <TableCell><div className="w-12 h-12 bg-slate-100 rounded"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-3/4"></div></TableCell>
                                        <TableCell><div className="h-6 bg-slate-100 rounded w-16"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-24"></div></TableCell>
                                        <TableCell className="text-right"><div className="h-8 bg-slate-100 rounded-full w-8 ml-auto"></div></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredBlogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <FileText size={48} className="mb-2 opacity-20" />
                                            <p className="font-medium">No blog posts found</p>
                                            <p className="text-xs">Try adjusting your search or add a new post.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <TableRow key={blog._id} className="group hover:bg-slate-50/80 transition-colors border-slate-50">
                                        <TableCell>
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                                                {blog.image ? (
                                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-slate-800 line-clamp-1">{blog.title}</span>
                                                <span className="text-xs text-slate-400 line-clamp-1">{blog.content.substring(0, 100)}...</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={blog.isPublished ? "default" : "secondary"} className={cn(
                                                "font-medium px-2 py-0 h-6",
                                                blog.isPublished ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none" : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-none"
                                            )}>
                                                {blog.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200">
                                                        <MoreVertical className="h-4 w-4 text-slate-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => handleOpenDialog(blog)} className="cursor-pointer">
                                                        <Edit className="mr-2 h-4 w-4" /> Edit Post
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-primary focus:text-indigo-700">
                                                        <ExternalLink className="mr-2 h-4 w-4" /> View Live
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleDelete(blog._id)} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                                        <Trash className="mr-2 h-4 w-4" /> Delete Post
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
                            <DialogTitle className="text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-400" />
                                {editingBlog ? "Edit Blog Post" : "Create New Post"}
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 text-xs">
                                {editingBlog ? "Modify existing content and publish settings." : "Fill in the details below to create a new blog post."}
                            </DialogDescription>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-500">Post Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter a compelling title..."
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="border-slate-200 focus:ring-indigo-500/20"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-xs font-bold uppercase tracking-wider text-slate-500">Feature Image</Label>
                                    <div className="flex flex-col gap-3">
                                        <div className="relative group overflow-hidden bg-slate-50 rounded-lg border border-dashed border-slate-200 aspect-video flex items-center justify-center transition-all hover:bg-slate-100 flex-col gap-2">
                                            {selectedFile ? (
                                                <div className="absolute inset-0">
                                                    <img
                                                        src={URL.createObjectURL(selectedFile)}
                                                        className="w-full h-full object-cover"
                                                        alt="Preview"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-xs font-medium">Click to change</span>
                                                    </div>
                                                </div>
                                            ) : editingBlog?.image ? (
                                                <div className="absolute inset-0">
                                                    <img
                                                        src={editingBlog.image}
                                                        className="w-full h-full object-cover"
                                                        alt="Current"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-xs font-medium">Click to replace</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-8 h-8 text-slate-300" />
                                                    <span className="text-slate-400 text-xs">Drop image or click to upload</span>
                                                </>
                                            )}
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400">Recommended size: 1200x630px. Max 2MB.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-xs font-bold uppercase tracking-wider text-slate-500">Body Content</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Write your story here..."
                                        rows={12}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="border-slate-200 focus:ring-indigo-500/20 min-h-[300px] resize-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                                    className={cn(
                                        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2",
                                        formData.isPublished ? "bg-primary" : "bg-slate-200"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                            formData.isPublished ? "translate-x-4" : "translate-x-1"
                                        )}
                                    />
                                </button>
                                <Label htmlFor="isPublished" className="text-sm font-medium text-slate-600">Publish immediately</Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-slate-500 h-10 px-6">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white h-10 px-8">
                                    {editingBlog ? "Save Changes" : "Publish Post"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BlogManager;
