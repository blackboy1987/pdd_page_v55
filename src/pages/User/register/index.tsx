import { Form, Button, Input, } from 'antd';
import React, { FC} from 'react';
import styles from './style.less';

const FormItem = Form.Item;

interface RegisterProps {

}

const Register: FC<RegisterProps> = () => {

  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    console.log(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <div className={styles.main}>
      <div className={styles.tips}>
        <h3>新用户注册</h3>
        <a href='/user/login'>已有注册账号</a>
      </div>
      <Form {...layout} form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="mail"
          label='账号'
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input
            placeholder='请输入账号'
          />
        </FormItem>
        <FormItem
          name="confirm"
          label='密码'
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input
            type="password"
            placeholder='请输入密码'
          />
        </FormItem>
        <FormItem
          name="confirm"
          label='确认密码'
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input
            type="password"
            placeholder='请再次输入密码'
          />
        </FormItem>
        <FormItem
          name="qq"
          label='QQ'
        >
          <Input
            type="password"
            placeholder='请输入常用QQ号'
          />
        </FormItem>

        <Form.Item {...tailLayout}>
          <Button
            block
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
