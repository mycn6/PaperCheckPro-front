import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Space } from 'antd';
import { GlobalOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const PortalPage = () => {
  const navigate = useNavigate();

  // 通用卡片样式
  const cardStyle = {
    height: 320,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
    }
  };

  // 功能特性列表样式
  const featureList = {
    fontSize: 14,
    lineHeight: 1.8,
    color: '#666',
    marginTop: 16
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
        科研管理智能助手
        <Paragraph type="secondary" style={{ marginTop: 12, fontSize: 16 }}>
          一站式论文数据获取与评估平台
        </Paragraph>
      </Title>

      <Row gutter={[32, 32]} justify="center">
        {/* 英文论文卡片 */}
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <GlobalOutlined style={{ color: '#1890ff' }} />
                <span>国际文献检索</span>
              </Space>
            }
            hoverable
            onClick={() => navigate('/paper/info/query')}
            style={cardStyle}
          >
            <Paragraph style={{ color: '#666' }}>
              精准获取英文论文全维度数据，助力科研成果管理
            </Paragraph>
            <div style={featureList}>
              <div>• 论文元数据获取</div>
              <div>• 期刊分区与影响因子获取</div>
              <div>• 科研工作量智能核算</div>
              <div>• 论文期刊级别认定</div>
              <div>• 基金项目解析</div>
            </div>
          </Card>
        </Col>

        {/* 中文论文卡片 */}
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <FileTextOutlined style={{ color: '#52c41a' }} />
                <span>中文文献检索</span>
              </Space>
            }
            hoverable
            onClick={() => navigate('/papercn/info/query')}
            style={cardStyle}
            headStyle={{ borderBottom: 0 }}
          >
            <Paragraph style={{ color: '#666' }}>
              深度解析中文科研成果，满足本土化科研管理需求
            </Paragraph>
            <div style={featureList}>
                <div>• 论文元数据获取</div>
              <div>• 科研工作量智能核算</div>
              <div>• 论文期刊级别认定</div>
              <div>• 基金项目获取</div>
            </div>
          </Card>
        </Col>
      </Row>

      <Paragraph style={{ 
        textAlign: 'center', 
        marginTop: 48,
        color: '#888',
        fontSize: 14
      }}>
        支持全球主流期刊数据库访问
      </Paragraph>
    </div>
  );
};

export default PortalPage;