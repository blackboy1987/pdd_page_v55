import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import CrawlerLink from '@/pages/product/info/CrawlerLink';

const Index: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Card size="small" bordered={false}>
        <Tabs>
          <Tabs.TabPane tab="普通查询" key="1">
            <CrawlerLink />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Index;
