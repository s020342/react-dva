/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:34:03 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-13 20:51:19
 */
import React, { Component } from 'react'
import {
  Form, Icon, Input, Button,message
} from 'antd';
import {addEdit} from '@/services/user';

 class AddIdentity extends Component {
   handleChange(value) {
      // { key: "lucy", label: "Lucy (101)" }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
         //s console.log(values);
          addEdit({
            params:{
              identity_text:values.identity
            }
          }).then(res=>{
            //console.log(res)
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      <p>添加身份</p>
        <Form.Item>
          {getFieldDecorator('identity', {
            rules: [{ required: true, message: 'Please input your identity!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Identity" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            确定
          </Button>
          <Button type="primary"  className="login-form-button">
            重置
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(AddIdentity);
export default WrappedNormalLoginForm