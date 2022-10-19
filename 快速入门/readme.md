
ref: https://www.bilibili.com/video/BV1tY411G7UP

### 简介与项目创建
- 项目创建 `npx create-react-app demo`
- 启动 `npm run start`

```javascript
// index.js 
import ReactDOM from 'react-dom'
import App from './App'    // 将 jsx 写入App.js文件
ReactDOM.render(
  <div>
    <h2>你好世界</h2>
    <input type="text" />
  </div>
)
```
- 为了将html提取出去，创建 App.jsx文件来存放 jsx 内容
```javascript
// App.jsx
import React from 'react'
// 类组件
const msg = 'hello world'
class App extends React.Component {
  render() {
    return {
      <div>
        <h2>你好世界</h2>
        <h2>{msg}</h2>    // 变量使用 {} 包裹
        <input type="text" />
      </div>
    }
  }
}
export default App
```
- 这样的话，index.js中的内容可以更改为
```javascript
import ReactDOM from 'react-dom'
import App from './App'    // 将 jsx 写入App.js文件
ReactDOM.render(
  <App />
  document.getElementById('root')
)
```

- 总结
1. 文件名可以是 jsx 或者 js, 不影响文件中的代码
2. 组件名称必须大写
3. JS中出现()代表其中想要写html
4. HTML中出现{}代表其中想要写js
5. 其实 export default 也可以写成 class 前面

### JSX语法

- js中for用于写循环，所以label里面为 htmlFor
- class使用 className 来替代
- 行内样式使用 {{}} 来包裹，因为变量一个花括号，然后样式又需要一个花括号包裹，所以是双括号
- 三元运算符与for循环
- react中的列表循环只有 map 可以使用，forEach没有返回值
- 通过安装插件，可以使用 rcc/rfc 来快速建立代码框架

```javascript
import React from 'react'
const msg = 'hello world'
let flag = true
export default class App1 extends React.Component {
  render () {
    return (
      <div>
        <h2>{msg}</h2>
        <hr />
        <label htmlFor="username"></label>  
        <input type="text" id="username" />
        <hr />
        <div className="box">盒子</div> 
        <hr />
        <div style="{{background: pink}}">内容1</div>
        <div style="{{background: flag ? 'pink' : 'skyblue'}}">内容2</div>
        <ul>
          {
            arr.map((item,index) => {
              return <li key={index}>{item}</li>
            })
          }
          // 简写
          {
            arr.map((item,index) => <li key={index}>{item}</li>)
          }
        </ul>
      </div>
     )
   }
 }
```

### 累加与setState
```javascript
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
        // num: this.state.num++ 不建议使用，尽量用setState更新值本身
      </div>
    )
  }
}
```

### state完整写法/setState的三种写法
```javascript
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
        <button onClick={this.addNum.bind(this)}> 按钮3-累加 </button>  {/* 使用 bind 修改 this 指向 */}
        <button onClick={()=>this.addNum()}> 按钮4-累加 </button>  {/* 使用 箭头函数 */}

      </div>
    )
  }
  addNum (aaa) {
    console.log(aaa);
    console.log(this.state.num);  // this为undefined
    this.setState({num: this.state.num+1})  // 通过 bind 修改this指向 
  }
}
```
### 传参和样式
```javascript
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
```

### 函数式组件
```javascript
import React from 'react'

// 写法1
export default function App5() {
  return (
    <div>App5</div>
  )
}
// 写法2
function App5 () {
  return <div>App5</div>
}
export default App5
// 写法3
const App = () => {
  return <div>App5</div>
}
export default App
```
- 函数式组件的特点
1. 函数式组件没有生命周期
2. 函数式组件没有 this
3. 函数式组件没有 state 状态

hooks: 
1. 使得函数式组件非常灵活
2. React官方提供的 hook
3. 开发人员自定义的 hook

钩子：一般来说钩子为函数

```javascript
import React from 'react'

let msg = 'hello'

export default function App6() {
  return (
    <>
      <h2>{msg}</h2>
      <button onClick={() => msg = 'hello world'}> 修改msg </button>  {/* 这里没办法修改，没有触发视图更新的东西 */}
    </>
  )
}
```

