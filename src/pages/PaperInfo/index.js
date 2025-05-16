// src\pages\PaperInfo\index.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Segmented, 
  Input, 
  Button, 
  Card, 
  Alert,
  Flex,
  Typography,Space
} from "antd";
import { useNavigate } from 'react-router-dom';
import { fetchPaperInfo, fetchPaperInfoByDoi } from "@/store/modules/paperStore";
import PaperInfoDescriptions from "@/components/PaperInfoDescriptions";
import PaperInfoCheckButton from "@/components/PaperInfoCheckButton";
import {
    FileTextOutlined,
    EditOutlined,
  } from '@ant-design/icons';
const { Title } = Typography;

const PaperInfo = () => {
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paperinfo } = useSelector(state => state.paper);
  const [searchType, setSearchType] = useState("doi");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
  
    const action = searchType === "title" 
      ? fetchPaperInfo(keyword)
      : fetchPaperInfoByDoi(keyword);
  
    dispatch(action)
      .then((data) => {
        if (!data?.title) {
          setError("未找到相关论文信息");
        }
      })
      .catch((error) => {
        setError("搜索失败: " + error.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div style={{ padding: 24 }}>
       <Title
          level={3}
          style={{
              textAlign: 'center',
              marginBottom: 32,
              fontSize: 28,
              color: '#1d1d1d'
          }}
        >
        英文学术论文信息检索系统
        </Title>

      <Flex gap="middle" vertical>
        
        <Segmented
          options={[
            { label: "按DOI号搜索", value: "doi" },
            { label: "按论文名搜索", value: "title" }
          ]}
          value={searchType}
          onChange={setSearchType}
        />

        <Flex gap={8}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={searchType === "doi" ? "请输入DOI号" : "请输入论文名"}
            onPressEnter={handleSearch}
            style={{ flex: 1 }}
          />
          <Button 
            type="primary" 
            onClick={handleSearch}
            loading={loading}
          >
            搜索
          </Button>
        </Flex>

        {error && <Alert message={error} type="error" showIcon />}

        {paperinfo.title && (
          <Flex gap="middle" vertical>
          <Card
           title={
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Space>
                <FileTextOutlined />
                论文信息
              </Space>
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => navigate('/paper/editor')}
                size="small"
              >
                编辑信息
              </Button>
            </Space>
          }
          >
            <PaperInfoDescriptions paperinfo={paperinfo} />
          </Card>
          <PaperInfoCheckButton paperinfo={paperinfo} ischinese= {false} />
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default PaperInfo;