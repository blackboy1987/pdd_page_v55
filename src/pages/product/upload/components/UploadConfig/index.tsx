import React, { useState } from 'react';
import {
  Form,
  Modal,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  Input,
  Tabs,
  DatePicker,
  Button,
} from 'antd';
import styles from './index.less';
import { defaultUploadConfig, UploadConfigType } from './data.d';

export type UploadConfigProps = {
  visible: boolean;
  close: () => void;
};

const UploadConfig: React.FC<UploadConfigProps> = ({ visible, close }) => {
  const [form] = Form.useForm();
  const [uploadConfigValue, setUploadConfigValue] = useState<UploadConfigType>(defaultUploadConfig);
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  return (
    <Modal
      style={{ top: 10 }}
      visible={visible}
      title="上传配置"
      okText="提交"
      cancelText="取消"
      onCancel={close}
      width={900}
      bodyStyle={{ paddingTop: 8 }}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{ ...uploadConfigValue }}
        onValuesChange={() => {
          setUploadConfigValue(form.getFieldsValue());
        }}
      >
        <Tabs size="small" defaultActiveKey="7">
          <Tabs.TabPane tab="基础配置" key={1}>
            <Form.Item label="商品类型" name="goodsType">
              <Select style={{ width: 130 }}>
                <Select.Option value={1}>普通商品</Select.Option>
                <Select.Option value={2}>进口商品</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="是否是二手货" name="secondHand" valuePropName="checked">
              <Checkbox>是</Checkbox>
            </Form.Item>
            <Form.Item label="开启预售">
              <Input.Group compact>
                <Form.Item noStyle name="isPreSale" valuePropName="checked">
                  <Checkbox onChange={(e) => form.setFieldsValue({ isPreSale: e.target.checked })}>
                    是
                  </Checkbox>
                </Form.Item>
                {uploadConfigValue.isPreSale ? (
                  <Form.Item
                    noStyle
                    name="preSaleTime"
                    rules={[
                      {
                        required: true,
                        message: '请设置预售时间',
                      },
                    ]}
                  >
                    <DatePicker placeholder="请设置预售时间" format="YYYY-MM-DD 23:59:59" />
                  </Form.Item>
                ) : null}
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="复制后"
              name="uploadType"
              rules={[
                {
                  required: true,
                  message: '请设置复制之后的状态',
                },
              ]}
            >
              <Select>
                <Select.Option value={1}>立即上架</Select.Option>
                <Select.Option value={2}>放入草稿箱</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="filter" valuePropName="checked">
              <Checkbox>过滤已发布的商品</Checkbox>
            </Form.Item>
            <Form.Item
              label="发货时间"
              name="shipmentLimitSecond"
              rules={[
                {
                  required: true,
                  message: '请设置发货时间',
                },
              ]}
              extra="当日发货指的是16:00之前的订单当日发货，16:00之后的订单24小时内发货。当日发货可以外显服务标签，提高购买转化率"
            >
              <Select placeholder="请设置发货时间">
                <Select.Option value={1}>当日发货</Select.Option>
                <Select.Option value={86400}>24小时</Select.Option>
                <Select.Option value={172800}>48小时</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="七天无理由退货" name="isRefundable">
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="假一罚十" name="isFolt">
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="发货方式">
              <Input.Group compact>
                <Form.Item name="deliveryType">
                  <Select placeholder="请设置发货方式">
                    <Select.Option value={0}>无物流发货</Select.Option>
                    <Select.Option value={1}>有物流发货</Select.Option>
                  </Select>
                </Form.Item>
                {uploadConfigValue.deliveryType === 1 ? (
                  <>
                    <Form.Item
                      name="costTemplateId"
                      noStyle
                      rules={[{ required: true, message: '请设置物流模板' }]}
                    >
                      <Select placeholder="请设置发货方式">
                        <Select.Option value={0}>无物流发货</Select.Option>
                        <Select.Option value={1}>有物流发货</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary">重新加载</Button>
                    </Form.Item>
                  </>
                ) : null}
              </Input.Group>
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="标题配置" key={2}>
            <Form.Item label="打乱标题" name="randomTitle" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item label="标题长度优化">
              <span className={styles.title}>当原标题长度超过</span>
              <Form.Item style={{ display: 'inline-block' }} name="titleMaxLength">
                <InputNumber min={0} step={1} precision={0} />
              </Form.Item>
              <span className={styles.title}>个字符限制时，删除</span>
              <Form.Item style={{ display: 'inline-block' }} name="titleDealType">
                <Select style={{ width: 100 }}>
                  <Select.Option value={0}>最前面</Select.Option>
                  <Select.Option value={1}>最后面</Select.Option>
                </Select>
              </Form.Item>
              <span className={styles.title}>的字符</span>
            </Form.Item>

            <Form.Item label="标题修改">
              <Form.Item>
                <Input.Group compact>
                  <Form.Item noStyle name="addBefore" valuePropName="checked">
                    <Checkbox>加前缀</Checkbox>
                  </Form.Item>
                  {uploadConfigValue.addBefore ? (
                    <Form.Item
                      noStyle
                      name="addBeforeWord"
                      rules={[{ required: true, message: '必填' }]}
                    >
                      <Input style={{ width: 320 }} />
                    </Form.Item>
                  ) : null}
                </Input.Group>
              </Form.Item>
              <Form.Item>
                <Input.Group compact>
                  <Form.Item noStyle name="addAfter" valuePropName="checked">
                    <Checkbox>加后缀</Checkbox>
                  </Form.Item>
                  {uploadConfigValue.addAfter ? (
                    <Form.Item
                      noStyle
                      name="addAfterWord"
                      rules={[{ required: true, message: '必填' }]}
                    >
                      <Input style={{ width: 320 }} />
                    </Form.Item>
                  ) : null}
                </Input.Group>
              </Form.Item>

              <Form.Item>
                <Input.Group compact>
                  <Form.Item noStyle name="replace" valuePropName="checked">
                    <Checkbox>替换关键词</Checkbox>
                  </Form.Item>
                  {uploadConfigValue.replace ? (
                    <Form.Item noStyle>
                      <Input.Group compact style={{ width: 640 }}>
                        <Form.Item
                          noStyle
                          name="oldWord"
                          rules={[
                            {
                              required: true,
                              message: '必填',
                            },
                          ]}
                        >
                          <Input style={{ width: 280 }} />
                        </Form.Item>
                        <span className={styles.title}>替换为</span>
                        <Form.Item
                          noStyle
                          name="newWord"
                          rules={[
                            {
                              required: true,
                              message: '必填',
                            },
                          ]}
                        >
                          <Input style={{ width: 280 }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  ) : null}
                </Input.Group>
              </Form.Item>

              <Form.Item>
                <Input.Group compact>
                  <Form.Item noStyle name="delete" valuePropName="checked">
                    <Checkbox>删除关键词</Checkbox>
                  </Form.Item>
                  {uploadConfigValue.delete ? (
                    <Form.Item
                      noStyle
                      name="deleteWord"
                      rules={[{ required: true, message: '必填' }]}
                    >
                      <Input style={{ width: 320 }} />
                    </Form.Item>
                  ) : null}
                </Input.Group>
              </Form.Item>
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="图片配置" key={3}>
            <Form.Item valuePropName="checked" name="carouselRandom">
              <Checkbox value>轮播图随机位置</Checkbox>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>轮播图第</span>
              <Form.Item
                name="carouselIndex"
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                rules={[
                  {
                    required: true,
                    message: '请设置',
                  },
                ]}
              >
                <InputNumber min={1} step={1} precision={0} />
                <span className={styles.title}>张设置为主图</span>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>保留商品详情图，第</span>
              <Form.Item name="detailPicStart" style={{ display: 'inline-block' }}>
                <InputNumber min={1} step={1} precision={0} />
              </Form.Item>
              <span className={styles.title}>张到</span>
              <Form.Item name="detailPicEnd" style={{ display: 'inline-block' }}>
                <InputNumber min={1} step={1} precision={0} />
              </Form.Item>
              <span className={styles.title}> 张</span>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>SKU图缺失处理，第</span>
              <Form.Item name="detailPicStart" style={{ display: 'inline-block' }}>
                <InputNumber min={1} step={1} precision={0} />
              </Form.Item>
              <span className={styles.title}>张主图设置为SKU图</span>
            </Form.Item>
            <Form.Item valuePropName="checked" name="carouselAddTen">
              <Checkbox>轮播图补足10张</Checkbox>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>商品详情头增加图片，拼多多图片地址</span>
              <Form.Item name="detailPicStart" style={{ display: 'inline-block', width: 490 }}>
                <Input />
              </Form.Item>
            </Form.Item>

            <Form.Item label="详情图处理">
              <Form.Item>
                <Input.Group compact>
                  <span className={styles.title}>删除前第</span>
                  <Form.Item
                    noStyle
                    name="detailPicDelStart"
                    rules={[{ required: true, message: '必填' }]}
                  >
                    <Input style={{ width: 320 }} />
                  </Form.Item>
                  <span className={styles.title}>张图片</span>
                </Input.Group>
              </Form.Item>

              <Form.Item>
                <Input.Group compact>
                  <span className={styles.title}>删除后第</span>
                  <Form.Item
                    noStyle
                    name="detailPicDelEnd"
                    rules={[{ required: true, message: '必填' }]}
                  >
                    <Input style={{ width: 320 }} />
                  </Form.Item>
                  <span className={styles.title}>张图片</span>
                </Input.Group>
              </Form.Item>
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="价格配置" key={4}>
            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>团购价 = 价格 </span>
              <Form.Item style={{ display: 'inline-block' }} name="groupPriceType">
                <Select style={{ width: 60 }}>
                  <Select.Option value={1}>加</Select.Option>
                  <Select.Option value={2}>减</Select.Option>
                  <Select.Option value={3}>乘</Select.Option>
                  <Select.Option value={4}>除</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block' }} name="groupPriceRate">
                <InputNumber min={0} step={0.01} precision={2} />
              </Form.Item>
              <span className={styles.title}>元</span>
              <span className={styles.title}>团购人数</span>
              <Form.Item style={{ display: 'inline-block' }} name="customerNum">
                <InputNumber min={1} step={1} precision={0} />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>单买价 = 价格 </span>
              <Form.Item style={{ display: 'inline-block' }} name="singlePriceType">
                <Select style={{ width: 60 }}>
                  <Select.Option value={1}>加</Select.Option>
                  <Select.Option value={2}>减</Select.Option>
                  <Select.Option value={3}>乘</Select.Option>
                  <Select.Option value={4}>除</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block' }} name="singlePriceRate">
                <InputNumber min={0} step={0.01} precision={2} />
              </Form.Item>
              <span className={styles.title}>元</span>
              <span className={styles.title}>限购次数</span>
              <Form.Item style={{ display: 'inline-block' }} name="buyLimit">
                <InputNumber min={1} step={1} precision={0} />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>市场价 = 价格 </span>
              <Form.Item style={{ display: 'inline-block' }} name="groupPriceType">
                <Select style={{ width: 60 }}>
                  <Select.Option value={1}>加</Select.Option>
                  <Select.Option value={2}>减</Select.Option>
                  <Select.Option value={3}>乘</Select.Option>
                  <Select.Option value={4}>除</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ display: 'inline-block' }} name="groupPriceRate">
                <InputNumber min={0} step={0.01} precision={2} />
              </Form.Item>
              <span className={styles.title}>元</span>
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="其他配置" key={5}>
            其他配置
          </Tabs.TabPane>
          <Tabs.TabPane tab="SKU配置" key={6}>
            <Form.Item className={styles.row} label="sku编码">
              <Form.Item>
                <Radio.Group>
                  <Radio value="0">原始编码</Radio>
                  <Radio value="1">自动生成</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="前缀">
                <Input size="small" style={{ width: 100 }} />
              </Form.Item>
              <Form.Item label="后缀">
                <Input size="small" style={{ width: 100 }} />
              </Form.Item>
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="库存配置" key={7}>
            <Form.Item name="stockConfig">
              <Radio.Group>
                <Radio value={0}>原始库存</Radio>
                <Radio value={1}>统一库存</Radio>
              </Radio.Group>
            </Form.Item>
            {uploadConfigValue.stockConfig === 1 ? (
              <Form.Item style={{ marginBottom: 0 }}>
                <span className={styles.title}>统一库存数 </span>
                <Form.Item style={{ display: 'inline-block' }} name="stockBase">
                  <InputNumber min={1} step={1} precision={0} />
                </Form.Item>
              </Form.Item>
            ) : null}
            <Form.Item style={{ marginBottom: 0 }}>
              <span className={styles.title}>当库存数少于</span>
              <Form.Item style={{ display: 'inline-block' }} name="lackStockBase1">
                <InputNumber min={0} step={1} precision={0} />
              </Form.Item>
              <span className={styles.title}>时，设置为</span>
              <Form.Item style={{ display: 'inline-block' }} name="lackStockBase2">
                <InputNumber min={0} step={1} precision={0} />
              </Form.Item>
            </Form.Item>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
};

export default UploadConfig;
