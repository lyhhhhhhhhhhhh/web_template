import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginUsingPost } from '@/api/yonghujiekou';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setCurrentUser } from '@/store/userSlice';
import { RootState } from '@/store';
import { ROUTES, STORAGE_KEYS } from '@/constants';
// @ts-ignore
import logo from '@/assets/logo.png'; // 确保在assets目录下有logo.png文件

import './enterprise-style.css';

const { Title, Paragraph } = Typography;

const EnterpriseLogin: React.FC = () => {
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
    <div className="enterprise-login-container">
      <Row className="enterprise-login-row">
        <Col span={14} className="enterprise-login-banner">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <Title level={2} className="banner-title">企业管理平台</Title>
            <Paragraph className="banner-desc">
              高效、安全、专业的企业级管理系统，助力企业数字化转型
            </Paragraph>
            <div className="banner-features">
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <div className="feature-text">
                  <h4>安全可靠</h4>
                  <p>多重安全防护，保障数据安全</p>
                </div>
              </div>
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <div className="feature-text">
                  <h4>高效管理</h4>
                  <p>一站式解决企业管理需求</p>
                </div>
              </div>
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <div className="feature-text">
                  <h4>专业支持</h4>
                  <p>7*24小时技术支持服务</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={10} className="enterprise-login-form-container">
          <div className="enterprise-login-form-wrapper">
            <div className="enterprise-login-header">
              <img src={logo} alt="Logo" className="enterprise-login-logo" />
              <Title level={3} className="enterprise-login-title">用户登录</Title>
              <Paragraph className="enterprise-login-subtitle">
                欢迎回来，请输入您的账号信息登录
              </Paragraph>
            </div>

            <Form
              name="enterprise_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size="large"
              className="enterprise-login-form"
            >
              <Form.Item
                name="userAccount"
                rules={[{ required: true, message: '请输入账号!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="请输入账号"
                />
              </Form.Item>

              <Form.Item
                name="userPassword"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item>
                <div className="login-form-options">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                  </Form.Item>
                  <a href="#" className="login-form-forgot">忘记密码?</a>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="enterprise-login-button"
                >
                  登录
                </Button>
              </Form.Item>

              <div className="enterprise-login-footer">
                <p className="register-link">
                  还没有账号? <Link to={ROUTES.REGISTER}>立即注册</Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EnterpriseLogin; 