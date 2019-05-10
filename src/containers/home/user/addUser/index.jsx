
/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:34:03 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-14 19:44:30
 */

import React, { Component } from 'react'
import './css/index.css'
import Add from '../add/' //添加用户
import Identity from '../addTdentity/' //添加身份
import Addapi from '../addApi/' //添加api
import AddView from '../addView/' //添加视图权限
import AddApiAuthorit from '../addApiAuthorit/' //给身份设置api接口权限
import AddIdentityView from '../addIdentityView/' //给身份设置视图权限
import UpdataUser from '../updataUser';//用户更新
import {connect} from 'dva'

const mapState = store => {
  window.store = store;
  return { ...store.userShow }
}
@connect(mapState)

 class Adduser extends Component {
   state={
     flag:true
   }
   componentDidMount(){
       this.props.dispatch({ type: 'userShow/getViewAuthorityList' });
       this.props.dispatch({ type: 'userShow/getUsersIdentityList' });
       this.props.dispatch({ type: 'userShow/getApiAuthorityList' });
       this.props.dispatch({ type: 'userShow/getIdentityList' });
   }
  render() {
    const{ViewAuthorityList,UsersIdentityList,ApiAuthorityList,IdentityList}=this.props;
    const {flag}=this.state
    return (
      <div className="userMsg">
          <p className="tab" onClick={(e)=>{
              let val=e.target.innerHTML;
              if(val==='添加用户'){
                this.setState({
                  flag:true
                })
              }else{
                this.setState({
                  flag:!this.state.flag
                })
              }
          }}>
            <span className={flag?"adduser":null}>添加用户</span>
            <span className={!flag?"updatauser":null}>更新用户</span>
          </p>
          {
            flag?<Add Identity={IdentityList}></Add>:<UpdataUser Identity={IdentityList}></UpdataUser>
          }
          {/* <Add Identity={IdentityList}></Add>
          <UpdataUser Identity={IdentityList}></UpdataUser> */}
          <Identity></Identity>
          <Addapi></Addapi>
          <AddView ViewAuthority={ViewAuthorityList}></AddView>
          <AddApiAuthorit UserIdentity={UsersIdentityList} ApiAuthority={ApiAuthorityList}></AddApiAuthorit>
          <AddIdentityView UserIdentity={UsersIdentityList} ViewAuthority={ViewAuthorityList}></AddIdentityView>
    </div>
     
    )
  }
}

export default connect()(Adduser)