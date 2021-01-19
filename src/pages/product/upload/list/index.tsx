import { Avatar, Form, Empty, Button, Row, Col, Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { StoreTree, TableListItem } from './data.d';
import { list, listStoreTree } from './service';
import { defaultPaginationResult, PaginationResult, parseFormValues } from '@/utils/common';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import UploadConfig from '@/pages/product/upload/components/UploadConfig';

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [storeTree, setStoreTree] = useState<StoreTree[]>([]);
  const [selectedStoreIds, setSelectedStoreIds] = useState<string[]>([]);
  const [uploadConfigModalVisible, setUploadConfigModalVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<PaginationResult>(defaultPaginationResult);

  const load = async (params: { [key: string]: any }) => {
    setLoading(true);
    const result = await list({
      ...parseFormValues(form.getFieldsValue()),
      ...params,
    });
    setData(result);
    setLoading(false);
  };

  const fetchStore = async () => {
    const result: StoreTree[] = await listStoreTree({});
    setStoreTree(result);
  };

  useEffect(() => {
    load({
      pageNumber: 1,
      pageSize: 10,
    });
    fetchStore();
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'name',
      width: 50,
      renderText: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '图片',
      dataIndex: 'image',
      width: 85,
      renderText: (text) => (
        <Avatar shape="square" size={65} src={`${text}??x-oss-process=style/65`} />
      ),
    },
    {
      title: '宝贝标题',
      dataIndex: 'name',
    },
    {
      title: '抓取价格',
      dataIndex: 'price',
      align: 'right',
      width: 80,
    },
    {
      title: '分类',
      dataIndex: 'productCategoryName',
    },
    {
      title: '采集时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
      width: 130,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 50,
      renderText: (_, record) => (
        <>
          <div>
            <a href={record.url} target="_blank">
              编辑
            </a>
          </div>
        </>
      ),
    },
  ];
  return (
    <PageContainer title={false}>
      <Row>
        <Col span={4}>
          <Tree
            showLine
            checkable
            autoExpandParent
            expandedKeys={storeTree.map((item) => item.key)}
            treeData={storeTree}
            selectedKeys={selectedStoreIds}
            onCheck={(selectedKeys) => {
              console.log('selectedKeys', selectedKeys);
              setSelectedStoreIds(selectedKeys);
            }}
          />
        </Col>
        <Col span={20}>
          <ProTable<TableListItem>
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                size="small"
                onClick={() => {
                  setUploadConfigModalVisible(true);
                }}
              >
                上传配置
              </Button>,
            ]}
            size="small"
            bordered
            actionRef={actionRef}
            loading={loading}
            rowKey="id"
            search={false}
            options={false}
            columns={columns}
            dataSource={data.data}
            locale={{
              emptyText: <Empty description="暂无数据" />,
            }}
          />
        </Col>
      </Row>
      <FooterToolbar
        style={{ width: '100%' }}
        extra={
          <>
            <Button>返回</Button>
          </>
        }
      >
        <Button type="primary" disabled={selectedStoreIds.length === 0}>
          提交
        </Button>
      </FooterToolbar>
      <UploadConfig
        visible={uploadConfigModalVisible}
        close={() => {
          setUploadConfigModalVisible(false);
        }}
      />
    </PageContainer>
  );
};

export default List;
