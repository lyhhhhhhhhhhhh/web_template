import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { getCurrentUserUsingGet } from '@/api/yonghujiekou.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { setCurrentUser } from '@/store/userSlice.ts';

interface PrivateRouteProps {
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRequiredRole, setHasRequiredRole] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const res = await getCurrentUserUsingGet();
        if (res.data?.data) {
          dispatch(setCurrentUser(res.data.data));
          setIsAuthenticated(true);

          // 检查角色权限
          if (requiredRole && res.data.data.userRole !== requiredRole) {
            setHasRequiredRole(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, requiredRole]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute; 