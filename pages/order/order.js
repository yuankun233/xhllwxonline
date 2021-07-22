// pages/order/order.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: ['全部', '待付款', '待服务', '待评价'],
    user: '',
    list:[],
    page:1,
    zanwu:'',
  },
  navto:function(option){
    wx.navigateTo({
      url: '/pages/order/order_details/order_details?id='+option.currentTarget.id,
    })
  },
  tabSelect(e) {
    wx.showLoading({
      title: '加载中...',
    })
    var _this = this;
    _this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      page:1
    });
     _this.getList();
  },
  getList(item) {
    var arr = item;
    var _this = this;
    if (item == 0) {
      arr = '';
    }
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/get_list',
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: {
        user_token: _this.__data__.user.user_token,
        my_id: _this.__data__.user.my_id,
        status: _this.__data__.TabCur,
      },
      success(res) {
        if (res.data.code==1) {
          _this.setData({
            list: [],
            zanwu:2
          })
        }else{
          _this.setData({
            list: res.data.data.datalist
          })
        }
        console.log(res)
     wx.hideLoading({})
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
    console.log(options.index);
    var _this = this;
    _this.setData({
      TabCur: options.index,
    });
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          user: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/get_list',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
            status: _this.__data__.TabCur,
          },
          success(res) {
            if (res.data.code==1) {
              _this.setData({
                list: [],
                zanwu:2
              })
            }else{
              _this.setData({
                list: res.data.data.datalist
              })
            }
            wx.hideLoading({})
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
  onShow: function () {
    var _this = this
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/get_list',
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: {
        user_token:_this.__data__.user.user_token,
        my_id:_this.__data__.user.my_id,
        status: _this.__data__.TabCur,
      },
      success(res) {
        if (res.data.code==1) {
          _this.setData({
            list: [],
            zanwu:2
          })
        }else{
          _this.setData({
            list: res.data.data.datalist
          })
        }
      },
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
  onReachBottom: function () {
    let _this = this
    this.setData({
      zanwu:1,
      page:_this.__data__.page+1
    })
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/get_list',
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: {
        user_token: _this.__data__.user.user_token,
        my_id: _this.__data__.user.my_id,
        status: _this.__data__.TabCur,
        page_no:_this.__data__.page,
      },
      success(res) {

        if (res.data.code==1) {
          _this.setData({
            zanwu:2
          })
          console.log(_this.__data__.zanwu)
        }else{
          _this.setData({
            
            list: _this.__data__.list.concat(res.data.data.datalist)
          })
        }
        console.log(res)
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
