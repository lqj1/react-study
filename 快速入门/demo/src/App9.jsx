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
  // const changeNumFn = (arg) => setNum(arg)  // 这里是子到父传参数
  return <Father num={num} changeNumFn={changeNumFn} />
}

/*
  无论是vue,小程序还是react，所谓子传父，真实在干活的都是父组件
*/