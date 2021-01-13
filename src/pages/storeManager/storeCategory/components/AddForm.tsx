import React from 'react';
import {Checkbox, Form, Input, Modal} from 'antd';

import type { TableListItem } from '../data.d';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  visible: boolean;
};

const AddForm: React.FC<UpdateFormProps> = ({visible,onCancel,onSubmit}) => {

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <Modal
      title='添加分组'
      visible={visible}
      destroyOnClose
      maskClosable={false}
      okText="确定"
      cancelText='取消'
      onOk={()=>{
        form.validateFields()
          .then(values => {
            onSubmit(values);
          })
          .catch(errorInfo => {
            console.log(errorInfo);
          });
      }}
      onCancel={()=>onCancel()}
    >
      <Form
        form={form}
        {...layout}
      >
        <Form.Item name='name' rules={[{required: true,message:'请输入分组名称'}]} label="分组名称" style={{width:'100%'}} >
          <Input maxLength={15} placeholder='请输入分组名称（最多15个字符）' />
        </Form.Item>
        <Form.Item name='isDefault' label="是否默认" style={{width:'100%'}} valuePropName='checked' >
          <Checkbox>是</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
