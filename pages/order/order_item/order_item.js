// pages/order/order_item/order_item.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    times: [
      {
        id: 1,
        time: '08:00-12:00',
      },
      {
        id: 2,
        time: '13:00-18:00',
      },
      {
        id: 3,
        time: '18:00-22:00',
      },
    ],
    modalName: 'Modal',
    user_list: '',
    time: '',
    now: '',
    order: '',
    //提交参数
    text: '',
    checkbox: '',
    minute: '',
    num: '',
    project_id: '',
    name: '',
    archive_id: '',
    data: '',
    time_slot: '',
    // 付钱
    isPay: false,
  },
  textFn(e) {
    var _this = this;
    _this.setData({
      text: e.detail.value,
    });
  },
  // 日期
  DateChange(e) {
    this.setData({
      data: e.detail.value,
    });
  },
  // 拟态框
  hideModal(e) {
    this.setData({
      modalName: null,
    });
  },
  hideModal_1(e) {
    this.setData({
      modalName: null,
    });
    wx.navigateBack();
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break;
      }
    }
    this.setData({
      checkbox: items,
    });
  },
  // 勾选
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    this.setData({
      checkbox: e.detail.value,
    });
  },
  // 拟态框
  showModal(e) {
    console.log(e);
    this.huoqubfw();
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
  },

  //单选
  radioChange(e) {
    console.log(
      'radio发生change事件，携带index值为：',
      e.currentTarget.dataset.index
    );
    var _this = this;
    _this.setData({
      archive_id: e.detail.value,
    });
    var list = _this.__data__.user_list;
    var obj = list.find(function (obj) {
      return obj.id == e.detail.value;
    });
    console.log(obj);
    _this.setData({
      name: obj.name,
    });
  },
  radioChange_1(e) {
    var _this = this;
    console.log(
      'radio发生change事件，携带index值为：',
      e.currentTarget.dataset.id
    );
    var _this = this;
    _this.setData({
      time_slot: e.detail.value,
      time: _this.__data__.times[e.detail.value - 1].time,
    });
  },
  // 付钱了
  payFn() {
    var _this = this;
    if (
      _this.__data__.archive_id == '' ||
      _this.__data__.data == '' ||
      _this.__data__.time_slot == ''
    ) {
      wx.showToast({
        title: '请选择基本信息',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    if (_this.__data__.isPay) {
      return;
    }
    _this.setData({
      isPay: true,
    });
    console.log('付钱');
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/wxcx/pay/pay',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      data: {
        body: _this.__data__.body,
        project_id: _this.__data__.project_id,
        num: _this.__data__.num,
        total_fee: _this.__data__.num * _this.__data__.total_fee,
        archive_id: _this.__data__.archive_id,
        time_slot: _this.__data__.time_slot,
        content: _this.__data__.text,
        minute: _this.__data__.minute,
        openid: _this.__data__.users.openid,
        start_time: _this.__data__.data,
        my_id: _this.__data__.users.my_id,
      },
      success(res) {
        console.log(res, '11');
        console.log(res.data, '22');
        _this.setData({
          isPay: false,
        });
        if (res.data.code == 0) {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success(res) {
              console.log(res, '成功');
              wx.redirectTo({
                url: '/pages/order/order?index=0',
              });
            },
            fail(res) {
              console.log(res);
              wx.redirectTo({
                url: '/pages/order/order?index=0',
              });
            },
          });
        } else if (res.data.code == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          });
        } else if (res.data.code == 2) {
          wx.navigateTo({
            url: '/pages/home/login/login',
          });
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
    console.log(options);
    var _this = this;

    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          users: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/archive', //仅为示例，并非真实的接口地址
          // url: 'https://159.75.47.247/xh/p/wxcx/my/archive',
          method: 'post',
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
          },
          header: {
            'content-type': 'application/json', // 默认值
          },
          success(res) {
            console.log(res.data.data);
            _this.setData({ user_list: res.data.data });
          },
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/project/index',
          header: {
            'content-type': 'application/json', // 默认值
          },
          method: 'post',
          data: {
            id: options.order_id,
            user_token: res.data.user_token,
          },
          success(res) {
            console.log(res, '看看是啥');
            _this.setData({
              order: res.data.data,
            });
            wx.hideLoading()
          },
        });
      },
    });
    var datetime = new Date();
    var year = datetime.getFullYear(); //获取完整的年份(4位,1970)
    var month = datetime.getMonth() + 1; //获取月份(0-11,0代表1月,用的时候记得加上1)
    if (month <= 9) {
      month = '0' + month;
    }
    var date = datetime.getDate(); //获取日(1-31)
    if (date <= 9) {
      date = '0' + date;
    }
    var dateformat = year + '-' + month + '-' + date;

    _this.setData({
      minute: options.minute,
      num: options.num,
      project_id: options.order_id,
      body: options.body,
      total_fee: options.total_fee,
      now: dateformat,
    });
  },
  huoqubfw:function(){
    console.log('12333333')
    var _this = this;

    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          users: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/archive', //仅为示例，并非真实的接口地址
          // url: 'https://159.75.47.247/xh/p/wxcx/my/archive',
          method: 'post',
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
          },
          header: {
            'content-type': 'application/json', // 默认值
          },
          success(res) {
            console.log(res.data.data);
            _this.setData({ user_list: res.data.data });
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
  onHide: function () {
    this.setData({
      modalName:''
    })
  },

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
