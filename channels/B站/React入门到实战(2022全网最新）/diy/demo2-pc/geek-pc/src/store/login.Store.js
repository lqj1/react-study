// login module 
import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, removeToken } from '@/utils'
class LoginStore {
  token = getToken || ''
  constructor() {
    // 响应式处理
    makeAutoObservable(this)
  }
  // 默认code为 246810
  // async 修饰的 getToken 返回值为 Promise 对象   
  getToken = async ({ mobile, code }) => {
    // 调用登录接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    // 存入 token，存到内存
    this.token = res.data.token
    // 存入 localStorage，持久化
    setToken(this.token)
  }
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore