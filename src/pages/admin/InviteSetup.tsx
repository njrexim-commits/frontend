import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ShieldCheck, CheckCircle } from "lucide-react";
import api from "@/lib/api";

const InviteSetup = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (!token) {
            toast.error("Invalid invitation link");
            navigate("/admin/login");
        }
    }, [token, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/accept-invite", {
                token,
                password: formData.password,
                name: formData.name
            });
            setSuccess(true);
            toast.success("Account set up successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to set up account");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-2 border-green-100 shadow-xl">
                    <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-700">All Set!</CardTitle>
                        <CardDescription>
                            Your admin account has been successfully configured.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <Button className="w-full h-11 text-base font-bold bg-green-600 hover:bg-green-700" asChild>
                            <Link to="/admin/login">
                                Go to Admin Login
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-xl">
                <CardHeader className="text-center space-y-2 pb-6 border-b border-slate-100 bg-white rounded-t-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-800">
                        Top Gun Setup
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        Complete your admin profile to access the dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-white rounded-b-xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Wingman Name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 mt-4 text-base font-bold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Setting up...
                                </>
                            ) : (
                                "Complete Setup"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default InviteSetup;
