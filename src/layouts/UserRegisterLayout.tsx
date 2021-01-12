import type { MenuDataItem } from '@ant-design/pro-layout';
import { getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useIntl } from 'umi';
import React from 'react';
import styles from './UserRegisterLayout.less';
import {Header} from "antd/es/layout/layout";

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const UserRegisterLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    children,
  } = props;
  const { formatMessage } = useIntl();
  const title = getPageTitle({
    formatMessage,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <Header className={styles.header}>
          <a className={styles.logo}>
            <img src='https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/logo1.png'/>
          </a>
          <a className={styles.help}>
            <img src='https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/qq-group-logo.png' />
          </a>
        </Header>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default UserRegisterLayout;
