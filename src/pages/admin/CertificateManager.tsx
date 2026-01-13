import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash, FileText, Award, Search, MoreVertical, ExternalLink, ShieldCheck, Download, AlertCircle, Eye, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Certificate {
    _id: string;
    title: string;
    issuer: string;
    fileUrl: string;
}

const CertificateManager = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({ title: "", issuer: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fetchCertificates = async () => {
        try {
            const { data } = await api.get("/certificates");
            setCertificates(data);
        } catch (error) {
            toast.error("Failed to fetch certificates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return toast.error("Please select a file");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("issuer", formData.issuer);
        data.append("file", selectedFile);

        try {
            await api.post("/certificates", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Certificate uploaded successfully");
            setIsDialogOpen(false);
            setFormData({ title: "", issuer: "" });
            setSelectedFile(null);
            fetchCertificates();
        } catch (error) {
            toast.error("Failed to add certificate");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this certificate?")) {
            try {
                await api.delete(`/certificates/${id}`);
                toast.success("Certificate removed");
                fetchCertificates();
            } catch (error) {
                toast.error("Failed to delete certificate");
            }
        }
    };

    const filteredCertificates = certificates.filter(cert =>
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Compliance & Certs</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Manage your organization's legal and quality certifications.</span>
                    </div>
                </div>
                <Button onClick={() => setIsDialogOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Certificate
                </Button>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-0 border-b border-slate-100 bg-white/80">
                    <div className="flex items-center gap-4 pb-4">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                placeholder="Search by title or issuer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500/30 font-medium"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-slate-100">
                                <TableHead className="w-[60px]"></TableHead>
                                <TableHead className="font-bold text-slate-700">Certificate Detail</TableHead>
                                <TableHead className="font-bold text-slate-700">Issuing Authority</TableHead>
                                <TableHead className="text-right font-bold text-slate-700 px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <TableRow key={i} className="animate-pulse">
                                        <TableCell><div className="w-8 h-8 bg-slate-100 rounded"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-48"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-32"></div></TableCell>
                                        <TableCell className="text-right"><div className="h-8 bg-slate-100 rounded-full w-8 ml-auto"></div></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredCertificates.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <ShieldCheck size={48} className="mb-2 opacity-20" />
                                            <p className="font-medium">No certificates found</p>
                                            <p className="text-xs">Keep your credibility high by uploading your certifications.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCertificates.map((cert) => (
                                    <TableRow key={cert._id} className="group hover:bg-slate-50/80 transition-colors border-slate-50">
                                        <TableCell>
                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                                <FileText size={18} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800">{cert.title}</span>
                                                <a
                                                    href={cert.fileUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[10px] text-indigo-500 hover:underline flex items-center mt-0.5"
                                                >
                                                    View Source File <ExternalLink size={10} className="ml-1" />
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                                                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                                {cert.issuer}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" asChild title="View Document">
                                                    <a href={cert.fileUrl} target="_blank" rel="noreferrer">
                                                        <Eye size={16} />
                                                    </a>
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200">
                                                            <MoreVertical className="h-4 w-4 text-slate-500" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <DropdownMenuItem asChild className="cursor-pointer">
                                                            <a href={cert.fileUrl} target="_blank" rel="noreferrer">
                                                                <Download className="mr-2 h-4 w-4" /> Download PDF
                                                            </a>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(cert._id)} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                                            <Trash className="mr-2 h-4 w-4" /> Remove Document
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md overflow-hidden p-0 border-none shadow-2xl">
                    <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-white flex items-center gap-2 text-lg font-bold">
                                <Award className="w-5 h-5 text-amber-400" />
                                New Certification
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 text-xs text-balance">
                                Upload a scanned copy of your official certification document.
                            </DialogDescription>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Document Title</Label>
                                <Input
                                    placeholder="e.g. ISO 9001:2015 Quality Management"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="border-slate-200 focus:ring-indigo-500/20 h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Issuing Authority</Label>
                                <Input
                                    placeholder="e.g. International Organization for Standardization"
                                    value={formData.issuer}
                                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                    required
                                    className="border-slate-200 focus:ring-indigo-500/20 h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Certification File</Label>
                                <div className="relative group transition-all">
                                    <div className={cn(
                                        "min-h-[100px] bg-slate-50 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all group-hover:bg-slate-100",
                                        selectedFile ? "border-indigo-300 bg-indigo-50/30" : "border-slate-200"
                                    )}>
                                        {selectedFile ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-white shadow-sm flex items-center justify-center text-indigo-600">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-800 max-w-[200px] truncate">{selectedFile.name}</span>
                                                    <span className="text-[10px] text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setSelectedFile(null); }}
                                                    className="ml-2 p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-red-500"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <ShieldCheck className="w-8 h-8 text-slate-300 mb-1" />
                                                <p className="text-[11px] font-medium text-slate-500 text-center">Drag document here or click to browse</p>
                                                <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter">PDF, JPG, PNG accepted • Max 5MB</p>
                                            </>
                                        )}
                                        <Input
                                            type="file"
                                            accept=".pdf,image/*"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required={!selectedFile}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 font-bold shadow-lg shadow-slate-900/10">
                                <Award className="w-4 h-4 mr-2" />
                                Upload & Verify
                            </Button>
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="w-full text-slate-400 h-10 text-xs">
                                Cancel Operation
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CertificateManager;
