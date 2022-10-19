import React, {useState, memo, useCallback, useMemo} from 'react'

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
  const doSth1 = useCallback(() => setNum(num+1), []) 
  const doSth2 = useCallback(() => {
    setNum(num => num + 1)
  }, []) 
  const doSth3 = useMemo(() => {
    return () => setNum(num => num + 1)
  }, []) 
  return (
    <div>
      <h3>数字为：{num}</h3>
      {/* 传时间给子组件 */}
      <Child doSth={doSth3} /> 
    </div>
  )
}