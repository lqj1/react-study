## introduce
ref: https://www.bilibili.com/video/BV1Z44y1K7Fj?p=2&vd_source=3c13db00b69f1fbbe904dab0b21bd3e0
技术栈为：React + Hook + React-router-v6 + Mobx + AntD
源码地址：https://gitee.com/react-cp/react-pc-code
React基础讲义: https://www.yuque.com/fechaichai/qeamqf/xbai87
ReactPc项目讲义: https://www.yuque.com/fechaichai/tzzlh1

## JSX基础
### 入口文件说明
- react: 框架的核心包
- react-dom: 专门做渲染相关的包
- import App from './App' 引入根组件
- ReactDOM.render 渲染根组件APP到id为xxx的节点上
- React18问题
```
<!-- 严格模式节点需要去掉，会影响 useEffect 的执行时机 -->
<React.StrictMode>
  <App />
</React.StrictMode>

<!-- 改为 -->
<App />
```
- 注意：JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，
  - 脚手架中内置的 @babel/plugin-transform-react-jsx 包，用来解析该语法


### jsx中使用表达式
- 可以使用的表达式
1. 字符串、数值、布尔值、null、undefined、object（ [] / {} ）
2. 1 + 2、'abc'.split('')、['a', 'b'].join('-')
3. fn()
>特别注意
>if 语句/ switch-case 语句/ 变量声明语句，这些叫做语句，不是表达式，不能出现在 {} 中！！

### JSX列表渲染
- vue通过 v-for 实现
- react技术方案: map重复渲染哪个模板，就返回谁
- 注意事项：遍历列表时同样需要一个类型为number/string不可重复的key,提高diff性能
```javascript
// 来个列表
const songs = [
  { id: 1, name: '痴心绝对'},
  { id: 2, name: '像我这样的人'},
  { id: 3, name: '永不失联的爱'}
]
function App() {
  return {
    <div className="App">
      <ul>
        {
          songs.map(song => <li key={song.id}>{song.name}</li>)
        }
      </ul>
    </div>
  }
}
export default App
```
### JSX条件渲染
- vue中使用 v-if 实现
- 根据是否满足条件生成HTML结构，如 loading效果
- 实现：可以使用 三元运算符(常用) 或 逻辑与(&&)运算符

- 三元表达式&&逻辑运算
```javascript
const flag = true
function App() {
  return (
    <div className="App">
      // 三元运算符
      {flag ? (
        <div>
          <span>this is a span</span>
        </div>
      ) : null}

      // 逻辑运算
      { false && <span>this is span</span> }      
    </div>
  )
}
export default App
```
### 模板精简原则
- 对应每一个状态 type 1,2,3，返回对应的 h1,h2,h3 标签

### 样式控制
1. 行内样式 - 在元素身上绑定一个 style 属性即可
2. 类名样式 - 在元素身上绑定一个 className 属性即可，必须写 className
```javascript
// App.js 内容
import './app.css'
const style = {
  color: 'red',
  fontSize: '30px'
}
function App() {
  return (
    <div className="App">
      <span style={style}>this is a span</span>
      <span className='active'>测试类名样式</span>
    </div>
  );
}

export default App;
```
#### 动态类名
- 一般使用三元运算符来控制

#### 注意事项
1. JSX必须有一个根节点，如果没有根节点，可以使用<></>（幽灵节点）替代
```javascript
// 错误
function App() {
  return (
    <div className="App"></div>
    <div className="App"></div>
  );
}
// 修改为
function App() {
  return (
    <>
      <div className="App"></div>
      <div className="App"></div>
    </>
  );
}
```
2. 所有标签必须形成闭合，成对闭合或者自闭合都可以
3. JSX中的语法更加贴近JS语法，属性名采用驼峰命名法  class -> className  for -> htmlFor
4. JSX支持多行（换行），如果需要换行，需使用() 包裹，防止bug出现

#### 格式化配置
1. 安装 vscode prettier 插件

#### 阶段小练习
- 项目 react-jsx-demo

### React组件基础
#### 1.组件概念
- 组件包括有 函数组件 和 类组件

- 函数组件 约定说明
1. 组件的名称必须首字母大写，react内部会根据这个来判断是组件还是普通的HTML标签
2. 函数组件必须有返回值，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null
3. 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数的返回值就是对应的内容
4. 使用函数名称作为组件标签名称，可以成对出现也可以自闭合

- 类组件 约定说明
1. 类名称也必须以大写字母开头
2. 类组件应该继承 React.Component 父类，从而使用父类中提供的方法或属性
3. 类组件必须提供 render 方法，render 方法必须有返回值，表示该组件的 UI 结构

#### 2.函数组件
```javascript
// 创建
function Hello() {
  // 增加事件处理
  const clickHandler = () => {
    console.log('函数组件中的事件被触发了');
  }
  // return <div>hello</div>
  return <div onClick={clickHandler}>hello</div>
}
// 渲染 <Hello /> 或者 <Hello></Hello>
function App() {
  return {
    <div>
     <Hello></Hello>
     <Hello />
    </div>
  }
}
export default App
```
#### 3.类组件
```javascript
// 创建
import React from 'react'
class HelloComponent extends React.Component{
  // 事件回调函数（标准写法，避免this指向问题）
  // 这样写 回调函数 中的 this 指向的是当前的组件实例对象
  clickHandler = () => {
    console.log('类组件中的事件被触发了');
  }
  render() {
    return <div onClick={this.clickHandler}>this is class component</div>
  }
}
// 渲染 <HelloComponent></HelloComponent> 或者 <HelloComponent />
function App() {
  return (
    <div>
      <HelloComponent></HelloComponent>
      <HelloComponent />
    </div>
  )
}
```

### 4.事件绑定
#### 4.1 如何绑定事件
- 语法-驼峰命名
on+事件名称={事件处理程序}，比如：<div onClick={()=>()}></div>
- 注意点
react事件采用驼峰命名法，比如：onMouseEnter, onFocus
- 样例
在上面函数组价和类中新增代码
- 注意类组件中的事件调用，需要添加 this 关键字
#### 4.2 获取事件对象e
- 使用：阻止事件默认行为，阻止冒泡
```javascript
function Hello() {
  const clickHandler = (e) => {
    // 阻止默认行为
    e.preventDefault()
    console.log('函数组件中的事件被触发了', e);
  }
  return <div><a onClick={clickHandler} href="http://baidu.com"></div>
}
```
### 5.参数传递
#### 5.1 事件绑定传额外参数
#### 5.2 事件对象e和参数共存
- 传递自定义参数
1. 只需要一个额外参数 {clickHandler} 改成-> {()=>clickHandler('自定义参数')}
- 两个参数，e和自定义
2. {(e) => clickHandler(e, '自定义参数')}

