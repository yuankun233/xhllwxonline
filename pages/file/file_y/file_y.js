// pages/file/file_y/file_y.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    users: '',
  },
  goFile() {
    wx.redirectTo({
      url: '/pages/file/file',
    });
  },
  goFile_bj(e) {
    var _this = this;
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.index, '下标');
    wx.setStorage({
      key: 'user_order',
      data: _this.__data__.list[e.currentTarget.dataset.index],
    });
    wx.setStorage({
      key: 'user_order_id',
      data: e.currentTarget.dataset.id,
    });
    wx.redirectTo({
      url: `/pages/file/file?bj=true`,
    });
  },
  goFile_sc(e) {
    var _this = this;
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.index, '下标');
    wx.showModal({
      title: '提示',
      content: '是否删除健康档案',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: 'https://www.xiaohulaile.com/xh/p/wxcx/My/Archivdel',
            header: {
              'content-type': 'application/json', // 默认值
            },
            data: {
              id: e.currentTarget.dataset.id,
              user_token: _this.__data__.users.user_token,
            },
            success(res) {
              console.log(res.data, '看看是啥');
              if (res.data.code == '0') {
                wx.request({
                  url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/archive',
                  header: {
                    'content-type': 'application/json', // 默认值
                  },
                  data: {
                    user_token: _this.__data__.users.user_token,
                    my_id: _this.__data__.users.my_id,
                  },
                  success(res) {
                    console.log(res, '看看是啥');
                    _this.setData({
                      list: res.data.data,
                    });
                  },
                });
              }
            },
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(111);
    var _this = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          users: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/archive',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
          },
          success(res) {
            console.log(res, '看看是啥');
            _this.setData({
              list: res.data.data,
            });
            wx.hideLoading()
          },
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
