// pages/message/message.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this;
    // wx.getStorage({})
    // console.log(11);
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res, 'meiyou的');
        console.log(res.data, 'ahahahha1');
        if(res.data.message == '请重新登陆'){
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
        }

        _this.setData({
          user: res.data,
        });
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail(res) {
        console.log(res)
        wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
        });
        setTimeout(function () {
        console.log('doSomething');
        wx.reLaunch({
        url: '/pages/login/login'
        });
        }, 1000);
        }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this;
    // wx.getStorage({})
    // console.log(11);
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res, 'meiyou的');
        console.log(res.data, 'ahahahha1');
        if(res.data.message == '请重新登陆'){
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
        }

        _this.setData({
          user: res.data,
        });
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail(res) {
        console.log(res)
        wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
        });
        setTimeout(function () {
        console.log('doSomething');
        wx.reLaunch({
        url: '/pages/login/login'
        });
        }, 1000);
        }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
