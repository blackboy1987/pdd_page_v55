import React, { useEffect } from 'react';
import { getPageQuery } from '@/utils/utils';
import { PageLoading } from '@ant-design/pro-layout';
import { authLogin } from '@/services/login';
import { history } from 'umi';
import { message, Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

export default (): React.ReactNode => {
  const params = getPageQuery();
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo });
    }
  };

  /**
   * 此方法会跳转到 redirect 参数所在的位置
   */

  const goto = () => {
    if (!history) return;
    setTimeout(() => {
      const { query } = history.location;
      const { redirect } = query as {
        redirect: string;
      };
      history.push(redirect || '/');
    }, 10);
  };

  const login = async () => {
    const result = await authLogin(params);
    if (result.code === 0) {
      localStorage.setItem('token', result.token);
      message.success('登录成功！');
      await fetchUserInfo();
      goto();
    } else {
      Modal.destroyAll();
      Modal.error({
        title: '登录失败',
        content: `失败原因：${result.msg}！`,
        okText: '返回重新登录',
        onOk: () => {
          history.push('/user/login');
        },
      });
    }
  };

  useEffect(() => {
    login();
  }, []);

  return <PageLoading tip="授权成功，正在登录..." />;
};
