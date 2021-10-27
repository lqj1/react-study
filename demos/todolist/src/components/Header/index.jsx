import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import './index.css'
export default class Header extends Component {
  handleKeyUp = (event) => {
    // console.log(event.target.value);
    // 解构赋值获取
    const {keyCode, target} = event
    if (keyCode !== 13) return
    // 添加的todo名字不能为空
    if (target.value.trim() === '') {
      alert('输入不能为空')
      return
    }
    // 准备好一个todo对象
    const todoObj = {
      id: nanoid(),
      name: target.value,
      done: false
    }
    // 调用父组件函数，传值
    // 将todoObj传递给App组件
    this.props.addTodo(todoObj)
  }
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    )
  }
}
