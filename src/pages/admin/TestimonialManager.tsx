import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Trash2,
    CheckCircle,
    XCircle,
    MessageSquareQuote,
    Star,
    Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import Loader from "@/components/ui/Loader";

const TestimonialManager = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTestimonials = async () => {
        try {
            const response = await api.get("/testimonials/admin");
            setTestimonials(response.data);
        } catch (error) {
            toast.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleStatusUpdate = async (id: string, currentStatus: boolean) => {
        try {
            const newStatus = !currentStatus;
            await api.put(`/testimonials/${id}`, { isApproved: newStatus });

            setTestimonials(testimonials.map(t =>
                t._id === id ? { ...t, isApproved: newStatus } : t
            ));

            toast.success(`Testimonial ${newStatus ? 'approved' : 'unapproved'}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await api.delete(`/testimonials/${id}`);
            setTestimonials(testimonials.filter(t => t._id !== id));
            toast.success("Testimonial deleted");
        } catch (error) {
            toast.error("Failed to delete testimonial");
        }
    };

    const filteredTestimonials = testimonials.filter(
        (t) =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-muted-foreground">
                        Manage and moderate user reviews
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="w-[40%]">Content</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTestimonials.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    No testimonials found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTestimonials.map((testimonial) => (
                                <TableRow key={testimonial._id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{testimonial.name}</span>
                                            <span className="text-xs text-muted-foreground">{testimonial.email}</span>
                                            {testimonial.designation && (
                                                <span className="text-xs text-muted-foreground italic">{testimonial.designation}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="font-semibold">{testimonial.rating}</span>
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-sm line-clamp-2" title={testimonial.content}>
                                            "{testimonial.content}"
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${testimonial.isApproved
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {testimonial.isApproved ? "Approved" : "Pending"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant={testimonial.isApproved ? "outline" : "default"}
                                                size="sm"
                                                onClick={() => handleStatusUpdate(testimonial._id, testimonial.isApproved)}
                                                className={testimonial.isApproved ? "text-orange-600 hover:text-orange-700" : "bg-green-600 hover:bg-green-700"}
                                            >
                                                {testimonial.isApproved ? (
                                                    <XCircle className="h-4 w-4 mr-1" />
                                                ) : (
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                )}
                                                {testimonial.isApproved ? "Unapprove" : "Approve"}
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(testimonial._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TestimonialManager;
