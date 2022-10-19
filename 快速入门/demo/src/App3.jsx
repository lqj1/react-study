import React, { Component } from 'react'

let num = 1
export default class App2 extends Component {
  // 这里是简写
  state = {
    num: 1
  }
  // setState完整写法
  constructor(props) {
    super(props)
    this.state = {
      num: 1
    }
  }
  render() {
    return (
      <div>
        <h2>数字为：{ num }</h2>
        <button onClick={() => num++ }>累加</button>    // 修改后视图无法获取到更新，需要使用 setState
        <br />
        <h2>数字为：{this.state.num} </h2>
        <button onClick={() => this.setState({ num: this.state.num + 1 })}> 按钮1-累加 </button>
        {/* num: this.state.num++ 不建议使用，尽量用setState更新值本身 */}
        <button onClick={this.addNum()}> 按钮2-累加 </button>  {/* 这里方法加括号会立刻执行，不可以加参数，加了参数，还没点就直接出来了 */}
      </div>
    )
  }
  addNum (aaa) {
    console.log(aaa);
  }
}


class Person {
  constructor(name) {
    this.name = name
  }
  sayName () {
    console.log(this.name);
  }
}
let p = new Person('张三');
p.sayName();