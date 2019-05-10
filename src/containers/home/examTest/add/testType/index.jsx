/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:31:15 
 * @Last Modified by:   songmingjie 
 * @Last Modified time: 2019-03-13 13:31:15 
 */

import React, { Component } from 'react'
import { Select } from 'element-react';
import 'element-theme-default';
import {getExamType} from '@/services/exam'

export default class TestType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            test:[]
        };
    }
    _getExamType(){//获取考试类型
        getExamType().then(res=>{
           //console.log(res.data.data)
            this.setState({
                test:res.data.data
            })
        })
    }
componentDidMount(){
    this._getExamType()
}
  render() {
    return (
      <div>
         <p>选择考试类型：</p>
                    <Select value={this.state.value} clearable={true} onChange={(e)=>{
                        this.state.test.filter(el=>{
                                if(e===el.exam_name){
                                    this.props.val({test:el.exam_id})
                                }
                                return el.exam_name
                            })
                    }}>
                        {
                            this.state.test.map(el => {
                                return <Select.Option key={el.exam_id} label={el.exam_name} value={el.exam_name} />
                            })
                        }
                    </Select>
      </div>
    )
  }
}