```javascript
function Hello() {
  // 只传参数
  const clickHandler = (msg) => {
    // 阻止默认行为
    e.preventDefault()
    console.log('函数组件中的事件被触发了', e);
  }
  // 事件对象e和参数
  const clickHandler = (e, msg) => {
    // 阻止默认行为
    e.preventDefault()
    console.log('函数组件中的事件被触发了', e);
  }
  // 改成箭头函数，传递参数
  return <div onClick={()=>clickHandler('this is msg')}>click me</div>
  // 事件对象e和参数
  return <div onClick={(e)=>clickHandler(e, 'this is msg')}>click me</div>
}
```
### 6.组件状态
### 6.1 组件状态的定义和使用
目标任务:   能够为组件添加状态和修改状态的值
一个前提：在React hook出来之前，函数式组件是没有自己的状态的，所以我们统一通过类组件来讲解
```javascript
import React from 'react'
class TestComponent extends React.Component {
  // 1.定义组件状态
  state = {
    // 在这里可以定义各种属性，全都是当前组件的状态
    name: 'cp teacher'
  }
  // 事件回调函数
  changeName = () => {
    // 3. 修改 state 中的状态
    // 注意：不可以直接修改赋值，必须通过一个方法 setState
    this.setState({
      name: 'change cp teacher'
    })
  }
  render() {
    // 2.使用状态
    return (
      <div>
        this is  TestComponent
        当前name为：{this.state.name}
        <button onClick={this.changeName}></button>
      </div>
    )
  }
}
// 根组件
function App() {
  return {
    <div>
      <TestComponent></TestComponent>
    </div>
  }
}
```
#### 6.2 状态定义修改注意事项
1. 编写组件其实就是编写原生js类或者函数
2. 定义状态必须通过 state 实例属性的方式提供对象，名称是固定的，就叫 state
3. 修改 state 中的任何属性，都不可以通过直接赋值的方式，必须走 setState 方法，这个方法论来自于继承得到
4. 这里的 this 关键词，很容易出现指向错误的问题，通过使用箭头函数是最推荐和最规范的写法，没有 this 指向问题

#### 6.3 通过类组件修改状态的方式 counter
```javascript
// <!-- 通过类组件修改状态的方式：counter -->
import React from 'react'
class Counter extends React.Component {
  // 通过 state 定义组件状态
  state = {
    count: 0
  }
  // 事件回调函数
  changeCounter = () => {
    // 修改 state
    // react 这个体系下，‘数据不可变’
    // value 永远都是上一次 count 的值 + 1
    this.setState({
      count: this.state.count + 1 
    })
  }
  render() {
    return (
      <button onClick={this.changeCounter}>click,{this.state.count}</button>
    )
  }
}
// <!-- 根组件 -->
function App() {
  return (
    <div>
      // 渲染 Counter 
      <Counter></Counter>
    </div>
  )
}
```

-  this 错误写法
```javascript
import React from 'react'
class Test extends React.Component {
  // 通过 state 定义组件状态
  state = {
    count: 0
  }
  // 不使用箭头函数错误写法
  // handler = () => {
  handler () {
    console.log(this);  // undefined
  }
  // 正确写法
  constructor() {
    super()
    // 使用 bind 强行修正我们的this指向
    // 相当于在类组件初始化阶段就可以把回调函数的 this 修正到永远指向当前组件实例对象
    this.handler = this.handler.bind(this) // 这时候handler中的this指向 Test
  }
  render() {
    return (
      <button onClick={this.handler}>click</button>
    )
  }
}
// <!-- 根组件 -->
function App() {
  return (
    <div>
      // 渲染 Test 
      <Test></Test>
    </div>
  )
}
```

#### 6.4 箭头函数指向问题
- 如果在调用的时候，使用箭头函数，如下
```javascript
// <!-- 通过类组件修改状态的方式：counter -->
import React from 'react'
class Test extends React.Component {
  // 事件回调函数
  handler = () => {
    console.log(this);  // 这里的 this 也会指向 Test
  }
  render() {
    // render函数中的 this 已经被react内部作了修正
    // 这里的this就是指向当前的组件实例对象
    // 那我们箭头函数中的 this 直接沿用，所以也是指向组件的实例对象
    console.log('父函数中的this指向为：', this);
    return (
      // 这里使用箭头函数，这里的箭头函数的父级函数是 Test
      <button onClick={ () => this.handler() }>click,{this.state.count}</button>
    )
  }
}
// <!-- 根组件 -->
function App() {
  return (
    <div>
      // 渲染 Counter 
      <Test></Test>
    </div>
  )
}
```
- 所以，如果不通过对 constructor 做修正，直接可以在事件绑定的位置
- 通过箭头函数的写法，直接沿用父函数的this指向
- 这部分都是修正this的写法，推荐写法还是上面那部分

### 7.状态不可变
#### 7.1 状态不可变
直接修改的方式如下：
```
// 直接修改简单类型 Number
this.state.count++
++this.state.count
this.state.count += 1
this.state.count = 1

// 直接修改数组
this.state.list.push(123)
this.state.list.splice(1,1)

// 直接修改对象
this.state.person.name = 'rose'
```
#### 7.2 基于当前状态创建新值
```
// 数组修改
this.setState({
  count: this.state.count + 1
  list: [...this.state.list, 4, 5],
  person: {
    ...this.state.person,
    // 覆盖原来的属性，就可以达到修改对象中属性的目的
    name: 'rose'
  }
})

// 对象修改
this.setState({
  person: {
    ...this.state.person,
    name: 'rose'
  }
})

// 数组删除 - filter
this.setState({
  list: this.state.list.filter(item => item != 2)   // 从 [1,2,3] 中去除 2
})
```
- 总结：永远不要直接修改状态的值，而是基于当前状态创建新的状态值

### 8.受控组件
- 目标：使用受控组件的方式获取文本框的值
- react处理表单的方式
  - 受控组件（推荐）
  - 非受控组件（了解）
