import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, message, Badge } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
  RocketOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUserUsingGet, userLogoutUsingPost } from '@/api/yonghujiekou';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setCurrentUser, logout } from '@/store/userSlice';
import { RootState } from '@/store';
import { ROUTES } from '@/constants';
// @ts-ignore
import logo from '@/assets/logo.png'; // 确保在assets目录下有logo.png文件

import './futuristic.css';

const { Header, Sider, Content, Footer } = Layout;

const FuturisticLayout: React.FC = () => {
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
        key: 'settings',
        icon: <SettingOutlined />,
        label: '设置',
        onClick: () => navigate(ROUTES.PROFILE)
      },
      {
        type: 'divider',
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
        icon: <RocketOutlined className="menu-icon" />,
        label: '控制面板',
        onClick: () => navigate(ROUTES.HOME)
      }
    ];

    if (isAdmin) {
      items.push(
        {
          key: 'data',
          icon: <DatabaseOutlined className="menu-icon" />,
          label: '数据管理',
          // @ts-ignore
          children: [
            {
              key: 'users',
              icon: <TeamOutlined className="menu-icon" />,
              label: '用户管理',
              onClick: () => navigate(ROUTES.USERS)
            }
          ]
        },
        {
          key: 'system',
          icon: <GlobalOutlined className="menu-icon" />,
          label: '系统设置',
          children: [
            {
              key: 'permissions',
              icon: <KeyOutlined className="menu-icon" />,
              label: '权限管理',
              onClick: () => navigate(ROUTES.PERMISSIONS)
            }
          ]
        }
      );
    }

    return items;
  };

  return (
    <Layout className="futuristic-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="futuristic-sider"
        width={240}
      >
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          {!collapsed && <span className="logo-text">NOVA系统</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={getMenuItems()}
          className="futuristic-menu"
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="futuristic-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-button"
          />
          <div className="header-actions">
            <Badge count={3} size="small" className="notification-badge">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="action-button"
              />
            </Badge>
            <Button
              type="text"
              icon={<AppstoreOutlined />}
              className="action-button"
            />
            <div className="avatar-divider"></div>
            {/*// @ts-ignore*/}
            <Dropdown menu={userMenu} placement="bottomRight" arrow>
              <div className="user-profile">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  src={currentUser?.userAvatar}
                  className="user-avatar"
                />
                {!collapsed && (
                  <span className="username">{currentUser?.userName || currentUser?.userAccount}</span>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="futuristic-content">
          <div className="page-header">
            <div className="page-title">
              {location.pathname.includes('home') && (
                <>
                  <RocketOutlined className="page-icon" />
                  <span>控制面板</span>
                </>
              )}
              {location.pathname.includes('users') && (
                <>
                  <TeamOutlined className="page-icon" />
                  <span>用户管理</span>
                </>
              )}
              {location.pathname.includes('permissions') && (
                <>
                  <KeyOutlined className="page-icon" />
                  <span>权限管理</span>
                </>
              )}
              {location.pathname.includes('profile') && (
                <>
                  <UserOutlined className="page-icon" />
                  <span>个人资料</span>
                </>
              )}
            </div>
          </div>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
        <Footer className="futuristic-footer">
          NOVA 未来管理系统 &copy; {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default FuturisticLayout; 