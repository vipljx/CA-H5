export default [
  {
    path: "*",
    redirect: '/passwordLogin',
  },
  {
    path: "/",
    redirect: '/passwordLogin',
  },
  {
    path: "/passwordLogin",
    name: "passwordLogin",
    component: (resolve) => require(["../views/passwordLogin.vue"], resolve),
    meta: {
      title: '登录'
    },
  },
  {
    path: '/checkLogin',
    name: 'checkLogin',
    component: (resolve) => require(["../views/checkLogin.vue"], resolve),
    meta: {
      title: '登录'
    },
  },
  // {
  //   path: '/userIndication',
  //   name: 'userIndication',
  //   component: (resolve) => require(["../views/userIndication.vue"], resolve)
  // },
  {
    path: '/findPassword',
    name: 'findPassword',
    component: (resolve) => require(["../views/findPassword.vue"], resolve),
    meta: {
      title: '找回密码'
    },
  },
  {
    path: '/newUserRegister',
    name: 'newUserRegister',
    component: (resolve) => require(["../views/newUserRegister.vue"], resolve),
    meta: {
      title: '新用户注册'
    },
  },
  {
    path: '/SetSignPassword',
    name: 'SetSignPassword',
    component: (resolve) => require(["../views/SetSignPassword.vue"], resolve),
    meta: {
      title: '设置签署密码'
    },
  },
  {
    path: '/idIndication',
    name: 'idIndication',
    component: (resolve) => require(["../views/idIndication.vue"], resolve),
    meta: {
      title: '身份核验'
    },
  },
  {
    path: '/modifySignPassword',
    name: 'modifySignPassword',
    component: (resolve) => require(["../views/modifySignPassword.vue"], resolve),
    meta: {
      title: '修改签署密码'
    },
  },
  {
    path: '/modifyPassword',
    name: 'modifyPassword',
    component: (resolve) => require(["../views/modifyPassword.vue"], resolve),
    meta: {
      title: '修改密码'
    },
  },
  {
    path: '/fourElementsIndication',
    name: 'fourElementsIndication',
    component: (resolve) => require(["../views/fourElementsIndication.vue"], resolve),
    meta: {
      title: '银行四要素认证'
    },
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: (resolve) => require(["../views/addAddress.vue"], resolve),
    meta: {
      title: '添加地址'
    },
  },
  {
    path: '/receiveAddress',
    name: 'receiveAddress',
    component: (resolve) => require(["../views/receiveAddress.vue"], resolve),
    meta: {
      title: '收件地址'
    },
  },
  {
    path: '/myStamp',
    name: 'myStamp',
    component: (resolve) => require(["../views/myStamp.vue"], resolve),
    meta: {
      title: '我的签章'
    },
  },
  {
    path: '/modifyAddress',
    name: 'modifyAddress',
    component: (resolve) => require(["../views/modifyAddress.vue"], resolve),
    meta: {
      title: '修改地址'
    },
  },
  {
    path: "/tabBar",
    // component: () => import(/* webpackChunkName: "about" */ "../views/tabBar.vue"),
    component: (resolve) => require(["../views/tabBar.vue"], resolve),
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: "home",
        component: (resolve) => require(["../views/Home.vue"], resolve),
        meta: {
          title: '首页'
        },
      },
      {
        path: "/document",
        name: "document",
        component: (resolve) => require(["../views/document.vue"], resolve),
        meta: {
          title: '文档'
        },
      },
      {
        path: "/evidence",
        name: "evidence",
        component: (resolve) => require(["../views/evidence/list.vue"], resolve),
        meta: {
          title: '证据'
        },
      },
      {
        path: '/userIndication',
        name: 'userIndication',
        component: (resolve) => require(["../views/userIndication.vue"], resolve),
        meta: {
          title: '我的'
        },
      }
    ]
  },
  {
    path: "/Initiation",
    name: "Initiation",
    component: (resolve) => require(["../views/sign/Initiation.vue"], resolve),
    meta: {
      title: '发起签署'
    },
  },
  {
    path: "/appoint",
    name: "appoint",
    component: (resolve) => require(["../views/sign/appoint.vue"], resolve),
    meta: {
      title: '设置签章位置'
    },
  },
  {
    path: "/waitSign",
    name: "waitSign",
    component: (resolve) => require(["../views/sign/waitSign.vue"], resolve),
    meta: {
      title: '文档内容'
    },
  },
  {
    path: "/deny",
    name: "deny",
    component: (resolve) => require(["../views/sign/deny.vue"], resolve),
    meta: {
      title: '拒签原因'
    },
  },
  {
    path: "/Information",
    name: "Information",
    component: (resolve) => require(["../views/sign/Information.vue"], resolve),
    meta: {
      title: '签署信息'
    },
  },
  {
    path: "/Verification",
    name: "Verification",
    component: (resolve) => require(["../views/sign/Verification.vue"], resolve),
    meta: {
      title: '意愿核验'
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: (resolve) => require(["../views/evidence/detail.vue"], resolve),
    meta: {
      title: '出证详情'
    },
  },
  {
    path: "/apply",
    name: "apply",
    component: (resolve) => require(["../views/evidence/Apply.vue"], resolve),
    meta: {
      title: '申请出证'
    },
  },
  {
    path: "/write",
    name: "write",
    component: (resolve) => require(["../views/write/write.vue"], resolve),
    meta: {
      title: '手绘签章'
    },
  }


]
