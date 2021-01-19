import React, { useEffect, useState } from 'react';
import { Cascader, Form, Input, Modal } from 'antd';
import { category, updateProductCategory } from '../service';
import { ProductCategoryTree, TableListItem } from '@/pages/product/list/data';

export type CategoryProps = {
  visible: boolean;
  close: () => void;
  values: TableListItem;
  callback: (productCategoryTree: ProductCategoryTree[]) => void;
};

const ChangeCategory: React.FC<CategoryProps> = ({ visible, close, values, callback }) => {
  const [form] = Form.useForm();

  const [productCategoryTree, setProductCategoryTree] = useState<ProductCategoryTree[]>([]);
  const [selectedProductCategoryTrees, setSelectedProductCategoryTrees] = useState<
    ProductCategoryTree[]
  >([]);
  const fetchData = async () => {
    const result = await category({
      pluginId: 'pddPlugin',
    });
    setProductCategoryTree(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const update = async () => {
    const result = updateProductCategory({
      ...form.getFieldsValue(),
      id: values.id,
    });
    console.log('result', result);
    callback(selectedProductCategoryTrees);
  };

  return (
    <Modal
      visible={visible}
      title="类目修改"
      onCancel={close}
      okText="确定"
      onOk={update}
      cancelText="取消"
      width={800}
      bodyStyle={{ height: 400 }}
    >
      <Form
        form={form}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item label="选择类目" name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label="当前类目">
          <span className="ant-form-text">{values.productCategoryName}</span>
        </Form.Item>

        <Form.Item label="选择类目" name="productCategoryIds">
          <Cascader
            options={productCategoryTree}
            fieldNames={{ label: 'name', value: 'id' }}
            placeholder="选择新的分类"
            onChange={(value, selectedOptions) => setSelectedProductCategoryTrees(selectedOptions)}
            showSearch={{
              filter: (inputValue, path) =>
                path.some(
                  (option) => option.name?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
                ),
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeCategory;
