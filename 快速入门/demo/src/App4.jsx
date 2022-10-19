import React, { Component } from 'react'

export default class App4 extends Component {
  render() {
    return (
      <div style={{ width: '200px', height: '200px' }}>
        <button onClick={this.btnClick.bind(this, 1)}></button>
        <button onClick={this.btnClick.bind(this, 2)}></button>
      </div>
    )
  }
  btnClick ( num ) {
    console.log(num);
  }
}
