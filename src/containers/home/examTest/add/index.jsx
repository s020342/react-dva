/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:31:30 
 * @Last Modified by:   songmingjie 
 * @Last Modified time: 2019-03-13 13:31:30 
 */

import React, { Component } from 'react'
import { Input, Button} from 'element-react';
import { connect } from 'dva';
import 'element-theme-default';
import "./css/index.css"
import {questions} from '@/services/exam'
import {message} from 'antd'

import Type from './type';
import Class from './class'
import Test from './testType'

class TestList extends Component {
    constructor(props){
        super(props)
        this.state={
            questions_type_id:'',
            questions_stem:'',
            subject_id:'',
            exam_id:'',
            user_id:'',
            questions_answer:''
        }
        this.vals=this.vals.bind(this)
        this.submit=this.submit.bind(this)
    }
    success(){
        message.success('添加成功！', 3);
      };
    submit(){
        //console.log(this.state)
       let userId=sessionStorage.getItem('userId')
       const {questions_type_id,questions_stem,subject_id,exam_id,questions_answer}=this.state;
        questions({
            questions_type_id:questions_type_id,
            questions_stem:questions_stem,
            subject_id:subject_id,
            exam_id:exam_id,
            user_id:userId,
            questions_answer:questions_answer
        }).then(res=>{
            //console.log(res)
            if(res.data.code===1){
                this.success()
            }
        })
    }
    vals(data){
        console.log(data)
        if(data.type){
            this.setState({
                questions_type_id:data.type
            })
        }else if(data.test){
            this.setState({
                exam_id:data.test
            })
        }else{
            this.setState({
                subject_id:data.subject
            })
        }
       
    }
    render() {
        return (
            <div className="test">
                <h1>添加试题</h1>
                <div className="bot">
                    <p>题干：</p>
                    <Input
                        type="textarea"
                        autosize={{ minRows: 2, maxRows: 4 }}
                        placeholder="请输入内容"
                        onInput={(e)=>{
                            this.setState({
                                questions_stem:e.target.value
                            })
                        }}
                    />
                    <p>答案信息</p>
                    <Input
                        type="textarea"
                        autosize={{ minRows: 2, maxRows: 4 }}
                        placeholder="请输入内容"
                        onInput={(e)=>{
                            this.setState({
                                questions_answer:e.target.value
                            })
                        }}
                    />
                    <Type val={this.vals} type={'type'}></Type>
                    <Test val={this.vals} type={'test'}></Test>
                    <Class val={this.vals} type={'class'}></Class>
                    <Button type="primary" onClick={this.submit}>提交</Button>
                </div>

            </div>
        )
    }
}

export default connect()(TestList)