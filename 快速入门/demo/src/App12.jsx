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
