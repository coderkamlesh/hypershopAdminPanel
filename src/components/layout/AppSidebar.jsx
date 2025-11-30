// AppSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  Store,
  BarChart3,
  Settings,
  CheckSquare,
  ChevronUp,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import useAuthStore, { selectLogout, selectUser } from '@/store/authStore';

const BASE_MENU_ITEMS = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'Overview',
        url: '/admin/dashboard',
        icon: LayoutDashboard,
        roles: ['ADMIN', 'SUPER_ADMIN', 'CATALOG_ADMIN'],
      },
      {
        title: 'Analytics',
        url: '/admin/analytics',
        icon: BarChart3,
        roles: ['ADMIN', 'SUPER_ADMIN'],
      },
    ],
  },
  {
    title: 'Catalog Management',
    items: [
      {
        title: 'Groups',
        url: '/admin/catalog/groups',
        icon: Package,
        roles: ['ADMIN', 'SUPER_ADMIN', 'CATALOG_ADMIN'],
      },
      {
        title: 'Categories',
        url: '/admin/catalog/categories',
        icon: LayoutDashboard,
        roles: ['ADMIN', 'SUPER_ADMIN', 'CATALOG_ADMIN'],
      },
      {
        title: 'Sub Categories',
        url: '/admin/catalog/sub-categories',
        icon: Package,
        roles: ['ADMIN', 'SUPER_ADMIN', 'CATALOG_ADMIN'],
      },
      {
        title: 'Pending Approvals',
        url: '/admin/approvals',
        icon: CheckSquare,
        roles: ['ADMIN', 'SUPER_ADMIN', 'CATALOG_ADMIN'],
      },
      {
        title: 'Products',
        url: '/admin/products',
        icon: Package,
        roles: ['ADMIN', 'SUPER_ADMIN', 'CATALOG_ADMIN'],
      },
    ],
  },
  {
    title: 'Inventory',
    items: [
      {
        title: 'Warehouses',
        url: '/admin/warehouses',
        icon: Warehouse,
        roles: ['ADMIN', 'SUPER_ADMIN'],
      },
      {
        title: 'Stores',
        url: '/admin/stores',
        icon: Store,
        roles: ['ADMIN', 'SUPER_ADMIN'],
      },
      {
        title: 'Stock Overview',
        url: '/admin/stock',
        icon: Package,
        roles: ['ADMIN', 'SUPER_ADMIN'],
      },
    ],
  },
  {
    title: 'Management',
    items: [
      {
        title: 'Orders',
        url: '/admin/orders',
        icon: ShoppingCart,
        roles: ['ADMIN', 'SUPER_ADMIN'],
      },
      {
        title: 'Sellers',
        url: '/admin/sellers',
        icon: Users,
        roles: ['ADMIN', 'SUPER_ADMIN'],
      },
      {
        title: 'Users',
        url: '/admin/users',
        icon: Users,
        roles: ['ADMIN', 'SUPER_ADMIN'],
      },
    ],
  },
];

export default function AppSidebar() {
  const user = useAuthStore(selectUser);
  const logout = useAuthStore(selectLogout);
  const location = useLocation();

  const role = user?.role;

  const filteredMenu = BASE_MENU_ITEMS.map(section => ({
    ...section,
    items: section.items.filter(
      item => !item.roles || item.roles.includes(role)
    ),
  })).filter(section => section.items.length > 0);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">HyperShop</span>
            <span className="truncate text-xs text-muted-foreground">
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {filteredMenu.map(section => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 text-left text-sm">
                    <span className="truncate font-semibold">
                      {user?.name || 'Admin User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.role}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
