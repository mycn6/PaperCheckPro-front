import React, { useEffect, useState } from 'react';
import { Card, Alert, Spin, Typography } from 'antd';
import { getWorkloadAnalysis } from '@/apis/paper';
import PaperInfoAuthorCheck from '@/components/PaperInfoAuthorCheck';

const { Text } = Typography;

const WorkLoadAnalysis = ({ journal_name, journal_partition, journal_level,top_journal_flag,authors,authoraffmaps,co_author, corresponding_author }) => {
  const [result, setResult] = useState(null);
  const [authorsworkload , setAuthorsWorkload] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 分区格式转换逻辑
  const formatPartition = (partition) => {
    if (Array.isArray(partition)) return partition;
    if (typeof partition === 'string') return partition.split(/,\s*/);
    return [];
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // 参数有效性检查
        if (!journal_name || !journal_level) {
          setError('缺少必要的期刊信息');
          setLoading(false);
          return;
        }

        const validPartition = formatPartition(journal_partition);
        const response = await getWorkloadAnalysis(
          journal_name,
          validPartition,
          journal_level,
          top_journal_flag,
          authors,
          authoraffmaps
        );

        setResult(response.data);
        setAuthorsWorkload(response.data.authors_workload_list);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || '分析失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [journal_name, journal_partition, journal_level,top_journal_flag,authors,authoraffmaps]);

  return (
    <div>
        <Card 
          title="论文工作量分析" 
          style={{ marginTop: 24 }}
        >
          {loading ? (
            <Spin tip="正在分析工作量..." size="large" />
          ) : error ? (
            <Alert
              message="错误"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          ) : result ? (
            <div>
              <div style={{ marginBottom: 16, fontSize: 16 }}>
                <Text strong>工作量评估值：</Text>
                <Text style={{ 
                  fontSize: 24, 
                  color: '#1890ff',
                  marginLeft: 8 
                }}>
                  {result.workload}
                </Text>
              </div>
              <Alert
                message="计算依据"
                description={result.reason}
                type="info"
                showIcon
              />
            </div>
          ) : (
            <Alert
              message="提示"
              description="暂无分析结果"
              type="warning"
              showIcon
            />
          )}

        </Card>
        <Card
            style={{ marginTop: 24 }}
        >
            <PaperInfoAuthorCheck
              authors={authors}
              co_author={co_author}
              corresponding_author={corresponding_author}
              authors_workload_list={authorsworkload}
            />
        </Card>

    </div>
  );
};

export default WorkLoadAnalysis;