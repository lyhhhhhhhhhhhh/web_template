import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Checkbox, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginUsingPost } from '@/api/yonghujiekou';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setCurrentUser } from '@/store/userSlice';
import { RootState } from '@/store';
import { ROUTES, STORAGE_KEYS } from '@/constants';
// @ts-ignore
import logo from '@/assets/logo.png';


import './style.css';

const ModernLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.HOME);
    }
  }, [isLoggedIn, navigate]);

  const onFinish = async (values: API.UserLoginRequest & { remember: boolean }) => {
    try {
      setLoading(true);
      const res = await userLoginUsingPost(values);
      if (res.data?.code === 0 && res.data?.data) {
        const token = res.data.data.token?.tokenValue;
        if (token) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, token);
          if (values.remember) {
            localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
          }
          dispatch(setCurrentUser(res.data.data));
          message.success('登录成功');
          navigate(ROUTES.HOME);
        }
      } else {
        message.error(res.data?.message || '登录失败');
      }
    } catch (error) {
      message.error('登录失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-login-container">
      <div className="login-background"></div>
      <div className="login-content">
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <img src={logo} alt="Logo" className="login-logo" />
            <h1 className="login-title">欢迎登录</h1>
            <p className="login-subtitle">登录您的账号，开始使用管理系统</p>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="login-form"
          >
            <Form.Item
              name="userAccount"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item
              name="userPassword"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item className="login-options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="#" className="login-forgot">忘记密码?</a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} className="login-button">
                登录
              </Button>
            </Form.Item>

            <div className="login-footer">
              <div className="login-register-link">
                还没有账号? <Link to={ROUTES.REGISTER}>立即注册</Link>
              </div>

              <Divider plain>其他登录方式</Divider>

              <div className="login-social">
                <Button type="text" icon={<GithubOutlined />} size="large" />
                <Button type="text" icon={<GoogleOutlined />} size="large" />
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ModernLogin; 