import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import CrawlerLink from '@/pages/product/copy/CrawlerLink';
import CrawlerStore from '@/pages/product/copy/CrawlerStore';

const Index: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Card size="small" bordered={false}>
        <Tabs>
          <Tabs.TabPane tab="链接复制" key="1">
            <CrawlerLink />
          </Tabs.TabPane>
          <Tabs.TabPane tab="店铺复制" key="2">
            <CrawlerStore />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Index;
