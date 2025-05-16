import { useLocation } from 'react-router-dom';
import { Card , Typography} from 'antd';
import PaperInfoDescriptions from "@/components/PaperInfoDescriptions";
import PaperJournalLevel from '@/components/PaperJournalLevel';
import WorkLoadAnalysis from '@/components/WorkLoadAnalysis';
import { useSelector } from 'react-redux';
const { Title } = Typography;
const PaperInfoEnhancement = () => {
    const location = useLocation();
    const paperinfo = location.state?.paperinfonoenhan || {}; // 使用可选链操作符
    const { journal_level } = useSelector(state => state.papercn);

    return (
        <div style={{ padding: 20 }}>
        <Title
          level={3}
          style={{
              textAlign: 'center',
              marginBottom: 32,
              fontSize: 28,
              color: '#1d1d1d'
          }}
        >
        根据学校政策分析论文信息
        </Title>
        <Card>
            <PaperInfoDescriptions paperinfo={paperinfo} />
        </Card>
        <PaperJournalLevel
            journal_name={paperinfo.journal_name}
            journal_partition={paperinfo.journal_partition}
        />
        {
            journal_level && (
                <WorkLoadAnalysis
                            journal_name={paperinfo.journal_name}
                            journal_partition={paperinfo.journal_partition}
                            journal_level={journal_level}
                            top_journal_flag={paperinfo.top_journal_flag}
                            authors={paperinfo.authors}
                            authoraffmaps={paperinfo.authoraffmaps}
                            co_author={paperinfo.co_author}
                            corresponding_author={paperinfo.corresponding_author}
                />
            )
        }
        </div>
    );
};

export default PaperInfoEnhancement;