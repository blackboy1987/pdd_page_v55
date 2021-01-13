import type { MenuDataItem } from '@ant-design/pro-layout';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import styles from './UserRegisterLayout.less';
import { Header } from 'antd/es/layout/layout';

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const UserRegisterLayout: React.FC<UserLayoutProps> = (props) => {
  const { children } = props;
  return (
    <HelmetProvider>
      <div className={styles.container}>
        <Header className={styles.header}>
          <a className={styles.logo}>
            <img src="https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/logo1.png" />
          </a>
          <a className={styles.help}>
            <img src="https://bootx-pdd.oss-cn-hangzhou.aliyuncs.com/qq-group-logo.png" />
          </a>
        </Header>
        <div className={styles.content}>{children}</div>
      </div>
    </HelmetProvider>
  );
};

export default UserRegisterLayout;
