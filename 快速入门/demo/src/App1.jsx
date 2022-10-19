import React from 'react'
const msg = 'hello world'
export default class App1 extends React.Component {
  render () {
    return (
      <div>
        <h2>{msg}</h2>
        <hr />
        <label htmlFor="username"></label>
        <input type="text" id="username" />
      </div>
     )
   }
}
 
