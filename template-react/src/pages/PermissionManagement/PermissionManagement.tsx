import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Card, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  getAllPermissionsUsingGet,
  addPermissionUsingPost,
  updatePermissionUsingPut,
  deletePermissionUsingDelete,
  getPermissionsByRoleUsingGet
} from '@/api/quanxianguanlijiekou.ts';

const { Option } = Select;
const { TabPane } = Tabs;

const PermissionManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<API.Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加权限');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentRole, setCurrentRole] = useState<string>('user');

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    fetchRolePermissions(currentRole);
  }, [currentRole]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const res = await getAllPermissionsUsingGet();
      if (res.data?.data) {
        setPermissions(res.data.data);
      }
    } catch (error) {
      message.error('获取权限列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchRolePermissions = async (role: string) => {
    try {
      setLoading(true);
      const res = await getPermissionsByRoleUsingGet({ userRole: role });
      if (res.data?.data) {
        setRolePermissions(res.data.data);
      }
    } catch (error) {
      message.error('获取角色权限列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingId(null);
    setModalTitle('添加权限');
    setModalVisible(true);
  };

  const handleEdit = (record: API.Permission) => {
    form.setFieldsValue({
      permissionCode: record.permissionCode,
      permissionDesc: record.permissionDesc,
      userRole: record.userRole,
    });
    setEditingId(record.id as number);
    setModalTitle('编辑权限');
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deletePermissionUsingDelete({ id });
      message.success('删除权限成功');
      fetchPermissions();
    } catch (error) {
      message.error('删除权限失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const permissionData: API.Permission = {
        permissionCode: values.permissionCode,
        permissionDesc: values.permissionDesc,
        userRole: values.userRole,
      };

      if (editingId) {
        // 更新权限
        permissionData.id = editingId;
        await updatePermissionUsingPut(permissionData);
        message.success('更新权限成功');
      } else {
        // 添加权限
        await addPermissionUsingPost(permissionData);
        message.success('添加权限成功');
      }

      setModalVisible(false);
      fetchPermissions();
      fetchRolePermissions(currentRole);
    } catch (error) {
      message.error('操作失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleRoleChange = (key: string) => {
    setCurrentRole(key);
  };

  const permissionColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限代码',
      dataIndex: 'permissionCode',
      key: 'permissionCode',
    },
    {
      title: '权限描述',
      dataIndex: 'permissionDesc',
      key: 'permissionDesc',
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      key: 'userRole',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: API.Permission) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该权限吗？"
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
      <Tabs defaultActiveKey="allPermissions" onChange={() => { }}>
        <TabPane tab="所有权限" key="allPermissions">
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加权限
            </Button>
          </div>

          <Table
            columns={permissionColumns}
            dataSource={permissions}
            rowKey="id"
            loading={loading}
          />
        </TabPane>

        <TabPane tab="角色权限" key="rolePermissions">
          <Card title="角色权限列表" style={{ marginBottom: 16 }}>
            <Tabs activeKey={currentRole} onChange={handleRoleChange}>
              <TabPane tab="普通用户" key="user">
                {loading ? (
                  <div>加载中...</div>
                ) : (
                  <ul>
                    {rolePermissions.map((perm, index) => (
                      <li key={index}>{perm}</li>
                    ))}
                  </ul>
                )}
              </TabPane>
              <TabPane tab="管理员" key="admin">
                {loading ? (
                  <div>加载中...</div>
                ) : (
                  <ul>
                    {rolePermissions.map((perm, index) => (
                      <li key={index}>{perm}</li>
                    ))}
                  </ul>
                )}
              </TabPane>
            </Tabs>
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="permissionCode"
            label="权限代码"
            rules={[{ required: true, message: '请输入权限代码' }]}
          >
            <Input placeholder="请输入权限代码" />
          </Form.Item>

          <Form.Item
            name="permissionDesc"
            label="权限描述"
            rules={[{ required: true, message: '请输入权限描述' }]}
          >
            <Input placeholder="请输入权限描述" />
          </Form.Item>

          <Form.Item
            name="userRole"
            label="用户角色"
            rules={[{ required: true, message: '请选择用户角色' }]}
            initialValue="user"
          >
            <Select>
              <Option value="user">普通用户</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement; 