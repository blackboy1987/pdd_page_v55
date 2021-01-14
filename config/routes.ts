export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: '../layouts/UserLayout',
            routes: [
              {
                path: '/user/login',
                component: './User/login',
              },
            ],
          },
          {
            path: '/user/register',
            component: '../layouts/UserRegisterLayout',
            routes: [
              {
                path: '/user/register',
                name: 'register',
                component: './User/register',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: '概况',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/product',
    name: '搬家上货',
    icon: 'crown',
    routes: [
      {
        path: '/product/copy',
        name: '商品复制',
        icon: 'smile',
        component: './product/copy',
      },
      {
        path: '/product/list',
        name: '商品复制列表',
        icon: 'smile',
        component: './product/list',
      },
      {
        path: '/admin/sub-page3',
        name: '发布记录',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/admin/sub-page4',
        name: '查看源宝贝',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/admin1',
    name: '批量助手',
    icon: 'crown',
    routes: [
      {
        path: '/admin1/sub-page1',
        name: '批量修改',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/admin1/sub-page2',
        name: '修改记录',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/pic',
    name: '图片助手',
    icon: 'crown',
    routes: [
      {
        path: '/pic/cut',
        name: '一键抠图',
        icon: 'smile',
        component: './pic/cut',
      },
    ],
  },
  {
    path: '/admin3',
    name: '商品检测',
    icon: 'crown',
    routes: [
      {
        path: '/admin3/sub-page1',
        name: '重复铺货检测',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/admin3/sub-page2',
        name: '行业热词',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/admin3/sub-page3',
        name: '违禁词检测',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/admin3/sub-page4',
        name: '商品源同步',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/storeManager',
    name: '店铺管理',
    icon: 'crown',
    routes: [
      {
        path: '/storeManager/sub-page1',
        name: '店铺列表',
        icon: 'smile',
        component: './storeManager/store',
      },
      {
        path: '/storeManager/storeCategory',
        name: '店铺分组',
        icon: 'smile',
        component: './storeManager/storeCategory',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
