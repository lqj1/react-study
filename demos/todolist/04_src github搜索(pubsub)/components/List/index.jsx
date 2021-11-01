import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import './index.css';
export default class List extends Component {
  state = {
    users: [], // 初始化状态，users初始值为数组
    isFirst: true, // 是否为第一次打开页面
    isLoading: false, // 发请求之后，标识加载中...
    err: '', // 存储请求相关的错误信息
  };
  // 组件挂载之后订阅消息，接受Search组件publish的消息，保持消息的名字一致即可
  componentDidMount() {
    this.token = PubSub.subscribe('submesg', (msg, stateObj) => {
      // console.log(stateObj);
      this.setState(stateObj);
    });
  }
  // 组件卸载之后，取消订阅
  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }
  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {isFirst ? (
          <h2>欢迎使用，输入关键字，随后点击搜索</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : err ? (
          // Objects are not valid as a React child，错误的对象不能作为react元素，需要取其中的message
          <h2 style={{ color: 'red' }}>{err.message}</h2>
        ) : (
          users.map(userObj => {
            return (
              <div key={userObj.id} className="card">
                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                  <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
