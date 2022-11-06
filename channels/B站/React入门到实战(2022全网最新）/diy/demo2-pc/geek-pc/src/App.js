import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
import { history } from './utils/history'
// import Login from './pages/Login'
import Login from '@/pages/Login'
import Layout from './pages/Layout'
import { Button } from 'antd'
import './App.css'  
import { AuthComponent } from '@/components/AuthComponent'
import Publish from './pages/Publish'
import Article from './pages/Article'
import Home from './pages/Home'

function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
    {/* <BrowserRouter> */}
      <div className="App">
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          {/* Layout 需要鉴权处理 */}
          {/* 这里的Layout不一定不能写死，要根据是否登录进行判断  */}
          <Route path="/" element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }>
            {/* 二级路由 */}
            <Route index element={<Home /> }></Route>  {/* 默认组件 */}
            <Route path="/article" element={<Article />} ></Route>
            <Route path="/publish" element={<Publish />} ></Route>
          </Route>

          {/* 不需要鉴权 */}``
          <Route path="/login" element={<Login />}></Route>

        </Routes>
      </div>
    {/* </BrowserRouter> */}
    </HistoryRouter>
  );
}
export default App;
