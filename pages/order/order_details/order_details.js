// pages/order/order_details/order_details.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    list: '',
    checkbox: '',
    modalName: '',
    isPay: false,
    time:''
  },
  goSpecialty() {
    // wx.navigateTo({
    //   url: '/pages/specialty/specialty',
    // });
    wx.makePhoneCall({
      phoneNumber: '4009155291',
    });
  },
  quxiao() {
    //点击取消订单按钮时弹出提示框
        wx.showModal({  
          title: '提示',  
          content: '取消订单之后需重新下单',  
          success: (res)=>{  
            //当点击确定的时候请求取消订单
              if (res.confirm) { 
                wx.request({
                  url:'https://www.xiaohulaile.com/xh/p/wxcx/order/order_cancel',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  method: 'post',
                  data: {
                    user_token: this.data.user.user_token,
                    id:this.data.list.id
                  },
                  success(res) { 
                    wx.showToast({
                      title: '取消成功！',
                      icon:'success',
                      duration:2000
                    })
                    wx.navigateBack({
                      delta: 0,
                    })
                    }
                    })
              } else if (res.cancel) {  
                
              }  
          }  
      }) 
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    this.setData({
      checkbox: e.detail.value,
    });
  },
  hideModal(e) {
    console.log('111');
    this.setData({
      modalName: null,
    });
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
  },
  shows(){
    this.setData({
      modalName:'Modal'
    })
  },
    // 付钱了
    payFn() {
      var _this = this;
      if (_this.__data__.isPay) {
        return;
      }
      _this.setData({
        isPay: true,
      });
      console.log(_this.__data__.list.id,'付钱');
      wx.request({
        url: 'https://www.xiaohulaile.com/xh/p/wxcx/pay/pay',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        data: {
          id:_this.__data__.list.id
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
                wx.navigateBack({
                  delta: 0,
                })
              },
              fail(res) {
                console.log(res);
                wx.navigateBack({
                  delta: 0,
                })
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
  refund() {
    console.log('退群');
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '您是否确定退款',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: 'https://www.xiaohulaile.com/xh/p/wxcx/pay/refund_index',
            header: {
              'content-type': 'application/json', // 默认值
            },
            data: {
              id: _this.__data__.list.id,
            },
            success(res) {
              console.log(res,'code');
              if (res.data.code == 0) {
                wx.showToast({
                  title: '退款成功',
                  icon: 'success',
                  duration: 2000,
                });
                wx.redirectTo({
                  url: '/pages/order/order?index=0',
                });
                _this.setData({
                  modalName:null,
                })
              } else {
                wx.showToast({
                  title: '退款失败',
                  icon: 'error',
                  duration: 2000,
                });
                _this.setData({
                  modalName:null,
                })
              }
            },
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
          _this.setData({
            modalName:null,
          })
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    wx.showLoading({
      title: '加载中...',
    })
    let _this = this;
    _this.setData({
      time: option.time,
    });
    console.log(_this.data.time,'看时间参数');
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          user: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/order/get_data',
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {
            user_token: res.data.user_token,
            order_id: option.id,
          },
          success(res) {
            {
              console.log(res,'订单数据');
              _this.setData({
                list: res.data.data,
              });
              wx.hideLoading()
            }
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
