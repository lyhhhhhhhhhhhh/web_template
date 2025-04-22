import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, message, Badge, Drawer } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
  ApartmentOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUserUsingGet, userLogoutUsingPost } from '@/api/yonghujiekou';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setCurrentUser, logout } from '@/store/userSlice';
import { RootState } from '@/store';
import { ROUTES } from '@/constants';
// @ts-ignore
import logo from '@/assets/logo.png'

const { Header, Sider, Content, Footer } = Layout;

const EnterpriseLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
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
        label: '账户设置',
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
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: '控制台',
        children: [
          {
            key: 'home',
            icon: <HomeOutlined />,
            label: '首页概览',
            onClick: () => navigate(ROUTES.HOME)
          }
        ]
      }
    ];

    if (isAdmin) {
      items.push(
        {
          key: 'system',
          icon: <ApartmentOutlined />,
          label: '系统管理',
          children: [
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
          ]
        }
      );
    }

    return items;
  };

  // 模拟的通知数据
  const notifications = [
    { id: 1, title: '系统通知', content: '系统将于今晚24:00进行例行维护', time: '10分钟前', read: false },
    { id: 2, title: '安全提醒', content: '您的账号刚刚在新设备上登录', time: '1小时前', read: false },
    { id: 3, title: '更新提示', content: '系统已更新到最新版本V2.1.0', time: '1天前', read: true }
  ];

  // @ts-ignore
  return (
    <Layout className="enterprise-layout">
      <Header className="enterprise-header">
        <div className="header-left">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="enterprise-logo" />
            <h1 className="enterprise-title">企业管理系统</h1>
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="toggle-btn"
          />
        </div>
        <div className="header-right">
          <Badge count={2} dot>
            <Button
              type="text"
              icon={<BellOutlined />}
              onClick={() => setNotificationsVisible(true)}
              className="notification-btn"
            />
          </Badge>
          {/*@ts-ignore*/}
          <Dropdown menu={userMenu} placement="bottomRight">
            <div className="user-info">
              <Avatar
                className="user-avatar"
                icon={<UserOutlined />}
                src={currentUser?.userAvatar}
              />
              <span className="user-name">{currentUser?.userName || currentUser?.userAccount}</span>
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="enterprise-sider"
          width={256}
        >
          <Menu
            mode="inline"
            selectedKeys={getSelectedKey()}
            items={getMenuItems()}
            className="enterprise-menu"
          />
        </Sider>
        <Layout className="main-content-layout">
          <Content className="enterprise-content">
            <div className="page-header">
              <h2 className="page-title">
                {location.pathname.includes('home') ? '首页概览' :
                  location.pathname.includes('users') ? '用户管理' :
                    location.pathname.includes('permissions') ? '权限管理' :
                      location.pathname.includes('profile') ? '个人资料' : ''}
              </h2>
              <div className="breadcrumb">
                首页 /
                {location.pathname.includes('home') ? '首页概览' :
                  location.pathname.includes('users') ? '系统管理 / 用户管理' :
                    location.pathname.includes('permissions') ? '系统管理 / 权限管理' :
                      location.pathname.includes('profile') ? '个人资料' : ''}
              </div>
            </div>
            <div className="content-container">
              <Outlet />
            </div>
          </Content>
          <Footer className="enterprise-footer">
            企业管理系统 ©{new Date().getFullYear()} Created by Your Company
          </Footer>
        </Layout>
      </Layout>

      <Drawer
        title="通知中心"
        placement="right"
        onClose={() => setNotificationsVisible(false)}
        open={notificationsVisible}
        width={380}
      >
        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
              <div className="notification-header">
                <span className="notification-title">{notification.title}</span>
                <span className="notification-time">{notification.time}</span>
              </div>
              <div className="notification-content">
                {notification.content}
              </div>
            </div>
          ))}
        </div>
      </Drawer>
      {/*// @ts-ignore*/}
      <style jsx>{`
        .enterprise-layout {
          min-height: 100vh;
        }
        .enterprise-header {
          background: #fff;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          height: 64px;
          position: fixed;
          z-index: 1000;
          width: 100%;
          top: 0;
        }
        .header-left {
          display: flex;
          align-items: center;
        }
        .logo-container {
          display: flex;
          align-items: center;
          margin-right: 24px;
        }
        .enterprise-logo {
          height: 32px;
          margin-right: 16px;
        }
        .enterprise-title {
          font-size: 18px;
          margin: 0;
          font-weight: 600;
          color: #001529;
        }
        .toggle-btn {
          font-size: 18px;
        }
        .header-right {
          display: flex;
          align-items: center;
        }
        .notification-btn {
          margin-right: 16px;
          font-size: 18px;
        }
        .user-info {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0 8px;
          border-radius: 4px;
          transition: all 0.3s;
        }
        .user-info:hover {
          background: rgba(0, 0, 0, 0.025);
        }
        .user-avatar {
          margin-right: 8px;
        }
        .user-name {
          font-weight: 500;
        }
        .enterprise-sider {
          background: #fff;
          box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
          margin-top: 64px;
          height: calc(100vh - 64px);
          position: fixed;
          left: 0;
          overflow: auto;
        }
        .enterprise-menu {
          border-right: none;
          padding: 16px 0;
        }
        .main-content-layout {
          margin-left: ${collapsed ? '80px' : '256px'};
          margin-top: 64px;
          transition: margin-left 0.2s;
        }
        .enterprise-content {
          padding: 24px;
          min-height: calc(100vh - 64px - 64px);
        }
        .page-header {
          margin-bottom: 24px;
          border-bottom: 1px solid #e8e8e8;
          padding-bottom: 16px;
        }
        .page-title {
          margin: 0;
          font-weight: 600;
          font-size: 20px;
          color: #001529;
        }
        .breadcrumb {
          margin-top: 8px;
          color: #8c8c8c;
          font-size: 14px;
        }
        .content-container {
          background: #fff;
          padding: 24px;
          border-radius: 4px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }
        .enterprise-footer {
          text-align: center;
          background: #fff;
          padding: 16px;
          color: rgba(0, 0, 0, 0.45);
        }
        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .notification-item {
          padding: 16px;
          border-radius: 4px;
          background: #f9f9f9;
          border-left: 3px solid #d9d9d9;
        }
        .notification-item.unread {
          background: #f0f5ff;
          border-left-color: #1890ff;
        }
        .notification-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .notification-title {
          font-weight: 600;
        }
        .notification-time {
          color: #8c8c8c;
          font-size: 12px;
        }
        .notification-content {
          color: rgba(0, 0, 0, 0.65);
        }
      `}</style>
    </Layout>
  );
};

export default EnterpriseLayout; 