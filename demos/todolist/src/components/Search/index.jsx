import React, { Component } from 'react';

export default class Search extends Component {
  search = () => {
    // 获取用户输入(连续解构赋值+重命名)
    const {
      keywordElement: { value: keyword },
    } = this;
    console.log(keyword);

    // 发送网络请求
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
