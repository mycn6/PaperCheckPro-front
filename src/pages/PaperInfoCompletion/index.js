//paper-check-pro-front\src\pages\PaperInfoCompletion\index.js
import React, { useState } from 'react';
import { Upload, message, Card, Spin,Descriptions,Flex ,Button, Typography,Space} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setPaperEnPdfCmpInfo,setPaperEnInfo } from '@/store/modules/paperStore';
import { request } from '@/utils'; // 导入配置好的axios实例
import { getPaperAnalysis } from '@/apis/paper';
import PaperInfoDescriptions from "@/components/PaperInfoDescriptions";
import { useNavigate } from 'react-router-dom';
import {
    FileTextOutlined,
    EditOutlined,
  } from '@ant-design/icons';
  
const { Dragger } = Upload;
const { Title } = Typography;


const PaperInfoCompletion = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 从redux获取存储的论文信息
    const {paperinfo, paperpdfcmpinfo} = useSelector(state => state.paper);
    const [loading, setLoading] = useState(false);
    const [situation, setSituation] = useState([]); // 初始值改为空数组
     // 自定义上传处理
     const handleUpload = async ({ file }) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            // 1. 上传解析PDF
            const uploadRes = await request.post('/api/PaperInfoQuery/paper_query/paper_en/pdf/analysis', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (!uploadRes.data) {
                message.error('PDF解析失败');
                return;
            }
            //对比存储的论文标题和上传的PDF标题
             if (uploadRes.data.title !== paperinfo.title) {
               message.warning('上传的PDF标题与查询的论文标题不一致,请检查！');
               return;
            } 
            // 2. 发起数据对比请求
            const analysisRes = await getPaperAnalysis(uploadRes.data, paperinfo);

            if (analysisRes.data) {
                dispatch(setPaperEnPdfCmpInfo(analysisRes.data.paper_info));
                dispatch(setPaperEnInfo(analysisRes.data.paper_info));
                setSituation(analysisRes.data.situation || []);
                message.success('数据整合成功');
            }else {
                message.warning('数据对比未返回有效结果');
            }
    
        } catch (error) {
            // 错误处理
            console.error('处理失败:', error);
            message.error(`处理失败: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };
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
        英文论文pdf文件补全信息
        </Title>
            <Card title="论文PDF解析" 
            style={{ 
                borderRadius: 8,
                backgroundColor: '#fafafa',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
                marginTop: 20
              }}
            >
                {/* 使用Spin组件处理加载状态 */}
                <Spin spinning={loading} tip="数据加载中..." size="large">
                    {/* 文件上传区域 */}
                    <Dragger
                        name="file"
                        multiple={false}
                        accept=".pdf" // 限制只能上传PDF文件
                        customRequest={handleUpload} // 覆盖默认上传行为
                        showUploadList={false} // 隐藏文件列表
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽PDF文件到此区域上传</p>
                        <p className="ant-upload-hint">
                            支持单文件上传，最大文件限制：10MB
                        </p>
                    </Dragger>
                </Spin>
            </Card>
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
            style={{ 
                borderRadius: 8,
                backgroundColor: '#fafafa',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
                marginTop: 20
              }}
            >
                {/* 结果显示区域 */}
              
                        {paperpdfcmpinfo.title ? (
                            <>
                                <PaperInfoDescriptions paperinfo={paperinfo} />
                                <Descriptions bordered style={{ marginTop: 20 }}>
                                    <Descriptions.Item label="数据整合情况" span={3}>
                                      {situation.length > 0 ? (
                                        <div>
                                          {situation.map((item, index) => (
                                             <div key={index}>{item}</div>
                                             ))}
                                              </div>
                                             ) : '暂无整合情况说明'}
                                    </Descriptions.Item>
                                </Descriptions>
                            </>
                        ): <div style={{ 
                            marginTop: 20,
                            padding: 16,
                            border: '1px dashed #91d5ff',
                            backgroundColor: '#e6f7ff',
                            textAlign: 'center'
                        }}>
                            等待上传PDF进行数据核验...
                        </div>
                        } 
             
            </Card>
            {paperpdfcmpinfo.title &&(
                <Card
                variant="borderless"

                style={{ 
                  borderRadius: 8,
                  backgroundColor: '#fafafa',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
                  marginTop: 20
                }}
              >
                <Flex justify="space-between" align="center">
                  {/* 左侧文字说明 */}
                  <div style={{ flex: 1 }}>
                      <>
                        <h4 style={{  marginTop:10,color: '#1890ff' }}>根据学校政策分析</h4>
                        <p style={{ color: '#666', margin: 0 }}>根据学校政策文件获取该论文的级别和工作量</p>
                      </>
                  </div>
          
                  {/* 右侧按钮 */}
                  <Button 
                    type={'primary'}
                    size="large"
                    style={{ 
                      minWidth: 160,
                      borderRadius: 24,
                      height: 40,
                      background: '#1890ff',
                      borderColor: '#1890ff'
                    }}
                    onClick={() => navigate('/paper/enhancement',
                        { state: { 
                            paperinfonoenhan:paperinfo
                        } }
                    )}
                  >
                    开始分析
                  </Button>
                </Flex>
              </Card>
            )
            }
        </div>
        

    )
};

export default PaperInfoCompletion;