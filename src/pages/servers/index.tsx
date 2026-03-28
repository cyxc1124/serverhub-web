import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Server, ServerPayload } from '../../api/servers';
import {
  getServers,
  createServer,
  updateServer,
  deleteServer,
} from '../../api/servers';
import dayjs from 'dayjs';

const statusColorMap: Record<string, string> = {
  online: 'green',
  offline: 'red',
  unknown: 'default',
};

const ServersPage: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Server | null>(null);
  const [form] = Form.useForm();

  const fetchServers = async () => {
    setLoading(true);
    try {
      const res = await getServers();
      setServers(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (record: Server) => {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    const values: ServerPayload = await form.validateFields();
    if (editing) {
      await updateServer(editing.id, values);
      message.success('更新成功');
    } else {
      await createServer(values);
      message.success('创建成功');
    }
    setModalOpen(false);
    fetchServers();
  };

  const handleDelete = async (id: number) => {
    await deleteServer(id);
    message.success('删除成功');
    fetchServers();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'name' },
    { title: '主机', dataIndex: 'host' },
    { title: '端口', dataIndex: 'port', width: 80 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={statusColorMap[status] || 'default'}>{status}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 180,
      render: (v: string) => dayjs(v).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      width: 160,
      render: (_: unknown, record: Server) => (
        <Space>
          <Button size="small" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>服务器管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          添加服务器
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={servers}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editing ? '编辑服务器' : '添加服务器'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={{ port: 22 }}>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="host" label="主机地址" rules={[{ required: true, message: '请输入主机地址' }]}>
            <Input placeholder="例如: 192.168.1.100" />
          </Form.Item>
          <Form.Item name="port" label="端口">
            <InputNumber min={1} max={65535} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServersPage;
