// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    address: '加载中..',
    list:'',
    lists:'',
    nurseList: [
      {
        name: "富护士",
        pic_url: "https://www.xiaohulaile.com/wxcx/startdoc/fhs.png",
        hlz: "上海常护通康护理站",
        message:
          "毕业于齐齐哈尔市医学院护理系，从事临床工作8年，持有专业护理证书，具有临床护理方面工作经验，熟练掌握长期卧床病人的各类导管护理（PICC维护、胃管插管、女病人导尿管更换），压疮换药，肌肉注射，导管维护的护理。"
      },
      {
        name: "李护士",
        pic_url: "https://www.xiaohulaile.com/wxcx/startdoc/lhs.png",
        hlz: "上海常护庙康护理站",
        message:
          "毕业于郑州医学院校护理专业，从事临床工作30年，持有执业护士证书，特别擅长造口、胃管、导尿管、各类外伤、换药。"
      },
      {
        name: "蒋护士",
        pic_url: "https://www.xiaohulaile.com/wxcx/startdoc/jhs.png",
        hlz: "上海常护通康护理站",
        message:
          "毕业于山西省太原市卫生学校，后就读于山西省职工医学院高级护理专业，从事急诊  ICU工作30年，具有丰富的临床抢救，日常护理常规，各项护理操作的经验。"
      },
      {
        name: "武护士",
        pic_url: "https://www.xiaohulaile.com/wxcx/startdoc/whs.png",
        hlz: "上海常护霞康护理站",
        message:
          "毕业于九江学院护理专业，从事临床护理工作9年，持有执业护士证书，具有丰富的内科、妇科等护理工作经验，熟练掌握肌肉注射、静脉穿刺、女性导尿管插管、Picc维护、造口护理等护理操作。尤其擅长肌肉注射、女性导尿管插管及维护、picc维护。"
      }
    ]
  },
  gostart(e) {
    console.log(e);
    const nurse = JSON.stringify(e.currentTarget.dataset.nurse);
    wx.navigateTo({
      url: `/pages/start/start?nurse=${nurse}`,
    });
  },
  tobanner1() {
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    });
  },
  tobanner2() {
    wx.switchTab({
      url: '/pages/message/message',
    });
  },
  tobanner3() {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    });
  },
  // 专业解答
  goSpecialty() {
    // wx.navigateTo({
    //   url: '/pages/specialty/specialty',
    // });
    wx.makePhoneCall({
      phoneNumber: '4009155291',
    });
  },
  goAppointment() {
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
        return;
      },
    });
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    });
  },
  go_eight(e) {
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
    console.log(e.currentTarget.dataset.id);
    if (
      // e.currentTarget.dataset.id == '1' ||
      // e.currentTarget.dataset.id == '3' ||
      // e.currentTarget.dataset.id == '5' ||
      // e.currentTarget.dataset.id == '6' ||
      e.currentTarget.dataset.id == '13' ||
      // e.currentTarget.dataset.id == '14' ||
      // e.currentTarget.dataset.id == '16' ||
      // e.currentTarget.dataset.id == '15'  ||
      e.currentTarget.dataset.id == '30' ||
      e.currentTarget.dataset.id == '32' ||
      e.currentTarget.dataset.id == '33' ||
      e.currentTarget.dataset.id == '16' ||
      e.currentTarget.dataset.id == '35' 
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
  goMap() {
    wx.navigateTo({
      url: '/pages/map/map',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data);
        },
        someEvent: function (data) {
          console.log(data);
        },
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.lists,'没有赋值前')
    wx.showLoading({
      title: '加载中...',
    })
    var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
    var qqmapsdk;

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'EXYBZ-NKXC3-BB53J-3FOMZ-LK7DQ-APF7G',
    });

    var that = this;
    // 调用接口
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      success: function (res) {
        // console.log(res);
        that.setData({
          address: res.result.address,
        });
      },
      fail: function (res) {},
      complete: function (res) {},
    });

      var _this = this;
          wx.request({
            url: 'https://www.xiaohulaile.com/xh/p/gw/project/get_list',
            header: {
              'content-type': 'application/json', // 默认值
            },
            data: {
              cate: 1
            },
            success(res) {
              _this.setData({
                list: res.data.data.data,
              });
            },
          });
          wx.request({
              url: 'https://www.xiaohulaile.com/xh/p/gw/project/get_list',
              header: {
                'content-type': 'application/json', // 默认值
              },
              data: {
                cate: 3
              },
              success(res) {
                _this.setData({
                  lists: res.data.data.data,
                });
                // console.log(_this.data.lists);
                wx.hideLoading()
              },
            });
  },
    goOrder(e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
          url: `/pages/order/order_eight/order_eight?index=${e.currentTarget.dataset.id}`,
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