### 第一个hook,useState
```javascript
import { useState } from 'react'

function App7 () {
  // hook 只能用在组件函数中的最顶层
  const [msg, setMsg] = useState('hello world')
  // 累加
  const [num, setNum] = useState(1 )
  // console.log(xxx); 

  const fn = () => {
    setMsg('new hello world')
  }
  return (
    <>
      <h2>{msg}</h2>
      <button onClick={fn}>修改msg</button>
      <button onClick={() => setNum(num+1)}> 累加 </button>

    </>
  )
}
```
### 第二个hook,useEffect
- 使用 useEffect 实现函数组件中的生命周期
- 常用的vue生命周期：mounted,updated,beforeDestroy
- 常遇到的处理：数据请求,检测数据更新,垃圾回收
```javascript
import {useState, useEffect} from 'react'

export default function App8() {
  const [num, setNum] = useState(1)
  const [num1, setNum1] = useState(1)
  // 模拟mounted，一般在这里写 ajax 请求
  useEffect(() => {
    console.log('挂载完成');
  })
  // 模拟updated，检测数据更新
  useEffect(() => {
    console.log('num1更新了');
  }, [num1])  // 检测num1，如果写所有变量到数组[num1,num2] 或者不写，就全部检测，如果写空数组[]，就不检测任何数据
  // 模拟 beforeDestroy，一般在这里阶段处理脏数据，或者垃圾回收
  useEffect(() => {
    return () => {
      console.log('销毁阶段');
    }
  })
  return (
    <>
      <h2>数字为：{num}</h2>
      <button onClick={ ()=> setNum(num+1) }> 累加 </button>
      <br />
      <h2>数字为：{num1}</h2>
      <button onClick={ ()=> setNum(num1+1) }> 累加 </button>
    </>
  )
}
```
### 组件传参-父传子
```javascript
import React from 'react'

// 子组件
function Child (props) {
  return <h2>子组件 - { props.num }</h2>
}

// 父组件
function Father (props) {
  return <Child num={props.num} />
}

// 顶级组件
export default function App9() {
  return <Father num={123} />
}
```
### 组件传参-子传父
```javascript
import React, {useState} from 'react'

// 子组件
function Child (props) {
  return (
    <>
      <h2>子组件 - {props.num}</h2>
      <button onClick={() => props.changeNumfn()}></button>  // 触发顶级组件中的 changeNumfn
      <button onClick={() => props.changeNumfn(789)}></button>  // 触发顶级组件中的 changeNumfn，这里是子到父传参数
    </>
  )
}

// 父组件
function Father (props) {
  return <Child num={props.num} changeNumFn={props.changeNumFn} />
}

// 顶级组件
export default function App9() {
  const [num, setNum] = useState(123)
  // 提供给子组件用来修改num的函数
  const changeNumFn = () => setNum(456)
  const changeNumFn = (arg) => setNum(arg)  // 这里是子到父传参数
  return <Father num={num} changeNumFn={changeNumFn} />
}

/*
  无论是vue,小程序还是react，所谓子传父，真实在干活的都是父组件
*/
```
### context跨级组件传值
- 因为层层传递中间可能会出错，所以使用新的 hook 来解决
- 使用 createContext

```javascript
import React, {useState, createContext} from 'react'
// 创建上下文空间,(Provider,Consumer)
const NumContext = createContext()

// 子组件
function Child () {
  return (
    // 不再依赖父组件
    <NumContext.Consumer> 
      {/* () 用于写html */}
      {/* {{}} 用于写样式 */}
      {/* {} 用于写js */}
      {
        (num) => {
          <h2>{num}</h2>
        }
      }
      {
        ({num, setNum}) => {   // 解构
          <>
            <h2>{num}</h2>
            <button onClick={()=>setNum(456)}> 修改num </button>
          </>
        }
      }
    </NumContext.Consumer>
  )
}

// 父组件
// function Father (props) {
//   return <Child /> 
// }

const Father = () => <Child />

// 顶级组件 
export default function App10() {
  const [num, setNum] = useState(123)
  return (
    <NumContext.Provider value={{ num, setNum }}>  {/* 提供出去，提供num可以使用{}，但提供num和setNum需要使用{{}}，然后需要解构 */}
      <Father />
    </NumContext.Provider>
  )
}
```

### 使用useContext替代Consumer
```javascript
import React, {useState, createContext, useContext} from 'react'

// 创建上下文空间,(Provider,Consumer)
const NumContext = createContext()

// 子组件
function Child () {
  const {num, setNum} = useContext(NumContext)  // useContext 可以得到 [num,setNum]，然后解构就可以
  return (
    <>
      <h2>{num}</h2>
      <button onClick={()=>setNum(456)}> 修改num </button>
    </>
  )
}
const Father = () => <Child />
// 顶级组件 
export default function App11() {
  const [num, setNum] = useState(123)
  return (
    <NumContext.Provider value={{ num, setNum }}>  {/* 提供出去，提供num可以使用{}，但提供num和setNum需要使用{{}}，然后需要解构 */}
      <Father />
    </NumContext.Provider>
  )
}
```

