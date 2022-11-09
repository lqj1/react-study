// 封装图表组件
import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'


function Bar ({ title, xData, yData, style }) {
  const domRef = useRef()
  const chartInit = () => {
    // 基于准备好的dom，初始化 echarts 实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        // text: 'Echarts 入门示例'
        text: title
      },
      tooltip: {},
      xAxis: {
        // data: ['衬衫','毛衣','牛仔裤']
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          // data: [5,6,7]
          data: yData
        }
      ]
    })
  } 
  // 执行初始化函数
  useEffect(() => {
    chartInit()
  }, [])
  return (
    <div>
      {/* 准备挂载节点 */}
      {/* <div ref={domRef} style={{ width: '500px', height: '400px' }}></div> */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}
export default Bar 