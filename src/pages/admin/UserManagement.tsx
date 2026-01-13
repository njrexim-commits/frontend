import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Trash,
    Edit,
    Users,
    ShieldAlert,
    ShieldCheck,
    User,
    Mail,
    Calendar,
    Search,
    MoreVertical,
    UserPlus,
    UserCog,
    Fingerprint
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

interface UserInfo {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingUser, setEditingUser] = useState<UserInfo | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "admin",
    });

    const fetchUsers = async () => {
        try {
            const { data } = await api.get("/auth/users");
            setUsers(data);
        } catch (error) {
            toast.error("Access Denied: Only Super Admins can manage users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenDialog = (user: UserInfo) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await api.put(`/auth/users/${editingUser._id}`, formData);
                toast.success("User permissions updated");
                setIsDialogOpen(false);
                fetchUsers();
            }
        } catch (error) {
            toast.error("Failed to update user");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to revoke access for this user?")) {
            try {
                await api.delete(`/auth/users/${id}`);
                toast.success("User account removed");
                fetchUsers();
            } catch (error: unknown) {
                toast.error(error instanceof Error && 'response' in error ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to delete user" : "Failed to delete user");
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-secondary">User Governance</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <ShieldAlert className="w-4 h-4 text-primary" />
                        <span>Manage administrative access and role assignments.</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10/50 text-primary border-primary/20 hidden sm:flex">
                        {users.length} Active Personnel
                    </Badge>
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-0 border-b border-slate-100 bg-white/80">
                    <div className="flex items-center gap-4 pb-4">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                placeholder="Search by name or email..."
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
                                <TableHead className="font-bold text-slate-700">Administrator</TableHead>
                                <TableHead className="font-bold text-slate-700">Email Address</TableHead>
                                <TableHead className="font-bold text-slate-700">Access Level</TableHead>
                                <TableHead className="font-bold text-slate-700">Registration</TableHead>
                                <TableHead className="text-right font-bold text-slate-700 px-6">Control</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <TableRow key={i} className="animate-pulse">
                                        <TableCell><div className="h-10 bg-slate-100 rounded w-40"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-48"></div></TableCell>
                                        <TableCell><div className="h-6 bg-slate-100 rounded w-20"></div></TableCell>
                                        <TableCell><div className="h-4 bg-slate-100 rounded w-20"></div></TableCell>
                                        <TableCell className="text-right"><div className="h-8 bg-slate-100 rounded-full w-8 ml-auto"></div></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Users size={48} className="mb-2 opacity-20" />
                                            <p className="font-medium">No users found</p>
                                            <p className="text-xs">Try a different search term.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user._id} className="group hover:bg-slate-50/80 transition-colors border-slate-50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm",
                                                    user.role === 'super-admin'
                                                        ? "bg-primary text-white"
                                                        : "bg-slate-200 text-slate-600"
                                                )}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-secondary">{user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-slate-500 font-medium flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5" />
                                                {user.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "font-bold px-2 py-0.5 h-6 text-[10px] uppercase border",
                                                    user.role === 'super-admin'
                                                        ? "bg-primary/10 text-indigo-700 border-primary/20"
                                                        : "bg-slate-100 text-slate-600 border-slate-200"
                                                )}
                                            >
                                                {user.role === 'super-admin' ? (
                                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                                ) : (
                                                    <ShieldAlert className="w-3 h-3 mr-1 opacity-50" />
                                                )}
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-slate-500 text-xs flex items-center gap-1.5 font-medium">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200">
                                                        <MoreVertical className="h-4 w-4 text-slate-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => handleOpenDialog(user)} className="cursor-pointer">
                                                        <Edit className="mr-2 h-4 w-4" /> Edit Permissions
                                                    </DropdownMenuItem>
                                                    {user.role !== 'super-admin' && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleDelete(user._id)} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                                                <Trash className="mr-2 h-4 w-4" /> Revoke Access
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
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
                <DialogContent className="sm:max-w-md overflow-hidden p-0 border-none shadow-2xl">
                    <div className="bg-secondary px-8 py-6 flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-white flex items-center gap-2 text-xl font-extrabold tracking-tight">
                                <UserCog className="w-5 h-5 text-indigo-400" />
                                Account Setting
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 text-xs text-balance font-medium">
                                Update administrator privileges and profile information.
                            </DialogDescription>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <User className="w-3 h-3" /> Full Identity
                                </Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="border-slate-200 focus:ring-indigo-500/20 h-11 bg-slate-50/50 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Mail className="w-3 h-3" /> Communication Email
                                </Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="border-slate-200 focus:ring-indigo-500/20 h-11 bg-slate-50/50 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Fingerprint className="w-3 h-3" /> Security Role Assignment
                                </Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                                >
                                    <SelectTrigger className="border-slate-200 focus:ring-indigo-500/20 h-11 bg-slate-50/50 font-bold">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin" className="font-medium">
                                            Standard Administrator
                                        </SelectItem>
                                        <SelectItem value="super-admin" className="font-bold text-primary">
                                            Super Administrator
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-[10px] text-slate-400 mt-2 italic px-1">
                                    * Super admins have full access to user governance and system settings.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white h-12 font-extrabold shadow-xl shadow-slate-900/20 text-sm transition-all focus:scale-[0.98]">
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Commit Permission Changes
                            </Button>
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="w-full text-slate-400 h-10 text-xs font-bold tracking-widest uppercase hover:bg-slate-50">
                                Discard Edit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserManagement;