#### 8.1 受控表单组件
- 受控组件就是可以 input框自己的状态(value)被react的状态控制的组件
- react组件的状态的地方是在 state中，input表单元素也有自己的状态是在value中，react将state与表单元素的值(value)绑定到一起，由state的值来控制表单元素的值，从而保证单一数据源特性
- 实现步骤
1. 在组件的state中声明一个组件的状态数据
2. 将状态数据设置为 input 标签元素的value属性的值
3. 为input添加change事件
4. 在事件处理程序中，通过事件对象e获取到当前文本框的值（即用户当前输入的值）
5. 调用 setState 方法，将文本框的值作为 state 状态的最新值
```javascript
import './app.css'
import React from 'react'

class Counter extends React.Component {
  // 1.声明用来控制input value的 react组件自己的状态
  state = {
    message: 'this is message'
  }
  // 回调函数
  inputChange = (e) => {
    console.log('change事件触发了');
    // 4.拿到输入框最新的值，交给state中的 message
    this.setState({
      message: e.target.value
    })
  }
  // 产出UI模板结构
  render () {
    return (
      // 2.给input框的value属性绑定 react state
      // 3.给input框绑定一个change事件，为了拿到当前输入框中的数据 
      <input
        type="text"
        value={this.state.message}
        onChange={this.inputChange}
      ></input>
    )
  }
}
function App() {
  return (
    <Counter></Counter>
  );
}
export default App;
```
#### 8.2 非受控组件
- 非受控组件就是通过 手动操作dom的方式获取文本的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值
- 实现步骤
1. 导入 createRef 函数
2. 调用 createRef 函数，创建一个 ref 对象，存储到名为 msgRef 的实例属性中
3. 为input添加ref属性，值为 msgRef
4. 在按钮的事件处理程序中，通过msgRef.current即可拿到input对应的dom元素，而其中 msgRef.current.value拿到的就是文本框的值
```javascript
import './app.css'
import React, { createRef } from 'react'
class Counter extends React.Component {
  // 这个实例是可以自定义的
  msgRef = createRef()
  getValue = () => {
    // 通过 msgRef 获取 input value值
    // this.msgRef.current是原生dom元素
    console.log(this.msgRef.current.value);
  }
  // 产出UI模板
  render () {
    return (
      <>
        <input
          type="text"
          ref={this.msgRef}
        ></input>
        <button onClick={this.getValue}>点击获取输入框的值</button>
      </>
    )
  }
}
function App() {
  return (
    <Counter></Counter>
  );
}
export default App;
```
#### 8.3 注意事项
在标签中添加事件
- onClick={this.switchTab}                    // 这种方式只有事件对象e
- onClick= { ()=> this.switchTab(tab.type)}   // 通过箭头的方式可以传入事件对象e以外的其他参数
#### 8.4 uuid的使用
- 安装
  - yarn add uuid
- 使用：用于生成独一无二的用户id
```
import { v4 as uuid } from 'uuid'    // 导入
uuid()  // 得到一个独一无二的id
```

### 9. React组件通信
- 组件是独立且封闭的单元，默认情况下组件只能使用自己的数据
- 为了让各个组件之间可以进行互相沟通，数据传递，这个过程就是组件通信
1. 父子关系 - 最重要的
2. 兄弟关系 - 自定义事件模式产生技术方法 eventBus / 通过共同的父组件通信
3. 其他关系 - mobx/redux/基于hook的方案

#### 9.1 父传子实现
- 目标：实现父子通信中的父子，把父组件中的数据传给子组件
- 实现步骤
1. 父组件提供要传递的数据 - state
2. 给子组件标签添加属性，值为 state 中的数据
3. 子组件中通过 props 接收父组件中传过来的数据
  3.1 类组件使用 this.props 获取 props 对象
  3.2 函数式组件直接通过参数获取 props 对象

```javascript
// App 父组件  Son 子组件
// 函数式的Son
function SonF(props) {
  // 函数组件接收参数需要提供 props
  // 1. props 是一个对象，里面存着通过父组件传入的所有数据
  return (
    <>
      <div>我是函数子组件, {props.msg}</div>
      <div>我是函数子组件, {props.list.map(item => <p>item</p>)}</div>
    </>
  )
} 
// 类组件的Son
class SonC extends React.Component {
  render() {
    return (
      // 2. 类组件必须通过 this 关键词，去获取这里的 props，是固定的
      <div>我是类子组件, {this.props.msg}</div>
    )
  }
}

class App extends React.Component {
  // 准备数据
  state = {
    list: [1,2,3]
    message: 'this is a message'
  }
  render() {
    return (
      <div>
        // 子组件身上绑定属性，属性名可以自定义，保持语义化
        <SonF msg={this.state.message} />
        <SonC msg={this.state.message}/>
      </div>
    )
  }
}
```
#### 9.2 props说明
1. props是只读对象（readonly）
- 根据单向数据流的要求，子组件只能读取props中的数据，不能进行修改
- this.props.msg = 'new msg'  // 不可以，不可直接进行修改
2. props可以传递任意数据
- 数字、字符串、布尔值、数组、对象，函数、JSX模板
2.1 数组
```javascript
state = {
  list: [1,2,3],
  userInfo: {
    name: 'cp'
  }
}
getMsg = () => {
  console.log('父组件中的函数')
}
<div>我是函数子组件, 
  {props.list.map(item => <p>item</p>)}
  {props.userInfo.name}
  <button onClick={props.getMsg}> 触发父组件传入的函数 </button>
</div>

<SonF 
  list={this.state.list} 
  msg={this.state.message}
  getMsg={this.getMsg}
  child={<span>this is a span</span>}
/>
```

#### 9.3 父传子-props的解构
```javascript
function Son(props) {  // 也可以在这里进行解构  function Son( {list, userInfo, getMsg, child} ) { 
  // props是一个对象，里面存着通过父组件传入的所有数据
  // 解构赋值可以
  const {list, userInfo, getMsg, child} = = props
  return (
    <div>我是函数子组件, 
      {props.list.map(item => <p>item</p>)}
      {props.userInfo.name}
      <button onClick={props.getMsg}> 触发父组件传入的函数 </button>
    </div>
  )
}
```

#### 9.4 子传父
- 子传父：子组件调用父组件传递过来的函数，并且把想要传递的数据当成函数的实参传入即可

