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
#### 开始
1. 项目初始化
2. 配置sass环境

#### 配置一级路由
- 安装路由：yarn add react-router-dom
- 在 pages 目录中创建两个文件夹，Login,Layout
- 分别在两个目录中创建 index.js 文件，并创建一个简单的组件后导出
- 在 App 组件中，导入路由组件以及两个页面组件
- 配置 Login 和 Layout 的路由规则
- App.js 文件中内容为
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
```
#### 组件库antd使用
- 安装 antd 组件库，yarn add antd
- 修改 src/App.css(也可以在index.js文件中引入)，在文件顶部引入 antd/dist/antd.css
  - @import 'antd/dist/antd.css'(旧版本有bug)
  - @import 'antd/dist/antd.min.css'(解决)
- 全局导入 antd 组件库的样式
- 导入 Button 组件
- 在 Login 页面渲染 Button 进行测试

#### craco插件配置，配置别名路径
- 目标：配置@路径简化路径处理
- CRA将所有工程化配置，都隐藏在了 react-scripts 包中，所以项目中看不到任何配置信息
- 如果要修改CRA的默认配置，游有以下几种方案：
  - 1. 通过第三方库来修改，比如 @craco/craco（推荐）
  - 2. 通过执行 yarn eject 命令，在package中能看到，释放 react-scripts 中的所有配置到项目中（不可逆，释放后不可回）
- 实现步骤
  - 1.安装修改 CRA 配置的包，yarn add -D @craco/craco 
  - 2.在项目根目录中创建craco的配置文件，craco.config.js，并在配置文件中配置路径别名
  - 3.修改 packag.json 中的脚本命令
  - 4. 重启项目，让配置生效


- craco.config.js文件中内容为
```javascript
// 添加自定义对于webpack的配置
const path = require('path')
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定，使用 @ 表示src文件所在路径
      '@': path.resolve(__dirname, 'src ')
    }
  }
}
```
- 修改 package.json 中的脚本命令, react-scripts 改为 craco插件配置

#### @别名路径提示
- 上述的 craco 使得 @ 表示路径生效，但是没有路径提示
- 实现步骤 
  - 1. 在项目根目录创建 jsconfig.json 配置文件
  - 2. 在配置文件中添加以下配置
```javascript
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
- vscode 会自动读取 jsconfig.json 中的配置，让vscode知道 @ 就是 src 目录

#### dev-tools调试工具
- google 浏览器安装 crx 文件

#### 登录模块开发
- react没有单文件组件，一般是一个【index.jsx/index.js】配合一个【index.scss】来组件一个组件模块

#### 搭建表单Form结构
- 1.打开 antd Form 组件文档
- 2.找到表单相关的代码
- 3.分析 Form 组件基本结构
- 4.调整 Form 组件结构和样式

#### 表单校验
- 1. 为 Form 组件添加 validateTrigger 属性，指定校验触发时机的集合
- 2. 为 Form.Item 组件添加name属性，这样表单校验才会生效
- 3. 为 Form.Item 组件添加 rules 属性，用来添加表单校验
- 综合之前的整个框架代码为
```javascript
import { Card, Form, Input, Checkbox, Button } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
// 创建函数组件
function Login() {
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt='' />
        {/* 登录表单 */}
        {/* 子项用到的触发事件，需要在Form中都声明一下才可以 */}
        <Form
          name="basic"
          initialValues={{
            remember: true 
          }}
          validateTrigger={[
            'onBlur',
            'onChange' 
          ]}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name='passward'
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                len: 6,
                message: '请输入6位密码',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item
            name='remember'
            valuePropName='checked'
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
```

#### 获取登录表单数据
- 1. 为 Form 组件添加 onFinish 属性，该事件会在点击登录按钮时触发
  - onFinishFailed 是对应的失败触发的事件
- 2. 创建 onFinish 函数，通过函数参数 values 拿到表单值
  - values是放置所有表单项中用户输入的内容
- 3. Form 组件添加 initialValues 属性，来初始化表单值

