// components/catalog/CategoryDialog.jsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Pencil, Plus, Upload, X } from 'lucide-react';
import { categoryService } from '@/service/categoryService';
import { categoryGroupService } from '@/service/categoryGroupService';

export default function CategoryDialog({
  mode = 'create',
  category,
  onSuccess,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  const [formData, setFormData] = useState({
    groupId: '',
    name: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch groups for dropdown
  useEffect(() => {
    if (open) {
      fetchGroups();
    }
  }, [open]);

  // Pre-fill data in edit mode
  useEffect(() => {
    if (mode === 'edit' && category && open) {
      setFormData({
        groupId: category.groupId || '',
        name: category.name || '',
        image: null,
      });
      setImagePreview(category.imageUrl || null);
    } else if (mode === 'create' && open) {
      setFormData({ groupId: '', name: '', image: null });
      setImagePreview(null);
    }
  }, [mode, category, open]);

  const fetchGroups = async () => {
    try {
      const res = await categoryGroupService.fetchAll();
      if (res.status === 1) {
        setGroups(res.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(mode === 'edit' ? category?.imageUrl : null);
  };

  // components/catalog/CategoryDialog.jsx
  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (!formData.groupId) {
      toast.error('Please select a group');
      return;
    }

    try {
      setLoading(true);

      // ✅ Plain object bhejo, service me URL params banegi
      const data = {
        name: formData.name.trim(),
        groupId: formData.groupId,
        image: formData.image, // File object or null
      };

      let res;
      if (mode === 'create') {
        res = await categoryService.create(data);
      } else {
        res = await categoryService.update(category.id, data);
      }

      if (res.status === 1) {
        toast.success(
          res.message ||
            `Category ${mode === 'create' ? 'added' : 'updated'} successfully`
        );
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(res.message || 'Operation failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        ) : (
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Add New Category' : 'Edit Category'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'create'
                ? 'Create a new category for your catalog'
                : 'Update category details'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Group Selection */}
            <div className="space-y-2">
              <Label htmlFor="groupId">Category Group *</Label>
              <Select
                value={formData.groupId}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, groupId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map(group => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Fresh Vegetables"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Category Image</Label>

              {imagePreview ? (
                <div className="relative w-full h-40 border rounded-lg overflow-hidden bg-muted">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload image
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? 'Saving...'
                : mode === 'create'
                  ? 'Add Category'
                  : 'Update Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
