import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
    Menu,
    Bell,
    Search,
    LogOut,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = () => {
    const navigate = useNavigate();
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

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/admin/login");
    };

    return (
        <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans selection:bg-primary/10 selection:text-primary">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isMobile={isMobile}
                userInfo={userInfo}
                handleLogout={handleLogout}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative">
                {/* Top Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-secondary/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
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
                            <Search className="w-4 h-4 absolute left-3 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search CMS..."
                                className="pl-9 w-64 bg-slate-100 border-none focus-visible:ring-1 focus-visible:ring-primary/30 text-sm h-9 transition-all"
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
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
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
