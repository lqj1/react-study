import React, { Component } from 'react';
import axios from 'axios';
export default class App extends Component {
  getStudentData = () => {
    axios.get('http://localhost:3000/api1/search/users2').then(
      res => {
        console.log('success', res.data);
      },
      err => {
        console.log('fail', err);
      }
    );
  };
  getCarData = () => {
    axios.get('http://localhost:3000/api2/search/users2').then(
      res => {
        console.log('success', res.data);
      },
      err => {
        console.log('fail', err);
      }
    );
  };
  render() {
    return (
      <div>
        <button onClick={this.getStudentData}>点我获取数据</button>
        <button onClick={this.getCarData}>点我汽车数据</button>
      </div>
    );
  }
}