### 受控组件和不受控组件
- 受控组件和不受控组件只针对input类的表单元素
- 所谓的受控组件就是：表单元素的value需要通过state/类组件(或useState/函数组件) 来定义
- 不受控组件意味着：表单元素的value无法通过state获取，只能使用 ref(或useRef) 来获取

```javascript
import React, {useState, useRef} from 'react'

export default function App12() {
  const [value, setValue] = useState('asd')
  const element = useRef(null)  // 一开始不知道哪里，所以给个null

  const inputChange = (e) => {
    console.log(e.target);  // e.target是dom对象
    setValue(e.target.value)
  }
  const clickFn = () => {
    console.log(value);
  }
  return (
    <div>
      <h3>受控组件</h3>
      <input type="text" value={value} onChange={inputChange} />
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />  {/* 简写成一行 */} 
      
      <button onClick={clickFn}>获取 input 的值</button>
      <button onClick={() => console.log(value)}>获取 input 的值</button>  {/* 简写成一行 */}

      <h3>不受控组件</h3>
      <input type="text" />  {/* 不受state控制，所以不需要写 value 值，也只能通过 input 表框获取 */}
      <input type="text" ref={ element } />  {/* element制定了该input框 */}
      <button onClick={() => console.log(element.current.value)}>获取input的值</button>
    </div>
  )
}

```

### memo
- memo 使组件不受父级更新的影响

```javascript
import React, {useState, memo} from 'react'

const Child = memo((props) => {
  console.log(123);
  return <div>子组件</div>
}) 

export default function App13() {
  const [num,setNum] = useState(1)   // 父组件每一次 setState 都会触发子组件输出123
  return (
    <div>
      <h3>数字为：{num}</h3>
      <button onClick={()=>setNum(num+1)}> 累加 </button>
      <hr />
      <Child />
    </div>
  )
}
```
### useCallback
```javascript
import React, {useState, memo, useCallback} from 'react'

const Child = memo((props) => {
  console.log(123);
  // memo适合与纯静态的，如果组件中有点击更新的事件，则使用memo会输出多次
  return <button onClick={ ()=>props.doSth() }> 累加 </button>
}) 

export default function App13() {
  const [num,setNum] = useState(1)   // 父组件每一次 setState 都会触发子组件输出123
  // const doSth = () => setNum(num+1)
  // setNum(newValue) 直接使用一个值，使用新值强行覆盖旧值
  // setNum((num)=>num+1) 使用callback的写法，就会不断使用新值覆盖旧值
  const doSth = useCallback(() => setNum(num+1), []) 
  const doSth = useCallback(() => {
    setNum(num => num + 1)
  }, []) 
  return (
    <div>
      <h3>数字为：{num}</h3>
      {/* 传时间给子组件 */}
      <Child doSth={doSth} /> 
    </div>
  )
}
```

### useMemo
- 在函数中，再返回一个函数，而不是直接调用
  - 高阶函数

```javascript
const doSth = useMemo(() => {
  return () => setNum(num => num + 1)
}, []) 
```

### React Redux
- Redux可以使用于绝大多数框架，使用起来比较复杂
- react-redux是专门针对React设计的状态管理工具
- react-redux的思想就是在顶级组件封装一个 Provider
- 安装
  - npm i redux react-redux --save

### 仓库与reducer创建
```javascript
// src/reducer.js
// 创建初始状态，并导出一个函数
const defaultState = { 
  num: 1
}
// 导出一个函数
export default(state=defaultState) => {   // 给默认值
  return state;
}
```
- 引入 reducer 
```javascript
// src/index.js
// 仓库的入口文件
// 引入reducer
import reducer from './reducer'
// 创建仓库
import {createStore} from 'redux'
const store = createStore(reducer)
// 导出仓库
export default store
```
### 提供器与连接器
- 上面创建仓库的文件基本不会再动了
- 将 Provider 套在顶级组件的外层

```javascript
// 提供器
// src/index.js
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
  // 顶级组件的提供器
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
)
```

```javascript
// 连接器
// App1.jsx
import React from 'react'
import {connect} from 'react-redux'

function App1(props) {
  return (
    <div>
      <h2>数字为：{props.num}</h2>
    </div>
  )
}

// 每个映射都是一个函数
// 这里的state是src/reducer.js中返回出来的东西
// 状态映射，自动获取到 state，将reducer中的state映射成props，让开发者可以在组件中使用props.num去调用state中的num
const mapStateToProps = (state) => {
  return {
    num: state.num
  }
}
// export default connect(state映射,dispatch映射)(当前组件名称)
export default connect(mapStateToProps)(App1)
```
### state映射与dispatch映射
- 要实现在 App1.jsx 中点击，然后实现 num 的累加
```javascript
// reducer.js
// 创建初始状态
const defaultState = {
  num: 1
}
// 导出一个函数
export default(state=defaultState, action) => {
  return state
}
```

