import {
  Avatar,
  Input,
  Tag,
  Form,
  Select,
  Button,
  DatePicker,
  message,
  Modal,
  Empty,
  Tooltip,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { crawler, list, remove, publish, listStoreTree } from './service';
import { defaultPaginationResult, PaginationResult, parseFormValues } from '@/utils/common';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import oneSixEightEightLogo from '@/asserts/1688_logo.png';
import jdLogo from '@/asserts/jd_logo.png';
import taoBaoLogo from '@/asserts/taobao_logo.png';
import tMLogo from '@/asserts/tm_logo.png';
import vDianLogo from '@/asserts/vdain_logo.jpg';
import vipLogo from '@/asserts/vip_logo.jpeg';
import suningLogo from '@/asserts/suning.png';

import styles from './index.less';
import ChangeTitle from '@/pages/product/list/components/ChangeTitle';
import Edit from '@/pages/product/list/components/Edit';
import { StoreTree } from '@/pages/product/upload/list/data';
import ChangeCategory from "@/pages/product/list/components/ChangeCategory";

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const [currentRecord, setCurrentRecord] = useState<TableListItem>({});
  const [editModalVisible, setEditModalVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<PaginationResult>(defaultPaginationResult);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [changeTitleModalVisible, setChangeTitleModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [changeCategoryModalVisible, setChangeCategoryModalVisible] = useState<boolean>(false);
  const [values, setValues] = useState<TableListItem>({});
  const [storeTree, setStoreTree] = useState<StoreTree[]>([]);
  const [storeId, setStoreId] = useState<number>();

  const load = async (params: { [key: string]: any }) => {
    setLoading(true);
    const result = await list({
      ...formValues,
      ...parseFormValues(form.getFieldsValue()),
      ...params,
      storeId,
    });
    setSelectedRows([]);
    setData(result);
    setLoading(false);
    setFormValues({
      ...parseFormValues(form.getFieldsValue()),
      ...params,
      storeId,
    });
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

  const updateCategory = (record: TableListItem) => {
    setChangeCategoryModalVisible(true);
    setValues(record);
  };

  const upload = (record: TableListItem) => {
    Modal.confirm({
      title: '当前账号商品上传额度为10个，超过部分将会被过滤',
      content: (
        <>
          剩余上传额度 <span style={{ color: 'red' }}>9</span> 个
        </>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const result = await publish({
          ids: [record.id],
          storeIds: [4],
        });
        console.log('result', result);
      },
    });
  };

  const edit = (record: TableListItem) => {
    setCurrentRecord(record);
    setEditModalVisible(true);
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
      renderText: (text) => (
        <CopyToClipboard text={text} onCopy={() => message.success('宝贝ID已复制')}>
          <Tooltip title="点击复制">
            <span>{text}</span>
          </Tooltip>
        </CopyToClipboard>
      ),
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
      renderText: (text) => <div dangerouslySetInnerHTML={{ __html: `${text}` }} />,
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
      width: 120,
      renderText: (text, record) => {
        return (
          <>
            <div>
              <span>{text || '-'}</span>
            </div>
            <a onClick={() => updateCategory(record)}>修改</a>
          </>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 90,
      renderText: (text, record) => {
        if (text === 0) {
          return <Tag color="#2db7f5">采集中</Tag>;
        }
        if (text === 1) {
          if (record.pddLogs.length > 0) {
            const tags = record.pddLogs.map((log) => ({
              code: log.code,
              msg: log.msg,
              storeName: log.storeName,
            }));
            return tags.map((tag) => {
              if (tag.code === 0) {
                return <Tag color="#87d068">发布成功</Tag>;
              }
              return (
                <Tooltip title={`${tag.storeName}：${tag.msg}`}>
                  <Tag color="#f50" style={{ marginBottom: 8 }}>
                    发布失败
                  </Tag>
                </Tooltip>
              );
            });
          }
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
      width: 130,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 60,
      renderText: (_, record) => (
        <>
          <div>
            <a href={record.url} target="_blank">
              查看源
            </a>
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
          {record.productCategoryName ? (
            <div>
              <a onClick={() => upload(record)}>上传</a>
            </div>
          ) : null}
          <div>
            <a onClick={() => edit(record)}>bianji </a>
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
        <div className={styles.right}>
          <Form.Item label="店铺">
            <Select
              style={{ width: 180 }}
              defaultValue={storeId}
              onSelect={(value) => setStoreId(value)}
            >
              {storeTree.map((storeGroup) => (
                <Select.OptGroup key={storeGroup.key} label={storeGroup.title}>
                  {storeGroup.children.map((store) => (
                    <Select.Option value={store.key}>{store.title}</Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
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
          getCheckboxProps: (record: TableListItem) => ({
            disabled: !record.productCategoryName,
          }),
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
      {changeTitleModalVisible ? (
        <ChangeTitle
          visible={changeTitleModalVisible}
          recordIds={selectedRowsState.map((item) => item.id)}
          onClose={() => setChangeTitleModalVisible(false)}
          callback={() => {
            setChangeTitleModalVisible(false);
          }}
        />
      ) : null}
      {editModalVisible ? (
        <Edit
          visible={editModalVisible}
          currentId={currentRecord.id}
          recordIds={data.data.map((item) => item.id)}
          close={() => {
            setEditModalVisible(false);
            setCurrentRecord({});
          }}
        />
      ) : null}

      <ChangeTitle
        visible={changeTitleModalVisible}
        recordIds={selectedRowsState.map((item) => item.id)}
        onClose={() => setChangeTitleModalVisible(false)}
        callback={() => {
          setChangeTitleModalVisible(false);
          load({});
        }}
      />
      {changeCategoryModalVisible && Object.keys(values).length > 0 ? (
        <ChangeCategory
          visible={changeCategoryModalVisible}
          values={values}
          close={() => setChangeCategoryModalVisible(false)}
          callback={(selectedProductCategoryTrees) => {
            setChangeCategoryModalVisible(false);
            setValues({});
            const newData = { ...data };
            const data1 = newData.data.filter((item) => item.id === values.id);
            if (data1) {
              data1[0].productCategoryName =
                selectedProductCategoryTrees[selectedProductCategoryTrees.length - 1].name;
            }
            setData(newData);
          }}
        />
      ) : null}
    </PageContainer>
  );
};

export default List;
