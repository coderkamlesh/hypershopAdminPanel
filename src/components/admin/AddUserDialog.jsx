import { useState } from 'react';
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
import { Plus, Loader2 } from 'lucide-react';
import { userService } from '@/service/userService';
import { toast } from 'sonner';

const ROLES = [
  'CATALOG_ADMIN',
  'SELLER',
  'WAREHOUSE_MANAGER',
  'STORE_MANAGER',
  'RIDER',
  'CONSUMER',
];

export default function AddUserDialog({ onUserAdded }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    mobile: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      mobile: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.role || !formData.mobile) {
      toast.error('Name, Role, and Mobile are required fields');
      return;
    }

    // Mobile validation
    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast.error('Mobile number must be 10 digits and start with 6-9');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await userService.addUser(formData);

      if (response.status === 1) {
        toast.success(response.message || 'User added successfully!');
        resetForm();
        setOpen(false);
        if (onUserAdded) onUserAdded();
      } else {
        toast.error(response.message || 'Failed to add user');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="Enter full name"
              />
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label htmlFor="role">
                Role <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={value => handleInputChange('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map(role => (
                    <SelectItem key={role} value={role}>
                      {role.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile */}
            <div className="grid gap-2">
              <Label htmlFor="mobile">
                Mobile <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mobile"
                type="tel"
                maxLength={10}
                value={formData.mobile}
                onChange={e => handleInputChange('mobile', e.target.value)}
                placeholder="10-digit mobile number"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                placeholder="Enter password"
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
                  Adding...
                </>
              ) : (
                'Add User'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