```javascript
// 连接器
// App1.jsx
import React from 'react'
import {connect} from 'react-redux'

function App1(props) {
  return (
    <div>
      <h2>数字为：{props.num}</h2>
    </div>
  )
}

// 每个映射都是一个函数
// 这里的state是src/reducer.js中返回出来的东西
// 状态映射，自动获取到 state，将reducer中的state映射成props，让开发者可以在组件中使用props.num去调用state中的num
const mapStateToProps = (state) => {
  return {
    num: state.num
  }
}
// 事件派发映射：将reducer中的事件映射成props，让开发者可以在组件中使用props.
// export default connect(state映射,dispatch映射)(当前组件名称)
export default connect(mapStateToProps)(App1)
```
### 路由简介
- 安装
  - yarn add react-router-dom@6
- 页面
  - App -> Home + List + Detail
- 路由模式的区别
  - 1. BrowserRouter(History模式)
    - 需要配置 enginx
  - 2. HashRouter(Hash模式)
    - 直接打包就可以直接放到线上了

```javascript
// index.jsx
import App from '../App9'
import Home from '../pages/Home'
import List from '../pages/List'
import Detail from '../pages/Detail'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const BaseRouter = () => (
  <BrowserRouter>
    <Route path="/" element={<App />
      <Route path="/home" element={<Home />}></Route>
      <Route path="/list/:id" element={<List />}></Route>
      <Route path="/detail" element={<Detail />}></Route>
    </Route>
  </BrowserRouter>
)
export default BaseRouter
```

### 使用
1. Outlet类似于 route-view 显示
```javascript
// index.js
import React from 'react'
import {Outlet} from 'react-router-dom'
export default function App9() {
  return (
    <div>
      <h3>App9</h3>
      <Outlet />
    </div>
  )
}
```
2. Link, useLocation, Link, useNavigate, useParams
```javascript
// App.jsx
import React from 'react'
import {Outlet, Link, useLocation, useNavigate} from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()

  const location = useLocation()
  console.log(location.pathname);
  // 函数跳转
  const goDetail = () => {
    // 跳转详情页
    navigate('/detail')
  }
  return (
    <div>
      <ul>
        <li><Link to="/home?id=456">首页</Link></li>
        <li><Link to="/list/123">列表页</Link></li>
        <li><Link to="/detail">详情页</Link></li>
      </ul>
      <button onClick={goDetail}> 跳转详情页 </button>
      <hr />
      <Outlet />
    </div>
  )
}
```
3. useParams 获取 List 组件的参数
```javascript
import React from 'react'
import { useParams } from 'react-router-dom'
export default function List() {
  const {id} = useParams()  // 解构获取，在地址栏处输入参数
  console.log(location)
  return (
    <h2> 列表页List </h2>
  )
}
```
4. useSearchParams 获取 Home 组件的参数
```javascript
import React from 'react'
import { useSearchParams } from 'react-router-dom'
export default function Home() {
  const { id } = useSearchParams()  // 解构获取，在地址栏处输入参数
  console.log(xxx)
  return (
    <h2> 首页 Home </h2>
  )
}
```
5. 事件跳转携带数据
```javascript
export default function App() {
  const goDetail = () => {
    // 跳转详情页
    navigate('/detail', {
      // 携带数据
      state: {
        username: '张三'
      }
    })
  }
}

<button onClick={goDetail}> 跳转详情页 </button>
```
- 然后可以使用 useLocation 获取参数
```javascript
import React from 'react'
import { useLocation } from 'react-router-dom'
export default function Detail() {
  let location = useLocation()
  // console.log(location.state.username); 
  return (
    <h2> 详情页Detail - { location.state ? location.state.username : ""}</h2>
  )
}
```

### 404路由匹配

```javascript
// index.jsx
import App from '../App9'
import Home from '../pages/Home'
import List from '../pages/List'
import Detail from '../pages/Detail'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const BaseRouter = () => (
  <BrowserRouter>
    <Route path="/" element={<App />
      <Route path="/home" element={<Home />}></Route>
      <Route path="/list/:id" element={<List />}></Route>
      <Route path="/detail" element={<Detail />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Route>
  </BrowserRouter>
)
export default BaseRouter
```
- 404图片引入
```javascript
import React from 'react'
import ErrorImg from ''    // 使用这种方式引入
export default function Error() {
  return (
    <div>
      // 图片不支持这种方式引入
      <img src="../assets/404.jpg" alt="" />  
      <img src={ErrorImg} alt="" />  
    </div>
  )
}
```