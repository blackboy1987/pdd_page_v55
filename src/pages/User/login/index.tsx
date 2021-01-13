import { LockTwoTone, MailTwoTone, MobileTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import type { LoginParamsType } from '@/services/login';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
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

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo });
    }
  };

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);

    try {
      // 登录
      const msg = await fakeAccountLogin({ ...values, type });

      if (msg.status === 'ok') {
        localStorage.setItem("token",msg.token||'');
        message.success('登录成功！');
        await fetchUserInfo();
        goto();
        return;
      } // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }

    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values as LoginParamsType);
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab='账户密码登录'
          />
          <Tabs.TabPane
            key="mobile"
            tab='手机号登录'
          />
        </Tabs>

        {status === 'error' && loginType === 'account' && (
          <LoginMessage
            content={userLoginState.content||'账户或密码错误（admin/ant.design)'}
          />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
        {type === 'mobile' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileTwoTone className={styles.prefixIcon} />,
              }}
              name="mobile"
              rules={[
                {
                  required: true,
                  message: '手机号是必填项！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '不合法的手机号！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailTwoTone className={styles.prefixIcon} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} 获取验证码`;
                }

                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '验证码是必填项！',
                },
              ]}
              onGetCaptcha={async (mobile) => {
                const result = await getFakeCaptcha(mobile);

                if (result === false) {
                  return;
                }

                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码 ?
          </a>
        </div>
      </ProForm>
      <div className={styles.other}>
        <a
          target="_blank"
          href="https://fuwu.pinduoduo.com/service-market/auth?response_type=code&client_id=e5945f4dc54f4ee58d524979658e2b2c&redirect_uri=https://mall.i-gomall.com/"
        >
          未订购，到服务市场订购
        </a>
        <div>
          还没账号？
          <a className={styles.register} href="/user/register">
            立即注册
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
