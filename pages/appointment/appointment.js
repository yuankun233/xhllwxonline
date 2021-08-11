// pages/appointment/appointment.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      user: '',
      list: '',
    },
    goOrder(e) {
      console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: `/pages/order/order_eight/order_eight?index=${e.currentTarget.dataset.id}`,
      });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    wx.getStorage({
      key: 'user',
      fail(res) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1000,
        });
        setTimeout(function () {
          console.log('doSomething');
          wx.reLaunch({
            url: '/pages/login/login',
          });
        }, 1000);
      },
    });
    wx.showLoading({
      title: '加载中...',
    })
      var _this = this;
      wx.getStorage({
        key: 'user',
        success(res) {
          console.log(res.data);
          _this.setData({
            user: res.data,
          });
          wx.request({
            url: 'https://www.xiaohulaile.com/xh/p/wxcx/project/get_list',
            header: {
              'content-type': 'application/json', // 默认值
            },
            data: {
              user_token: res.data.user_token,
            },
            success(res) {
              console.log(res, '看看是啥');
              _this.setData({
                list: res.data.data,
              });
  wx.hideLoading()
            },
          });
        },
      });
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
  });
  