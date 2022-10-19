import React, { Component } from 'react'

let num = 1
export default class App2 extends Component {
  state = {
    num: 1
  }
  render() {
    return (
      <div>
        <h2>数字为：{ num }</h2>
        <button onClick={() => num++ }>累加</button>    // 修改后视图无法获取到更新，需要使用 setState
        <br />
        <h2>数字为：{this.state.num} </h2>
        <button onClick={() => this.setState({ num: this.state.num + 1 })}> 累加 </button>
        {/* num: this.state.num++ 不建议使用，尽量用setState更新值本身 */}
      </div>
    )
  }
}
