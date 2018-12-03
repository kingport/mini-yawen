import api from '../api/index.js'

function getAuthToken()  {
  return new Promise((resolve, reject) => {
     if(wx.getStorageSync('storage')) {
      let resCategories = api.getCategories().then((res) => {
        if(res.statusCode === 401) {
          // 清除storage
          wx.clearStorage()
          wx.login({
            success: function(res) {
              if(res.code) {
                // 获取Token 并保存在storage中
                wx.request({
                  url: 'https://yawen.yzjdentallab.com/backend/wechat/session',
                  method: 'POST',
                  data: {code: res.code},  
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    resolve(res.data)
                    wx.setStorageSync('storage', res.data)   
                  },
                  fail: function(e) {
                      reject(e);
                  }
                })
              }else {
                reject(new Error(res.errMsg));
                console.log('获取用户登录状态失败！' + res.errMsg)
              }
            }
          })
        }else {
          resolve(wx.getStorageSync('storage'))
        }
      })
    }else {
      wx.login({
        success: function(res) {
          if(res.code) {
            // 获取Token 并保存在storage中
            wx.request({
              url: 'https://yawen.yzjdentallab.com/backend/wechat/session',
              method: 'POST',
              data: {code: res.code},  
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                resolve(res.data)
                wx.setStorageSync('storage', res.data)   
              },
              fail: function(e) {
                  reject(e);
              }
            })
          }else {
            reject(new Error(res.errMsg));
            console.log('获取用户登录状态失败！' + res.errMsg)
          }
        }
      })
    }
  })
}

export default getAuthToken