```javascript

function Son(props) {
  const { getSonMsg } = props
  function clickHandler () {
    const sonMsg = '这是来自子组件的数据'
    getSonMsg(sonMsg)
  }
  return (
    // 2. 子组件调用父组件函数，并将数据通过参数传递
    <div> this is son<button onClick={ () => getSonMsg('这里是来自于子组件中的数据') }></button> </div>
    // 3. 将函数提取出去
    <div> this is son<button onClick={ clickHandler }></button> </div>
  )
}

class App extends React.Component {
  // 准备数据
  state = {
    list: [1,2,3]
  }
  // 1. 父组件中准备一个函数传给子组件
  getSonMsg = (sonMsg) => {
    console.log(sonMsg);
  }
  render() {
    return (
      <div>
        <Son getSonMsg={this.getSonMsg  }/>
      </div>
    )
  }
}
```

#### 9.5 兄弟组件间的通信
- 核心思路: 通过状态提升机制，利用共同的父组件实现兄弟通信
- 其中一个子组件将数据传给父组件，父组件再传给子组件
```javascript
import React from 'react'
// 目标：将 B 组件中的数据传给A
// 技术方案：
// 1. 先把B中的数据通过子传父 传给App
// 2. 再把App接收到的Son中的数据，通过父传子传给A
function SonA(props) {
  return {
    <div>this is A {props.sendAMsg}</div>
  }
}
function SonB(props) {
  const bMsg = '这里是来自于B组件中的数据'
  return {
    <div>this is B <button onClick={ () => props.getBMsg(bMsg) }>发送数据</button> </div>
  }
}
class App extends React.Component {
  // 声明父传子的状态
  state = {
    sendAMsg: '测试一下父传子初始值'
  }
  // 声明一个传给B组件的方法
  getBMsg = (msg) => {
    console.log(msg)
    // 把msg数据交给sendAMsg
    this.setState({
      sendAMsg: msg
    })
  }
  render () {
    return (
      <div>
        <SonA sendMsg={this.state.sendAMsg}/>
        <SonB getBMsg={this.getBMsg}/>
      </div>
    )
  }
}
```
#### 9.6 跨组件通信Context
- Context提供了一个无需为每层组件手动添加props,就能在组件间进行数据传递的方法
- 实现步骤
1. 创建 Context 对象，导出 Provider 和 Consumer 对象
`const { Provider, Consumer } = createContext()`
2. 使用 Provider 包裹根组件提供数据
```
<Provider value={this.state.message}>
  <!-- 根组件 -->
</Provider>
```
3. 需要用到数据的组件使用 Consumer 包裹获取数据
```
<Consumer>
  <value => /* 基于 context 值进行渲染 */
</Consumer>
```

- 注意
>App -> A -> C
>App数据 -> c
1. 上层组件和下层组件关系是相对的，只要存在就可以使用，通常我们都会通过 app 作为数据提供方
2. 这里涉及到的语法都是固定的，有两处，提供的位置 value 提供数据，获取的位置 {value => 使用value做什么都可以}
3. 导入 createContext 方法并执行，结构提供者和消费者

#### 9.7 组件阶段小练习
```javascript
import React from 'react'


// 渲染列表
function ListItem ({item,delItem}) {
  return {
    <>
      <h3>{item.name}</h3>
      <p>{item.price}</p>
      <p>{item.info}</p>
      // 父组件传递过来的方法
      <button onClick={() => delItem(item.id)}></button>
    </>
  }
}

// 数据提供者 渲染ListItem组件 App-ListItem
// 先不抽离组件 完成基础渲染之后再去抽离
class App extends React.Component {
  state = {
    list: [
      {id: 1, name: '超级好几', price: 10.8, info: '开业大吉'},
      {id: 2, name: '超级好几', price: 34.8, info: '开业大吉'},
      {id: 3, name: '超级好几', price: 14.8, info: '开业大吉'}
    ]
  }
  // 给子组件传递的函数
  delItem = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }
  render () {
    return {
      <div>
        {this.state.list.map(item => <ListItem key={item.id} item={item} delItem={this.delItem} />)}
      </div>
    }
  }
}
export default App
```
### 10 组件进阶
#### 10.1 特殊的children属性
children属性是什么：
- 表示该组件的子节点，只要组件内部有子节点，props中就有该属性
children可以是什么：
1. 普通文本
2. 普通标签元素
3. 函数
4. JSX

#### props校验-场景和使用
- 对于组件来说，props是由外部传入的，其实无法保证组件使用者传入什么格式的数据，如果传入的数据格式不对，就有可能导致组件内部错误，有一个点很关键--组件的使用者可能报错了也不知道为什么
- react 中规则校验不是内置的，所以需要额外安装包

1. 实现步骤
a. 安装属性校验包：yarn add prop-types
b. 导入 prop-types 包
c. 使用 组件名.propTypes = {} 给组件添加校验规则

核心代码
```javascript
// PropTypes中有各种各样内置的校验规则
import PropTypes from 'prop-types'
const List = props => {
  const arr = props.colors
  const lis = arr.map( (item,index) => <li key={index}> {item.name}</li> )
  return <ul>{lis}</ul>
}
List.propTypes = {
  colors: PropTypes.array  // 限定 colors 为数组，否则没有 map 属性
}
```
#### props校验-规则说明
- 四种常见结构
1. 常见类型: array,bool,func,number,object,string
2. react元素类型: element
3. 必填项: isRequired
4. 待定的结构对象: shape({})
- 核心代码
```javascript
// 常见类型
optionalFunc: PropTypes.func
// 必选
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithShape: PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number
})
```
#### props校验-默认值
- 通过 defaultProps 可以给组件的props设置默认值，在未传入 props 的时候生效
1. 函数组件使用默认值
```javascript
function List(props) {
  return  {
    <div>
      此处展示 props 的默认值：{props.pageSize}
    </div>
  }
}
// 设置默认值
List.defaultProps = {
  pageSize: 10
}
// 不传入 pageSize 属性
<List />
```
- a. 使用 defaultProps
- b. 使用函数参数默认值（推荐）
- 注意：函数组件，新版的 react 已经不再推荐使用 defaultProps 来添加默认值，而是推荐函数参数默认值来实现
```javascript
function List({pageSize = 10}) {
  return (
    <div>
      此处展示 props 的默认值：{props.pageSize}
    </div>
  )
}
```