#### 登录axios统一封装处理
- 1. 创建 utils/http.js 文件
- 2. 创建 axios 实例，配置 baseURL，请求拦截器，响应拦截器
- 3. 在 utils/index.js，统一导出 http
```javascript
// utils/http.js

// 一般名称要么是 http.js，要么是 request.js
// 封装 axios
// 实例化 请求拦截器 响应拦截器
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})
// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码会触发该函数
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数
  // 对响应错误做点什么
  return Promise.reject(error)
})
export { http }
```
```javascript
// utils/index.js

// 统一管理文件 
// 先把所有的工具函数导出的模块在这里导入
// 然后再统一导出
import { http } from './http'
export {
  http
}
```
#### 配置登录Mobx
- 基于 mobx 封装管理用户登录的 store
- 新增 store/login.Store.js 文件并编辑内容
```javascript
// store/login.Store.js 文件内容

// login module 
import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class LoginStore {
  token = ''
  constructor() {
    // 响应式处理
    makeAutoObservable(this)
  }
  // 默认code为 246810
  getToken = async ({ mobile, code }) => {
    // 调用登录接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    // 存入 token
    this.token = res.data.token
  }
}
export default LoginStore
```
```javascript
// 把所有模块做统一处理
// 导出一个统一的方法 useStore
// login.Store.js

import React from 'react'
import LoginStore from './login.Store'
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    // ....
  }
}
// 实例化根
// 导出 useStore context
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)
export { useStore }
```
#### 登录后续业务处理
- 登录的函数
```javascript
async function onFinish(values) {
  console.log(values);
  // values是放置所有表单项中用户输入的内容
  // 登录
  await loginStore.getToken({
    mobile: values.username,
    code: values.password
  })
  // 跳转首页
  navigate('/', { replace: true })
  // 提示用户
  message.success('登录成功')
}
```
#### token的持久化
- 1. 创建 utils/token.js 文件
- 2. 分别提供 getToken/setToken/clearToken/isAuth 四个工具函数并导出
- 3. 创建 utils/index.js 文件, 统一导出 token.js 中所有的内容，来简化工具函数的导入
- 4. 将登陆操作中用到 token 的地方，替换为该函数
```javascript
// 封装ls存储token
const key = 'pc-key'

const setToken = (token) => {
  return window.localStorage.setItem(key, token)
}
const getToken = () => {
  return window.localStorage.getItem(key)
}
const removeToken = () => {
  return window.localStorage.removeItem(key)
}

export {
  setToken,
  getToken,
  removeToken
}
```

#### 请求拦截注入 token
- 把token通过请求拦截器注入到请求头中
  - 在请求发放之前，将token传入，一处配置，多处生效
```javascript
// 添加请求拦截器
http.interceptors.request.use((config) => {
  // if not login add token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
```

#### 路由鉴权
- 如果用户直接输入首页，强制用户跳转到登录页
- 1. 在 components 目录中，创建 AuthRoute/index.js 文件
- 2. 判断是否登录
- 3. 登录的，直接渲染相应页面组件
- 4. 未登录时，重定向到登录页面
- 5. 将需要鉴权的页面路由配置，替换为 AuthRoute 组件渲染

- 创建鉴权的组件
```javascript
// .src/components/AuthComponent.js
// 1. 判断 token 是否存在
// 2. 如果存在，直接正常渲染
// 3. 如果不存在，重定向到登录页

// 高阶组件：把一个组件当成另外一个组件的参数传入
// 然后通过一定的判断 返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

// 这里参数返回是函数/组件，所以是高阶组件
function AuthComponent ({children}) {
  const isToken = getToken()
  if (isToken) {
    // 有 token 返回正常子组件渲染
    return <>{children}</>
  } else {
    // 返回重定向组件
    return <Navigate to="/login" replace />
  }
}
// <AuthComponent>  <Layout /> </AuthComponent>
// 登录：<><Layout /></>
// 非登录：<Navigate to="/login" replace />
export {
  AuthComponent
}
```

