import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  listUserUsingGet,
  addUserUsingPost,
  deleteUserUsingDelete,
  updateUserUsingPut,
  getUserByIdUsingGet
} from '@/api/yonghujiekou.ts';

const { Option } = Select;

const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<API.UserVO[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加用户');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [current, pageSize]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await listUserUsingGet({
        current,
        pageSize,
      });

      if (res.data?.data) {
        setUsers(res.data.data.records || []);
        setTotal(res.data.data.total || 0);
      }
    } catch (error) {
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingId(null);
    setModalTitle('添加用户');
    setModalVisible(true);
  };

  const handleEdit = async (id: number) => {
    try {
      setLoading(true);
      const res = await getUserByIdUsingGet({ id });
      if (res.data?.data) {
        form.setFieldsValue({
          userAccount: res.data.data.userAccount,
          userName: res.data.data.userName,
          userRole: res.data.data.userRole,
          userProfile: res.data.data.userProfile,
        });
        setEditingId(id);
        setModalTitle('编辑用户');
        setModalVisible(true);
      }
    } catch (error) {
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteUserUsingDelete({ id });
      message.success('删除用户成功');
      fetchUsers();
    } catch (error) {
      message.error('删除用户失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingId) {
        // 更新用户
        await updateUserUsingPut({
          id: editingId,
          userName: values.userName,
          userProfile: values.userProfile,
        });
        message.success('更新用户成功');
      } else {
        // 添加用户
        await addUserUsingPost({
          userAccount: values.userAccount,
          userPassword: values.userPassword,
          checkPassword: values.checkPassword,
          userName: values.userName,
        });
        message.success('添加用户成功');
      }

      setModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error('操作失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleTableChange = (pagination: any) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      key: 'userAccount',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      key: 'userRole',
      render: (role: string) => {
        let color = 'blue';
        if (role === 'admin') {
          color = 'red';
        }
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: API.UserVO) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id as number)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该用户吗？"
            onConfirm={() => handleDelete(record.id as number)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加用户
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          {!editingId && (
            <Form.Item
              name="userAccount"
              label="账号"
              rules={[
                { required: true, message: '请输入账号' },
                { min: 4, message: '账号长度不能小于4个字符' },
              ]}
            >
              <Input placeholder="请输入账号" />
            </Form.Item>
          )}

          {!editingId && (
            <Form.Item
              name="userPassword"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 8, message: '密码长度不能小于8个字符' },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )}

          {!editingId && (
            <Form.Item
              name="checkPassword"
              label="确认密码"
              dependencies={['userPassword']}
              rules={[
                { required: true, message: '请确认密码' },
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
              <Input.Password placeholder="请确认密码" />
            </Form.Item>
          )}

          <Form.Item
            name="userName"
            label="用户名"
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          {!editingId && (
            <Form.Item
              name="userRole"
              label="角色"
              initialValue="user"
            >
              <Select>
                <Option value="user">普通用户</Option>
                <Option value="admin">管理员</Option>
              </Select>
            </Form.Item>
          )}

          {editingId && (
            <Form.Item
              name="userProfile"
              label="个人简介"
            >
              <Input.TextArea rows={4} placeholder="请输入个人简介" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 