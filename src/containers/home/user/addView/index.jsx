/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:34:03 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-14 09:27:48
 */

import React, { Component } from 'react'
import {
  Form, Button,message
} from 'antd';
import { Select } from 'element-react';
import {addViewAuthority} from '@/services/user'

 class AddView extends Component {
   constructor(){
     super()
     this.state={
      view_id:'',
      view_authority_text:''
     }
   }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) { 
         // console.log(this.state.view_authority_text,this.state.view_id)
          addViewAuthority({
            params:{
              view_authority_text:this.state.view_authority_text,
              view_id:this.state.view_id
            }
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
    const {ViewAuthority}=this.props;
    return (
           <Form onSubmit={this.handleSubmit} className="login-form">
          <p>添加视图接口权限</p>
          <Select labelInValue  style={{ width: '100%' }} onChange={(e)=>{
            ViewAuthority.filter(el=>{
              if(el.view_authority_id===e){
                this.setState({
                  view_authority_text:el.view_authority_text,
                  view_id:el.view_id
                })
              }
              return el.view_id
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
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(AddView);
export default WrappedNormalLoginForm
