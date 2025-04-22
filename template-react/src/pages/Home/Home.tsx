import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Spin } from 'antd';
import { UserOutlined, KeyOutlined, HomeOutlined } from '@ant-design/icons';
import { indexUsingGet } from '@/api/shouyejiekou.ts';
import { getCurrentUserUsingGet } from '@/api/yonghujiekou.ts';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<API.UserVO | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 获取首页数据
      const homeRes = await indexUsingGet();
      if (homeRes.data?.data) {
        setHomeData(homeRes.data.data);
      }

      // 获取当前用户信息
      const userRes = await getCurrentUserUsingGet();
      if (userRes.data?.data) {
        setCurrentUser(userRes.data.data);
      }
    } catch (error) {
      console.error('获取首页数据失败', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Typography>
        <Title level={2}>欢迎使用系统</Title>
        <Paragraph>
          {currentUser?.userName ? `${currentUser.userName}，` : ''}
          欢迎您回来，祝您使用愉快！
        </Paragraph>
      </Typography>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="当前用户"
              value={currentUser?.userAccount || '-'}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户角色"
              value={currentUser?.userRole || '-'}
              prefix={<KeyOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="系统状态"
              value="正常运行中"
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {homeData && (
        <Card style={{ marginTop: 24 }}>
          <Typography>
            <Title level={4}>系统公告</Title>
            <Paragraph>{homeData}</Paragraph>
          </Typography>
        </Card>
      )}
    </div>
  );
};

export default Home; 