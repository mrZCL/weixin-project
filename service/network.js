import {
  baseURL
} from './config'

export default function request(options){
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      // success: function(res){
      //   resolve(res)
      // },
      // fail: function(err){
      //   reject(err)
      // }
      success: resolve,
      fail: reject
    })  
  })
}