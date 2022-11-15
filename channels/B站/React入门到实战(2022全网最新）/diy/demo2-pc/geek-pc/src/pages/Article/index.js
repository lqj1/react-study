import img404 from '@/assets/error.png'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 频道列表管理
  // const [channelList, setChannelList] = useState([])
  const { channelStore } = useStore()
  
  // useEffect的依赖非常必要，非常容易出现循环执行
  // 在里面写了引起组件重新渲染的逻辑，重新渲染又会导致 useEffect 执行
  // 封装到 channel.Store.js 中并在 Layout/index.js 中调用
  // useEffect(() => {
  //   const loadChannelList = async () => {
  //     const res = await http.get('/channels')
  //     setChannelList(res.data.channels)
  //   }
  //   loadChannelList()
  // }, [])
  // 文章列表管理，统一管理数据，将来修改给 setList 传对象
  const [articleData, setArticleData] = useState({
    list: [],  // 文章列表
    count: 0  // 文章总数
  })
  // 文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 4
  })
  // 如果异步请求函数需要依赖一些数据变化而重新执行
  // 推荐把它写到内部
  // 统一不抽离函数到外面，只要涉及到异步请求的函数，都放到 useEffect 内部
  // 本质区别：写到外面每次组件更新都会重新进行函数初始化，本身就是一次性能消耗
  // 而写到 useEffect中，只会在依赖项发生变化的时候，函数才会进行重新初始化
  // 避免性能损失
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setArticleData({
        list: results,
        count: total_count
      })
    }
    loadList()
  }, [params])

  /* 表单筛选功能实现 */
  const onFinish = (values) => {
    const { channel_id, date, status } = values
    // 数据处理
    const _params = {}
    if (status !== -1) {
      _params.status = status
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params数据，引起接口的重新发送 对于原来默认的，会将params原来的参数page和per_page整体覆盖
    // 通过解构就可以保持原来的值
    setParams({
      ...params,
      ..._params
    })
  }
  // 翻页实现
  const pageChange = (page) => {
    setParams({
      ...params,
      page
    })
  }

  const formatStatus = (type) => {
    const TYPES = {
      1: <Tag color="red">审核失败</Tag>,
      2: <Tag color="green">审核成功</Tag>
    }
    return TYPES[type]
  }

  // 删除文章
  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    // 刷新一下列表
    setParams({
      ...params,
      page: 1
    })
  }

  // 编辑文章
  const navigate = useNavigate()
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`)
  }

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // render: data => formatStatus(data)
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => delArticle(data)}
            />
          </Space>
        )
      },
      fixed: 'right'
    }
  ]

  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={
            {
              pageSize: params.per_page,
              total: articleData.count,
              onChange: pageChange,
              current: params.page
            }
          }
          bordered
        />
      </Card>
    </div>
  )
}

export default observer(Article)