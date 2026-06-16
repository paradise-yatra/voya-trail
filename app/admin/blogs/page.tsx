"use client";

import { useEffect, useState } from "react";
import { adminBlogsAPI, adminToursAPI } from "@/lib/api";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    category: string;
    readTime: string;
    author: string;
    authorImage?: string;
    image: string;
    excerpt: string;
    content: string;
    isActive: boolean;
    createdAt: string;
}

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const { toast } = useToast();

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "Travel",
        readTime: "5 mins read",
        author: "",
        authorImage: "",
        image: "",
        excerpt: "",
        content: "",
        isActive: true,
    });

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await adminBlogsAPI.listBlogs();
            if (response.success) {
                setBlogs(response.data);
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Failed to fetch blogs",
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
        fetchBlogs();
    }, []);

    const handleOpenDialog = (blog?: BlogPost) => {
        setImageFile(null);
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                slug: blog.slug,
                category: blog.category,
                readTime: blog.readTime,
                author: blog.author,
                authorImage: blog.authorImage || "",
                image: blog.image,
                excerpt: blog.excerpt,
                content: blog.content,
                isActive: blog.isActive,
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: "",
                slug: "",
                category: "Travel",
                readTime: "5 mins read",
                author: "Admin",
                authorImage: "https://i.pravatar.cc/150?u=admin",
                image: "",
                excerpt: "",
                content: "",
                isActive: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = { ...prev, [name]: value };
            if (name === "title" && !editingBlog) {
                newData.slug = value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "");
            }
            return newData;
        });
    };

    const handleUploadImage = async () => {
        if (!imageFile) return;
        setUploadingImage(true);
        try {
            const response = await adminToursAPI.uploadTourImage(imageFile, "blogs");
            if (response.success && response.data?.url) {
                setFormData((prev) => ({ ...prev, image: response.data.url }));
                toast({
                    title: "Success",
                    description: "Featured image uploaded successfully",
                });
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Failed to upload image",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to upload image",
                variant: "destructive",
            });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            let response;
            if (editingBlog) {
                response = await adminBlogsAPI.updateBlog(editingBlog._id, formData);
            } else {
                response = await adminBlogsAPI.createBlog(formData);
            }

            if (response.success) {
                toast({
                    title: "Success",
                    description: `Blog post ${editingBlog ? "updated" : "created"} successfully`,
                });
                setIsDialogOpen(false);
                fetchBlogs();
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

    const handleDeleteBlog = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;
        try {
            const response = await adminBlogsAPI.deleteBlog(id);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Blog post deleted successfully",
                });
                fetchBlogs();
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Failed to delete blog post",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
                    <p className="text-gray-600 text-sm">
                        Manage articles, guides, and updates for your website.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="cursor-pointer transition-all"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Blog Post
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead className="font-semibold w-[35%]">Title</TableHead>
                            <TableHead className="font-semibold">Category</TableHead>
                            <TableHead className="font-semibold">Author</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Created At</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary/60" />
                                    <p className="mt-2 text-gray-500 animate-pulse">Loading blogs...</p>
                                </TableCell>
                            </TableRow>
                        ) : blogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <p>No blog posts found.</p>
                                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog()} className="cursor-pointer">
                                            Create your first blog
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            blogs.map((blog) => (
                                <TableRow
                                    key={blog._id}
                                    className="group hover:bg-gray-50/80 transition-colors duration-200"
                                >
                                    <TableCell className="font-medium text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-8 rounded bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                                <img src={blog.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                                            </div>
                                            <span className="truncate max-w-[280px]" title={blog.title}>{blog.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{blog.category}</TableCell>
                                    <TableCell className="text-gray-500 font-medium">{blog.author}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 ${blog.isActive
                                                ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                                                : "bg-gray-50 text-gray-600 ring-1 ring-gray-500/20"
                                            }`}
                                        >
                                            {blog.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {new Date(blog.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpenDialog(blog)}
                                                className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteBlog(blog._id)}
                                                className="cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all duration-200"
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="category-dialog sm:max-w-[650px] max-h-[85vh] p-0 overflow-hidden border-none shadow-2xl flex flex-col">
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        <DialogHeader className="p-6 pb-4 bg-gray-50/50 border-b flex-shrink-0">
                            <DialogTitle className="text-xl font-bold text-gray-900">
                                {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {editingBlog
                                    ? "Update details of the blog post."
                                    : "Create a new article for travel guides and tips."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-180px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 10 Places to Visit in Bali"
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
                                        placeholder="e.g. 10-places-to-visit-in-bali"
                                        className="font-mono text-sm bg-gray-50 focus-visible:ring-primary/30 transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                                    >
                                        <SelectTrigger className="w-full bg-white focus-visible:ring-primary/30">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Travel">Travel</SelectItem>
                                            <SelectItem value="Destination">Destination</SelectItem>
                                            <SelectItem value="Culinary">Culinary</SelectItem>
                                            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                            <SelectItem value="Tips & Hacks">Tips & Hacks</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="readTime" className="text-sm font-semibold text-gray-700">Read Time</Label>
                                    <Input
                                        id="readTime"
                                        name="readTime"
                                        value={formData.readTime}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 8 mins read"
                                        className="focus-visible:ring-primary/30 transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="author" className="text-sm font-semibold text-gray-700">Author</Label>
                                    <Input
                                        id="author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Sarah Jenkins"
                                        className="focus-visible:ring-primary/30 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="authorImage" className="text-sm font-semibold text-gray-700">Author Image URL (Optional)</Label>
                                <Input
                                    id="authorImage"
                                    name="authorImage"
                                    value={formData.authorImage}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="focus-visible:ring-primary/30 transition-all"
                                />
                            </div>

                            <div className="space-y-2 border border-gray-150 rounded-lg p-3 bg-gray-50/50">
                                <Label className="text-sm font-semibold text-gray-700 block mb-1">Featured Image</Label>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="flex-1 space-y-1">
                                        <Input
                                            id="image"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            placeholder="Enter image URL or upload file below"
                                            className="bg-white focus-visible:ring-primary/30 text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="blog-image-upload"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setImageFile(file);
                                        }}
                                    />
                                    <label
                                        htmlFor="blog-image-upload"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white px-3 py-1.5 shadow-sm hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <ImageIcon className="mr-2 h-4 w-4 text-gray-500" />
                                        {imageFile ? imageFile.name : "Select Image File"}
                                    </label>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleUploadImage}
                                        disabled={!imageFile || uploadingImage}
                                        className="cursor-pointer"
                                    >
                                        {uploadingImage ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            "Upload to Cloud"
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt" className="text-sm font-semibold text-gray-700">Excerpt / Short Description</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    placeholder="Write a catchy summary of the article..."
                                    className="resize-none focus-visible:ring-primary/30 transition-all"
                                    rows={2}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-sm font-semibold text-gray-700">Content (HTML allowed)</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Write your blog content here... Use <p>, <h2>, etc. for formatting."
                                    className="resize-y focus-visible:ring-primary/30 transition-all font-sans"
                                    rows={8}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all hover:border-primary/20">
                                <div className="space-y-0.5">
                                    <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">Published Status</Label>
                                    <p className="text-xs text-gray-500">Show or hide this blog on the website</p>
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

                        <DialogFooter className="p-6 pt-3 flex items-center gap-3 bg-gray-50/50 border-t flex-shrink-0">
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
                                disabled={submitting || uploadingImage}
                                className="cursor-pointer bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 min-w-[120px]"
                            >
                                {submitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    editingBlog ? "Update" : "Create"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
