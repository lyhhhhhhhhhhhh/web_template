import React, { useState } from 'react';
import { Form, Input, Button, Card, Steps, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterUsingPost } from '@/api/yonghujiekou';
import { ROUTES } from '@/constants';
// @ts-ignore
import logo from '@/assets/logo.png'; // 确保在assets目录下有logo.png文件

import '../Login/style.css';

const { Step } = Steps;

const ModernRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: API.UserRegisterRequest) => {
    if (currentStep === 0) {
      // 验证第一步完成后，进入第二步
      setCurrentStep(1);
      return;
    }

    try {
      setLoading(true);
      const res = await userRegisterUsingPost(values);
      if (res.data?.code === 0) {
        setCurrentStep(2);
        setTimeout(() => {
          message.success('注册成功，即将跳转到登录页');
          navigate(ROUTES.LOGIN);
        }, 2000);
      } else {
        message.error(res.data?.message || '注册失败');
      }
    } catch (error) {
      message.error('注册失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: '基本信息',
      content: (
        <>
          <Form.Item
            name="userAccount"
            rules={[
              { required: true, message: '请输入账号!' },
              { min: 4, message: '账号长度不能小于4个字符!' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
            />
          </Form.Item>

          <Form.Item
            name="userName"
            rules={[{ required: false, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名（选填）"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: '设置密码',
      content: (
        <>
          <Form.Item
            name="userPassword"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 8, message: '密码长度不能小于8个字符!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请确认密码"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: '注册成功',
      content: (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a' }} />
          <h2 style={{ marginTop: 24 }}>注册成功!</h2>
          <p>您的账号已成功创建，即将跳转到登录页...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="modern-register-container">
      <div className="login-background"></div>
      <div className="login-content">
        <Card className="register-card" bordered={false}>
          <div className="register-header">
            <img src={logo} alt="Logo" className="login-logo" />
            <h1 className="register-title">创建账号</h1>
            <p className="register-subtitle">填写信息，加入我们的平台</p>
          </div>

          <Steps current={currentStep} style={{ marginBottom: 40 }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            {steps[currentStep].content}

            <Form.Item>
              {currentStep < 2 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="register-button"
                >
                  {currentStep === 0 ? '下一步' : '注册'}
                </Button>
              )}

              {currentStep === 0 && (
                <div className="register-login-link">
                  已有账号? <Link to={ROUTES.LOGIN}>立即登录</Link>
                </div>
              )}

              {currentStep === 1 && (
                <Button
                  style={{ marginTop: 16 }}
                  block
                  onClick={() => setCurrentStep(0)}
                >
                  返回上一步
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ModernRegister; 