/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:30:48 
 * @Last Modified by:   songmingjie 
 * @Last Modified time: 2019-03-13 13:30:48 
 */

import React, { Component } from 'react'
import { Select } from 'element-react';
import 'element-theme-default';
import {getQuestionsType} from '@/services/exam'

export default class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            questionsType:[]
        };
    }
    _getQuestionsType(){//获取试题类型
        getQuestionsType().then(res=>{
            //console.log(res.data.data)
            this.setState({
                questionsType:res.data.data
            })
        })
    }
    componentDidMount(){
        this._getQuestionsType()
    }
  render() {
    return (
      <div>
         <p>选择题目类型：</p>
                    <Select value={this.state.value} clearable={true} onChange={(e)=>{
                      this.state.questionsType.filter(el=>{
                            if(e===el.questions_type_text){
                                  this.props.val({type:el.questions_type_id})
                                }
                                return el.questions_type_text
                            })
                        
                    }}>
                        {
                            this.state.questionsType.map(el => {
                                return <Select.Option key={el.questions_type_id} label={el.questions_type_text} value={el.questions_type_text} />
                            })
                        }
                    </Select>
      </div>
    )
  }
}
