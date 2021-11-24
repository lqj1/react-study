import React, { Component } from 'react';
import store from '../../redux/store';
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action';
export default class Count extends Component {
  state = {
    carName: '奔驰c63',
  };
  componentDidMount() {
    // 检测 redux 中状态的变化，只要其中任一状态变化，就调用render
    store.subscribe(() => {
      this.setState({});
    });
  }
  increase = () => {
    // 获取用户输入
    const { value } = this.selectNumber;
    store.dispatch(createIncrementAction(value * 1));
  };
  decrement = () => {
    // 获取用户输入
    const { value } = this.selectNumber;
    store.dispatch({ type: 'decrement', data: value * 1 });
  };
  // 奇数加
  increaseIfOdd = () => {
    // 获取用户输入
    const { value } = this.selectNumber;
    const { count } = store.getState();
    if (count % 2 !== 0) {
      store.dispatch(createDecrementAction(value * 1));
    }
  };
  increaseAsync = () => {
    // 获取用户输入
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch(createIncrementAsyncAction(value * 1));
    }, 1000);
  };
  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
        <select ref={c => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increase}>加</button>&nbsp;
        <button onClick={this.decrement}>减</button>&nbsp;
        <button onClick={this.increaseIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.increaseAsync}>异步加</button>
      </div>
    );
  }
}
