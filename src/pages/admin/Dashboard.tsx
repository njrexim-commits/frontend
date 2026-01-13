import React, { useState, useEffect } from "react";
import { FileText, Package, Award, MessageSquare, TrendingUp, Users, ArrowUpRight, Activity } from "lucide-react";
import api from "@/lib/api";
import Loader from "@/components/ui/Loader";
import StatsCard from "@/components/admin/StatsCard";
import QuickActions from "@/components/admin/QuickActions";
import ActivityFeed from "@/components/admin/ActivityFeed";

const Dashboard = () => {
    const [stats, setStats] = useState({
        blogs: 0,
        products: 0,
        certificates: 0,
        inquiries: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [blogs, products, certificates, inquiries] = await Promise.all([
                    api.get("/blogs"),
                    api.get("/products"),
                    api.get("/certificates"),
                    api.get("/inquiries")
                ]);
                setStats({
                    blogs: blogs.data.length,
                    products: products.data.length,
                    certificates: certificates.data.length,
                    inquiries: inquiries.data.length
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                    Dashboard
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg">
                    Overview of your platform's performance and content.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Blogs"
                    value={stats.blogs}
                    icon={FileText}
                    trend="+2.5%"
                    trendDirection="up"
                    description="vs last month"
                />
                <StatsCard
                    title="Products"
                    value={stats.products}
                    icon={Package}
                    trendDirection="neutral"
                    description="Total items listed"
                />
                <StatsCard
                    title="Certificates"
                    value={stats.certificates}
                    icon={Award}
                    description="Active certifications"
                />
                <StatsCard
                    title="Inquiries"
                    value={stats.inquiries}
                    icon={MessageSquare}
                    trend="+12%"
                    trendDirection="up"
                    description="New this week"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Quick Actions & System Status */}
                <div className="space-y-8">
                    <QuickActions />

                    {/* System Status Card */}
                    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Activity className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg">System Status</h3>
                            </div>
                            <p className="text-white/80 mb-6 text-sm leading-relaxed">
                                All systems are operational. Your latest backup was successful 3 hours ago.
                            </p>
                            <div className="flex items-center gap-4 text-xs font-medium">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse capitalize"></span>
                                    API Online
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse capitalize"></span>
                                    Database Connected
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    </div>
                </div>

                {/* Right Column: Activity Feed (Spans 2 columns on large screens) */}
                <div className="lg:col-span-2 h-full">
                    <ActivityFeed />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
