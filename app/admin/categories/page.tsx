"use client";

import { useEffect, useState } from "react";
import { adminToursAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Loader2 } from "lucide-react";

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { toast } = useToast();

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        isActive: true,
    });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await adminToursAPI.listCategories();
            if (response.success) {
                setCategories(response.data);
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Failed to fetch categories",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenDialog = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                slug: category.slug,
                description: category.description || "",
                isActive: category.isActive,
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: "",
                slug: "",
                description: "",
                isActive: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from name if editing name and not manually changed slug yet
            if (name === "name" && !editingCategory) {
                newData.slug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            let response;
            if (editingCategory) {
                response = await adminToursAPI.updateCategory(editingCategory._id, formData);
            } else {
                response = await adminToursAPI.createCategory(formData);
            }

            if (response.success) {
                toast({
                    title: "Success",
                    description: `Category ${editingCategory ? "updated" : "created"} successfully`,
                });
                setIsDialogOpen(false);
                fetchCategories();
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Operation failed",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 text-sm">
                        Manage tour categories for organizing your packages.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="cursor-pointer transition-all"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Slug</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Created At</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary/60" />
                                    <p className="mt-2 text-gray-500 animate-pulse">Loading categories...</p>
                                </TableCell>
                            </TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <p>No categories found.</p>
                                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog()} className="cursor-pointer">
                                            Create your first category
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map((category) => (
                                <TableRow
                                    key={category._id}
                                    className="group hover:bg-gray-50/80 transition-colors duration-200"
                                >
                                    <TableCell className="font-medium text-gray-900">{category.name}</TableCell>
                                    <TableCell className="text-gray-500 font-mono text-xs">{category.slug}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 ${category.isActive
                                                    ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                                                    : "bg-gray-50 text-gray-600 ring-1 ring-gray-500/20"
                                                }`}
                                        >
                                            {category.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {new Date(category.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleOpenDialog(category)}
                                            className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="category-dialog sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <DialogHeader className="p-6 pb-4 bg-gray-50/50 border-b">
                            <DialogTitle className="text-xl font-bold text-gray-900">
                                {editingCategory ? "Edit Category" : "Add New Category"}
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {editingCategory
                                    ? "Update the details of the category."
                                    : "Create a new category for your tour packages."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-6 space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Adventure Tours"
                                    className="focus-visible:ring-primary/30 transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-sm font-semibold text-gray-700">Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    placeholder="e.g. adventure-tours"
                                    className="font-mono text-sm bg-gray-50 focus-visible:ring-primary/30 transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Brief description of the category"
                                    className="resize-none focus-visible:ring-primary/30 transition-all duration-200"
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all hover:border-primary/20">
                                <div className="space-y-0.5">
                                    <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">Active Status</Label>
                                    <p className="text-xs text-gray-500">Enable or disable this category</p>
                                </div>
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({ ...prev, isActive: checked }))
                                    }
                                    className="cursor-pointer data-[state=checked]:bg-primary"
                                />
                            </div>
                        </div>

                        <DialogFooter className="p-6 pt-2 flex items-center gap-3 bg-gray-50/50 border-t">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                disabled={submitting}
                                className="cursor-pointer hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="cursor-pointer bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 min-w-[120px]"
                            >
                                {submitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    editingCategory ? "Update" : "Create"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
