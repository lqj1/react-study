import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'; // Home和About是路由组件
import Header from './components/Header'; // Header是一般组件
export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生html，靠<a>跳转到不同页面 */}
              {/* <a class="list-group-item" href="./about.html">
                About
              </a>
              <a class="list-group-item active" href="./home.html">
                Home
              </a> */}
              {/* 在React中靠路由链接实现切换组件切换--编写路由链接 */}
              <Link className="list-group-item" to="/about">
                About
              </Link>
              <Link className="list-group-item" to="/home">
                Home
              </Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/*注册路由 */}
                <Route path="/about" component={About} />
                <Route path="/home" component={Home} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
