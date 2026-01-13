import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Image as ImageIcon, Award, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        {
            label: "New Blog Post",
            icon: FileText,
            onClick: () => navigate("/admin/blogs?action=new"),
            color: "text-blue-500",
            bg: "bg-blue-50 hover:bg-blue-100",
        },
        {
            label: "Add Product",
            icon: PlusCircle,
            onClick: () => navigate("/admin/products?action=new"),
            color: "text-emerald-500",
            bg: "bg-emerald-50 hover:bg-emerald-100",
        },
        {
            label: "Upload Image",
            icon: ImageIcon,
            onClick: () => navigate("/admin/gallery?action=upload"),
            color: "text-violet-500",
            bg: "bg-violet-50 hover:bg-violet-100",
        },
        {
            label: "Add Certificate",
            icon: Award,
            onClick: () => navigate("/admin/certifications?action=new"),
            color: "text-amber-500",
            bg: "bg-amber-50 hover:bg-amber-100",
        },
    ];

    return (
        <Card className="border-slate-200/60 shadow-sm h-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {actions.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200 space-y-2 group ${action.bg}`}
                    >
                        <div className={`p-2 rounded-full bg-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-200`}>
                            <action.icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{action.label}</span>
                    </button>
                ))}
            </CardContent>
        </Card>
    );
};

export default QuickActions;
