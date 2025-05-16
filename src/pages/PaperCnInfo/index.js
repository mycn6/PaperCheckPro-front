// src\pages\PaperCnInfo\index.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Input, 
  Button, 
  Card, 
  Alert,
  Flex,
  Typography,Space
} from "antd";
import {
  FileTextOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchPaperCnInfo } from "@/store/modules/papercnStore";
import PaperInfoDescriptions from "@/components/PaperInfoDescriptions";
import PaperInfoCheckButton from "@/components/PaperInfoCheckButton";

const { Title } = Typography;

const PaperCnInfo = () => {
   const navigate = useNavigate();
    const dispatch = useDispatch();
    const { papercninfo } = useSelector(state => state.papercn);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleSearch = () => {
        if (!keyword.trim()) return;
        setLoading(true);
        setError("");  
        dispatch(fetchPaperCnInfo(keyword))
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
        中文学术论文信息检索系统
        </Title>
        <Flex gap="middle" vertical>
        <Flex gap={8}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={"请输入论文名"}
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
        {papercninfo.title && (
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
                      onClick={() => navigate('/papercn/editor')}
                      size="small"
                    >
                      编辑信息
                    </Button>
                  </Space>
                }
              style={{ 
                  borderRadius: 8,
                  backgroundColor: '#fafafa',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
                  marginTop: 20
                }}

                >
                    <PaperInfoDescriptions paperinfo={papercninfo} />
                </Card>
                <PaperInfoCheckButton paperinfo={papercninfo} ischinese= {true} />
            </Flex>
            )
        }
        </Flex>
    </div>
  );
};

export default PaperCnInfo;