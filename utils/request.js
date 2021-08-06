export const $myRequest = (params) => {

  // 定义公共的url
  const baaseUrl = "https://www.xiaohulaile.com/xh/p/gw"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baaseUrl + params.url,
      success: (result) => {
        resolve(result.data.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}