ref: https://www.bilibili.com/video/BV1bS4y1b7NV?p=15&spm_id_from=pageDriver&vd_source=3c13db00b69f1fbbe904dab0b21bd3e0

### 一、三个API
1. React.createElement()
  - 创建 react 元素
  - 标签名小写
  - React.createElement('button', {
    id: 'btn',
    type: 'button',
    className: 'hello',
    onClick: () => { alert('点我一下') }
  }, 'button内容', button);  // 后面可以通过逗号加入其他组件
  - JSX等价于 React.createElement()，所以使用 babel 解析JSX，等价于使用 React.createElement()

2. ReactDOM.createRoot()
  - 创建 react 根容器

3. root.render()
  - 渲染 

### 二、JSX注意事项
- JSX不是字符串，不能加引号
- JSX中 html 标签小写，组件大写
- JSX有且只有一个根标签
- JSX中可以使用 {} 嵌入表达式，（有值的就是表达式）
- JSX必须正确结束
- 如果表达式是 空值、布尔值、NaN、undefined这些值，将不会显示
- JSX中，属性可以直接在标签中设置
  - class 需要使用 className 代替
  - style 中必须使用对象设置

### diff
- 使用索引key也可以，当元素的顺序不会发生变化，否则就会全部重新渲染
- 所以一般使用id或其他唯一值

### 组件
1. 函数组件
2. 类组件
```javascript
class App extends Component {
  render() {
    return <div className="app">Hello React!</div>
  }
  // ...
}
```
3. 传递（单向）
  - props
  - 事件

### state
- 修改值之后，在页面不更新，因为先渲染了，再调用事件
- useState() 钩子函数，创建 state
  - const [counter, setCounter] = useState(1)
  - 通过 setCounter 去修改 counter，值不一样的时候才会发生重新渲染
  - 当state的值是一个对象时，修改时是使用新的对象替换旧的对象，旧的东西就没有了，所以新增对象的属性就不方便
- 直接修改旧的 state 对象，由于对象还是那个对象，所以不会生效

```javascript
const [user, setUser] = useState({name: '孙悟空', age: 18});
const updateUserHandler = () => {
  // 直接修改旧的 state 对象，对象还是那个对象，不会生效
  // user.name = '猪八戒'
  // setUser(user)

  // newUser和user值是一样的，但不是一个对象，浅复制
  const newUser = Object.assign({}, user)
  newUser.name = '猪八戒'
  // 这样旧的数据 age 就会保留
  setUser(newUser)  
  setUser(newUser)  
  setUser(newUser)  
  setUser(newUser)  
  setUser(newUser)    // 多个 setUser 会将所有的渲染放入队列中，然后只有最后一次渲染会生效。所以 set 是异步执行的

  setTimeout(() => {
    setCounter(counter + 1)  // 原来点一下，1s内加一，现在1s内点两次，couter并不会加2

    // 修改如下（通过回调函数）
    setCounter(prevCounter) => {
      return preCounter + 1  // react会确保，每次加1之前的preCounter都是最新的
    }
  }, 1000)
}
```

### DOM对象和useRef()
获取原生的DOM对象
  1. 直接使用传统的document来对DOM进行操作
  2. 直接从React处获取DOM对象
  步骤
    2.1 创建一个存储DOM对象的容器，使用useRef()钩子函数
    - const h1Ref = useRef()  // 创建一个容器
    2.2 将容器设置为想要获取DOM对象元素的 ref 属性
    - <h1 ref={xxx}></h1>
    - React会自动将当前元素DOM对象，设置为容器current属性

- 钩子函数只能在函数组件中调用，注意：在函数组件中的嵌套函数也不要使用
- useRef, 返回的是一个普通的JS对象
  - 我们直接创建一个对象可以替代，但useRef()创建的对象，可以确保每次渲染获取到的都是同一个对象
  - 如下：

```javascript
const test1Ref = useRef();  // 创建一个容器
const [count, setCount] = useState(1)
const test2Ref = {current: null};  // 创建一个普通对象

console.log( temp === test1Ref )  // 如果是 test2Ref，这里一直都是false，每次都是不一样的对象；如果是 test1Ref，这里第一次是false，下面赋值之后，第二次就是true了
temp = test1Ref
const clickHandler = () => {
  // 触发更新
}

```
- 当需要一个对象不会因为组件的重新渲染而改变时，就可以使用useRef()

