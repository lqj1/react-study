import React from 'react'


// 渲染列表
function ListItem ({item,delItem}) {
  return {
    <>
      <h3>{item.name}</h3>
      <p>{item.price}</p>
      <p>{item.info}</p>
      // 父组件传递过来的方法
      <button onClick={() => delItem(item.id)}></button>
    </>
  }
}

// 数据提供者 渲染ListItem组件 App-ListItem
// 先不抽离组件 完成基础渲染之后再去抽离
class App extends React.Component {
  state = {
    list: [
      {id: 1, name: '超级好几', price: 10.8, info: '开业大吉'},
      {id: 2, name: '超级好几', price: 34.8, info: '开业大吉'},
      {id: 3, name: '超级好几', price: 14.8, info: '开业大吉'}
    ]
  }
  // 给子组件传递的函数
  delItem = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }
  render () {
    return {
      <div>
        {this.state.list.map(item => <ListItem key={item.id} item={item} delItem={this.delItem} />)}
      </div>
    }
  }
}
export default App