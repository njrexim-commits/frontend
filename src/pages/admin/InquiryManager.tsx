import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
    Trash,
    MessageSquare,
    Mail,
    Phone,
    Search,
    MoreVertical,
    CheckCircle2,
    Clock,
    Calendar,
    Eye,
    Inbox,
    Filter,
    Reply
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import StatsCard from "@/components/admin/StatsCard";

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

const InquiryManager = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const fetchInquiries = async () => {
        try {
            const { data } = await api.get("/inquiries");
            setInquiries(data);
        } catch (error) {
            toast.error("Failed to fetch inquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await api.put(`/inquiries/${id}`, { status });
            toast.success(`Marked as ${status}`);
            fetchInquiries();
            if (selectedInquiry?._id === id) {
                setSelectedInquiry({ ...selectedInquiry, status });
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            try {
                await api.delete(`/inquiries/${id}`);
                toast.success("Inquiry deleted");
                fetchInquiries();
                if (selectedInquiry?._id === id) {
                    setIsViewOpen(false);
                }
            } catch (error) {
                toast.error("Failed to delete inquiry");
            }
        }
    };

    const handleViewInquiry = (iq: Inquiry) => {
        setSelectedInquiry(iq);
        setIsViewOpen(true);
        if (iq.status === 'new') {
            handleStatusChange(iq._id, 'read');
        }
    };

    const filteredInquiries = inquiries.filter(iq => {
        const matchesSearch =
            iq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            iq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            iq.subject.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = statusFilter === "all" || iq.status === statusFilter;

        return matchesSearch && matchesFilter;
    });

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'new':
                return "bg-primary/10 text-primary border-primary/20";
            case 'read':
                return "bg-amber-50 text-amber-600 border-amber-100";
            case 'resolved':
                return "bg-emerald-50 text-emerald-700 border-emerald-100";
            default:
                return "bg-slate-50 text-slate-500 border-slate-100";
        }
    };

    // Stats
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(i => i.status === 'new').length;
    const resolvedInquiries = inquiries.filter(i => i.status === 'resolved').length;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Inquiry Inbox</h1>
                    <p className="text-slate-500 text-sm">Manage and respond to customer inquiries from the contact form.</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Inquiries"
                    value={totalInquiries}
                    icon={Inbox}
                    description="All time messages"
                />
                <StatsCard
                    title="New Messages"
                    value={newInquiries}
                    icon={Mail}
                    className="border-primary/20"
                    description="Waiting for response"
                    trendDirection="up"
                />
                <StatsCard
                    title="Resolved"
                    value={resolvedInquiries}
                    icon={CheckCircle2}
                    description="Successfully closed"
                    className="border-emerald-100"
                />
            </div>

            {/* Main Content */}
            <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-0 border-b border-slate-100 bg-white/80 px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-primary/30 font-medium h-10 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline-block">Status:</span>
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                {["all", "new", "read", "resolved"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all",
                                            statusFilter === status
                                                ? "bg-white text-primary shadow-sm"
                                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                        )}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-slate-100">
                                <TableHead className="font-bold text-slate-700 w-[250px]">Sender Details</TableHead>
                                <TableHead className="font-bold text-slate-700">Subject/Message</TableHead>
                                <TableHead className="font-bold text-slate-700 w-[120px]">Status</TableHead>
                                <TableHead className="font-bold text-slate-700 w-[150px]">Received</TableHead>
                                <TableHead className="text-right font-bold text-slate-700 px-6 w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <TableRow key={i} className="animate-pulse">
                                        <TableCell><div className="h-10 bg-slate-100 rounded w-40"></div></TableCell>
                                        <TableCell><div className="h-10 bg-slate-100 rounded w-full"></div></TableCell>
                                        <TableCell><div className="h-6 bg-slate-100 rounded w-20"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-24"></div></TableCell>
                                        <TableCell className="text-right"><div className="h-8 bg-slate-100 rounded-full w-8 ml-auto"></div></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredInquiries.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Inbox size={48} className="mb-2 opacity-20" />
                                            <p className="font-medium">No inquiries found</p>
                                            <p className="text-xs max-w-[200px] mt-1">Your inbox is clean for now or no messages match your search.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredInquiries.map((iq) => (
                                    <TableRow
                                        key={iq._id}
                                        className={cn(
                                            "group hover:bg-slate-50/80 transition-colors border-slate-50 cursor-pointer",
                                            iq.status === 'new' ? "bg-primary/5" : ""
                                        )}
                                        onClick={() => handleViewInquiry(iq)}
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm shrink-0 border",
                                                    iq.status === 'new'
                                                        ? "bg-primary text-white border-primary/20"
                                                        : "bg-white text-slate-500 border-slate-200"
                                                )}>
                                                    {iq.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <span className={cn("text-secondary truncate block max-w-[180px]", iq.status === 'new' ? "font-bold" : "font-medium")}>{iq.name}</span>
                                                    <span className="text-[11px] text-slate-500 flex items-center gap-1 truncate max-w-[180px]">
                                                        {iq.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5 max-w-xl">
                                                <span className={cn("text-slate-900 text-sm block truncate", iq.status === 'new' && "font-bold")}>{iq.subject || "(No Subject)"}</span>
                                                <span className="text-xs text-slate-500 truncate block">{iq.message}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn("font-bold px-2 py-0.5 h-6 text-[10px] uppercase tracking-wider", getStatusStyles(iq.status))}>
                                                {iq.status === 'new' && <div className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />}
                                                {iq.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-slate-500 text-xs flex items-center gap-1.5 font-medium">
                                                <Calendar className="w-3 h-3 text-slate-400" />
                                                {new Date(iq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-6" onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200 text-slate-400 hover:text-slate-600">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => handleViewInquiry(iq)} className="cursor-pointer font-medium">
                                                        <Eye className="mr-2 h-4 w-4 text-slate-400" /> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    {iq.status !== 'resolved' && (
                                                        <DropdownMenuItem onClick={() => handleStatusChange(iq._id, 'resolved')} className="cursor-pointer text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50 font-medium">
                                                            <CheckCircle2 className="mr-2 h-4 w-4" /> Resolve Ticket
                                                        </DropdownMenuItem>
                                                    )}
                                                    {iq.status !== 'read' && (
                                                        <DropdownMenuItem onClick={() => handleStatusChange(iq._id, 'read')} className="cursor-pointer font-medium">
                                                            <Clock className="mr-2 h-4 w-4 text-amber-500" /> Mark as Read
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem asChild className="cursor-pointer font-medium">
                                                        <a href={`mailto:${iq.email}?subject=Re: ${iq.subject}`}>
                                                            <Reply className="mr-2 h-4 w-4 text-blue-500" /> Reply via Email
                                                        </a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleDelete(iq._id)} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 font-medium">
                                                        <Trash className="mr-2 h-4 w-4" /> Delete Record
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

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-2xl overflow-hidden p-0 border-none shadow-2xl bg-white">
                    <div className="bg-secondary px-8 py-6 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-slate-900/20 border-2 border-white/10">
                                {selectedInquiry?.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <DialogTitle className="text-white font-bold text-xl leading-none tracking-tight">{selectedInquiry?.name}</DialogTitle>
                                <DialogDescription className="text-slate-400 text-xs mt-1.5 font-medium flex items-center gap-2">
                                    <span className="opacity-70">ID: {selectedInquiry?._id.substring(0, 8)}</span>
                                </DialogDescription>
                            </div>
                        </div>
                        <Badge variant="outline" className={cn("font-bold px-4 py-1.5 text-xs uppercase tracking-wider backdrop-blur-md bg-white/10 border-white/20 text-white", selectedInquiry?.status === 'resolved' ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-100" : "")}>
                            {selectedInquiry?.status}
                        </Badge>
                    </div>

                    <div className="p-8 space-y-8 bg-white max-h-[70vh] overflow-y-auto scrollbar-hide">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-100">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Email</Label>
                                    <a href={`mailto:${selectedInquiry?.email}`} className="flex items-center gap-2.5 text-slate-900 font-bold group cursor-pointer hover:text-primary transition-colors text-sm">
                                        <div className="p-1.5 bg-slate-100 rounded-md text-slate-500 group-hover:text-primary transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        {selectedInquiry?.email}
                                    </a>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Number</Label>
                                    <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                                        <div className="p-1.5 bg-slate-100 rounded-md text-slate-500">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        {selectedInquiry?.phone || "Not provided"}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Date Received</Label>
                                    <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                                        <div className="p-1.5 bg-slate-100 rounded-md text-slate-500">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        {selectedInquiry && new Date(selectedInquiry.createdAt).toLocaleString(undefined, {
                                            dateStyle: 'full',
                                            timeStyle: 'short'
                                        })}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message Subject</Label>
                                    <div className="text-slate-900 font-bold text-sm">
                                        {selectedInquiry?.subject || "(No Subject)"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2.5">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Detailed Message
                            </Label>
                            <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 leading-7 text-sm whitespace-pre-wrap border border-slate-100 shadow-inner">
                                {selectedInquiry?.message}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => selectedInquiry && handleDelete(selectedInquiry._id)}
                            className="h-10 px-5 shadow-sm bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500 font-bold"
                        >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                        <div className="flex items-center gap-3">
                            <Button asChild variant="outline" className="h-10 border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 font-bold">
                                <a href={`mailto:${selectedInquiry?.email}?subject=Re: ${selectedInquiry?.subject}`}>
                                    <Reply className="w-4 h-4 mr-2" />
                                    Reply via Email
                                </a>
                            </Button>
                            {selectedInquiry?.status !== 'resolved' && (
                                <Button
                                    onClick={() => selectedInquiry && handleStatusChange(selectedInquiry._id, 'resolved')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white h-10 px-6 shadow-lg shadow-emerald-900/20 font-bold"
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Mark Resolved
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InquiryManager;
