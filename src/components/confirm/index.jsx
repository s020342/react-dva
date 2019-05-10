
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';


export default class Confirm extends Component {
      showDeleteConfirm() {
          sessionStorage.clear()
      }

  render() {
    return (
            <NavLink className="exit" onClick={()=>{
                this.showDeleteConfirm()
            }} to="/login" tag="span">
              退出
            </NavLink>
           
    )
  }
}