2. 类组件使用默认值
- a. 使用defalutProps
- b. static类静态属性定义
```javascript
import PropTypes from 'prop-types'
class Test extends React.Component {
  // 方式b(推荐)
  static defaultProps = {
    pageSize: 10
  }
  render () {
    return (
      <div>{this.props.pageSize}</div>
    )
  }
  // 方式a
  // Test.defaultProps = {
  //   pageSize: 10
  // }
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Test pageSize={20} />
      </div>
    )
  }
}
```
### 11. 组件生命周期
- 从被创建到挂载到页面中运行起来，再到组件不用时卸载的过程。注意，只有类组件才有生命周期
- 类组件需要实例化，函数组件不需要
1. 挂载时
constructor
render
componentDidMount
2. 更新时
render
componentDidUpdate
3. 卸载时
componentWillUnmount

- 其他生命周期在业务中不常用

#### render节点
- render 阶段要保持纯净，不能做ajax等请求，有可能导致重复渲染
#### commit阶段
- 可以使用dom，安排更新

#### 11.1 挂载阶段
- 挂载阶段组件执行的钩子函数和执行时机
  - constructor, render, componentDidMount
  - constructor: 创建组件时，最先执行，初始化的时候只执行一次
    - 作用：1.初始化state; 2.创建Ref; 3.使用bind解决this指向问题
  - render: 每次组件渲染都会触发
    - 作用：渲染 UI(注意不能在里面调用 setState()，调用setState就会引起render，然后又调用setState，无限循环)
  - componentDidMount: 组件挂载（完成DOM渲染）后执行，初始化的时候执行一次
    - 作用：1.发送网络请求; 2.DOM操作

```javascript
import React from 'react'

class App extends React.Component {
  // 执行顺序1
  constructor() {
    super()
    console.log('constructor')
  }
  state = {
    count: 0
  }
  clickHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  // 执行顺序3
  componentDidMount() {
    console.log('componentDidMount')
  }
  // 执行顺序2
  render() {
    console.log('render')
    return (
      <div>
      this is div 
      <button onclick={this.clickHandler}>{this.state.counter}</button>
      </div>
    )
  }
}
export default App
```
#### 11.2 更新阶段
- 组件更新阶段的钩子函数和执行时期
- render, componentDidUpdate
- render: 每次组件渲染都会触发
  - 作用：渲染UI(与挂载阶段是同一个 render)
- componentDidUpdate: 组件更新后（DOM渲染完毕）
  - 作用：DOM操作，可以获取到更新后的DOM内容，不要直接调用 setState

#### 11.2 卸载阶段
- componentWillUnmount
  - 作用：关闭定时器

- 如果数据是组件的状态需要去影响视图，则定义在 state 中
- 而如果我们需要的数据状态不和 视图绑定，则定义成一个普通的实例属性就可以
- state中尽量保持精简

#### Ant Design
- 开源设计框架

### Hooks
- Hooks的本质：一套能使函数组件更强大，更灵活的“钩子”
  - 钩子就是在某个时机下自动执行
- 背景
  - 先前的函数组件是不可以有自己的状态的，为了让函数组件可以用自己的状态，所以有了hooks
  - hooks只能在函数组件中使用
- hooks解决了什么问题
  - 1. 组件的状态逻辑复用
  - 2. class组件自身的问题

#### useState
- useState为函数组件提供状态（state）
- 使用步骤
  - 1. 导入 useState 函数，react
  - 2. 执行这个函数并传入初始值，必须在函数组件中
  - 3. [数据，修改数据的方法]
  - 4. 使用数据，修改数据
```javascript
import { useState } from 'react'
function App() {
  const [const, setCount] = useState(0)
  return (
    <div>
      <button onClick={ ()=> setCount(count+1)}> {count} </button>
    </div>
  )
}
```
- 状态的读取和修改
`const [count, setCount] = useState(0)`  
- 1. useState 传过来的参数，作为 count 的初始值
- 2. [count, setCount] 的写法是解构赋值，所以useState是一个数组
  - 名字可以自定义，保持语义化
  - 顺序可以换嘛？不可以
- 3. setCount(基于原来的值计算得到新的值)
- 4. count 和 setCount 是一对，是绑在一起的，setCount只能用来修改对应的count值

- 组件的更新
  - 当调用 setCount 的时候，更新过程
  - 首次渲染
    - 首次被渲染的时候，组件内部的代码会被执行一次
    - 其中useState也会跟着执行，这里重点注意：初始值只在首次渲染时生效
- 1. app组件会再次渲染，这个函数会再次执行
- 2. useState 再次执行，得到的新的count值不是0，而是修改后的1，模板会用新值渲染
重点一句话，useState初始值只在首次渲染时生效，后续只要调用setCount整个app中代码都会执行，此时的count每次拿到的都是最新值

- 使用规则
1. useState函数可以执行多次，每次执行相互独立，每调用一次为函数组件提供一个状态
2. useState只能出现【在函数组件中】，不能嵌套在 if/for/其他函数 中，可以通过开发者工具查看 hooks 状态
```javascript
let num = 1
function List() {
  num++
  if(num/2 === 0) {
    const [name, setName] = useState('cp')
  }
  const [list, setList] = useState() 
}
// 每个 hook 的顺序不是固定的，这是不可以的
```

#### useEffect
- 函数副作用：对于React组件来说，主作用是根据数据（state/props）渲染UI，除此之外都是副作用，比如手动修改DOM
- 常见的副作用
  - 1. 数据请求 ajax 发送
  - 2. 手动修改 dom
  - 3. localStorage操作
  - useEffect函数的作用就是为 react函数组件提供副作用处理的

```javascript
// 纯函数，只涉及自己的变量
function getNum(a,b) {   
  return a + b
}

// 非纯函数，包含副作用
count = 0
function getNum(a,b) {
  count++   // 涉及到别的变量，有了副作用
  return a + b
}
```
- useEffect实例
```javascript
// 在修改数据之后，把count值放到页面标题中，做了dom操作，脱离了当前函数
// 1. 导入 useEffect 函数
// 2. 在函数组件中执行 传入回调 并且定义副作用
// 3. 当我们通过修改状态更新组件时，副作用也会不断执行
import {useState, useEffect} from 'react'
function App() {
  const {count, setCount} = useState(0)
  useEffect( ()=> {
    // 定义副作用
    document.title = count
  })
  retnrn (
    <div>
      <button onClick={ ()=>setCount(count + 1) }> {count} </button>
    </div>
  )
}
```
#### 依赖项控制时机
1. 默认状态（无依赖项）
  -  组件初始化的时候先执行一次，等到每次数据修改组件更新时再次执行
2. 添加空数组
  - 组件只在首次渲染时执行一次
```javascript
useEffect( ()=>{
  console.log('副作用执行了')
})
```
3. 添加特定依赖项
  - 副作用函数在首次渲染时执行，在依赖项发生变化时重新执行
