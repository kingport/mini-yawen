<template>
  <div class="home-container">
    <!-- 智能搜索框容器 -->
    <div @click="onClickSearch" class="search-container">
      <image src='/static/搜索.png' class="search-icon-container" />
      <text>搜索相关微课</text>
    </div>
    <!-- 首页banner图 -->
    <banner></banner>
  </div>
</template>

<script>
import banner from '@/components/banner'
import api from '../../api/index.js'
import getAuthToken from '../../utils/token.js'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    banner
  },

  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },

  async onLoad () {
    // 先检查token
    await getAuthToken()
    console.log(api)
    // 获取分类类别
    let resCategories = await api.getCategories()
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .home-container {

  }
  .search-container {

  }
  .search-icon-container {

  }
</style>
