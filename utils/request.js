let jia = 0;
export const $myRequest = (params) => {
    jia++
    wx.showLoading({
      title: '加载中...',
    })
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
      },
      complete: () =>{
        jia--
        if(jia === 0){
          wx.hideLoading();
        }
      }
    })
  })
}