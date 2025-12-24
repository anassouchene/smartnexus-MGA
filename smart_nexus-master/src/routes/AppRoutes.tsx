import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import Claims from '../pages/Claims';
import Contracts from '../pages/Contracts';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Policy from '../pages/Policy';
import Products from '../pages/Products';
import Settings from '../pages/Settings';
import Workflow from '../pages/Workflow';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="policy" element={<Policy />} />
        <Route path="workflow" element={<Workflow />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="claims" element={<Claims />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
