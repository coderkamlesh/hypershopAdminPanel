// pages/admin/Dashboard.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  Store,
  ArrowUpRight,
  AlertCircle,
  Activity,
  CheckCircle,
  Clock
} from "lucide-react"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeProducts: 0,
    pendingApprovals: 0,
    totalSellers: 0,
    totalWarehouses: 0,
    totalStores: 0,
    activeRiders: 0
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API call to your Lambda
      // const response = await axios.get('/api/admin/dashboard/stats')
      // setStats(response.data)
      
      setStats({
        totalOrders: 1247,
        totalRevenue: 456789,
        activeProducts: 3542,
        pendingApprovals: 23,
        totalSellers: 87,
        totalWarehouses: 12,
        totalStores: 45,
        activeRiders: 156
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with HyperShop today.
          </p>
        </div>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>

      {/* Primary Stats - Revenue & Orders */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Network Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSellers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active brand partners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWarehouses}</div>
            <p className="text-xs text-muted-foreground mt-1">Distribution centers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dark Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStores}</div>
            <p className="text-xs text-muted-foreground mt-1">Quick commerce hubs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRiders}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently online</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Product Approvals</CardTitle>
            <CardDescription>Products waiting for catalog approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-xs text-muted-foreground">by {product.seller}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <Button size="sm" variant="ghost">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        order.status === 'delivered' ? 'default' :
                        order.status === 'processing' ? 'secondary' : 'outline'
                      }
                    >
                      {order.status === 'delivered' && <CheckCircle className="mr-1 h-3 w-3" />}
                      {order.status === 'processing' && <Clock className="mr-1 h-3 w-3" />}
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium">₹{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Low Stock Alerts
          </CardTitle>
          <CardDescription>Products running low in inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">Only {item.stock} left</Badge>
                  <Button size="sm" variant="outline">Restock</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample Data - Replace with actual API calls
const pendingProducts = [
  { id: 1, name: "Organic Milk 1L", seller: "Fresh Dairy Co.", category: "Dairy" },
  { id: 2, name: "Whole Wheat Bread", seller: "Bakery House", category: "Bakery" },
  { id: 3, name: "Green Tea Pack", seller: "Tea Masters", category: "Beverages" },
]

const recentOrders = [
  { id: "10234", customer: "Rajesh Kumar", status: "delivered", amount: 1250 },
  { id: "10235", customer: "Priya Sharma", status: "processing", amount: 890 },
  { id: "10236", customer: "Amit Patel", status: "pending", amount: 2100 },
  { id: "10237", customer: "Sneha Desai", status: "delivered", amount: 1560 },
]

const lowStockItems = [
  { id: 1, name: "Fresh Tomatoes (1kg)", location: "Warehouse - Andheri", stock: 12 },
  { id: 2, name: "Mineral Water 1L", location: "Store - Bandra", stock: 8 },
  { id: 3, name: "Basmati Rice 5kg", location: "Warehouse - Thane", stock: 5 },
]
