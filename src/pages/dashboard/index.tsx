import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import {
  CloudServerOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getServers } from '../../api/servers';
import type { Server } from '../../api/servers';

const DashboardPage: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    getServers().then((res) => setServers(res.data));
  }, []);

  const online = servers.filter((s) => s.status === 'online').length;
  const offline = servers.filter((s) => s.status !== 'online').length;

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>仪表盘</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="服务器总数"
              value={servers.length}
              prefix={<CloudServerOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="在线"
              value={online}
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="离线 / 未知"
              value={offline}
              valueStyle={{ color: '#cf1322' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="当前用户" value={1} prefix={<UserOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
