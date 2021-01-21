import {
  Drawer,
  Form,
  Tabs,
  Input,
  Alert,
  message,
  Row,
  Col,
  Cascader, Tag, Button, Checkbox, InputNumber
} from 'antd';
import React, {useEffect, useState} from 'react';
import {MinusCircleOutlined} from '@ant-design/icons';
import {category, queryDetail} from "@/pages/product/list/service";
import ProTable from '@ant-design/pro-table';
import DragImage from "@/components/DragImage";
import type { Entry, ProductDetail, Sku, SpecificationValue} from "@/pages/product/list/data";
import ImageUpload from "@/components/ImageUpload";
import {ProductCategoryTree} from "@/pages/product/list/data";
import { update } from '../service';
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
  const [productCategoryTree, setProductCategoryTree] = useState<ProductCategoryTree[]>([]);

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

  const fetchProductCategoryTree = async () => {
    const result = await category({
      pluginId: 'pddPlugin',
    });
    setProductCategoryTree(result);
  };

  useEffect(()=>{
    loadData(currentId||21);
    fetchProductCategoryTree();
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
        initialValues={{...values}}
        onFinish={(formValues)=>{
          const result = update({
            ...values,
            ...formValues,
          });
          console.log(result);
        }}
      >
        <Tabs
          type='card'
          defaultActiveKey='3'
          style={{marginBottom: 60}}
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
              name="productCategoryIds"
              rules={[{ required: true, message: '请设置商品分类!' }]}
            >
              <Cascader
                options={productCategoryTree}
                fieldNames={{ label: 'name', value: 'id' }}
                showSearch={{
                  filter: (inputValue, path) =>
                    path.some(
                      (option) => option.name?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
                    ),
                }}
              />
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab='商品主图' key={2}>
            <Alert
              message="可添加图片，拖拽商品可更换顺序"
              description="图片格式仅支持JPEG/JPG/PNG，图片尺寸长宽比1:1且尺寸不低于480px，图片大小最高1M"
              type='info' style={{marginBottom:16}} showIcon />
            <div style={{marginBottom: 16}}>
              <DragImage list={values.crawlerProductImage?.images || []}  onEnd={(items)=>{
                setValues({
                  ...values,
                  crawlerProductImage:{
                    ...values.crawlerProductImage,
                    images:items.map(item=>item.content),
                  }
                })
              }}/>
            </div>
            <ImageUpload
              show={(values.crawlerProductImage?.images || []).length<10}
              callback={(url: string)=> {
              setValues({
                ...values,
                crawlerProductImage: {
                  ...values.crawlerProductImage,
                  images: [
                    ...values.crawlerProductImage.images,
                    url,
                  ]
                }
              })
            }
            } />
          </Tabs.TabPane>
          <Tabs.TabPane tab='商品详情图' key={3}>
            <Form.Item>
              <Input.TextArea placeholder='文字详情' autoSize={{minRows:8,maxRows:8}} maxLength={500} />
            </Form.Item>
            <div style={{marginBottom: 16}}>
              <Alert
                message="可添加图片，拖拽商品可更换顺序"
                description="图片格式仅支持JPEG/JPG/PNG，图片尺寸宽在480-1200px之间，高在0-1500px之间，图片大小最高1M"
                type='info' style={{marginBottom:16}} showIcon />
              <DragImage list={values.crawlerProductIntroductionImage?.images || []} onEnd={(items)=>{
                setValues({
                  ...values,
                  crawlerProductIntroductionImage:{
                    ...values.crawlerProductIntroductionImage,
                    images:items.map(item=>item.content),
                  }
                })
              }}/>
            </div>
            <ImageUpload
              show={(values.crawlerProductIntroductionImage?.images || []).length<60}
              callback={(url: string)=>{
                setValues({
                  ...values,
                  crawlerProductIntroductionImage:{
                    ...values.crawlerProductIntroductionImage,
                    images: [
                      ...values.crawlerProductIntroductionImage.images,
                      url,
                    ],
                  }
                })
              }
              }/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='商品属性' key={4}>
            {
              values.crawlerProductParameterValue?.parameterValues.map(item=>(
                <>
                  {
                    item.entries.map((entry,index)=>(
                      <Row gutter={8} key={`${index}`} style={{ display: 'flex',}}>
                        <Col span={3}>
                          <Form.Item
                            rules={[{ required: true, message: 'Missing first name' }]}
                          >
                            <Input value={entry.name} placeholder="" onChange={(e)=>{
                              const newValues = {...values};
                              const {parameterValues} = newValues.crawlerProductParameterValue;
                              if(parameterValues){
                                parameterValues[0].entries = [
                                  ...values.crawlerProductParameterValue?.parameterValues[0].entries
                                ]
                                const current = parameterValues[0].entries.filter((entry,index1)=>index1===index);
                                if(current){
                                  current[0].name=e.target.value;
                                }
                              }
                              setValues(newValues);
                            }}/>
                          </Form.Item>
                        </Col>
                        <Col span={21}>
                          <Form.Item
                            rules={[{ required: true, message: 'Missing last name' }]}
                          >
                            <Input
                              value={entry.value}
                              onChange={(e)=>{
                                const newValues = {...values};
                                const {parameterValues} = newValues.crawlerProductParameterValue;
                                if(parameterValues){
                                  parameterValues[0].entries = [
                                    ...values.crawlerProductParameterValue?.parameterValues[0].entries
                                  ]
                                  const current = parameterValues[0].entries.filter((entry,index1)=>index1===index);
                                  if(current){
                                    current[0].value=e.target.value;
                                  }
                                }
                                setValues(newValues);
                              }}
                              suffix={
                                <a onClick={()=>{
                                  const newValues = {...values};
                                  const {parameterValues} = newValues.crawlerProductParameterValue;
                                  if(parameterValues){
                                    parameterValues[0].entries = [
                                      ...values.crawlerProductParameterValue?.parameterValues[0].entries.filter((entry,index1)=>index1!==index),
                                    ]
                                  }
                                  setValues(newValues);
                                }
                              }>
                                <MinusCircleOutlined />
                              </a>
                            }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))
                  }
                </>
              ))
            }
            <Button block onClick={()=>{
              const newValues = {...values};
              const {parameterValues} = newValues.crawlerProductParameterValue;
              if(parameterValues){
                parameterValues[0].entries = [
                  ...values.crawlerProductParameterValue?.parameterValues[0].entries,
                  {
                    name:'',
                    value:'',
                  }
                ]
              }
              setValues(newValues);
            }}>增加属性</Button>
          </Tabs.TabPane>
          <Tabs.TabPane tab='SKU信息' key={5}>
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
            <ProTable<Sku>
              headerTitle={<h2>Sku总数：{values.crawlerProductSku?.skus?.length}</h2>}
              size='small'
              bordered
              search={false}
              rowKey='sn'
              options={false}
              toolBarRender={() => [
                <div>
                  <Button type="primary" style={{marginRight:8}}>批量改价格</Button>
                  <Button type="primary" style={{marginRight:8}}>批量改库存</Button>
                </div>,
              ]}
              columns={[
                {
                  title:'#',
                  dataIndex: 'id',
                  width:60,
                  renderText:(id: number,record: Sku,index: number)=><span>{index+1}</span>
                },
                {
                  title:'编号',
                  dataIndex: 'sn',
                  width:140,
                },
                {
                  title:'规格',
                  dataIndex: 'specificationValues',
                  renderText:(text: SpecificationValue[])=>(
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
                  renderText:(text: number,record: Sku)=><InputNumber value={text} step={1} precision={2} min={0} onChange={(value)=> {
                    const crawlerProductSku = {...values.crawlerProductSku};
                    const {skus} = crawlerProductSku;
                    const currentSku = skus.filter((sku: Sku) => sku.sn === record.sn);
                    console.log("currentSku",currentSku);
                    if(currentSku&&value) {
                      currentSku[0].price = value;
                    }
                    setValues({
                      ...values,
                      crawlerProductSku,
                    })
                  }
                  } />
                },{
                  title:'库存',
                  dataIndex: 'stock',
                  width: 120,
                  renderText:(text: number,record: Sku)=><InputNumber value={text} step={1} precision={0} min={0} onChange={(value)=> {
                    const crawlerProductSku = {...values.crawlerProductSku};
                    const {skus} = crawlerProductSku;
                    const currentSku = skus.filter((sku: Sku) => sku.sn === record.sn);
                    console.log("currentSku",currentSku);
                    if(currentSku&&value) {
                      currentSku[0].stock = value;
                    }
                    setValues({
                      ...values,
                      crawlerProductSku,
                    })
                  }
                  }/>
                }
              ]}
              dataSource={values.crawlerProductSku?.skus||[]}
              pagination={false}
              scroll={{y:window.innerHeight-500}}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='服务与承诺' key={6}>
            <Form.Item label='7天无理由退换货' valuePropName='checked'>
              <Checkbox />
            </Form.Item>
            <Form.Item label='假一赔十' valuePropName='checked'>
              <Checkbox />
            </Form.Item>
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
          <Button type='primary' htmlType='submit'>保存</Button>
        </FooterToolbar>
      </Form>
    </Drawer>
  );
};

export default Edit;
