
import React, {useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Alert, Card, Form, Radio} from "antd";
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {Constants} from "@/utils/constants";

const Cut: React.FC = () => {
  const [fileList,setFileList] = useState<any[]>([]);


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传中</div>
    </div>
  );
  return (
    <PageContainer title={false}>
      <Card size='small' bordered={false}>
        <Alert
          message={
            <>
              <p>1. 上传图片支持jpg、jpeg、png格式，单张图片不超过1M，单次上传不超过20张</p>
              <p>2. 退出本页面之后图片不保存，请及时下载图片</p>
            </>
          }
          type="info"
        />
        <Form initialValues={{
          bgColor:'0'
        }}>
          <Form.Item label='背景色' name='bgColor'>
            <Radio.Group>
              <Radio value='0'>白色</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Upload
          action={Constants.uploadUrl}
          data={{
            token:localStorage.getItem("token")
          }}
          name='file'
          listType="picture-card"
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </Card>
    </PageContainer>
  );
};

export default Cut;
