import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginUsingPost } from '@/api/yonghujiekou.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch.ts';
import { setCurrentUser } from '@/store/userSlice.ts';
import { RootState } from '@/store';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const onFinish = async (values: API.UserLoginRequest) => {
    try {
      setLoading(true);
      const res = await userLoginUsingPost(values);
      if (res.data?.code === 0 && res.data?.data) {
        const token = res.data.data.token?.tokenValue;
        if (token) {
          localStorage.setItem('token', token);
          dispatch(setCurrentUser(res.data.data));
          message.success('登录成功');
          navigate('/home');
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f0f2f5'
    }}>
      <Card title="用户登录" style={{ width: 400 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userAccount"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="账号"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="userPassword"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/register">还没有账号？立即注册</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 