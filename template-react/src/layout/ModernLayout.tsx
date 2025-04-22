import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, message, theme } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUserUsingGet, userLogoutUsingPost } from '@/api/yonghujiekou';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setCurrentUser, logout } from '@/store/userSlice';
import { RootState } from '@/store';
import { ROUTES } from '@/constants';
// @ts-ignore
import logo from '@/assets/logo.png'; // 确保在assets目录下有logo.png文件

const { Header, Sider, Content } = Layout;

const ModernLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currentUser, isAdmin } = useAppSelector((state: RootState) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 使用antd的主题
  const { token } = theme.useToken();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await getCurrentUserUsingGet();
      if (res.data?.data) {
        dispatch(setCurrentUser(res.data.data));
      } else {
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleLogout = async () => {
    try {
      await userLogoutUsingPost();
      dispatch(logout());
      message.success('退出登录成功');
      navigate(ROUTES.LOGIN);
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
        onClick: () => navigate(ROUTES.PROFILE)
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

  const getMenuItems = () => {
    const items = [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: '首页',
        onClick: () => navigate(ROUTES.HOME)
      }
    ];

    if (isAdmin) {
      items.push(
        {
          key: 'users',
          icon: <TeamOutlined />,
          label: '用户管理',
          onClick: () => navigate(ROUTES.USERS)
        },
        {
          key: 'permissions',
          icon: <KeyOutlined />,
          label: '权限管理',
          onClick: () => navigate(ROUTES.PERMISSIONS)
        }
      );
    }

    return items;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: isDarkMode ? '#001529' : '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="logo" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          background: 'transparent'
        }}>
          <img src={logo} alt="Logo" style={{ height: 32, width: 'auto' }} />
          {!collapsed && <h1 style={{
            margin: '0 0 0 12px',
            color: isDarkMode ? '#fff' : token.colorPrimary,
            fontSize: '18px',
            fontWeight: 600
          }}>管理系统</h1>}
        </div>
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={getMenuItems()}
          style={{
            borderRight: 'none',
            padding: '12px 0'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={toggleTheme}
            style={{
              color: isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)'
            }}
          >
            {!collapsed && (isDarkMode ? '亮色模式' : '暗色模式')}
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{
          padding: '0 16px',
          background: isDarkMode ? '#001529' : '#fff',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              color: isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)'
            }}
          />
          <div>
            <Dropdown menu={userMenu} placement="bottomRight">
              <div style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                borderRadius: '4px',
                transition: 'all 0.3s'
              }}>
                <Avatar
                  style={{
                    background: token.colorPrimary,
                    marginRight: 8
                  }}
                  icon={<UserOutlined />}
                  src={currentUser?.userAvatar}
                />
                <span style={{
                  color: isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.85)',
                  fontWeight: 500
                }}>
                  {currentUser?.userName || currentUser?.userAccount}
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{
          margin: '24px',
          padding: '24px',
          background: isDarkMode ? '#141414' : '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          minHeight: 280,
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ModernLayout; 