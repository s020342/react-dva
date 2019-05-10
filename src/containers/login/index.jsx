import {Component} from 'react';
import {connect} from 'dva';
import { Input, Checkbox,Button} from 'element-react';
import {userLogin} from '@/services/user'
import {setSession} from '@/utils/index.js'

import 'element-theme-default';
import "./css/login.css"
import "@/common/index.css"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }
  login = () => {
    let user_name = this.state.user
    let user_pwd = this.state.pwd

    userLogin({
        user_name: user_name,
        user_pwd: user_pwd
      })
      .then(res => {
        console.log(res)
        if (res.data.code === 1) {
          //alert('login succes')
          // this.context.router.push("/home")
        //  sessionStorage.setItem('user', user_name)
        //  sessionStorage.setItem('token',res.data.token)
         setSession('token',res.data.token)
         setSession('user', user_name)
         // this.props.dispatch('login/saveTiken',res.data.token)
          this.props.history.push("/home")
        } else {
          console.log(res.data.msg)
        }
      })

  }
  render() {
    return ( 
    <div className = "login" >
      <div className = "login-count" >
      <div className = "left" >
      <h1 > 八维网站考试系统 </h1>
       <p > 考试与班级管理一体化的整合式服务平台 </p>
    </div>
     <div className = "right" >
      <h1 > 登录 </h1> 
      <Input icon = "time"
      placeholder = "用户名"
      value = {
        this.state.user
      }
      onInput = {
        (e) => {
          this.setState({
            user: e.target.value
          })
        }
      }
      />
       <Input icon = "time"
      placeholder = "密码"
      type="password"
      value = {
        this.state.pwd
      }
      onInput = {
        (e) => {
          this.setState({
            pwd: e.target.value
          })
        }
      }
      />
       <Checkbox checked > 记住账号 </Checkbox> 
       <Button type = "primary"
      onClick = {
        this.login
      } > 登录 
      </Button> 
      <a> 立即注册 </a> 
      </div>
       </div>
      </div>
    );
  }
}

export default connect()(Login);
