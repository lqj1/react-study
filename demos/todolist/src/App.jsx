import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends Component {
  state = {
    todos: [
      { id: '001', name: '吃饭', done: true},
      { id: '002', name: '睡觉', done: true},
      { id: '003', name: '写代码', done: false},
      { id: '004', name: '逛街', done: true},
    ]
  }
  // 父子通信，父给子传函数，子组件可以在函数中用参数的方式传递
  // 接受子组件过来的数组，并处理
  // addTodo用于添加一个todo，接受参数为 todo 对象
  addTodo = (todoObj) => {
    // console.log('App', data);
    // 获取原todos
    const {todos} = this.state
    // 追加一个 todo
    const newTodos = [todoObj, ...todos]
    // 更新状态
    this.setState({todos: newTodos})
  }
  render () {
    const { todos } = this.state
		return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={todos}/>
          <Footer/>
        </div>
      </div>
		)
	}
}
