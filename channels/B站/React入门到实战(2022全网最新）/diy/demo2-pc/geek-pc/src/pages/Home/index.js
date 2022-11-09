import './index.scss'
import Bar from '@/components/Bar'
// 思路：
// 1. 看官方文档，把 echarts 加入项目
  // 1.1 如何在 react 获取dom，useRef
  // 1.2 在什么地方获取 dom 节点，useEffect
// 2. 不抽离定制化的参数，先把最小化的demo跑起来
// 3. 按照需求，哪些参数需要自定义，抽象出来

const Home = () => {
  return (
    <div>
      {/* 渲染Bar组件 */}
      <Bar
        title="主流框架使用满意度"
        xData={['react', 'vue', 'angular']}
        yData={[30, 40, 50]}
        style={{ width: '500px', height: '400px'}}
      />
      <Bar
        title="主流框架使用满意度"
        xData={['react', 'vue', 'angular']}
        yData={[60, 70, 80]}
        style={{ width: '300px', height: '200px'}}
      />
    </div>
  )
}
export default Home