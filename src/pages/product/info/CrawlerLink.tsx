import React from 'react';
import { Form, Input, Button } from 'antd';

import { crawler } from '@/pages/product/copy/service';

const CrawlerLink = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Form.Item
        name="urls"
        rules={[
          {
            required: true,
            message: '请输入拼多多商品ID',
          },
        ]}
      >
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 10 }}
          placeholder="请输入拼多多商品ID，可查询您搬家时的源商品，供您发货使用。支持查询多个，一行一个"
        />
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="primary"
            onClick={() => {
              const values = form.getFieldsValue();
              const response = crawler({ urls: values.urls.replace(/\n/g, ','), type: 0 });
              console.log(response);
            }}
          >
            提交采集
          </Button>
          <Button
            type="primary"
            onClick={() => {
              console.log('1111');
            }}
            style={{ marginLeft: 8 }}
          >
            导入商品采集
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CrawlerLink;
