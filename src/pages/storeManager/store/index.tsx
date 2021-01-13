import { PlusOutlined,SwapOutlined } from '@ant-design/icons';
import {Button, Empty, Divider, Modal, Card, message} from 'antd';
import React, {useRef, useState} from 'react';
import {history} from "umi";
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { list,unbind } from './service';
import {Constants} from "@/utils/constants";
import styles from './index.less';
import {logout} from "@/services/user";

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [addModalVisible,setAddModalVisible] = useState<boolean>(false);
  const [bindStoreModalVisible,setBindStoreModalVisible] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '店铺ID',
      dataIndex: 'mallId',
      width:80,
    },
    {
      title: '店铺名称',
      dataIndex: 'mallName',
    },
    {
      title: '店铺分组',
      dataIndex: 'storeCategoryName',
      search:false,
    },
    {
      title: '店铺类型',
      dataIndex: 'merchantType',
      width:80,
      valueEnum: {
        0: {
          text: '未知',
          status: 'Default',
        },
        1: {
          text: '个人',
        },
        2: {
          text: '企业',
        },
        3: {
          text: '旗舰店',
        },
        4: {
          text: '专卖店',
        },
        5: {
          text: '专营店',
        },
        6: {
          text: '普通店',
        },
      },
    },
    {
      title: '创建日期',
      dataIndex: 'createdDate',
      valueType:'dateTime',
      width:150,
      search:false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width:220,
      renderText: (text,record)=>{
        return (
          <>
            <a
              key="config"
              onClick={() => {
                setAddModalVisible(true)
              }}
            >
              订购续费
            </a>
            <Divider type='vertical' />
            <a
              key="config"
              onClick={ () => {
                Modal.confirm({
                  title:'确认解除绑定?',
                  content:'解除绑定后，店铺的商品上传记录将同步删除无法恢复。',
                  okText:'确定',
                  cancelText:'取消',
                  onOk: async ()=>{
                    const result = await unbind(record.id);
                    if(result.type==='success'){
                      setBindStoreModalVisible(true);
                    }else{
                      message.error(result.content);
                    }
                  }
                })
              }}
            >
              解除绑定
            </a>
            <Divider type='vertical' />
            <a
              key="config"
              onClick={() => {
                setAddModalVisible(true)
              }}
            >
              移动分组
            </a>
          </>
        )
      }
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem>
        locale={{emptyText:<Empty description='暂无数据' />}}
        actionRef={actionRef}
        rowKey="id"
        size='small'
        bordered
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={()=>{
              setAddModalVisible(true)
            }}
          >
            <PlusOutlined /> 添加
          </Button>,
        ]}
        request={(params, sorter, filter) => list({ ...params, sorter, filter })}
        columns={columns}
      />
      {
        addModalVisible? (
          <Modal visible={addModalVisible} footer={null} width={700} onCancel={()=>setAddModalVisible(false)}>
            <div style={{display:'flex'}}>
              <img src='https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/%E9%85%8D%E5%9B%BE.png' width={130} />
              <Card title={<h3 style={{fontWeight:600}}>店铺绑定</h3>} bordered={false} size='small'>
                <p>1.新绑定的店铺需要先购买应用 <a style={{marginLeft:16}}>我要去拼多多服务市场&gt;&gt;</a></p>
                <p style={{display:'flex'}}>2.在拼多多服务市场购买成功后，回到本页面点击授权即可<Button style={{marginLeft:16}} type='primary' onClick={()=>{
                  const token = localStorage.getItem("token");
                  window.open(`${Constants.authUrl}&state=${token}`,'_blank');
                }}>拼多多授权</Button></p>
              </Card>
            </div>
          </Modal>
        ) : null
      }
      {
        bindStoreModalVisible ? (
          <Modal
            visible={bindStoreModalVisible}
            footer={null}
            closable={false}
            width={700}
          >
            <div className={styles.title}>
              <span className={styles.info}>绑定店铺</span>
              <span className={styles.tips}>点击绑定按钮，绑定拼多多店铺</span>
            </div>
            <div className={styles.content}>
              <div className={styles.left}>
                <div className={styles.top}>
                  <img src='https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/logo.png?x-oss-process=style/80'/>
                  <SwapOutlined style={{fontSize:32}} />
                  <img src='https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/pdd.png?x-oss-process=style/80' />
                </div>
                <div className={styles.bottom}>
                  <Button type='primary' block onClick={()=>{
                    const token = localStorage.getItem("token");
                    window.open(`${Constants.authUrl}&state=${token}`,'_blank');
                  }}>授权登录</Button>
                  <Button block onClick={()=>{
                    logout();
                    history.push("/user/login");
                  }}>退出重新登录</Button>
                </div>
              </div>
              <div className={styles.right}>
                <div>绑定多家店铺， </div>
                <div>请在【店铺管理】页面进行绑定</div>
                <img src='https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/%E6%B7%BB%E5%8A%A0%E5%BA%97%E9%93%BA%E6%88%AA%E5%9B%BE.png' />
              </div>
            </div>
          </Modal>
        ) : null
      }
    </PageContainer>
  );
};

export default TableList;
