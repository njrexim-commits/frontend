import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Package,
    Award,
    Image as ImageIcon,
    MessageSquare,
    LogOut,
    Menu,
    X,
    Users,
    ShieldAlert,
    Bell,
    Search,
    User,
    Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            navigate("/admin/login");
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [navigate]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const isSuperAdmin = userInfo.role === "super-admin";

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/admin/login");
    };

    const menuItems = [
        { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { title: "Blogs", icon: FileText, path: "/admin/blogs" },
        { title: "Products", icon: Package, path: "/admin/products" },
        { title: "Certificates", icon: Award, path: "/admin/certificates" },
        { title: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
        { title: "Inquiries", icon: MessageSquare, path: "/admin/inquiries" },
        { title: "Pages", icon: Monitor, path: "/admin/pages" },
        ...(isSuperAdmin ? [
            { title: "Users", icon: Users, path: "/admin/users" },
            { title: "Settings", icon: ShieldAlert, path: "/admin/settings" }
        ] : []),
    ];

    return (
        <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-700">
            {/* Sidebar Overlay for Mobile */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "bg-slate-900 text-slate-300 w-64 flex flex-col fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 border-r border-slate-800",
                !sidebarOpen && "-translate-x-full md:w-20"
            )}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-5 h-5 text-white" />
                        </div>
                        <span className={cn("text-lg font-bold text-white transition-opacity duration-300 whitespace-nowrap", !sidebarOpen && "opacity-0 md:hidden")}>
                            NJR Admin
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                        : "hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 shrink-0 transition-colors",
                                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                )} />
                                <span className={cn(
                                    "ml-3 font-medium transition-all duration-300 whitespace-nowrap",
                                    !sidebarOpen && "opacity-0 md:hidden"
                                )}>
                                    {item.title}
                                </span>
                                {!sidebarOpen && !isMobile && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                        {item.title}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-slate-800 shrink-0">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className={cn(
                            "w-full flex items-center px-3 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group",
                            !sidebarOpen && "justify-center px-0"
                        )}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className={cn("ml-3 font-medium", !sidebarOpen && "hidden")}>Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative">
                {/* Top Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-slate-500 hover:bg-slate-100 hidden md:flex"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="text-slate-500 hover:bg-slate-100 md:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>

                        <div className="hidden sm:flex items-center relative group">
                            <Search className="w-4 h-4 absolute left-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                placeholder="Search CMS..."
                                className="pl-9 w-64 bg-slate-100 border-none focus-visible:ring-1 focus-visible:ring-indigo-500/30 text-sm h-9 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-500 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </Button>

                        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 rounded-full flex items-center gap-2 px-2 hover:bg-slate-100">
                                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                        {userInfo.name?.charAt(0).toUpperCase() || 'A'}
                                    </div>
                                    <div className="hidden md:flex flex-col items-start leading-none gap-0.5">
                                        <span className="text-xs font-semibold text-slate-700">{userInfo.name || 'Admin'}</span>
                                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{userInfo.role || 'User'}</span>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Profile Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Content Container */}
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="max-w-[1600px] mx-auto p-4 md:p-8 animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
