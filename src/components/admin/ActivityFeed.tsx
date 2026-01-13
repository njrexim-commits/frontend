import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, User, FileText, Package, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { toast } from "sonner";
import { formatDistanceToNow } from 'date-fns';

const ActivityFeed = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const { data } = await api.get('/activity');
                setActivities(data);
            } catch (error) {
                console.error("Failed to fetch activity");
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'user': return User;
            case 'product': return Package;
            case 'content': return FileText;
            case 'media': return ImageIcon;
            default: return Bell;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'user': return "text-blue-500";
            case 'product': return "text-violet-500";
            case 'content': return "text-emerald-500";
            case 'media': return "text-pink-500";
            default: return "text-amber-500";
        }
    };

    const getBg = (type: string) => {
        switch (type) {
            case 'user': return "bg-blue-50";
            case 'product': return "bg-violet-50";
            case 'content': return "bg-emerald-50";
            case 'media': return "bg-pink-50";
            default: return "bg-amber-50";
        }
    };

    if (loading) {
        return (
            <Card className="border-slate-200/60 shadow-sm h-full flex items-center justify-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
        );
    }

    return (
        <Card className="border-slate-200/60 shadow-sm h-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {activities.length === 0 ? (
                        <div className="text-center text-slate-400 py-8">
                            No recent activity found.
                        </div>
                    ) : (
                        activities.map((activity, index) => {
                            const Icon = getIcon(activity.type);
                            return (
                                <div key={index} className="relative flex gap-4 group">
                                    {/* Timeline line */}
                                    {index !== activities.length - 1 && (
                                        <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-slate-200 group-hover:bg-slate-300 transition-colors" />
                                    )}

                                    <div className={cn("relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-slate-100 shadow-sm", getBg(activity.type))}>
                                        <Icon className={cn("w-5 h-5", getColor(activity.type))} />
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
                                        {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ActivityFeed;
