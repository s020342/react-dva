/*
 * @Author: songmingjie 
 * @Date: 2019-03-08 14:58:01 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-13 19:05:34
 * dva路由跳转
 * dynamic(app, model, component )
 * 第一个参数为挂载的对象，就是你要将这个router挂载到哪个实例上。
 * 第二个参数为这个router所需要的model。
 * 第三个参数为这个router的组件。
 */

import app from '@/app';
import dynamic from 'dva/dynamic';


export default [{
  path: "/login",
  component: dynamic({
    app,
    model: [() => import('@/models/login')],
    component: () => import('@/containers/login/index.jsx')
  }),
  title:'登录页'
},
 {
  path: '/home',
  component: dynamic({
    app,
    component: () => import('@/containers/home/home.jsx')
  }),
  auth: true,
  title:'主页',
  children:[
    {
      path: '/home/TestList',
      component: dynamic({
        app,
        component: () => import('@/containers/home/examTest/testList')
      }),
      auth: true
    },
    {
      path: '/home/add',
      component: dynamic({
        app,
        component: () => import('@/containers/home/examTest/add')
      }),
      auth: true
    },
    {
      path: '/home/look',
      component: dynamic({
        app,
        component: () => import('@/containers/home/examTest/look')
      }),
      auth: true
    },
    {
      path: '/home/showUser',
      component: dynamic({
        app,
        component: () => import('@/containers/home/user/userShow')
      }),
      auth: true
    },
    {
      path: '/home/addUser',
      component: dynamic({
        app,
        component: () => import('@/containers/home/user/addUser')
      }),
      auth: true
    }
  ]
}];
