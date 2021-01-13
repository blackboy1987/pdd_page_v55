import React from 'react';
import { Tooltip, Form, Input, Switch, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { crawler } from '@/pages/product/copy/service';

const CrawlerLink = () => {
  const [form] = Form.useForm();
  return (
    <>
      <div className={styles.tips}>
        <p>注意点</p>
        <p>1. 本页面支持淘宝/天猫/1688 宝贝搬家，请输入宝贝链接 抓取；</p>
        <p>2. 付费用户搬家宝贝个数暂时不限制，试用用户最多一次性抓取10个宝贝，多了会被过滤。</p>
      </div>
      <Form form={form}>
        <Form.Item
          name="filter"
          label={
            <>
              <span>已抓取宝贝自动过滤</span>
              <Tooltip title="prompt text">
                <QuestionCircleOutlined style={{ marginLeft: 4, marginRight: 4 }} />
              </Tooltip>
            </>
          }
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="urls"
          rules={[
            {
              required: true,
              message: '忘记输入采集地址了吧',
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 10, maxRows: 10 }}
            placeholder="多条地址换行或逗号区分，一次最多支持100条，支持【天猫】【淘宝】【京东】【1688】【苏宁】站点链接"
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
    </>
  );
};

export default CrawlerLink;
