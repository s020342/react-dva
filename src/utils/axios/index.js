/*
 * @Author: songmingjie 
 * @Date: 2019-03-08 13:34:07 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-14 16:45:51
 */

import axios from 'axios';
import {message} from 'antd'
let token=sessionStorage.getItem('token')
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (token) {  // 判断是否存在token，如果存在的话，则每个http headers都加上token
            config.headers.authorization= `${token}`;
        }else{
            message.error('请先登陆')
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    })

//状态码
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    304: '已经执行了GET，但文件未变化',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    402: '参数失败',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

// http response 拦截器
axios.interceptors.response.use(
    response=>{
        //response.status === 200 ?  message.success(codeMessage[200]):message.error('返回数据失败')
        if( response.status !== 200 ){message.success('返回数据失败')}
        return Promise.resolve(response);
    },error => {
        if (error.response) {
            message.error(codeMessage[error.response.status])
        }
        return Promise.reject(error);
    })
export default axios;