- 更改 App.js 中的路由代码
```javascript
<Routes>
  {/* 创建路由path和组件对应关系 */}
  {/* Layout 需要鉴权处理 */}
  {/* 这里的Layout不一定不能写死，要根据是否登录进行判断  */}
  <Route path="/" element={
    <AuthComponent>
      <Layout />
    </AuthComponent>
  }></Route>
  {/* 不需要鉴权 */}
  <Route path="/login" element={<Login />}></Route>
</Routes>
```

#### Layout模块设计
- 使用 antd 搭建基础布局
- 1. 打开 antd/Layout 布局组件文档，找到示例：顶部-侧边布局-通栏
  - 使用 antd 的 Layout, Menu, Popconfirm 组件
- 2. 拷贝示例代码到我们的 Layout 页面中
- 3. 分析并调整页面布局

#### 二级路由配置
- 1. 在pages目录中，分别创建：Home(数据概览)、Article(内容管理)、Publish(发布文章) 页面文件夹
- 2. 分别在三个文件夹中创建 index.js 并创建基础组件后导出
- 3. 在 app.js 中配置嵌套子路由，在layout.js中配置二级路由出口
- 4. 使用 Link 修改左侧菜单内容，与子路由规则匹配实现路由切换

- 加二级路由之后，记得在页面处加出口设置(Outlet)  import { Outlet } from 'react-router-dom'
```javascript
// ./src/App.js
<Routes>
  {/* 创建路由path和组件对应关系 */}
  {/* Layout 需要鉴权处理 */}
  {/* 这里的Layout不一定不能写死，要根据是否登录进行判断  */}
  <Route path="/" element={
    <AuthComponent>
      <Layout />
    </AuthComponent>
  }>
    {/* 二级路由 */}
    <Route index element={<Home />}></Route>  {/* 默认组件 */}
    <Route path="article" element={<Article />} ></Route>
    <Route path="publish" element={<Publish />} ></Route>
  </Route>

  {/* 不需要鉴权 */}
  <Route path="/login" element={<Login />}></Route>

</Routes>
```

```javascript
// .src/pages/Layout/index.js
<Layout className="layout-content" style={{ padding: 20 }}>
  {/* 二级路由出口 */}
  <Outlet />
</Layout>
```

#### 路由跳转配置
- 使用 Link 来跳转

#### 菜单反向高亮
- 配置 Menu 中的 defaultSelectedKeys
- const { pathname } = useLocation() 获取路由参数信息，包括 hash,key,pathname,search,state

#### 获取用户数据
- 在 .src/store/ 下新建 user.Store.js 文件，并写获取用户数据的类，然后导出，在 store/index.js 文件中统一导出
```javascript
import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = () => {
    // 调用接口获取数据

  }
}
export default UserStore
```

- 每次数据变化之后需要重新连接一下，使用中间件 observer
  - import { observer } from 'mobx-react-lite'

#### 退出登录实现
- 使用 Popconfirm 组件
- 带 user 的 hook 函数，要么在函数组件中使用，要么在另一个hook函数中使用，其他地方不可以

#### token失效，401token实现
- 为了能在非组件环境中拿到路由信息，需要我们安装一个 history 包
- 在响应拦截器，超出 2xx 范围的状态码中处理
  - 对响应错误做点什么
- 登录后，在 Application 中修改token的值，这时候的token就是一个无效token，然后刷新再查看获取用户信息的接口，返回的就是401错误
- 主要是对 error.response 中的 status 做判断，等于数字 401 即失效

- 因为这里的处理是在组件之外，所以不能直接使用 useNavigate 
  - 方法1：使用 window.location.href = '/login'
  - 方法2：使用 v5 router，需要使用 history 和 react-router-dom 插件
    - 使用 Unstable_HistoryRouter as HistoryRouter 替换 App.js 中的 BrowserRouter

```javascript
// step1-方法2中先封装 history
import { createBrowserHistory } from "history";
const history = createBrowserHistory()
export { history }
```
- step2-使用 Unstable_HistoryRouter as HistoryRouter 替换 App.js 中的 BrowserRouter
```javascript
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
...
function App() {
  return (
    <HistoryRouter history={history}>
    </HistoryRouter>
  )
}
```
- step3-在 utils/http.js 中引入 history，并使用
```javascript
import { history } from './history'
...
// 调用
history.push('/login')
```
#### echarts的基础使用
思路：
1. 看官方文档，把 echarts 加入项目
  1.1 如何在 react 获取dom，useRef
  1.2 在什么地方获取 dom 节点，useEffect
