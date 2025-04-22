import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Upload, message, Avatar, Spin } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { getCurrentUserUsingGet, updateUserUsingPut } from '@/api/yonghujiekou.ts';

const { TextArea } = Input;

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<API.UserVO | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await getCurrentUserUsingGet();
      if (res.data?.data) {
        setCurrentUser(res.data.data);
        form.setFieldsValue({
          userName: res.data.data.userName,
          userProfile: res.data.data.userProfile,
          userAvatar: res.data.data.userAvatar,
        });
      }
    } catch (error) {
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!currentUser?.id) {
      message.error('用户信息获取失败，请刷新页面');
      return;
    }

    try {
      setSubmitting(true);

      const updateData: API.UserUpdateRequest = {
        id: currentUser.id,
        userName: values.userName,
        userProfile: values.userProfile,
        userAvatar: values.userAvatar,
      };

      const res = await updateUserUsingPut(updateData);
      if (res.data?.code === 0) {
        message.success('更新资料成功');
        fetchCurrentUser();
      } else {
        message.error(res.data?.message || '更新资料失败');
      }
    } catch (error) {
      message.error('更新资料失败');
    } finally {
      setSubmitting(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card title="个人资料" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar
          size={120}
          icon={<UserOutlined />}
          src={currentUser?.userAvatar}
        />
        <h2 style={{ marginTop: 16 }}>{currentUser?.userName || currentUser?.userAccount}</h2>
        <p>账号: {currentUser?.userAccount}</p>
        <p>角色: {currentUser?.userRole}</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          userName: currentUser?.userName,
          userProfile: currentUser?.userProfile,
          userAvatar: currentUser?.userAvatar,
        }}
      >
        <Form.Item
          name="userName"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="userProfile"
          label="个人简介"
        >
          <TextArea rows={4} placeholder="请输入个人简介" />
        </Form.Item>

        <Form.Item
          name="userAvatar"
          label="头像链接"
        >
          <Input placeholder="请输入头像链接" />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="上传头像"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="avatar"
            listType="picture"
            action="/api/upload" // 后端上传地址
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
          <small style={{ display: 'block', marginTop: 8 }}>
            * 上传功能需要后端支持，目前可以通过外部链接设置头像
          </small>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserProfile; 