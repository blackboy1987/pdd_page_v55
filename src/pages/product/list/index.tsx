import { Avatar, Input, Tag, Form, Select, Button, DatePicker, message, Modal, Empty } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { crawler, list, remove } from './service';
import { defaultPaginationResult, PaginationResult, parseFormValues } from '@/utils/common';

import oneSixEightEightLogo from '@/asserts/1688_logo.png';
import jdLogo from '@/asserts/jd_logo.png';
import taoBaoLogo from '@/asserts/taobao_logo.png';
import tMLogo from '@/asserts/tm_logo.png';
import vDianLogo from '@/asserts/vdain_logo.jpg';
import vipLogo from '@/asserts/vip_logo.jpeg';
import suningLogo from '@/asserts/suning.png';

import styles from './index.less';
import ChangeTitle from '@/pages/product/list/components/ChangeTitle';

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<PaginationResult>(defaultPaginationResult);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [changeTitleModalVisible, setChangeTitleModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const load = async (params: { [key: string]: any }) => {
    setLoading(true);
    const result = await list({
      ...formValues,
      ...parseFormValues(form.getFieldsValue()),
      ...params,
    });
    setSelectedRows([]);
    setData(result);
    setLoading(false);
    setFormValues({
      ...parseFormValues(form.getFieldsValue()),
      ...params,
    });
  };

  useEffect(() => {
    load({
      pageNumber: 1,
      pageSize: 10,
    });
  }, []);

  const search = () => {
    load({});
  };

  const clear = (record?: TableListItem) => {
    const ids = record ? [record.id] : selectedRowsState.map((item) => item.id);
    if (ids.length === 0) {
      message.warn('请选择需要操作的数据');
      return;
    }

    Modal.confirm({
      title: '确定要清理这些宝贝吗?',
      content: '清理后可在商品清理列表下找到这些宝贝',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const result = await remove({
          ids: ids.join(','),
        });
        if (result.type === 'success') {
          message.success(result.content);
        } else {
          message.error(result.content);
        }
        load({});
      },
    });
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'name',
      width: 50,
      renderText: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '宝贝ID',
      dataIndex: 'sn',
      width: 80,
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
      title: '平台',
      dataIndex: 'pluginId',
      width: 100,
      renderText: (text) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {text === 'jdPlugin' ? <Avatar size={65} src={jdLogo} /> : null}
          {text === 'oneSixEightEightPlugin' ? (
            <Avatar size={65} src={oneSixEightEightLogo} />
          ) : null}
          {text === 'suningPlugin' ? <Avatar size={65} src={suningLogo} /> : null}
          {text === 'tMallPlugin' ? <Avatar size={65} src={tMLogo} /> : null}
          {text === 'taoBaoPlugin' ? <Avatar size={65} src={taoBaoLogo} /> : null}
          {text === 'vDianPlugin' ? <Avatar size={65} src={vDianLogo} /> : null}
          {text === 'vipPlugin' ? <Avatar size={65} src={vipLogo} /> : null}
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'productCategoryName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      renderText: (text, record) => {
        if (text === 0) {
          return <Tag color="#2db7f5">采集中</Tag>;
        }
        if (text === 1) {
          if (record.publishStatus === 10) {
            return <Tag color="#55acee">待发布</Tag>;
          }
          if (record.publishStatus === 11) {
            return <Tag color="#cd201f">发布中</Tag>;
          }
          if (record.publishStatus === 12) {
            return <Tag color="#3b5999">发布成功</Tag>;
          }
          if (record.publishStatus === 13) {
            return <Tag color="#55acee">发布失败</Tag>;
          }
          if (record.publishStatus === 14) {
            return <Tag color="#108ee9">草稿箱</Tag>;
          }

          return <Tag color="#87d068">采集完成</Tag>;
        }
        if (text === 2) {
          return <Tag color="#f50">采集失败</Tag>;
        }
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: '采集时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 100,
      renderText: (_, record) => (
        <>
          <div>
            <a href={record.url}>查看源</a>
          </div>
          <div>
            <a onClick={() => clear(record)}>清理</a>
          </div>
          <div>
            <a
              onClick={() => {
                if (record.url) {
                  Modal.confirm({
                    title: '确认重新抓取商品信息？',
                    content: '该操作将会重置商品全部数据，请谨慎操作！！！',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                      const result = await crawler({
                        id: record.id,
                      });
                      if (result.type === 'success') {
                        load(formValues);
                      } else {
                        message.error(result.content);
                      }
                    },
                  });
                } else {
                  message.error('源地址不存在，无法抓取');
                }
              }}
            >
              重抓
            </a>
          </div>
        </>
      ),
    },
  ];
  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            publishStatus: '',
          }}
        >
          <Form.Item label="宝贝标题" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="宝贝ID" name="sn">
            <Input />
          </Form.Item>
          <Form.Item label="状态" name="publishStatus">
            <Select style={{ width: 100 }}>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="10">待发布</Select.Option>
              <Select.Option value="11">发布中</Select.Option>
              <Select.Option value="12">发布成功</Select.Option>
              <Select.Option value="13">发布失败</Select.Option>
              <Select.Option value="14">草稿箱</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="抓取时间" name="rangeDate">
            <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={search}>
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.tool}>
        <div className={styles.left}>
          <Button
            disabled={selectedRowsState.length === 0}
            onClick={() => {
              message.destroy();
              if (selectedRowsState.length <= 0) {
                message.error('请选择需要操作的数据');
              } else {
                setChangeTitleModalVisible(true);
              }
            }}
          >
            修改标题
          </Button>
          <Button disabled={selectedRowsState.length === 0} onClick={() => clear()}>
            批量清除
          </Button>
          <Button disabled={selectedRowsState.length === 0}>发布到拼多多</Button>
        </div>
      </div>
      <ProTable<TableListItem>
        size="small"
        bordered
        actionRef={actionRef}
        loading={loading}
        rowKey="id"
        search={false}
        options={false}
        columns={columns}
        dataSource={data.data}
        rowSelection={{
          selectedRowKeys: selectedRowsState.map((item) => item.id),
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{
          current: data.current,
          pageSize: data.pageSize,
          total: data.total,
          onChange: (page, pageSize) => {
            load({
              pageNumber: page,
              pageSize,
            });
          },
        }}
        locale={{
          emptyText: <Empty description="暂无数据" />,
        }}
      />

      <ChangeTitle
        visible={changeTitleModalVisible}
        recordIds={selectedRowsState.map((item) => item.id)}
        onClose={() => setChangeTitleModalVisible(false)}
        callback={() => {
          setChangeTitleModalVisible(false);
          load({});
        }}
      />
    </PageContainer>
  );
};

export default List;
