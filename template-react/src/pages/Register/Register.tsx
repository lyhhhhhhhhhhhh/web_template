import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterUsingPost } from '@/api/yonghujiekou.ts';

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: API.UserRegisterRequest) => {
    try {
      setLoading(true);
      const res = await userRegisterUsingPost(values);
      if (res.data?.code === 0) {
        message.success('注册成功');
        navigate('/login');
      } else {
        message.error(res.data?.message || '注册失败');
      }
    } catch (error) {
      message.error('注册失败，请稍后再试');
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
      <Card title="用户注册" style={{ width: 400 }}>
        <Form
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            name="userAccount"
            rules={[
              { required: true, message: '请输入账号!' },
              { min: 4, message: '账号长度不能小于4个字符!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="账号"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="userName"
            rules={[{ required: false, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="用户名（选填）"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="userPassword"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 8, message: '密码长度不能小于8个字符!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="checkPassword"
            dependencies={['userPassword']}
            rules={[
              { required: true, message: '请确认密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('userPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login">已有账号？立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register; 