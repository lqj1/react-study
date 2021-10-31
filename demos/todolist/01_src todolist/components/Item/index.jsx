import React, { Component } from 'react';
import './index.css';
export default class Item extends Component {
  state = { mouse: false };
  handleMouse = flag => {
    // 如果调用的地方有参数，则返回值必须是函数(使用高阶函数)，否则会立即调用
    return () => {
      this.setState({ mouse: flag });
    };
  };
  handleCheck = id => {
    return event => {
      // console.log(id, event.target.checked);
      this.props.updateTodo(id, event.target.checked);
    };
  };
  // 删除一个todo的回调
  handleDelete = id => {
    console.log('通知App删除', id);
    if (window.confirm('确定删除吗？')) {
      // 调用window自身的confirm
      this.props.deleteTodo(id);
    }
  };
  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state;
    return (
      <li
        className="li-item"
        style={{ backgroundColor: this.state.mouse ? '#ddd' : 'white' }}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <label>
          <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
          <span>{name}</span>
        </label>
        <button
          className="btn btn-danger"
          style={{ display: mouse ? 'block' : 'none' }}
          onClick={() => {
            this.handleDelete(id);
          }}
        >
          删除
        </button>
      </li>
    );
  }
}
