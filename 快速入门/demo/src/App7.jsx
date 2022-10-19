import { useState } from 'react'

export default function App7 () {
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