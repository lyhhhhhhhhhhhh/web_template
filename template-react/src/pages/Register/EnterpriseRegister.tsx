import React, { useState } from 'react';
import { Form, Input, Button, Steps, message, Typography, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CheckCircleOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterUsingPost } from '@/api/yonghujiekou';
import { ROUTES } from '@/constants';
// @ts-ignore
import logo from '@/assets/logo.png'; // 确保在assets目录下有logo.png文件

import '../Login/enterprise-style.css';
// @ts-ignore
const { Step } = Steps;
const { Title, Paragraph } = Typography;

const EnterpriseRegister: React.FC = () => {
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
      title: '填写账号信息',
      content: (
        <>
          <Form.Item
            name="userAccount"
            label="账号"
            rules={[
              { required: true, message: '请输入账号!' },
              { min: 4, message: '账号长度不能小于4个字符!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入账号"
            />
          </Form.Item>

          <Form.Item
            name="userName"
            label="用户名"
            rules={[{ required: false, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<MailOutlined />}
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
            label="密码"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 8, message: '密码长度不能小于8个字符!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item
            name="checkPassword"
            label="确认密码"
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
              placeholder="请确认密码"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: '注册成功',
      content: (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <CheckCircleOutlined style={{ fontSize: 72, color: '#52c41a' }} />
          <h2 style={{ marginTop: 24, fontSize: 24 }}>注册成功!</h2>
          <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>您的账号已成功创建，即将跳转到登录页...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="enterprise-register-container">
      <Row className="enterprise-register-row">
        <Col span={14} className="enterprise-login-banner">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <Title level={2} className="banner-title">加入我们的平台</Title>
            <Paragraph className="banner-desc">
              创建企业管理平台账号，开启智能管理新体验
            </Paragraph>
            <div className="banner-features">
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <div className="feature-text">
                  <h4>简单注册流程</h4>
                  <p>快速完成注册，立即开始使用</p>
                </div>
              </div>
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <div className="feature-text">
                  <h4>安全账户保障</h4>
                  <p>多重验证保护，账号安全无忧</p>
                </div>
              </div>
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <div className="feature-text">
                  <h4>全平台支持</h4>
                  <p>支持Web、移动端多平台访问</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={10} className="enterprise-register-form-container">
          <div className="enterprise-register-form-wrapper">
            <div className="enterprise-register-header">
              <img src={logo} alt="Logo" className="enterprise-register-logo" />
              <Title level={3} className="enterprise-register-title">创建账号</Title>
              <Paragraph className="enterprise-register-subtitle">
                创建企业管理平台账号，享受全套服务
              </Paragraph>
            </div>

            <Steps
              current={currentStep}
              className="enterprise-register-steps"
              items={steps.map(item => ({ title: item.title }))}
            />

            <Form
              form={form}
              name="enterprise_register"
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
                    className="enterprise-register-button"
                  >
                    {currentStep === 0 ? '下一步' : '注册'}
                  </Button>
                )}

                {currentStep === 0 && (
                  <div className="login-link">
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EnterpriseRegister; 