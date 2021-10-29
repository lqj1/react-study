import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import './App.css';

export default class App extends Component {
  // 状态在哪里，操作状态的方法就在哪里
  state = {
    todos: [
      { id: '001', name: '吃饭', done: true },
      { id: '002', name: '睡觉', done: true },
      { id: '003', name: '写代码', done: false },
      { id: '004', name: '逛街', done: true },
    ],
  };
  // 父子通信，父给子传函数，子组件可以在函数中用参数的方式传递
  // 接受子组件过来的数组，并处理
  // addTodo用于添加一个todo，接受参数为 todo 对象
  addTodo = todoObj => {
    // console.log('App', data);
    // 获取原todos
    const { todos } = this.state;
    // 追加一个 todo
    const newTodos = [todoObj, ...todos];
    // 更新状态
    this.setState({ todos: newTodos });
  };
  // 用于更改孙子组件Item中的todo项
  updateTodo = (id, done) => {
    // 获取状态中的todos
    const { todos } = this.state;
    const newTodos = todos.map(todoObj => {
      if (todoObj.id === id) {
        return { ...todoObj, done };
      } else {
        return todoObj;
      }
    });
    this.setState({ todos: newTodos });
  };
  // 删除一个todo对象
  deleteTodo = id => {
    // 获取原来的todos
    const { todos } = this.state;
    // 删除指定id的todo对象
    const newTodos = todos.filter(todoObj => {
      return todoObj.id !== id;
    });
    // 更新状态
    this.setState({ todos: newTodos });
  };
  // checkAllTodo用于全选
  checkAllTodo = done => {
    // 获取原来的todos
    const { todos } = this.state;
    // 加工数据
    const newTodos = todos.map(todoObj => {
      return { ...todoObj, done: done };
    });
    // 更新状态
    this.setState({ todos: newTodos });
  };
  // 清除所有已完成
  handleClearAllDone = () => {
    // 获取原来的todos
    const { todos } = this.state;
    const newTodos = todos.filter(todoObj => {
      return !todoObj.done;
    });
    console.log('newTodos', newTodos);
    this.setState({ todos: newTodos });
  };
  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} handleClearAllDone={this.handleClearAllDone} />
        </div>
      </div>
    );
  }
}
