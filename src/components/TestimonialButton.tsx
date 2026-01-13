import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote, Star, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/lib/api";

const TestimonialButton = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rating: 5,
        content: "",
        designation: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (formData.rating < 1 || formData.rating > 5) {
                toast.error("Please provide a valid rating between 1 and 5");
                return;
            }

            await api.post("/testimonials", formData);
            toast.success("Thank you for your review! It will be visible after approval.");
            setOpen(false);
            setFormData({
                name: "",
                email: "",
                rating: 5,
                content: "",
                designation: "",
            });
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || "Failed to submit review. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="rounded-full h-14 w-14 shadow-lg bg-golden hover:bg-golden/90 text-primary-foreground p-0 transition-transform duration-300 hover:scale-110 border-2 border-white/20 group relative overflow-visible"
                aria-label="Give a review"
            >
                <MessageSquareQuote className="h-7 w-7" />
                <span className="absolute right-full mr-3 bg-black/75 text-white text-sm py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Give a Review
                </span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-center">Share Your Experience</DialogTitle>
                        <DialogDescription className="text-center">
                            We value your feedback! Please rate your experience working with NJR EXIM.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating</Label>
                            <div className="flex gap-2 justify-center py-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`h-8 w-8 ${star <= formData.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted-foreground/30"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="designation">Designation (Optional)</Label>
                            <Input
                                id="designation"
                                value={formData.designation}
                                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                placeholder="CEO, Company Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Review <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="content"
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Share your thoughts about our services..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Review"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TestimonialButton;
