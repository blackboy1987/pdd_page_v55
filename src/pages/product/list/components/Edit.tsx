import {Drawer, Form, Tabs, Input, Alert, Table, InputNumber, Tag, Button, message, Row, Col} from 'antd';
import React, {useEffect, useState} from 'react';
import {queryDetail} from "@/pages/product/list/service";
import DragImage from "@/components/DragImage";
import type { Entry, ProductDetail, Sku, SpecificationValue} from "@/pages/product/list/data";
import {FooterToolbar} from "@ant-design/pro-layout";

type ChangeTitleProps = {
  visible: boolean;
  recordIds: number[];
  currentId: number;
  close: () => void;
};

const Edit: React.FC<ChangeTitleProps> = ({ visible,currentId,recordIds,close }) => {
  const [form] = Form.useForm();
  const [values,setValues] = useState<ProductDetail>({});
  const [productId,setProductId] = useState<number>();

  const loadData = async (id: number) =>{
    setProductId(id);
    const result = await queryDetail({
      id,
    });
    if(result.data){
      setValues(result.data);
      form.setFieldsValue(result.data);
    }else{
      message.warn("商品不存在");
    }
  }

  useEffect(()=>{
    loadData(currentId||21);
  },[]);

  const filterSkus = (skus: Sku[],entry: Entry)=>{
    const newSkus = skus || values.crawlerProductSku.skus;
    if(entry){
      return newSkus.filter(sku => {
        const {specificationValues} = sku;
        const {value} = entry;
        const array: string[] = [];
        specificationValues.forEach((item: SpecificationValue)=>array.push(item.id));
        return !array.includes(value);
      })
    }
    return newSkus;
  }


  const removeCrawlerSpecification=(index: number,entry: Entry )=>{
    const {crawlerProductSpecification:{crawlerSpecifications=[]}} = values;
    const newValues: ProductDetail = {
      ...values,
    }
    newValues.crawlerProductSpecification = {
      crawlerSpecifications,
      id: values.crawlerProductSpecification.id,
    };

    newValues.crawlerProductSku = {
      skus:filterSkus(values.crawlerProductSku.skus,entry),
      id: values.crawlerProductSku.id,
    };
    const newCrawlerSpecifications = newValues.crawlerProductSpecification.crawlerSpecifications.filter((item,index1)=>index1===index);
    if(newCrawlerSpecifications){
      newCrawlerSpecifications[0].options = newValues.crawlerProductSpecification.crawlerSpecifications[index].options.filter(item=>item!==entry.name);
      newCrawlerSpecifications[0].entries = newValues.crawlerProductSpecification.crawlerSpecifications[index].entries.filter(item=>item.value!==entry.value);
    }
    setValues(newValues);
  }

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  return (
    <Drawer
      width={window.innerWidth-180}
      destroyOnClose
      maskClosable={false}
      visible={visible}
      onClose={close}
      title={`${values.name}`}
    >
      <Form
        form={form}
        {...layout}
        initialValues={{
          name: values.name,
        }}
      >
        <Tabs
          type='card'
          defaultActiveKey='3'
        >
          <Tabs.TabPane tab='基本信息' key={1}>
            <Form.Item
              label="商品编号"
              name="sn"
              rules={[{ required: true, message: '请设置商品编号' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="商品标题"
              name="name"
              rules={[{ required: true, message: '请设置商品标题' }]}
            >
              <Input maxLength={60} suffix={`12/60`}/>
            </Form.Item>
            <Form.Item
              label="商品分类"
              name="username"
              rules={[{ required: true, message: '请设置商品分类!' }]}
            >
              <Input />
            </Form.Item>
            {JSON.stringify(values)}
          </Tabs.TabPane>
          <Tabs.TabPane tab='商品主图' key={2}>
            <Alert
              message="可添加图片，拖拽商品可更换顺序"
              description="图片格式仅支持JPEG/JPG/PNG，图片尺寸长宽比1:1且尺寸不低于480px，图片大小最高1M"
              type='info' style={{marginBottom:16}} showIcon />
            <DragImage list={values.crawlerProductImage?.images || []} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='商品详情' key={3}>
            {
              values.crawlerProductParameterValue?.parameterValues.map(item=>(
                <Row gutter={16}>
                  {
                    item.entries.map(entry=>(
                      <Col span={4}>
                        <Form.Item label={entry.name} labelCol={{span:6}}>
                          {
                            entry.value.length<100 ? (
                              <Input.TextArea autoSize={{minRows:1,maxRows:1}} value={entry.value} />
                            ) : (
                              <Input.TextArea autoSize={{minRows:6,maxRows:6}} value={entry.value} />
                            )
                          }

                        </Form.Item>
                      </Col>
                    ))
                  }
                </Row>
              ))
            }
            <Alert
              message="可添加图片，拖拽商品可更换顺序"
              description="图片格式仅支持JPEG/JPG/PNG，图片尺寸宽在480-1200px之间，高在0-1500px之间，图片大小最高1M"
              type='info' style={{marginBottom:16}} showIcon />
            <DragImage list={values.crawlerProductIntroductionImage?.images || []} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='SKU信息' key={4}>
            {
              (values.crawlerProductSpecification?.crawlerSpecifications||[]).map((item,index)=>(
                <Form.Item label={`${item.name}`} key={`${item.name}`}>
                  {
                    item.entries.map(entry=>(
                      <Tag key={entry.value} style={{marginBottom: 8,padding: 8}} closable={item.entries.length>1} onClose={()=>removeCrawlerSpecification(index,entry)}>{entry.name}</Tag>
                    ))
                  }
                </Form.Item>
              ))
            }
            <Table<Sku>
              title={()=>(<h2>Sku总数：{values.crawlerProductSku?.skus?.length}</h2>)}
              size='small'
              bordered
              rowKey='id'
              columns={[
                {
                  title:'#',
                  dataIndex: 'id',
                  width:60,
                  render:(text,record,index)=><span>{index+1}</span>
                },
                {
                  title:'编号',
                  dataIndex: 'sn',
                  width:140,
                },
                {
                  title:'规格',
                  dataIndex: 'specificationValues',
                  render:(text)=>(
                    <>
                      {
                        text.map((item: SpecificationValue)=>
                          <div>
                            {item.name}:<span style={{fontSize:14,fontWeight:700,color:'#f50'}}>{item.value}</span>
                          </div>
                        )
                      }
                    </>
                  )
                },{
                  title:'价格',
                  dataIndex: 'price',
                  width: 120,
                  render:text=><InputNumber value={text} step={1} precision={2} min={0} />
                },{
                  title:'库存',
                  dataIndex: 'stock',
                  width: 120,
                  render:text=><InputNumber value={text} step={1} precision={0} min={0} />
                },{
                  title:'操作',
                  width: 60,
                  render:text=>(
                   <>
                     {
                       values.crawlerProductSku?.skus.length>0 ? (
                         <a>移除</a>
                       ) : null
                     }
                   </>
                  )
                }
              ]}
              dataSource={values.crawlerProductSku?.skus||[]}
              pagination={false}
              scroll={{y:window.innerHeight-500}}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='服务承诺' key={5}>
            服务承诺
          </Tabs.TabPane>
        </Tabs>
        <FooterToolbar>
          <Button type='primary' onClick={()=>{
            const index = recordIds.findIndex((value)=>value===productId);
            if(index>-1&&recordIds[index-1]){
              loadData(recordIds[index-1]);
            }else{
              message.warn("当前已是第一个商品")
            }
          }}>保存并跳转上一个商品</Button>
          <Button type='primary' onClick={()=>{
            const index = recordIds.findIndex((value)=>value===productId);
            if(index>-1&&recordIds[index+1]){
             loadData(recordIds[index+1]);
            }else{
              message.warn("当前已是最后一个商品")
            }
          }}>保存并跳转下一个商品</Button>
          <Button type='primary'>保存</Button>
        </FooterToolbar>
      </Form>
    </Drawer>
  );
};

export default Edit;
