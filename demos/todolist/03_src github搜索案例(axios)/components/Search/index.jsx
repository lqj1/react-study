import React, { Component } from 'react';
import axios from 'axios';
export default class Search extends Component {
  search = () => {
    // 获取用户输入(连续解构赋值+重命名)
    const {
      keywordElement: { value: keyword },
    } = this;
    // console.log(keyword);
    // 发送请求前通知App更新状态
    this.props.updateAppState({ isFirst: false, isLoading: true });
    // 发送网络请求
    // axios.get(`http://localhost:3000/api1/search/users?q=${keyword}`).then(
    axios.get(`api1/search/users?q=${keyword}`).then(
      response => {
        console.log('成功了', response.data);
        this.props.updateAppState({ isLoading: false, users: response.data.items });
      },
      error => {
        console.log('失败了', error);
        this.props.updateAppState({ isLoading: false, err: error });
      }
    );
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索github用户</h3>
        <div>
          <input ref={c => (this.keywordElement = c)} type="text" placeholder="输入关键词搜索" />
          &nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    );
  }
}
