import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';
export default class Search extends Component {
  search = async () => {
    // 获取用户输入(连续解构赋值+重命名)
    const {
      keywordElement: { value: keyword },
    } = this;
    //#region 发送网络请求--使用axios发送
    /*
    // 发送请求前通知App更新状态
    // this.props.updateAppState({ isFirst: false, isLoading: true });
    PubSub.publish('submesg', { isFirst: false, isLoading: true });
    // 发送请求前通知List更新状态
    // 发送网络请求
    // axios.get(`http://localhost:3000/api1/search/users?q=${keyword}`).then(
    axios.get(`api1/search/users?q=${keyword}`).then(
      response => {
        console.log('成功了', response.data);
        // this.props.updateAppState({ isLoading: false, users: response.data.items });
        PubSub.publish('submesg', { isLoading: false, users: response.data.items });
      },
      error => {
        console.log('失败了', error);
        // this.props.updateAppState({ isLoading: false, err: error });
        PubSub.publish('submesg', { isLoading: false, err: error });
      }
    );
    */
    //#endregion

    //#region 发送网络请求--使用fetch发送（未优化）
    /**
    fetch(`api1/search/users?q=${keyword}`)
      .then(
        // 成功返回的如果是promise对象，可以自动实例化，然后在外层继续调用.then，如果是非promise，就输出非promise值
        response => {
          console.log('联系服务器成功了');
          return response.json();
        },
        // 异常错误1
        // 失败了，返回的是非promise值undefined，如果不写中断promise链语句，就会执行下面的then，提示获取数据成功
        error => {
          console.log('联系服务器失败了', error);
          // 中断promise链
          return new Promise();
        }
      )
      .then(
        response => {
          console.log('获取数据成功了');
        },
        // 异常错误2
        error => {
          console.log('获取数据失败了');
        }
      );
    */
    //#endregion 发送网络请求--使用fetch发送（未优化）

    //#region 发送网络请求--使用fetch发送（优化错误处理，用catch统一处理异常1和2）
    /**
    fetch(`api1/search/users?q=${keyword}`)
      .then(
        // 成功返回的如果是promise对象，可以自动实例化，然后在外层继续调用.then，如果是非promise，就输出非promise值
        response => {
          console.log('联系服务器成功了');
          return response.json();
        }
      )
      .then(response => {
        console.log('获取数据成功了');
      })
      .catch(
        // 统一处理异常1和2
        error => console.log(error)
      );
    */
    //#endregion 发送网络请求--使用fetch发送（优化错误处理，用catch统一处理异常1和2）

    //#region 发送网络请求--使用async/await
    // async/await没法处理异常，需要使用try/catch处理
    try {
      const response = await fetch(`api1/search/users?q=${keyword}`);
      const data = await response.json();
      console.log(data);
      PubSub.publish('submesg', { isLoading: false, users: data.items });
    } catch (error) {
      console.log(error);
      PubSub.publish('submesg', { isLoading: false, err: error });
    }

    //#endregion
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
