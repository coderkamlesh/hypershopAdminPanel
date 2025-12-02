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
import { categoryGroupService } from '@/service/categoryGroupService';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import GroupDialog from '@/components/catalog/GroupDialog';
import { Pagination } from '@/components/ui/pagination';
import { usePagination } from '@/hooks/usePagination';

const ITEMS_PER_PAGE = 10;

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentPage,
    totalPages,
    paginatedData: currentItems,
    goToPage,
  } = usePagination(groups, ITEMS_PER_PAGE);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const res = await categoryGroupService.fetchAll();
      if (res.status === 1) {
        setGroups(res.data || []);
      } else {
        toast.error(res.message || 'Failed to fetch groups');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this group?')) return;

    try {
      const res = await categoryGroupService.remove(id);
      if (res.status === 1) {
        toast.success(res.message || 'Group deleted');
        fetchGroups();
      } else {
        toast.error(res.message || 'Failed to delete group');
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
          <h1 className="text-3xl font-bold tracking-tight">Category Groups</h1>
          <p className="text-muted-foreground">
            Manage product groups for your catalog
          </p>
        </div>
        <GroupDialog mode="create" onSuccess={fetchGroups} />
      </div>

      {/* List Card */}
      <Card>
        <CardHeader>
          <CardTitle>Groups ({groups.length})</CardTitle>
          <CardDescription>
            Showing{' '}
            {groups.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, groups.length)} of{' '}
            {groups.length} groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading groups...</div>
            </div>
          ) : groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No groups found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click &quot;Add Group&quot; to create your first group.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Sort Order</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map(group => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">
                          {group.name}
                        </TableCell>
                        <TableCell>
                          {group.sortOrder != null ? (
                            <Badge variant="outline">{group.sortOrder}</Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {group.createdDate}{' '}
                            <span className="text-muted-foreground">
                              {group.createdTime}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <GroupDialog
                            mode="edit"
                            group={group}
                            onSuccess={fetchGroups}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(group.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* ✅ Reusable Pagination Component */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={groups.length}
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