### 类组件
- 类组件的 props 是存储到类的实例对象中，可以直接通过实例对象访问，this.props
- 类组件中 state 统一存储到了实例对象的 state 属性中，可以通过 this.state 访问
  - 通过 this.setState() 对其进行修改，该方法只会修改设置的属性，没有修改的属性保留，不会被覆盖
  - （仅限于存储在state的属性，state下的obj:{name: 'lqj'， age: 18}，修改lqj就不行，二层对象，修改后 age会被覆盖而消失）
  - 修改方法： this.setState({ obj: {...this.state.obj, name: 'change'}})，需要将之前的展开
- 函数组件中，响应函数直接以函数的形式定义在组件中
  - 但类组件中，响应函数以类的方法来定义

```javascript
class User extends Component {

  // 类中不需要使用 this，render 中需要
  state = {
    count: 100,
    test: 'hhh'
  };
  // 定义方法，不需要加 const
  clickHandler = () => {
    this.setState({count: this.state.count + 1})  // 直接+1会有异步的问题
    this.setState(prevState => {
      return {
        count: preState.count + 1
      }
    })
  },
  // 类组件中，处处都需要添加this
  render() {
    console.log(this.props)
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.clickHandler}></button>
        <ul>
          <li>姓名：{this.props.name}</li>
          <li>年龄：{this.props.age}</li>
        </ul>
      </div>
    )
  }
}
```

### 受控组件和非受控组件（受控组件有双向绑定功能）
- 非受控组件，表单中的信息需要用户手动输入
- 受控组件，可以轻易通过react对表单进行修改，类似于双向绑定
  - 我们可以将表单中的数据存储到state中，然后将state设置为表单项value的值，这样当表单项发生，state会随之变化
  - 反之，state发生变化，表单项也会跟着变化

- 将state设置为表单项的value值，当表单项发生变化时，state会随之变化；反之state发生变化，表单项也会跟着变化，这种操作称之为双向绑定
  - 这样一来，表单就成为了一个受控组件

```javascript
const [formData, setFormData] = useState({
  inputDate: '', 
  inputDesc: '',
  inputTime: ''
})
// 创建一个响应函数，监听日期的变化
const dateChangeHandler = (e) => {
  setFormData({
    ...formData,  // 需要结构化原来的数据，不然会被覆盖只留下inputData  
    inputData: e.target.value 
  })
}
```

### 组件数据存储
- 当一个数据需要被多个组件使用时，我们可以将数据放入这些组件的共同祖先元素中（数据提升）
- 这样就可以使得多个组件都能方便访问到这个数据

```javascript
// LogsForm.js
const formSubmitHandler = (e) => {
  // 取消表单的默认行为
  e.preventDefault();
  // 获取表单项中的数据日期、内容、时长
  // 将数据拼装成一个对象
  const newLog = {
    date: new Date(inputDate),
    desc: inputDesc,
    time: +inputTime
  }
  // 当要添加新的日志时，调用父组件传递过来的函数，类似于vue的 emit
  props.onSaveLog(newLog)
}

// App.js
// 定义子组件回调后调用的函数
const saveLogHandler = (newLog) => {
  console.log("newLog: ", newLog)
}
return <div className="app">
  {/* {引入 LogsForm 组件} */}
  <LogsForm onSaveLog={saveLogHandler} /> 
  <Logs logsData={logsData} />  
</div>

```
### 使用 portal 修改项目
1. 在index.html添加一个新的元素
2. 修改组件的渲染方式
  - 通过 ReactDOM.createPortal() 作为返回值创建元素
  - 参数
    1. jsx(修改前return后的代码)
    2. 目标位置（DOM元素）

### React.Fragment
- 是一个专门用来作为父容器的组件
  - 它只会将它里边的子元素直接返回，不会创建任何多余的元素
- 希望有一个父容器，但同时又不希望父容器在网页中产生多余的结构