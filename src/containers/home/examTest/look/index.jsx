/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:31:45 
 * @Last Modified by:   songmingjie 
 * @Last Modified time: 2019-03-13 13:31:45 
 */

import React, { Component } from 'react'
import { connect } from 'dva';
import "./css/index.css"
import {getAllTest} from '@/services/exam'
import {
    Table,message
  } from 'antd';

const { Column} = Table;

class TestList extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    success(msg){
        message.success(msg, 3);
      };
    componentDidMount(){
        getAllTest().then(res=>{
            if(res.data.code===0){
                this.success(res.data.msg)
            }
            console.log(res.data.data)
            this.setState({
                data:[]
            },()=>{
              this.setState({
                data:res.data.data
              })
            })
        })
    }
    render() {
        const {data}=this.state
        return (
            <div className="test">
                <h1>考试管理/查看试题</h1>
                <Table dataSource={data} rowKey="questions_id" className='userlist'>
                     <Column
                        title="用户ID"
                        dataIndex="user_id"
                        key="333"
                    />
                    <Column
                        title="问题"
                        dataIndex="questions_stem"
                        key="111"
                    />
                    <Column
                        title="答案"
                        dataIndex="questions_stem"
                        key="222"
                    />
                </Table>
            </div>
        )
    }
}

export default connect()(TestList)