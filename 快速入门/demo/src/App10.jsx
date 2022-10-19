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
