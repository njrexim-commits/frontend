import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, User, FileText, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const ActivityFeed = () => {
    // Placeholder data - in a real app this would come from an API
    const activities = [
        {
            id: 1,
            type: "user",
            message: "New user registration",
            detail: "John Doe joined the platform",
            time: "2 mins ago",
            icon: User,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            id: 2,
            type: "content",
            message: "Blog post updated",
            detail: "Agricultural Trends 2026",
            time: "1 hour ago",
            icon: FileText,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            id: 3,
            type: "system",
            message: "System backup completed",
            detail: "Daily database backup success",
            time: "3 hours ago",
            icon: Bell,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            id: 4,
            type: "product",
            message: "New product added",
            detail: "Premium Basmati Rice",
            time: "5 hours ago",
            icon: Package,
            color: "text-violet-500",
            bg: "bg-violet-50",
        },
    ];

    return (
        <Card className="border-slate-200/60 shadow-sm h-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="relative flex gap-4 group">
                            {/* Timeline line */}
                            {index !== activities.length - 1 && (
                                <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-slate-200 group-hover:bg-slate-300 transition-colors" />
                            )}

                            <div className={cn("relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-slate-100 shadow-sm", activity.bg)}>
                                <activity.icon className={cn("w-5 h-5", activity.color)} />
                            </div>

                            <div className="flex-1 pt-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                    {activity.message}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 truncate">
                                    {activity.detail}
                                </p>
                            </div>

                            <div className="text-xs text-slate-400 whitespace-nowrap pt-1">
                                {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ActivityFeed;
