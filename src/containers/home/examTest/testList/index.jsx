import React, { Component } from 'react'
import { connect } from 'dva';
import {getTestType} from '@/services/exam'
import {message} from 'antd'
import "./css/index.css"
import Type from '../add/type';
import Class from '../add/class'
import Test from '../add/testType'

 class TestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    };
    success(msg){
        message.success(msg, 3);
      };
    componentDidMount() {
        getTestType().then(res=>{
            if(res.data.code===0){
                this.success(res.data.msg)
            }
        })
    }
    vals(data){
        console.log(data)
    }
    render() {
        return (
            <div className="test">
                <h1>考试管理/试题分类</h1>
                <Type val={this.vals} type={'type'}></Type>
                <Test val={this.vals} type={'test'}></Test>
                <Class val={this.vals} type={'class'}></Class>
                   

            </div>
        )
    }
}

export default connect()(TestList)