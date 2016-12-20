const menuList = [
  {
    text: '资源搜索',
    icon: 'pay-circle',
    children: [
      { path: '/entry', text: '接口查询' },
      { path: '/content', text: '仓库查询' }
    ]
  },
  {
    text: '作者查询',
    icon: 'setting',
    children: [
      { path: '/', text: '权限管理' },
      { path: '/', text: '系统配置' }
    ]
  }
];

export default menuList;