```javascript
function App() {
  const {count, setCount} = useState(0)
  const {name, setName} = useState('sz')
  useEffect( ()=> {
    console.log('副作用执行了')
    document.title = count
    console.log(name)  // name 没有在下面一行的依赖数组中，会报错
  }，[count])          // 修改了 count 的时候，副作用会执行，修改 name 不会
  // 此时什么时候会执行副作用的函数？
    // 1. 初始化 + count/name 被修改时都会执行
  return (
    <>
      <button onClick={()=>{setCount(count+1)}}> {count} </button>
      <button onClick={()=>{setName('cp')}}> {name} </button>
    </>
  )
}
```
- 组件初始化的时候执行一次，依赖的特定项发生变化会再次执行
4. 注意事项
- useEffect回调函数中用到的数据（比如count）就是依赖项，就应该出现在依赖项数组中，如果不添加依赖项就会有bug出现
- 某种意义上，hook的出现，就是想不用生命周期概念也可以写业务代码

#### hook小练习
1. useState
- 需求：定义一个 hook 函数，实现获取滚动距离 Y    
  - const [y] = useWindowScroll()
```javascript
// useWindowScroll.js
import { useState } from 'react'
export function useWindowScroll() {
  const [y,sety] = useState(0)  // sety是用来操纵y的  
  // 在滚动的时候，不断获取滚动值，然后交给y
  window.addEventListener('scrooll', ()=>{
    const h = document.documentElement.scrollTop
    sety(h)
  })
  return [y]
}
```
```javascript
// App.js
import { useWindowScroll } from './hooks/useWindowScroll'
function App () {
  const [y] = useWindowScroll()
  return (
    <div style={{ height: '12000px'}}>
      {y}
    </div>
  )
}
```

2. useEffect
- 需求：自定义hook函数，可以自动同步到本地 localStorage
  - const [message, setMessage] = useLocalStorage(defaultValue)
  - message可以通过自定义传入默认初始值
  - 每次修改 message 数据的时候都会自动往本地同步一份
```javascript
// useLocalStorage.js 
imoprt { useEffect, useState } from 'react'
export default useLocalStorage(key, defaultValue) {
  const [message, setMessage] = useState(defaultValue)
  // 每次只要message变化，就会自动同步到本地 ls
  useEffect( ()=> {
    window.localStorage.setItem(key, message)
  },[message,key])

  return [message, setMessage]
}
```

```javascript
// App.js
import { useLocalStorage } from './hooks/useLocalStorage'
function App() {
  const [message, setMessage] = useLocalStorage('hook-key','坚果')
  setTimeout( ()=> {
    setMessage('change')
  })
  return (
    <div style={{height: '120000px'}}>
      {message}
    </div>
  )
}
```

### 12. hooks进阶
#### useState回调函数的参数
- 使用参数
  - 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
  - 如果初始 state 需要通过计算才能获取，则可以传入一个函数，在函数中计算并返回初始的state，此函数只在初始渲染时被调用
