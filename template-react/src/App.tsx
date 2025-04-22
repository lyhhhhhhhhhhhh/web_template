import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Home from '@/pages/Home/Home.tsx';
import UserManagement from '@/pages/UserManagement/UserManagement.tsx';
import PermissionManagement from '@/pages/PermissionManagement/PermissionManagement.tsx';
import UserProfile from '@/pages/UserProfile/UserProfile.tsx';
import PrivateRoute from '@/layout/PrivateRoute/PrivateRoute.tsx';
import '@/App.css';
import Login from "@/pages/Login/Login.tsx";
import Register from "@/pages/Register/Register.tsx";
import FuturisticLayout from "@/layout/FuturisticLayout.tsx";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route element={<FuturisticLayout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<UserProfile />} />

              {/* 管理员路由 */}
              <Route element={<PrivateRoute requiredRole="admin" />}>
                <Route path="users" element={<UserManagement />} />
                <Route path="permissions" element={<PermissionManagement />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
