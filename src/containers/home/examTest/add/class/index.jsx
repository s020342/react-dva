/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:31:01 
 * @Last Modified by:   songmingjie 
 * @Last Modified time: 2019-03-13 13:31:01 
 */

import React, { Component } from 'react'
import { Select } from 'element-react';
import 'element-theme-default';
import {getSubject} from '@/services/exam'

export default class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            subject:[]
        };
    }
    _getSubject(){//获取所有课程类型
        getSubject().then(res=>{
        // console.log(res.data.data)
            this.setState({
                subject:[]
            },()=>{
                this.setState({
                    subject:res.data.data
                })
            })
        })
    }
    componentDidMount(){
        this._getSubject()
    }
  render() {
     
    return (
      <div>
         <p>选择课程类型：</p>
                    <Select value={this.state.value} clearable={true} onChange={(e)=>{
                         this.state.subject.filter(el=>{
                                if(e===el.subject_text){
                                    this.props.val({subject:el.subject_id})
                                }
                                return el.subject_text
                            })
                    }}>
                        {
                            this.state.subject.map(el => {
                                return <Select.Option key={el.subject_id} label={el.subject_text} value={el.subject_text} />
                            })
                        }
                    </Select>
      </div>
    )
  }
}
