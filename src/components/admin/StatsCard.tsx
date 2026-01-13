import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
    description?: string;
    className?: string;
}

const StatsCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendDirection = "neutral",
    description,
    className,
}: StatsCardProps) => {
    return (
        <Card className={cn("overflow-hidden border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {title}
                </CardTitle>
                <div className="h-9 w-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-slate-800 tracking-tight">{value}</div>
                {(trend || description) && (
                    <div className="flex items-center mt-2 space-x-2 text-xs">
                        {trend && (
                            <div
                                className={cn(
                                    "flex items-center font-medium rounded-full px-2 py-0.5",
                                    trendDirection === "up" && "text-emerald-700 bg-emerald-50",
                                    trendDirection === "down" && "text-red-700 bg-red-50",
                                    trendDirection === "neutral" && "text-slate-700 bg-slate-100"
                                )}
                            >
                                {trendDirection === "up" && <ArrowUpRight className="mr-1 h-3 w-3" />}
                                {trendDirection === "down" && <ArrowDownRight className="mr-1 h-3 w-3" />}
                                {trendDirection === "neutral" && <Minus className="mr-1 h-3 w-3" />}
                                {trend}
                            </div>
                        )}
                        {description && (
                            <p className="text-muted-foreground truncate">{description}</p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StatsCard;
