import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PublicRoute from './components/middlware/PublicRoute';
import ProtectedRoute from './components/middlware/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Users from './pages/Users';
import Groups from './pages/catalog/Groups';
import Categories from './pages/catalog/Categories';
import SubCategories from './pages/catalog/SubCategories';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin + Catalog Admin – common layout */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN', 'SUPER_ADMIN', 'CATALOG_ADMIN']}
            />
          }
        >
          <Route element={<AppLayout />}>
            {/* Dashboard: admin ka real dashboard, catalog admin ke लिए bhi yahi ya alag bana sakte ho */}
            <Route path="/admin/dashboard" element={<Dashboard />} />

            {/* Only ADMIN + SUPER_ADMIN screens */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />
              }
            >
              <Route path="/admin/users" element={<Users />} />
              {/* inventory, management, etc. yahan add karna */}
            </Route>

            {/* Catalog screens – ADMIN + CATALOG_ADMIN dono ko */}
            <Route path="/admin/catalog/groups" element={<Groups />} />
            <Route path="/admin/catalog/categories" element={<Categories />} />
            <Route
              path="/admin/catalog/sub-categories"
              element={<SubCategories />}
            />
          </Route>
        </Route>

        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
