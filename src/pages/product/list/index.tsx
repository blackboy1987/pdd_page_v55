
import {Avatar, Button, DatePicker, Form, Input, Select, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { list} from './service';
import {defaultPaginationResult, PaginationResult} from "@/utils/common";

import oneSixEightEightLogo from '@/asserts/1688_logo.png';
import jdLogo from '@/asserts/jd_logo.png';
import taoBaoLogo from '@/asserts/taobao_logo.png';
import tMLogo from '@/asserts/tm_logo.png';
import vDianLogo from '@/asserts/vdain_logo.jpg';
import vipLogo from '@/asserts/vip_logo.jpeg';
import suningLogo from '@/asserts/suning.png';

import styles from './index.less';

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [loading,setLoading] = useState<boolean>(true);
  const [data,setData] = useState<PaginationResult>(defaultPaginationResult);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const load = async (params: {[key: string]: any}) =>{
    setLoading(true);
    const result = await list({
      ...params,
    });
    setLoading(false);
    setData(result);
  }

  useEffect(()=>{
    load({
      pageNumber:1,
      pageSize:10,
    });
  },[]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'name',
      width:50,
      renderText: (text,record,index)=><span>{index+1}</span>
    },
    {
      title: '宝贝ID',
      dataIndex: 'sn',
      width:80,
    },
    {
      title: '图片',
      dataIndex: 'image',
      width:85,
      renderText:(text)=><Avatar shape='square' size={65} src={`${text}??x-oss-process=style/65`} />
    },
    {
      title: '宝贝标题',
      dataIndex: 'name',
    },
    {
      title: '抓取价格',
      dataIndex: 'price',
      align:'right',
      width:80,
    },
    {
      title: '平台',
      dataIndex: 'pluginId',
      width:100,
      renderText:text=>(
        <div style={{display:'flex',justifyContent:'space-around',flexDirection:'column',alignItems:'center'}}>
          {
            text==='jdPlugin' ? (<Avatar size={65} src={jdLogo} />) : null
          }
          {
            text==='oneSixEightEightPlugin' ? (<Avatar size={65} src={oneSixEightEightLogo} />) : null
          }
          {
            text==='suningPlugin' ? (<Avatar size={65} src={suningLogo} />) : null
          }
          {
            text==='tMallPlugin' ? (<Avatar size={65} src={tMLogo} />) : null
          }
          {
            text==='taoBaoPlugin' ? (<Avatar size={65} src={taoBaoLogo} />) : null
          }
          {
            text==='vDianPlugin' ? (<Avatar size={65} src={vDianLogo} />) : null
          }
          {
            text==='vipPlugin' ? (<Avatar size={65} src={vipLogo} />) : null
          }
        </div>
      )
    },
    {
      title: '分类',
      dataIndex: 'desc',
      width:100,
      renderText:()=><span>毛衣/针织衫</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      width:80,
      renderText: text=>{
        if(text===0){
          return <Tag color='#2db7f5'>采集中</Tag>
        }
        if(text===1){
          return <Tag color='#87d068'>采集完成</Tag>
        }
        if(text===2){
          return <Tag color='#f50'>采集失败</Tag>
        }
        return <Tag>{text}</Tag>
      },
    },
    {
      title: '采集时间',
      dataIndex: 'createdDate',
      valueType: 'dateTime',
      width:150,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width:100,
      renderText: () =>(
        <>
          <div>
            <a key="subscribeAlert" href="https://procomponents.ant.design/">
              查看源
            </a>
          </div>
          <div>
            <a key="subscribeAlert" href="https://procomponents.ant.design/">
              清理
            </a>
          </div>
          <div>
            <a key="subscribeAlert" href="https://procomponents.ant.design/">
              修改描述
            </a>
          </div>
        </>
      )
    },
  ];
  return (
    <PageContainer title={false}>
      <div className={styles.search}>
        <Form layout='inline'>
          <Form.Item label='宝贝标题'>
            <Input />
          </Form.Item>
          <Form.Item label='宝贝ID'>
            <Input />
          </Form.Item>
          <Form.Item label='状态'>
            <Select style={{width:100}}>
              <Select.Option value=''>全部</Select.Option>
              <Select.Option value='1'>待上传</Select.Option>
              <Select.Option value='2'>上传成功</Select.Option>
              <Select.Option value='3'>已清理</Select.Option>
              <Select.Option value='4'>上传错误</Select.Option>
              <Select.Option value='5'>上传中</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='抓取时间'>
            <DatePicker.RangePicker placeholder={['开始时间','结束时间']} />
          </Form.Item>
          <Form.Item>
            <Button type='primary'>搜索</Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.tool}>
        <div className={styles.left}>
          <Button disabled={selectedRowsState.length===0}>修改标题</Button>
          <Button disabled={selectedRowsState.length===0}>修改描述</Button>
          <Button disabled={selectedRowsState.length===0}>批量清除</Button>
          <Button disabled={selectedRowsState.length===0}>发布到拼多多</Button>
        </div>
      </div>
      <ProTable<TableListItem>
        size='small'
        bordered
        actionRef={actionRef}
        loading={loading}
        rowKey="id"
        search={false}
        options={false}
        columns={columns}
        dataSource={data.data}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{
          current:data.current,
          pageSize:data.pageSize,
          total:data.total,
          onChange: (page,pageSize)=>{
            load({
              pageNumber: page,
              pageSize,
            })
          }
        }}
      />
    </PageContainer>
  );
};

export default List;
