// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    users: '',
    user: '',
    statusnum1:'',
    statusnum:'',
    statusnum2:''
  },
  goFile() {
    var _this = this;
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/archive', //仅为示例，并非真实的接口地址
      // url: 'https://159.75.47.247/xh/p/wxcx/my/archive',
      method: 'post',
      data: {
        user_token: _this.__data__.users.user_token,
        my_id: _this.__data__.users.my_id,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data.code);
        if (res.data.code == 1) {
          wx.navigateTo({
            url: '/pages/file/file',
          });
          return;
        }
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '/pages/file/file_y/file_y',
          });
          return;
        }
      },
    });
  },
  goOurder(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `/pages/order/order?index=${e.currentTarget.dataset.id}`,
    });
  },
  goSpecialty() {
    wx.navigateTo({
      url: '/pages/specialty/specialty',
    });
  },
  goSpecialtys() {
    wx.navigateTo({
      url: '/pages/ledge/ledge',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          users: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/my',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
          },
          success(res) {
            _this.setData({
              user: res.data.data,
            });
          },
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/order_num',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
            status: 1
          },
          success(res) {
            console.log(res)
            _this.setData({
              statusnum1: res.data.data,
            });
          },
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/order_num',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
            status: 2
          },
          success(res) {
            console.log(res)
            _this.setData({
              statusnum: res.data.data,
            });
          },
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/order_num',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
            status: 3
          },
          success(res) {
            _this.setData({
              statusnum2: res.data.data,
            });
          },
        });
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
    var _this = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          users: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/my',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
          },
          success(res) {
            console.log(res)
            if(res.data.message == '请重新登录'){
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
              user: res.data.data,
            });
          },
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/order_num',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
            status: 1
          },
          success(res) {
            console.log(res)
            if(res.data.message == '请重新登录'){
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
              statusnum1: res.data.data,
            });
          },
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/order_num',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
            status: 2
          },
          success(res) {
            console.log(res)
            if(res.data.message == '请重新登录'){
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
              statusnum: res.data.data,
            });
          },
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/order_num',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
            status: 3
          },
          success(res) {
            console.log(res.data.message,111)
            if(res.data.message == "请重新登录"){
              console.log(res,111)
              wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 1500,
              });
              setTimeout(function () {
                console.log('doSomething');
                wx.reLaunch({
                  url: '/pages/login/login',
                });
              }, 1000);
            }
            _this.setData({
              statusnum2: res.data.data,
            });
          },
        });
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
