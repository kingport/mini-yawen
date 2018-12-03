
const host = 'https://yawen.yzjdentallab.com/backend'

console.log(wx.getStorageSync('storage').token)
const wxRequest = async (params = {}, url) => {
  try {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    let res = await wx.request({
      url: url,
      method: params.method || "GET",
      data: params.data || {},
      header: {
        'content-type': 'application/json',
        "Authorization": "Bearer " + wx.getStorageSync('storage').token
      }
    })
    wx.hideToast()
    return res
  } catch(e) {
    console.log(e)
  } 
}

// 获取类别
const getCategories = (params) => wxRequest(
  params,
  host + '/categories'
)
// 推荐课程
const getLessons = (params) => wxRequest(
  params,
  host+ '/lessons/recommend'
)
// 分类课程 对应的分类列表
const getLessonsCategory = (params) => wxRequest(
  params,
  host + '/lessons/category/' + params.query.catId
)
// 课程详情
const getLessonsDetail = (params) => wxRequest(
  params,
  host + '/lessons/' + params.query.id
)
// 已购课程
const getPurchasedLessons = (params) => wxRequest(
  params,
  host + '/lessons/purchased'
)
// 课程评论
const getLessonsComments = (params) => wxRequest(
  params,
  host + '/lessons/' + params.query.id + '/comments'
)
// 评论回复
const getReplyComment = (params) => wxRequest(
  params,
  host + '/lessons/' + params.query.id + '/comments/' + params.query.id + '/replies'
)
//提交评论
const postLessonsComments = (params) => wxRequest(
  params,
  host + '/lessons/' + params.query.id + '/comments'
)
// 提交回复
const postReplyComment = (params) => wxRequest(
  params,
  params.method,
  host+ '/lessons/' + params.query.id + '/comments' + params.query.id + '/replies'
)
// 获取幻灯片 轮播 （home details ）
 const getBannersList = (params) => wxRequest(
   params,
   host + '/banners/' + params.query.page
 )

 //提交code 获取小程序session
 const postCodeSession = (params) => wxRequest(
   params,
   host + '/wechat/session'
 )

 // 提交用户加密信息
  const postUserEncrypt = (params) => wxRequest(
    params,
    host + '/wechat/userInfo'
  )

// 获取视频防盗链接
  const getAntiTheftVideo = (params) => wxRequest(
    params,
    params.method,
    hsot + 'videos/' + params.query.id + '/antiTheft'
  )

// 微信支付
  const  postWechatPrepay = (params) => wxRequest(
    params,
    host + '/wechat/prepay'
  )
// 搜索评论
const  getSearchList = (params) => wxRequest(
  params,
  host + '/lessons/search?keyword=' +  params.query.keyword
)
// 获取用户信息
const getUserInfo = (params) => wxRequest(
  params,
  host + '/user/me'
)

export default {
  getCategories,
  getBannersList,
  getLessonsCategory,
  getLessons,
  getPurchasedLessons,
  getLessonsDetail,
  getLessonsComments,
  getReplyComment,
  postLessonsComments,
  postWechatPrepay,
  postCodeSession,
  postUserEncrypt,
  getSearchList,
  getUserInfo
}