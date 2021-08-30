// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    invitation:'',
    isShow: false,
    isClose: false,
    nickName: null,
    avatarUrl: null,
    gender: null,
    modalName: '',
    code: '',
    sessionKey: '',
    openid: '',
    userInfo: '',
  },
  userAgreementC() {
    console.log(111);
    wx.navigateTo({
      url: '/pages/fill/Fill',
    });
  },
  loginWx() {
    let _this = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo,'userInfo');
        this.setData({
          userInfo: res.userInfo,
          // hasUserInfo: true,
        });
        wx.login({
          success(res) {
            console.log(res.code,'kanyixia');
            _this.setData({ code: res.code });
            // return;
            if (!_this.isgetUserInfo) {
              console.log('执行isgetUserInfo');
              _this.setData({
                isgetUserInfo: true,
              });
              wx.getUserInfo({
                provider: 'weixin',
                success: function (infoRes) {
                  wx.showLoading({
                    title: '正在登陆...',
                    mask:true,
                  })
                  //获取用户信息后向调用信息更新方法
                  _this.setData({
                    nickName: infoRes.userInfo.nickName,
                    avatarUrl: infoRes.userInfo.avatarUrl,
                    gender: infoRes.userInfo.gender,
                  });
                  wx.request({
                    url: 'https://www.xiaohulaile.com/xh/p/wxcx/user/login',
                    header: {
                      'content-type': 'application/json', // 默认值
                    },
                    data: {
                      code: _this.__data__.code,
                    },
                    success(res) {
                      console.log(res.data.message, '1111122323');
                      console.log(res,'key');
                      // console.log(res.data.data.sessionKey);
                      // console.log(res.data.data.openid);
                      if (res.data.message == 2) {
                        console.log('我已有手机号,直接登录');
                        wx.setStorage({
                          key: 'user',
                          data: res.data.data,
                        });
                        wx.reLaunch({
                          url: '/pages/index/index',
                        });
                        return;
                      }
                      wx.hideLoading()
                      _this.setData({ 
                        modalName: 1,
                        sessionKey: res.data.data.sessionKey,
                        openid: res.data.data.openid,
                      });
                    },
                  });
                  // _this.getInfoOver();
                  console.log('querenhpou');
                },
                fail: function (res) {
                  console.log('errMsg : ' + res.errMsg);
                  // _this.$showMyToast(res.errMsg ? res.errMsg : '用户信息获取失败');
                  // wx.showModal({
                  //   title: '提示',
                  //   content: '用户信息获取失败',
                  //   success(res) {
                  //     if (res.confirm) {
                  //       console.log('用户点击确定');
                  //     } else if (res.cancel) {
                  //       console.log('用户点击取消');
                  //     }
                  //   },
                  // });
                  _this.setData({
                    isgetUserInfo: false,
                  });
                },
              });
            }
          },
        });
      },
    });
  },
  getPhoneNumber(e) {
    wx.showLoading({
      title: '正在登陆...',
      mask:true,
    })
    var _this = this;
    console.log(e.detail.errMsg, 'cuow1');
    console.log(e.detail.iv, 'iv');
    console.log(e.detail.encryptedData, '111');
        if (e.detail.iv == undefined || e.detail.encryptedData == undefined) {
            return;
          }
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/wxcx/user/wx_phone',
      header: {
        'content-type': 'application/json', // 默认值

      },
      data: {
        sessionKey: _this.__data__.sessionKey,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        nickName: _this.__data__.userInfo.nickName,
        avatarUrl: _this.__data__.userInfo.avatarUrl,
        gender: _this.__data__.userInfo.gender,
        openid: _this.__data__.openid,
        invitation:_this.__data__.invitation
      },
      success(res) {
        console.log(res, '看看是啥');
        wx.setStorage({
          key: 'user',
          data: res.data.data,
        });
        wx.reLaunch({
          url: '/pages/index/index',
        });
        return;
      },
      fail(res){
        wx.hideLoading()
        wx.showToast({
          title: '不输入手机号不允许进入小程序',
          icon: 'error',
          duration: 2000
        })
      }
    });
  },

  loginIphone() {
    wx.navigateTo({
      url: '/pages/phone/phone?invitation='+this.__data__.invitation,
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    this.setData({
      invitation: gup('id',decodeURIComponent(options.q))
    })
    function gup(name, url) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\\?&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(url);
      return results == null ? null : results[1];
    }
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
