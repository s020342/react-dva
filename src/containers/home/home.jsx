/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:30:22 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-14 16:48:10
 */

import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import { Layout, Menu } from 'element-react';
import RouterView from '@/router/routerView';
import {getUserInfo} from '@/services/user'
import moment from 'moment'
import "./css/home.css"
import 'element-theme-default';
import {setSession,getSession} from '@/utils/index.js'
import Confirm from '@/components/confirm'

 class Home extends Component {
     constructor(props){
        super(props)
        this.state = {
            user: '',
            flag:true,
            time:''
        }
     }
    _getUserInfo(){//获取用户信息
        getUserInfo().then(res=>{
          let day=moment(res.data.data.signTime).format('YYYY-MM-DD:HH:MM:SS')
            this.setState({time:day})
            if(res.data.data.identity_text!=='管理员'){
                this.setState({
                    flag:true
                },()=>{
                    this.setState({
                        flag:false
                    }) 
                })
            }
            setSession('identityId',res.data.data.identity_id)
            setSession('userId',res.data.data.user_id)
        })
    }
    isLogin(){
        this.setState({user:getSession('user')})
        let token=getSession('token')
         if(!token){
              this.props.history.push('/login')
         }
    }
    componentDidMount(){
       this._getUserInfo()
       this.isLogin()
      
    }
    render() {
        const {routes}=this.props;
        return (
            <div className="home">
                <header>
                    <p className="left">北京八维研修学院</p>
                    <p className="center">三</p>
                    <p className="right">
                        欢迎尊敬的<b className='user'>{this.state.user}</b>回家!
                       您上次登录时间:{this.state.time}
                       <Confirm>退出</Confirm>
                    </p>
                </header>
                <div className="count">
                    <div className="count-left">
                        <Layout.Row className="tac">
                            <Layout.Col span={16}>
                                <Menu defaultActive="3" className="el-menu-vertical-demo">
                                    <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>考试管理</span>}>
                                        <Menu.Item index="1-1">
                                            <NavLink to="/home/add">添加试题</NavLink>
                                        </Menu.Item>
                                        <Menu.Item index="1-2">
                                            <NavLink to="/home/testList">试题分类</NavLink>
                                        </Menu.Item>
                                        <Menu.Item index="1-3">
                                            <NavLink to="/home/look">查看试题</NavLink>
                                        </Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                                {
                                    this.state.flag?(
                                        <Menu defaultActive="2" className="el-menu-vertical-demo" >
                                    <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>用户管理</span>}>
                                    <Menu.Item index="1-1">
                                            <NavLink to="/home/addUser">添加用户</NavLink>
                                        </Menu.Item>
                                        <Menu.Item index="1-2">
                                            <NavLink to="/home/showUser">用户展示</NavLink>
                                        </Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                                    ):null
                                }
                                <Menu defaultActive="2" className="el-menu-vertical-demo">
                                    <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>班级管理</span>}>
                                        <Menu.Item index="1-1">
                                            <NavLink to="/home/add">查看班级</NavLink>
                                        </Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                            </Layout.Col>
                        </Layout.Row>
                    </div>
                    <div className="count-right">
                        <RouterView Routes={routes}></RouterView>
                    </div>
                </div>
            </div>
        )
    }
}

  
export default Home