import { http } from '@/utils'
import { makeAutoObservable } from 'mobx'

class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  // article 和 publish 组件都需要使用到，应该将其提取到公共的 
  loadChannelList = async () => {
    const res = await http.get('/channels')
    this.channelList = res.data.channels 
  }
}

export default ChannelStore