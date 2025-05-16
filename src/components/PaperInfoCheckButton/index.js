import { Card, Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

// 数据完整性检测函数
export const checkMissingData = (paperinfo) => {
  const requiredFields = [
    'title',
    'authors',
    'affiliations',
    'authoraffmaps',
    'journal_name',
    'url',
    'co_author',
    'corresponding_author',
    'pubdatevolissue',
    'funding'
  ];

  return requiredFields.some(field => {
    const value = paperinfo[field];
    return typeof value === 'string' ? value.trim() === '' : value.length === 0;
  });
};

const PaperInfoCheckButton = ({ paperinfo ,ischinese}) => {
  console.log(paperinfo);
  const navigate = useNavigate();
  const isMissingData = checkMissingData(paperinfo);

  // 根据语言选择路径前缀
  const routeBase = ischinese ? 'papercn' : 'paper';

  return (
    <Card
      variant="borderless"
      style={{ 
        borderRadius: 8,
        backgroundColor: '#fafafa',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
      }}
    >
      <Flex justify="space-between" align="center">
        {/* 左侧文字说明 */}
        <div style={{ flex: 1 }}>
          {isMissingData ? (
            <>
              <h4 style={{ marginTop:10, color: '#ff4d4f' }}>数据不完整</h4>
              <p style={{ color: '#666', margin: 0 }}>需要补充PDF文档完善论文元数据</p>
            </>
          ) : (
            <>
              <h4 style={{ marginTop:10, color: '#1890ff' }}>信息增强可用</h4>
              <p style={{ color: '#666', margin: 0 }}>根据学校政策文件获取该论文的级别和工作量</p>
            </>
          )}
        </div>

        {/* 右侧按钮 */}
        <Button 
          type={isMissingData ? 'primary-danger' : 'primary'}
          size="large"
          style={{ 
            minWidth: 160,
            borderRadius: 24,
            height: 40,
            ...(isMissingData ? {
                background: '#ff4d4f',
                borderColor: '#ff4d4f'
            } : { 
              background: '#1890ff',
              borderColor: '#1890ff'
            })
          }}
          onClick={() => navigate(
            // 动态生成路径
            isMissingData ? `/${routeBase}/completion` : `/${routeBase}/enhancement`,
            { 
              state: { 
                paperinfonoenhan: paperinfo 
              } 
            }
          )}
        >
          {isMissingData ? '立即补全' : '开始增强'}
        </Button>
      </Flex>
    </Card>
  );
};

export default PaperInfoCheckButton;