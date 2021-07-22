// pages/aboutus/aboutus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back:function(){
    wx.navigateBack({})
  },
  daohang:function(){
    let _this = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = 31.01753
        const longitude = 121.444815
        const name = '上海小护来了信息科技有限公司'
        const address = '上海市闵行区紫月路1000号 东软软件园'
        wx.openLocation({
          latitude,
          longitude,
          name,
          address,
          scale: 18
        })
      }
     })
  },
  goSpecialty() {
    // wx.navigateTo({
    //   url: '/pages/specialty/specialty',
    // });
    wx.makePhoneCall({
      phoneNumber: '4009155291',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})