2. 不抽离定制化的参数，先把最小化的demo跑起来
3. 按照需求，哪些参数需要自定义，抽象出来

#### 封装图表组件
- 新建 component/Bar/index.js 文件
- 封装通用的功能为组件，然后将可定制的作为参数，从父组件中传入

#### 内容管理，筛选区域搭建
- Card 面包屑导航

#### 表格区域结构
- 1. 通过哪个属性指定 Table 组件的列信息
- 2. 通过哪个属性指定 Table 数据
- 3. 通过哪个属性指定 Table 列表用到的 key 属性


#### 获取文章列表下拉框
```javascript
<Form.Item label="频道" name="channel_id">
  <Select
    placeholder="请选择文章频道"
    style={{ width: 120 }}
  >
    {channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
  </Select>
</Form.Item>

```
#### 渲染表格数据
- 1. 声明列表相关数据管理
- 2. 声明参数相关数据管理
- 3. 调用接口获取数据
- 4. 使用接口数据渲染模板

```javascript
// 如果异步请求函数需要依赖一些数据变化而重新执行
// 推荐把它写到内部
// 统一不抽离函数到外面，只要涉及到异步请求的函数，都放到 useEffect 内部
// 本质区别：写到外面每次组件更新都会重新进行函数初始化，本身就是一次性能消耗
// 而写到 useEffect中，只会在依赖项发生变化的时候，函数才会进行重新初始化
// 避免性能损失
useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setArticleData({
        list: results,
        count: total_count
      })
    }
    loadList()
  }, [params])
```

#### 渲染文章列表
```javascript
// 文章参数管理
const [params, setParams] = useState({
  page: 1,
  per_page: 10
})
/* 表单筛选功能实现 */
const onFinish = (values) => {
  const { channel_id, date, status } = values
  // 数据处理
  const _params = {}
  if (status !== -1) {
    _params.status = status
  }
  if (channel_id) {
    _params.channel_id = channel_id
  }
  if (date) {
    _params.begin_pubdate = date[0].format('YYYY-MM-DD')
    _params.end_pubdate = date[1].format('YYYY-MM-DD')
  }
  // 修改params数据，引起接口的重新发送 对于原来默认的，会将params原来的参数page和per_page整体覆盖
  // 通过解构就可以保持原来的值
  setParams({
    ...params,
    ..._params
  })
}
```
#### 分页器功能
#### 文章删除
#### 遍历跳转
```javascript

// 删除文章
const delArticle = async (data) => {
  await http.delete(`/mp/articles/${data.id}`)
  // 刷新一下列表
  setParams({
    ...params,
    page: 1
  })
}

// 编辑文章
const navigate = useNavigate()
const goPublish = (data) => {
  navigate(`/publish?id=${data.id}`)
}

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    width: 120,
    render: cover => {
      return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 220
  },
  {
    title: '状态',
    dataIndex: 'status',
    // render: data => formatStatus(data)
  },
  {
    title: '发布时间',
    dataIndex: 'pubdate'
  },
  {
    title: '阅读数',
    dataIndex: 'read_count'
  },
  {
    title: '评论数',
    dataIndex: 'comment_count'
  },
  {
    title: '点赞数',
    dataIndex: 'like_count'
  },
  {
    title: '操作',
    render: data => {
      return (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => goPublish(data)} />
          />
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => delArticle(data)}
          />
        </Space>
      )
    },
    fixed: 'right'
  }
]

<Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
<Table
  rowKey="id"
  columns={columns}
  dataSource={articleData.list}
  pagination={
    {
      pageSize: params.per_page,
      total: articleData.count,
      onChange: pageChange,
      current: params.page
    }
  }
  bordered
/>
</Card>

```
#### 发布文章
- 1. 使用Card, Form 组件搭建基本页面结构
- 2. 创建样式文件，对样式做出调整

