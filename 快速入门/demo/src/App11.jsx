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
