import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, message } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUserUsingGet, userLogoutUsingPost } from '@/api/yonghujiekou.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch.ts';
import { setCurrentUser, logout } from '@/store/userSlice.ts';
import { RootState } from '@/store';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currentUser, isAdmin } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await getCurrentUserUsingGet();
      if (res.data?.data) {
        dispatch(setCurrentUser(res.data.data));
      } else {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await userLogoutUsingPost();
      dispatch(logout());
      message.success('退出登录成功');
      navigate('/login');
    } catch (error) {
      message.error('退出登录失败');
    }
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: '个人资料',
        onClick: () => navigate('/profile')
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        onClick: handleLogout
      }
    ]
  };

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('home')) return ['home'];
    if (path.includes('users')) return ['users'];
    if (path.includes('permissions')) return ['permissions'];
    if (path.includes('profile')) return ['profile'];
    return ['home'];
  };

  // 创建菜单项数组
  const getMenuItems = () => {
    const items = [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: '首页',
        onClick: () => navigate('/home')
      }
    ];

    if (isAdmin) {
      items.push(
        {
          key: 'users',
          icon: <TeamOutlined />,
          label: '用户管理',
          onClick: () => navigate('/users')
        },
        {
          key: 'permissions',
          icon: <KeyOutlined />,
          label: '权限管理',
          onClick: () => navigate('/permissions')
        }
      );
    }

    return items;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={getMenuItems()}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ float: 'right', marginRight: 20 }}>
            <Dropdown menu={userMenu} placement="bottomRight">
              <span style={{ cursor: 'pointer' }}>
                <Avatar
                  icon={<UserOutlined />}
                  src={currentUser?.userAvatar}
                  style={{ marginRight: 8 }}
                />
                {!collapsed && <span>{currentUser?.userName || currentUser?.userAccount}</span>}
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 