import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Package, Award, MessageSquare, TrendingUp, Users, ArrowUpRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/Loader";

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

    const statCards = [
        { title: "Total Blogs", value: stats.blogs, icon: FileText, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100", trend: "+2.5%" },
        { title: "Total Products", value: stats.products, icon: Package, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100", trend: "+1.2%" },
        { title: "Certificates", value: stats.certificates, icon: Award, color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-100", trend: "Stable" },
        { title: "New Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100", trend: "+4.1%" },
    ];

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                    Dashboard Overview
                </h1>
                <p className="text-slate-500 max-w-2xl">
                    Welcome back! Here's what's happening with NJR EXIM's content management system today.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <Card key={card.title} className={cn("overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group cursor-default", card.border)}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{card.title}</CardTitle>
                            <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110 duration-300", card.bg)}>
                                <card.icon className={cn("h-5 w-5", card.color)} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline justify-between mt-1">
                                <div className="text-3xl font-bold text-slate-900">{card.value}</div>
                                <div className={cn("flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
                                    card.trend.includes('+') ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                                )}>
                                    {card.trend}
                                    {card.trend.includes('+') && <ArrowUpRight className="ml-1 h-3 w-3" />}
                                </div>
                            </div>
                            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all duration-1000 delay-300",
                                    idx === 0 ? "w-[75%] bg-blue-500" :
                                        idx === 1 ? "w-[60%] bg-emerald-500" :
                                            idx === 2 ? "w-[45%] bg-violet-500" : "w-[90%] bg-orange-500"
                                )}></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-slate-200/60 shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/30">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-indigo-500" />
                                Content Management Status
                            </CardTitle>
                            <p className="text-xs text-slate-400">Live monitoring of your site entities</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs h-8">View Detailed Logs</Button>
                    </CardHeader>
                    <CardContent className="pt-8 pb-10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                            <TrendingUp className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">Everything seems to be updated</h3>
                        <p className="text-slate-500 max-w-sm mt-2 text-sm leading-relaxed">
                            Your latest products and blog posts are live. Use the sidebar to manage specific categories or check user inquiries.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-500" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-0 text-sm">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        JS
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-slate-800 font-medium truncate">New inquiry from John Smith</p>
                                        <p className="text-slate-400 text-xs mt-0.5">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 pt-4">
                            <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-xs h-8 py-0">
                                View all activity
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