- 将频道列表下拉单独提取到 store 中，并作为通用组件在各个页面中调用
```javascript
// .src/store/channel.Store.js
import { http } from '@/utils'
import { makeAutoObservable } from 'mobx'

class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  // article 和 publish 组件都需要使用到，应该将其提取到公共的 
  loadChannelList = async () => {
    const res = await http.get('/channels')
    this.channelList = res.data.channels 
  }
}

export default ChannelStore
```

```javascript
// .src/pages/Publish/index.js
const Publish = () => {
  const { channelStore } = useStore()
  return (
    <Form.Item
      label="频道"
      name="channel_id"
      rules={[{ required: true, message: '请选择文章频道' }]}
    >
      <Select placeholder="请选择文章频道" style={{ width: 400 }}>
        {channelStore.channelList.map(item => (
          <Option key={item.id} value={item.id}>{item.name}</Option>
        ))}
      </Select>
    </Form.Item>
  )
}
```

#### 上传封面实现
- 1. 为 Upload 组件添加 action 属性，指定封面图片上传接口地址
- 2. 创建状态 fileList 存储已上传封面图片地址，并设置为 Upload 组件的 fileList 属性值
- 3. 为 Upload 添加 onChange 属性，监听封面图片上传，删除等操作
- 4. 在 change 事件中拿到当前图片数据，并存储到状态 fileList 中

#### 控制封面数量
- 1. 创建状态 maxCount
- 2. 给 Radio 添加 onChange 监听单图、三图、无图的切换条件
- 3. 在切换事件中修改 maxCount 值
- 4. 只在 maxCount 不为零时展示 Upload 组件
- 5. 修改 Upload 组件的 maxCount(最大数量)，multiple(支持多图选择)属性

#### 控制最大上传数量
- 1. 修改 Upload 组件的 maxCount(最大数量) 属性控制最大上传数量
- 2. 控制 multiple(支持多图选择)属性 控制是否支持选择多张图片

- imgCount 大于0的时候显示上传组件
- imgCount 大于1的时候允许多选，多选的数量取决于 imgCount
```javascript
// ./src/pages/Publish/index.js
{imgCount > 0 && (
  <Upload
    name="image"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList
    action="http://geek.itheima.net/v1_0/upload"
    fileList={fileList}
    onChange={onUploadChange}
    multiple={imgCount > 1}
    maxCount={imgCount}
  >
    <div style={{ marginTop: 8 }}>
      <PlusOutlined />
    </div>
  </Upload>
)}
```

#### 发布文章
- 1. 给 Form 表单添加 onFinish 用来获取表单提交数据
- 2. 在事件处理程序中，拿到表单数据按照接口需要格式化数据
- 3. 调用接口实现文章发布，其中的接口数据格式为
```javascript
{
  channel_id: 1
  content: '<p> 测试 <p/>'
  cover: {
    type: 1, 
    images: ['http://test.com']
  },
  type: 1
  title: '测试文章'
}
```

#### 暂存图片列表实现
- 问题描述
  - 如果当前为三图模式，已经完成了上传，选择单图只显示一张，再切换到三图继续显示三张，该如何实现
- 实现思路
  - 在上传完毕之后通过ref存储所有图片，需要几张就显示，其实也就是把 ref 当做仓库，用多少拿多少
- 实现步骤
  - 1. 通过 useRef 创建一个暂存仓库，在上传完毕图片的时候把图片列表存入
  - 2. 如果是单图模式，就从仓库里取第一张图，以数组的形式存入 fileList
  - 3. 如果是三图模式，就把仓库里所有的图片，以数组的形式存入 fileList


#### 编辑文章-文案适配
- 1. 通过路由参数拿到文章 id
- 2. 根据文章 id 是否存在判断是否为编辑状态
- 3. 如果是编辑状态，展示编辑时的文案信息

