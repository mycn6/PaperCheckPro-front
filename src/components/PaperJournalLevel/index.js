import { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Spin, Alert, Typography } from 'antd';
import { fetchJournalLevel ,setJournalLevel} from '@/store/modules/paperStore';

const { Text } = Typography;

const PaperJournalLevel = ({ journal_name, journal_partition }) => {
  const dispatch = useDispatch();
  const { journal_level } = useSelector(state => state.paper);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 检查是否有必要参数
        if (!journal_name && !journal_partition?.length) {
          dispatch(setJournalLevel(''));
          return;
        }

        setLoading(true);
        setError(null);
        await dispatch(fetchJournalLevel(journal_name, journal_partition));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [journal_name, journal_partition, dispatch]);

  return (
    <Card 
      title="论文期刊等级"
      style={{ marginTop: 16 }}
    >

      {loading ? (
        <Spin tip="加载论文期刊等级..." size="large" />
      ) : error ? (
        <Alert 
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      ) : (
        journal_level ? (
          <div style={{ fontSize: 16 }}>
            <Text strong>{journal_name}: </Text>
            <Text >{journal_level}</Text>
          </div>
        ) : (
          <Alert 
            message="Information"
            description="No journal level data available"
            type="info"
            showIcon
          />
        )
      )}
    </Card>
  );
};

export default PaperJournalLevel;