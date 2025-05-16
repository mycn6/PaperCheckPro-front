import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select, Card, Space, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setPaperCnEditorInfo } from '@/store/modules/papercnStore';

const { Option } = Select;

const PaperCnInfoEditor = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paperInfo = useSelector(state => state.papercn.papercninfo);
  const [affiliations, setAffiliations] = useState(paperInfo.affiliations || ['']);
  const [authors, setAuthors] = useState(paperInfo.authors || ['']);
  const [authorAffMaps, setAuthorAffMaps] = useState(paperInfo.authoraffmaps || []);

  const handleSubmit = (values) => {
    const processedData = {
      ...values,
      authors: authors,
      affiliations: affiliations.filter(a => a),
      authoraffmaps: authorAffMaps
    };
    dispatch(setPaperCnEditorInfo(processedData));
    navigate(-1);
  };

  const addAffiliation = () => {
    setAffiliations([...affiliations, '']);
  };

  const addAuthor = () => {
    setAuthors([...authors, '']);
  };

  const handleAffiliationChange = (index, value) => {
    const newAffiliations = [...affiliations];
    newAffiliations[index] = value;
    setAffiliations(newAffiliations);
  };

  const handleAuthorChange = (index, value) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const handleAffMapChange = (authorIndex, value) => {
    const newAffMaps = [...authorAffMaps];
    newAffMaps[authorIndex] = {
      name: authors[authorIndex],
      affmap: value
    };
    setAuthorAffMaps(newAffMaps);
  };

  return (
    <div style={{ padding: 24, width: 1200, margin: '0 auto' }}>
      <Card title="论文信息编辑">
        <Form
          form={form}
          initialValues={paperInfo}
          onFinish={handleSubmit}
          layout="vertical"
        >
          {/* 基础信息部分 */}
          <Space direction="vertical" style={{ width: '100%' }}>
            <Form.Item label="论文标题" name="title">
              <Input placeholder="请输入论文标题" />
            </Form.Item>

            <Form.Item label="期刊名称" name="journal_name">
              <Input placeholder="请输入期刊名称" />
            </Form.Item>
          </Space>

          {/* 作者信息部分 */}
          <Card title="作者信息" style={{ 
             marginTop: 16,
             borderRadius: 8, // 圆角
             boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // 阴影
             padding: '16px 24px' // 内间距
          }}>
            {authors.map((author, index) => (
              <div key={index} style={{ 
                marginBottom: 16,
        display: 'flex', // 启用弹性布局
        alignItems: 'center', // 垂直居中
        gap: 16, // 元素间距
        borderBottom: index < authors.length -1 ? '1px solid #f0f0f0' : 'none', // 分隔线
        paddingBottom: 16 // 底部留白

               }}>
                <Input
                  placeholder={`作者 ${index + 1} 姓名`}
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  style={{ 
                    width: 300,
                    borderRadius: 4, // 下拉框圆角
                    '& .ant-select-selector': {
                      padding: '4px 11px' // 下拉框内间距
                    }
                  }}
                />
                <Select
                  mode="multiple"
                  placeholder="选择所属机构"
                  value={authorAffMaps[index]?.affmap || []}
                  onChange={(value) => handleAffMapChange(index, value)}
                  style={{ width: 300 }}
                >
                  {affiliations.map((aff, affIndex) => (
                    aff && <Option key={affIndex} value={affIndex}>
                      {aff}
                    </Option>
                  ))}
                </Select>
              </div>
            ))}
            <Button onClick={addAuthor} style={{
                marginTop: 8,
                background: '#1890ff', // 按钮颜色
                color: 'white',
                '&:hover': { background: '#40a9ff' } // 悬停效果
             }}>
              添加作者
            </Button>
          </Card>
          

          {/* 机构信息部分 */}
          <Card title="机构信息" style={{ marginTop: 16 }}>
            {affiliations.map((aff, index) => (
              <Input
                key={index}
                placeholder={`机构 ${index + 1}`}
                value={aff}
                onChange={(e) => handleAffiliationChange(index, e.target.value)}
                style={{ width: 300, marginBottom: 8 }}
              />
            ))}
            <Button onClick={addAffiliation} style={{ marginTop: 8 }}>
              添加机构
            </Button>
          </Card>

          {/* 其他信息部分 */}
          <Card title="其他信息" style={{ marginTop: 16 }}>
            <Form.Item label="论文URL" name="url">
              <Input placeholder="请输入论文URL" />
            </Form.Item>
            <Form.Item label="影响因子" name="impact_factor">
              <InputNumber step={0.1} style={{ width: 200 }} />
            </Form.Item>
            <Form.Item label="出版信息" name="pubdatevolissue">
              <Input.TextArea rows={2} placeholder="卷号/期号/出版日期" />
            </Form.Item>
          </Card>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PaperCnInfoEditor;