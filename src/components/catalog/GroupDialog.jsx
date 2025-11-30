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
import { Loader2, Plus, Pencil } from 'lucide-react';
import { categoryGroupService } from '@/service/categoryGroupService';
import { toast } from 'sonner';

export default function GroupDialog({ mode = 'create', group, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sortOrder: '',
  });

  useEffect(() => {
    if (mode === 'edit' && group) {
      setFormData({
        name: group.name || '',
        sortOrder: group.sortOrder?.toString() || '',
      });
    }
  }, [mode, group, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      sortOrder: formData.sortOrder
        ? Number.parseInt(formData.sortOrder, 10)
        : null,
    };

    try {
      setIsSubmitting(true);

      let res;
      if (mode === 'edit' && group?.id) {
        res = await categoryGroupService.update(group.id, payload);
      } else {
        res = await categoryGroupService.create(payload);
      }

      if (res.status === 1) {
        toast.success(res.message || 'Saved successfully');
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.message || 'Operation failed');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerLabel =
    mode === 'edit' ? (
      <>
        <Pencil className="h-4 w-4" />
      </>
    ) : (
      <>
        <Plus className="h-4 w-4 mr-2" />
        Add Group
      </>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === 'edit' ? 'ghost' : 'default'} size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Group' : 'Add Group'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Update category group details.'
              : 'Create a new category group.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="e.g. Grocery, Electronics"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={e => handleChange('sortOrder', e.target.value)}
                placeholder="Optional (for ordering)"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
