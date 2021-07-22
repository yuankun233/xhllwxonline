// pages/phone/phone.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    invitation:'',
    TabCur: 0,
    scrollLeft: 0,
    Index: '',
    phone: '',
    time: 59,
    // 是否获取
    isGetCode: false,
    // 是否可提交
    isLogin: false,
    //用户信息
    userInfo:'',
    openid:'',
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    });
  },
  getphone(e) {
    // console.log(e.detail.value, '1');
    var _this = this;
    _this.setData({
      phone: e.detail.value,
    });
    if (e.detail.value.length == 11 && _this.__data__.Index.length == 4) {
      console.log('满足条件');
      _this.setData({
        isLogin: true,
      });
    } else {
      console.log('没满');
      _this.setData({
        isLogin: false,
      });
    }
  },
  getCode() {
    var _this = this;
    // console.log('获取验证码');
    // console.log(_this.__data__.isGetCode);
    if (!_this.__data__.isGetCode) {
      console.log('获取验证码');
      if (_this.__data__.phone.length < 11) {
        wx.showToast({
          title: '手机号格式错误',
          icon: 'error',
          duration: 2000,
        });
        return;
      } else {
        console.log('格式对发请求');
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/xcx/sms/send_sms',
          method: 'post',
          data: {
            phone: _this.__data__.phone,
            sms_type: '1',
          },
          type: 'post',
          success(res) {
            console.log(res);
            _this.setData({
              isGetCode: true,
            });
            var DSQ = setInterval(function (num) {
              // console.log('doSomething');
              var dd = _this.__data__.time--;
              _this.setData({
                time: dd,
              });
              console.log(_this.__data__.time--);
              // console.log(num, 'id');
              if (dd == 1) {
                // console.log('我跑完了');
                // return;
                clearInterval(DSQ);
                _this.setData({
                  isGetCode: false,
                  time: 59,
                });
              }
            }, 1000);
          },
        });

        // console.log(DSQ, '这是啥');
      }
    } else {
      wx.showToast({
        title: '请' + _this.__data__.time + '秒后再试',
        icon: 'error',
        duration: 2000,
      });
    }
  },
  Code_YN(e) {
    console.log(e.detail.value);
    var _this = this;
    _this.setData({
      Index: e.detail.value,
    });
    if (e.detail.value.length == 4 && _this.__data__.phone.length == 11) {
      console.log('满足条件');
      _this.setData({
        isLogin: true,
      });
    } else {
      _this.setData({
        isLogin: false,
      });
    }
  },
  loginFn() {

    let that = this
    that.setData({
      isLogin:false
    })
    wx.getUserProfile({
      desc:'用于完善会员资料',
      success:(res)=>{
        that.setData({
          userInfo:res.userInfo
        });
        wx.showLoading({
          title: '正在登陆...',
          mask:true,
        })
        wx.login({
          success:(res)=>{
            wx.request({
              url: 'https://www.xiaohulaile.com/xh/p/wxcx/user/login',
              data:{
                code:res.code,
              },
              success:(res)=>{
                wx.request({
                  url: 'https://www.xiaohulaile.com/xh/p/xcx/user/phone_login',
                  data:{
                    wx_openid:res.data.data.openid,
                    nickname:that.__data__.userInfo.nickName,
                    sex:that.__data__.userInfo.gender,
                    head_logo:that.__data__.userInfo.avatarUrl,
                    phone:that.__data__.phone,
                    code:that.__data__.Index,
                    invitation:that.__data__.invitation
                  },
                  success:(res)=>{
                    console.log(res);
                    if (res.data.code == 200) {
                          wx.setStorage({
                            key: 'user',
                            data: res.data.data,
                          });
                          wx.reLaunch({
                            url: '/pages/index/index',
                          });
                          return;
                    }else{
                      wx.showToast({
                        title: res.data.msg,
                        icon:'error',
                      })
                      that.setData({
                        isLogin:true
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.invitation)
    this.setData({
      invitation:options.invitation
    })
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