#### 回显基础数据
```javascript
// ./src/pages/Publish/index.js
// 数据回填  id调用接口  1.表单回填 2.暂存列表 3.Upload组件fileList
const [form] = Form.useForm()
useEffect(() => {
  const loadDetail = async () => {
    const res = await http.get(`/mp/articles/${id}`)
    const data = res.data
    // 表单数据回填
    form.setFieldsValue({ ...data, type: data.cover.type })
    // 回填upload
    const formatImgList = data.cover.images.map(url => ({ url }))
    setFileList(formatImgList)
    // 暂存列表里也存一份
    cacheImgList.current = formatImgList
    // 图片type
    setImageCount(data.cover.type)
  }
  // 必须是编辑状态 才可以发送请求
  if (id) {
    loadDetail()
  }
}, [id, form])
```

#### 打包和预览
- 1. 在项目根目录下打开终端，输入打包命令：yarn build
- 2. 等待打包完成，打包生成的内容被放在根下的 build 文件夹中

#### 项目本地预览
- 1. 全局安装本地服务包 npm i -g serve，该包提供了 serve 命令，用来启动本地服务
- 2. 在项目根目录中执行命令 serve -s ./build 在 build 目录中开启服务器
- 3. 在浏览器中访问：http://localhost:5000/ 预览项目

#### 打包体积分析
- 1. 安装分析打包体积的包：yarn add source-map-explorer
- 2. 在 package.json 中的 scripts 标签中，添加分析打包体积的命令
- 3. 对项目打包：yarn build (如果已经打过包，可省略这一步)
- 4. 运行分析命令：yarn analyze
- 5. 通过浏览器打开的页面，分析图表中的包体积

#### CDN配置
- 通过 craco 来修改 webpack 配置，从而实现 CDN 优化
  - craco 是不破坏webpack配置基础上做优化 
- 编辑 craco.config.js
```javascript
// craco.config.js
const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
module.exports = {
  // webpack 配置
  webpack: {
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig 自动注入的 webpack 配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后 return 出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只在生产环境才配置
      whenProd( ()=> {
        webpackConfig.externals = {
          // 这里就是将 react 和 react-dom 这两个包提取出去，然后通过 cdn 引入
          // key: 需要不参与打包的具体的包
          // value: cdn文件中，挂载于全局的变量名称，为了替换之前在开发环境下
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        cdn = {
          js: [
            // 这里的内容会渲染到下面 script 中
            'https://cdn.boot.../react.production.min.js',
            'https://cdn.boot.../react.production.min.js',
          ],
          css: []
        }
      })
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      if( isFound ) {
        // 找到了 HtmlWebpackPlugin 的插件
        match.userOptions.cdn = cdn
      }
      return webpackConfig
    }
  }
}
```
- 加载第三方 CDN 连接
```javascript
// public/index.html
<body>
  <div id="root">
  </div>
  {/* 找到上面配置文件中 cdn 中的内容，遍历并注入到这里，渲染到script */}
  <% htmlWebpackPlugin.options.cdn.js.forEach(cdnURL => { %>
    <script src="<%= cdnURL %>"></script>
  <% }) %>
</body>
```

#### 路由懒加载
- 1. 在 App 组价中，导入 Suspense 组件
- 2. 在路由 Router 内部，使用 Suspense 组件包裹组件内容
- 3. 为 Suspense 组件提供 fallback 属性，指定 loading 占位内容
- 4. 导入 lazy 函数，并修改为懒加载方式导入路由组件

- Suspense 就是路由懒加载的时候

- 在 App.js 中编辑
```javascript
// App.js
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import { history } from './utils'

import './App.css'
import { AuthComponent } from '@/components/AuthComponent'
import { lazy, Suspense } from 'react'

// 按需导入组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            {/* 创建路由path和组件对应关系 */}
            {/* Layout需要鉴权处理的 */}
            {/* 这里的Layout不一定不能写死 要根据是否登录进行判断 */}
            <Route path='/' element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }>
              <Route index element={<Home />}></Route>
              <Route path='article' element={<Article />}></Route>
              <Route path='publish' element={<Publish />}></Route>
            </Route>
            {/* 这个不需要 */}
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
```