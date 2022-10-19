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