- 语法
  - const [name, setName] = useState( ()=>{// 编写计算逻辑  return '计算之后的初始值'} )
    - 如果计算量比较大，就是用箭头函数，然后返回一个函数；
    - 否则直接返回一个值或者一个表达式
```javascript
import { useState } from 'react'
// 函数组件

function getDefaultValue() {
  for(let i = 0; i < 1000; i++) {

  }
  return '10'
}

function Counter(props) {
  const {count, setCount} = useState(()=>{
    // 只要无法直接确定，需要通过一定的操作才能获取，就可以理解为计算
    // 循环遍历一万条数据才能确定这里的初始值是什么

    return getDefaultValue()
  })
  return (
    <button onClick={()=>setCount(count+1)}> {count} </button>
  )
}
function App() {
  return(
    <div>
      <Counter count={10} />
      <Counter count={20} />
    </div>
  )
}
```
- 模拟组件的生成于销毁
```javascript
import { useState } from 'react'
function Test() {
  useEffect( ()=>{
    let timer = setInterval( ()=> {
      console.log('定时器执行了')
    }，1000)
    return () => {
      // 清除副作用，只需要在 useEffect 的末尾再定义个一个函数
      // useEffect的执行时机，永远在 dom 更新之后 
      // 清理的动作
      clearInterval(timer)
    }
  }, [])
  return (
    <div>this is test</div>
  )
}
function App() {
  const {flag, setFlag} = useState(true)
  return (
    <div>
      {flag ? <Test /> : null}
      <button onClick={ ()=>setFlag(!flag) }> switch </button>
    </div>
  )
}
```
#### useEffect发送网络请求
- 类组件如何发送网络请求
  - 在生命周期钩子函数 componentDidMount 中执行
- 执行时机：在初始化的时候，dom渲染完毕时只执行一次
- useEffect
  - 1. 不加依赖项 - （初始化+重新渲染）
  - 2. 加空数组 - 初始化执行一次 （发送请求应该选择这一种）
  - 3. 加特定的依赖项[count, name] - 首次执行+任意一个变化执行
- 使用场景
  - 如何在 useEffect 中发放网络请求，并且封装 async await 操作
- 语法要求
  - 不可以直接在 useEffect 的回调函数外层直接包裹 await, 因为异步会导致清理函数无法直接返回

```r
useEffect(async ()=>{
  const res = await axios.get('http://baidu.com')
  console.log(res)
}, [])
// 正确写法
// 在内部单独定义一个函数，然后把这个函数包装成同步
useEffect(()=>{
  async function fetchData() {
    const res = await axios.get('http://baidu.com')
    console.log(res)
  }
})
```
- 封装网络请求-axios

```r
import { useEffect } from 'react'
function App() {
  useEffect( ()=> {   // 不能在这里添加 async
    // 发送请求
    async function loadData() {
      const res = await fetchData('http://baidu.com')
      console.log(res)
    }
    loadData()
  }, [])
}
```
- 封装网络请求-fetch
```r
function App() {
  useEffect( ()=> {
    // 发送请求
    function loadData() {
      fetch('http://baidu.com').then(
        response => response.json()
      ).then(data => console.log(data))
    }
    loadData()
  }, [])
  return (
    <div>
    </div>
  )
}
```

#### useRef
- 在函数组件中获取真实的 dom 元素对象或者是组件对象
- 使用步骤
  - 1. 导入 useRef 函数
  - 2. 执行 useRef 函数并传入null，返回值为一个对象，内部有一个 current 属性存放拿到的dom对象（组件实例）
  - 3. 通过 ref 绑定要获取的元素或者组件

- 获取 dom
```r
import { useEffect, useRef } from 'react'

// 组件实例  类组件，函数组件没有实例
// dom 对象，标签
class TestC extends React.Component{
  state = {
    name: 'test name'
  }
  getName = () => {
    return 'this is child Test'
  }
  render() {
    return (
      <div>我是类组件</div>
    )
  }
}
function App() {
  const testRef = useRef(null)
  const h1Ref = useRef(null)

  useEffect(()=>{
    console.log(testRef.current)
    console.log(h1Ref.current)
  }, [])

  return (
    <div>
      <TestC ref={testRef} />
      <h1 ref={h1Ref}>this is h1</h1>
    </div>
  )
}
```

#### 在hook下实现跨组件通信--useContext
- 使用步骤
  - 1. 使用 createContext 创建 Context 对象
  - 2. 在顶层组件通过 Provider 提供数据
  - 3. 在底层组件通过 useContext 函数获取数据
```r
import React, {createContext, useContext, useState} from 'react'

const Context = createContext()  // 或者去掉上面的createContext，然后 import Context from './context'
function ComA() {
  const count = useContext(Context)
  return (
    <div>
      this is ComA
      <br />
      app传过来的数据为：{count}
      <Comc />
    </div>
  )
}
function ComC() {
  const count = useContext(Context)
  return (
    <div> 
      this is ComC
      <br />
      app传过来的数据为：{count}
    </div>
  )
}
function App() {
  const [count, setCount] = useState(20)
  return (
    <Context.Provider value={count}>    // 这里可以提取到 index.js 中
      <div>
        <ComA />
        <button onClick={()=>{setCount(count+1)}}></button>
      </div>
    </Context.Provider>
  )
}
```
- 结构: App -> ComA -> ComC

#### 将useContext封装出去
- 步骤
  - 1. 调用 createContext 方法
  - 2. 通过顶层组件包裹一下 Context.Provider
  - 3. 底层组件 useContext(createContext 返回的对象)
```javascript
import { createContext } from 'react'
const Context = createContext()
export default Context
```

- context如果要传递的数据，只需要在整个应用初始化的时候传递一次就可以
- 就可以选择在当前文件里做数据提供

- 如果context需要传递数据并且将来还需要在对数据做修改，底层组件也需要跟着一起变
- 就可以写到 app.js

### react-router
- 安装 router 
  - yarn add react-router-dom@6  -- v6版本

```javascript
// Home.js
// 定义组件
function Home() {
  return (
      <div> Home </div>
  )
}
export default Home
```


```javascript
// App.js
// 引入
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './Home'
import About from './About'

// 进行路由配置
function App() {
  return (
    // 声明当前要使用一个非哈希模式的路由
    <BrowserRouter>
      // 指定跳转的组件，to用来配置路由地址
      <Link to="/"> 首页 </Link>
      <Link to="about"> 关于 </Link>
      // 路由出口，路由对应的组件会在这里进行渲染
      <Routes>
        // 指定路径和组件的对应关系，path代表路径，element代表组件，成对出现，path->element
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
export default App 
```

#### 核心组件-BrowserRouter
- 作用：包裹整个应用，一个React应用只需要使用一次
- 两种常用的 Router： HashRouter 和 BrowserRouter
  - HashRouter： 使用URL的哈希值实现，路径上会多一个 #
  - BrowserRouter(推荐)：使用H5的history.pushState API实现

#### Link
- 作用：用于指定导航链接，完成路由跳转
- 语法说明：组件通过 to 属性指定路由地址，最终会渲染为 a 链接元素
  - <Link to="/path"> 页面1 </Link>

#### 核心组件-Routes
- 作用：提供一个路由出口，满足条件的路由组件会渲染到组件内部
```javascript
<Routes>
  // 满足条件的路由组件会渲染到这里
  <Route />
  <Route />
</Routes>
```

### 编程式导航
- 通过 js 编程的方式进行路由页面跳转，比如从登录跳转到关于页
- 语法说明
  - 1. 导入 useNavigate 钩子函数
  - 2. 执行钩子函数得到跳转函数
  - 3. 执行跳转函数完成跳转
- 注意：如果在跳转时不想添加历史记录，可以额外添加参数 replace 为 true
```javascript
// 1. 导入 useNavigate
import { useNavigate } from 'react-router-dom'
function Login() {
  // 2. 执行 useNavigate 得到一个跳转函数
  const navigate = useNavigate()  // 变量存放的是一个跳转函数
  // 跳转到关于页
  function goAbout() {
    // 3. 调用跳转函数传入目标路径  
    navigate('/about')  // 不添加历史记录
    navigate('/about', {replace: true})  // 不添加历史记录
    navigate('/about?id=1001', {replace: true})
  }
  return (
    <div>
      login
      <button onClick={goAbout}></button>
    </div>
  )
}
```

#### 跳转携带参数
- 1. searchParams传参
  - 传参：navigate('/about/1001'); 
  - 取参：let [params] = useSearchParams(); let id = params.get('id')

```javascript
import { useSearchParams } from 'react-router-dom'
function About() {
  const [ params ] = useSearchParams()  // 返回一个数组
  // params是一个对象，对象里有一个 get 的方法
  // 用来获取对应的参数
  // 把参数的名称作为 get 方法的实参传过来；参数链接为：/about?id=1001
  let id = params.get('id') 
  // 如果有两个参数；参数链接为：/about?id=1001&name=lqj
  let name = params.get('name')
  return (
    <div>about 得到的参数id值为{id}</div>
  )
}
```

- 2. params传参 
  - 传参：navigate('/about/1001')
  - 取参：let params = useParams(); let id = params.id
- 注意：这种方式需要在 path路径的地方补充一个占位符号
  - `<Route path="/about/:id" element={<About />}> </Route>`

#### 嵌套路由的实现
- 代码实现
  - 1. App.js 定义嵌套路由声明
  - 2. Layout.js 使用 <Outlet /> 指定二级路由出口

```javascript
// Layout.js
function Layout(){
  return (
    <div>
      layout
    </div>
  )
}
export default layout
```
- 主文件
```r
// App.js

import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Login from './Login'
import Board from './Board'
import Article from './Article'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          // 定义二级路由嵌套
          <Route path="board" element={<Board />}></Route>
          // 默认二级 添加 index 属性，把它自己的 path 干掉
          <Route index  element={<Board />}></Route>
          <Route path="article" element={<Article />}></Route>
        </Route>
        <Route /path="/login" element={<Layout />}></Route>
        // 当所有路径都没有匹配时渲染此路由,404路由
        <Route path="*" element={<NotFount />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
```

#### 404路由配置
- 场景：当所有的路径都没有匹配的时候显示
- 语法说明：在各级路由的最后添加 * 号路由作为兜底
  - `<Route path="*" element={<NotFount />} />`

### 12.mobx
- 一个可以和 React 良好配合的集中状态管理工具
- mobx 和 react 的关系，相当于 vuex 和 vue
- 同类工具还有
  - redux
  - dva
  - recoil
- 优势
  - 简单，编写无模板的极简代码来精确描述你的意图(原生js)
  - 轻松实现最优渲染，依赖自动追踪最小渲染优化
  - 架构自由，可移植，可测试  

#### mobx环境配置
- mobx是一个独立的响应式的库，可以独立于任何UI框架而存在，但通常把它和React来绑定使用。用 Mobx 来做响应式数据建模，React作为UI视图框架渲染内容。
- 配置方面我们需要三个部分：
  - 1. 一个通过 create-react-app 创建好的react项目环境
  - 2. mobx本身
  - 3. 一个链接 mobx 和 react 的中间部件
- 1. 使用 create-react-app初始化react项目
  - `npx create-react-app mobx-react-app`
- 2. 安装 mobx 和 mobx-react-lite
  - `yarn add mobx-react-lite`  
- 3. src目录下创建一个新的文件夹 store，创建一个新文件 counter.js

- 4. 编写第一个 mobx store小案例
- 实现步骤 
  - 1. 定义数据状态(state)
  - 2. 数据响应式处理
  - 3. 定义 action 函数(修改数据)
  - 4. 实例化并导出实例

```javascript
import { makeAutoObservable } from 'mobx'
class CounterStore {
  // 定义数据
  count = 0
  constructor() {
    // 响应式处理
    makeAutoObservable(this)
  }
  addCount = () => {
    // 定义 action 函数 
    this.count++
  }
}
// 实例化
const counterStore = new CounterStore()
export {counterStore}
```

- react 中操作
- 实现步骤
  - 1. 导入 store 实例
  - 2. 使用 store 中的数据
  - 3. 修改 store 中的数据
  - 4. 让组件视图响应数据变化 
```javascript 
// App.js
// 引入定义好的 counterStore
import counterStore from './store'
// 引入更新视图的关键方法，连接mobx和react的中间件
import { observer } from 'mobx-react-lite'
function App() {
  return (
    <div>
      // 使用数据，并点击更新数据
      <button onClick={counterStore.addCount}>
        {counterStore.count}
      </button>
    </div>
  )
}
// 使用 observer 方法包裹组件，使其响应数据变化
export default observer(App)
```
#### mobx-computed
- 实现步骤
  - 1. 声明一个存在的数据
  - 2. 定义 get 计算属性
  - 3. 在 makeAutoObservable 方法中标记
```javascript
import {computed, makeAutoObservable} from 'mobx'
class CounterStore {
  list = [1,2,3,4,5]
  constructor() {
    makeAutoObservable(this, {
      filterList: computed
    })
  }
  // 计算属性
  get filterList() {
    return this.list.filter(item => item > 2)
  }
  // 修改源数据
  addList = () => {
    this.list.push(6,7,8)
  }
}
```
#### mobx模块化
- 实现步骤
  - 1. 拆分Count和List模块，每个模块定义自己独立的 state/actions
  - 2. 在 store/index.js中导入拆分之后的模块，进行模块组合
  - 3. 使用 React 的 useContext 机制（跨组件通信），导出 useStore 方法，供业务组件统一使用

- store/index.js文件中编写代码

```javascript
// 组合子模块
// 封装统一导出的供业务使用的方法
import {ListStore} from './list.Store'
import {CounterStore} from './counter.Store'
// 1. 声明一个 rootStore
class RootStore {
  constructor() {
    // 对子模块进行实例化操作
    // 将来实例化根 store 的时候
    // 根 store 有两个属性，分别是 counterStore 和 listStore
    // 各自对应的值就是我们导入的子模块实例对象
    this.counterStore = new CounterStore()
    this.listStore = new ListStore()
  }
}

// 实例化操作
const rootStore = new RootStore()
// 使用 react, context 机制，完成统一方法封装
// 核心目的：让每个业务组件可以通过统一一样的方法获取 store 中的数据
// 方便调试是一个额外的补充的功能
// Provider value = {传递的数据}
// 查找机制：useContext，优先从 Provider value找，
// 如果找不到，就会找 createContext方法传递过来的默认参数
const context = React.createContext(rootStore)
// 这个方法作用：通过 useContext 拿到 rootStore 实例对象，然后返回
// 只要在业务组件中，调用 useStore() -> 得到 rootStore
const useStore = () => React.useContext(context)
export { useStore }
```
- 封装方法的使用
```javascript
import { observer } from 'mobx-react-lite'
import { useStore } from './store/index'
function App() {
  const rootStore = useStore()
  // 解构方式，注意解构赋值到 store 实例对象就可以了，防止破坏响应式，用哪个store就解构哪一个
  const { counterStore } = useStore()

  console.log(rootStore);
  return (
    <div className="App">
      {rootStore.counterStore.count}
      <button onClick={rootStore.counterStore.addCount}> + </button>
      // 解构方式
      {counterStore.count}
      <button onClick={counterStore.addCount}> + </button>
    </div>
  )
}
// 包裹App
export default observer(App)
```

#### mobx 总结
1. 初始化 mobx 是怎样的？
- 声明数据 => 响应式处理 => 定义action函数 => 实例化导出 
2. mobx如何配合 react，需要依赖什么包？
- mobx-react-lite作为链接包，导出 observer 方法，包裹组件(只能和函数组件配合)
3. 模块化解决了什么问题？
- 维护性问题
4. 如何实现 mobx 的模块化？
- 按照功能拆分store模块，根据模块中组合子模块，利用 context 机制依赖注入

### pc项目笔记
- 技术
  - React官方脚手架 create-react-app
  - react hooks
  - 状态管理: mobx
  - UI组件库: antd v4 
  - ajax请求库: axios
  - 路由: react-router-dom 以及 history
  - 富文本编辑器: react-quill
  - css 预编译器: sass
