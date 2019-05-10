/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:34:03 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-14 09:15:58
 */

import React, { Component } from 'react'
import {
  Form, Button,message
} from 'antd';
import { Select } from 'element-react';
import {addIdentityApi} from '@/services/user';//给身份设定api接口权限

 class AddIdentityView extends Component {
   state={
    identity_id:'',
    api_authority_id:''
   }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
         // console.log(values);
         const {identity_id,api_authority_id}=this.state
         addIdentityApi({
          identity_id:identity_id,
          api_authority_id:api_authority_id
         }).then(res=>{
          if(res.data.code===1){
            message.success(res.data.msg)
          }else{
            message.error(res.data.msg)
          }
         })
        }
      });
    }
  render() {
    const {UserIdentity,ViewAuthority}=this.props
    return (
           <Form onSubmit={this.handleSubmit} className="login-form">
          <p>给身份设置视图权限</p>
          <Select labelInValue  style={{ width: '100%' }} onChange={(e)=>{
              UserIdentity.filter(el=>{
                if(el.identity_text===e){
                    this.setState({
                      identity_id:el.identity_id
                    })
                }
                return el.identity_text
              })
          }}>
            {
                UserIdentity.map(el => { 
                    return <Select.Option key={el.identity_id} label={el.identity_text} value={el.identity_text} />
                })
            } 
          </Select>
          <Select labelInValue  style={{ width: '100%' }} onChange={(e)=>{
            ViewAuthority.filter(el=>{
              if(el.view_authority_id===e){
                this.setState({
                  view_authority_id:el.view_authority_id,
                })
              }
              return el.view_authority_id
            })
          }}>
         {
           ViewAuthority.map(el => {
                    return <Select.Option key={el.view_id} label={el.view_authority_text} value={el.view_authority_id} />
                })
         }
          </Select>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确定
            </Button>
            <Button type="primary"  className="login-form-button">
              重置
            </Button>
          </Form.Item>
      </Form>   
    )
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(AddIdentityView);
export default WrappedNormalLoginForm