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
