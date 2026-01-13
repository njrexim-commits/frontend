import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Package,
    Award,
    Image as ImageIcon,
    MessageSquare,
    MessageSquareQuote,
    Monitor,
    Users,
    ShieldAlert,
    LogOut,
    X,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    isMobile: boolean;
    userInfo: any;
    handleLogout: () => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile, userInfo, handleLogout }: SidebarProps) => {
    const location = useLocation();
    const isSuperAdmin = userInfo.role === "super-admin";

    const menuGroups = [
        {
            title: "Overview",
            items: [
                { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" }
            ]
        },
        {
            title: "Content",
            items: [
                { title: "Blogs", icon: FileText, path: "/admin/blogs" },
                { title: "Products", icon: Package, path: "/admin/products" },
                { title: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
                { title: "Certificates", icon: Award, path: "/admin/certificates" }
            ]
        },
        {
            title: "Management",
            items: [
                { title: "Inquiries", icon: MessageSquare, path: "/admin/inquiries" },
                { title: "Testimonials", icon: MessageSquareQuote, path: "/admin/testimonials" },
                { title: "Pages", icon: Monitor, path: "/admin/pages" }
            ]
        },
        ...(isSuperAdmin ? [{
            title: "System",
            items: [
                { title: "Users", icon: Users, path: "/admin/users" },
                { title: "Settings", icon: ShieldAlert, path: "/admin/settings" }
            ]
        }] : [])
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "bg-secondary text-slate-300 w-64 flex flex-col fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 border-r border-secondary/80",
                !sidebarOpen && "-translate-x-full md:w-20"
            )}>
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-secondary/80 shrink-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <img src="/sitelogo.png" alt="NJR Admin" className="h-8 w-auto object-contain" />
                        <span className={cn(
                            "text-lg font-bold text-white transition-all duration-300 whitespace-nowrap",
                            !sidebarOpen && "opacity-0 w-0 translate-x-[-10px] md:hidden"
                        )}>
                            NJR Admin
                        </span>
                    </div>
                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(false)}
                            className="text-slate-400 hover:text-white hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    )}
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 scrollbar-hide">
                    {menuGroups.map((group, groupIndex) => (
                        <div key={group.title}>
                            {/* Group Title - Only show if sidebar is open */}
                            <div className={cn(
                                "px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider transition-opacity duration-300",
                                !sidebarOpen && "md:hidden"
                            )}>
                                {group.title}
                            </div>

                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => isMobile && setSidebarOpen(false)}
                                            className={cn(
                                                "flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 group relative",
                                                isActive
                                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                    : "hover:bg-white/5 hover:text-white text-slate-400"
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "w-5 h-5 shrink-0 transition-colors",
                                                isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                            )} />

                                            <span className={cn(
                                                "ml-3 font-medium transition-all duration-300 whitespace-nowrap",
                                                !sidebarOpen && "opacity-0 w-0 md:hidden"
                                            )}>
                                                {item.title}
                                            </span>

                                            {/* Tooltip for collapsed mode */}
                                            {!sidebarOpen && !isMobile && (
                                                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl border border-slate-700">
                                                    {item.title}
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Separator between groups (except last) */}
                            {groupIndex !== menuGroups.length - 1 && (
                                <div className={cn(
                                    "my-4 border-t border-white/5 mx-3",
                                    !sidebarOpen && "md:hidden"
                                )} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer User Profile / Logout */}
                <div className="p-4 border-t border-white/5 shrink-0 bg-black/20">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className={cn(
                            "w-full flex items-center px-3 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group",
                            !sidebarOpen && "justify-center px-0"
                        )}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className={cn(
                            "ml-3 font-medium transition-all duration-300",
                            !sidebarOpen && "hidden"
                        )}>
                            Logout
                        </span>
                        {!sidebarOpen && !isMobile && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl border border-slate-700">
                                Logout
                            </div>
                        )}
                    </Button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
