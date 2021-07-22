// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    num:''
  },
  back:function(){
    wx.navigateBack({})
  },
  go_eight(e) {
    console.log(e.currentTarget.dataset.id);
    if (
      e.currentTarget.dataset.id == '1' ||
      e.currentTarget.dataset.id == '3' ||
      e.currentTarget.dataset.id == '5' ||
      e.currentTarget.dataset.id == '6'
    ) {
      wx.navigateTo({
        url: `/pages/order/order_eight/order_eight?index=${e.currentTarget.dataset.id}`,
      });
    } else {
      wx.showToast({
        title: '敬请期待....',
        icon: 'none',
        duration: 2000,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options)
    this.setData({
      name:options.name,
      num:options.id
    })
    wx.hideLoading()
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