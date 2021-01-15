import { Alert, Form, Input, Modal } from 'antd';
import React from 'react';
import styles from './index.less';
import { changeTitle } from '@/pages/product/list/service';

type ChangeTitleProps = {
  visible: boolean;
  recordIds: number[];
  onClose: () => void;
  callback: () => void;
};

const ChangeTitle: React.FC<ChangeTitleProps> = ({ visible, recordIds, onClose, callback }) => {
  const [form] = Form.useForm();

  const submit = async () => {
    const result = await changeTitle({
      ...form.getFieldsValue(),
      ids: recordIds.join(','),
    });
    console.log(result);
    callback();
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      visible={visible}
      title="修改标题"
      onCancel={onClose}
      onOk={submit}
      cancelText="取消"
      width={600}
      okText="确定"
      bodyStyle={{ paddingTop: 8 }}
    >
      <Alert
        style={{ marginBottom: 8 }}
        showIcon
        type="info"
        message={
          <>
            修改商品数: <span className={styles.tips}>{recordIds.length}</span> 个,
            请选中需要修改的选项
          </>
        }
      />
      <Form
        form={form}
        initialValues={{
          afterWord: '',
          beforeWord: '',
          oldWord: '',
          newWord: '',
          delWord: '',
        }}
      >
        <Form.Item label="加前缀" name="beforeWord">
          <Input addonAfter="原标题" />
        </Form.Item>
        <Form.Item label="加后缀" name="afterWord">
          <Input addonBefore="原标题" />
        </Form.Item>
        <Form.Item label="替换词" style={{ marginBottom: 0 }}>
          <Form.Item
            name="oldWord"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 210 }}
          >
            <Input placeholder="原词" />
          </Form.Item>
          <span className={styles.changeTips}>替换为</span>
          <Form.Item
            name="newWord"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 210 }}
          >
            <Input placeholder="替换词" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="删除词" name="delWord">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeTitle;
