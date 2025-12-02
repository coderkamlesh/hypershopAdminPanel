// pages/catalog/Categories.jsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { categoryService } from '@/service/categoryService';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import CategoryDialog from '@/components/catalog/CategoryDialog';
import { Pagination } from '@/components/ui/pagination';
import { usePagination } from '@/hooks/usePagination';

const ITEMS_PER_PAGE = 10;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentPage,
    totalPages,
    paginatedData: currentItems,
    goToPage,
  } = usePagination(categories, ITEMS_PER_PAGE);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await categoryService.fetchAll();
      if (res.status === 1) {
        setCategories(res.data || []);
      } else {
        toast.error(res.message || 'Failed to fetch categories');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this category?'))
      return;

    try {
      const res = await categoryService.remove(id);
      if (res.status === 1) {
        toast.success(res.message || 'Category deleted');
        fetchCategories();
      } else {
        toast.error(res.message || 'Failed to delete category');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage product categories for your catalog
          </p>
        </div>
        <CategoryDialog mode="create" onSuccess={fetchCategories} />
      </div>

      {/* List Card */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({categories.length})</CardTitle>
          <CardDescription>
            Showing{' '}
            {categories.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}
            -{Math.min(currentPage * ITEMS_PER_PAGE, categories.length)} of{' '}
            {categories.length} categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading categories...</div>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No categories found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click &quot;Add Category&quot; to create your first category.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map(cat => (
                      <TableRow key={cat.id}>
                        <TableCell>
                          {cat.imageUrl ? (
                            <img
                              src={cat.imageUrl}
                              alt={cat.name}
                              className="h-10 w-10 rounded object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                              No image
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {cat.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{cat.groupName}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {cat.createdDate}{' '}
                            <span className="text-muted-foreground">
                              {cat.createdTime}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <CategoryDialog
                            mode="edit"
                            category={cat}
                            onSuccess={fetchCategories}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(cat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={categories.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={goToPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
