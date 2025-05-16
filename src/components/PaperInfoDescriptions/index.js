import { Descriptions, Space, Typography } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  BookOutlined,
  CalendarOutlined,
  FlagOutlined,
  FundOutlined,
  StarOutlined,
  NumberOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const PaperInfoDescriptions = ({ paperinfo }) => {
  // 处理作者显示（带单位标记）
  const renderAuthors = () => {
    if (!paperinfo?.authoraffmaps) return '——';
    
    return paperinfo.authoraffmaps.map((author, index) => (
      <span key={author.name}>
        {author.name}
        <sup>{author.affmap.join(',')}</sup>
        {index < paperinfo.authoraffmaps.length - 1 ? ', ' : ''}
      </span>
    ));
  };

  // 处理单位显示（带编号列表）
  const renderAffiliations = () => {
    if (!paperinfo?.affiliations) return '——';
    
    return paperinfo.affiliations.map((aff, index) => (
      <div key={index}>
        <Text strong>{index + 1}.</Text> {aff}
      </div>
    ));
  };

  // 通用数据展示处理
  const renderData = (data, formatter) => {
    if (!data || (Array.isArray(data) && data.length === 0)) return '——';
    
    // 新增对象类型检查
    if (typeof data === 'object' && !Array.isArray(data)) {
      console.error('Invalid data type (object):', data);
      return '——';
    }
    
    return formatter ? formatter(data) : data;
  };

  return (
    <Descriptions
      bordered
      column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
      labelStyle={{ width: 150, fontWeight: 'bold' }}
    >
      {/* 标题 */}
      <Descriptions.Item label={<Space><BookOutlined />标题</Space>} span={2}>
        {renderData(paperinfo?.title)}
      </Descriptions.Item>

      {/* 作者 */}
      <Descriptions.Item label={<Space><UserOutlined />作者列表</Space>} span={2}>
        {renderAuthors()}
      </Descriptions.Item>

      {/* 所属单位 */}
      <Descriptions.Item label={<Space><EnvironmentOutlined />所属单位</Space>} span={2}>
        {renderAffiliations()}
      </Descriptions.Item>

      {/* 期刊信息组 */}
      <Descriptions.Item label={<Space><BookOutlined />期刊名称</Space>}>
        {renderData(paperinfo?.journal_name)}
      </Descriptions.Item>
      <Descriptions.Item label={<Space><CalendarOutlined />出版信息</Space>}>
        {renderData(paperinfo?.pubdatevolissue)}
      </Descriptions.Item>

      {/* 作者信息组 */}
      <Descriptions.Item label={<Space><TeamOutlined />共同一作</Space>}>
        {renderData(paperinfo?.co_author?.join(', '))}
      </Descriptions.Item>
      <Descriptions.Item label={<Space><FlagOutlined />通讯作者</Space>}>
        {renderData(paperinfo?.corresponding_author?.join(', '))}
      </Descriptions.Item>

      {/* 基金信息 */}
      <Descriptions.Item label={<Space><FundOutlined />基金情况</Space>} span={2}>
        {renderData(paperinfo?.funding)}
      </Descriptions.Item>

      {/* 期刊评价信息组 */}
      <Descriptions.Item label={<Space><NumberOutlined />期刊分区</Space>}>
        {renderData(paperinfo?.journal_partition?.join(', '))}
      </Descriptions.Item>
      <Descriptions.Item label={<Space><StarOutlined />TOP期刊</Space>}>
        {renderData(paperinfo?.top_journal_flag)}
      </Descriptions.Item>
      <Descriptions.Item label={<Space><StarOutlined />影响因子</Space>}>
        {renderData(paperinfo?.impact_factor)}
      </Descriptions.Item>
      <Descriptions.Item label={<Space><CalendarOutlined />影响因子年份</Space>}>
        {renderData(paperinfo?.impact_factor_year)}
      </Descriptions.Item>

      {/* 原文链接 */}
      {paperinfo?.url && (
        <Descriptions.Item label="原文链接" span={2}>
          <a href={paperinfo.url} target="_blank" rel="noopener noreferrer">
            查看原文
          </a>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default PaperInfoDescriptions;