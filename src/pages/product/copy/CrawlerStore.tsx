import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const CrawlerStore = () => {
  return (
    <ProForm submitter={false}>
      <ProFormText
        name="urls"
        placeholder="多条地址换行或逗号区分，一次最多支持100条，支持【天猫】【淘宝】【京东】【1688】【苏宁】站点链接"
      />
    </ProForm>
  );
};

export default CrawlerStore;
