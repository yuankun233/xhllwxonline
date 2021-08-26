// pages/index/index.js
import {
  $myRequest
} from '../../utils/request'
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
    list: '',
    lists: '',
    nurseLists: '',
    specialtyLists: ''
  },
  //跳转到护士详情
  gostart(e) {
    console.log(e);
    const nurse = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/start/start?nurse=${nurse}`,
    });
  },
  //跳转到订单详情
  goOrder(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `/pages/order/order_eight/order_eight?index=${e.currentTarget.dataset.id}`,
    });
  },
  //跳转到关于我们
  tobanner1() {
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    });
  },
  //跳转到健康模块
  tobanner2() {
    wx.switchTab({
      url: '/pages/message/message',
    });
  },
  //项目列表
  tobanner3() {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    });
  },
  // 专业解答
  goSpecialty() {
    wx.makePhoneCall({
      phoneNumber: '4009155291',
    });
  },
  //点击跳转的时候未登录状态跳转到登录页面
  goAppointment() {
      wx.navigateTo({
        url: '/pages/appointment/appointment'
      });
    },
  //获取护士列表
  async getLsit() {
    const res = await $myRequest({
      url: '/nurse/list',
      data: {
        code: 0
      }
    })
    this.setData({
      nurseLists: res
    })
  },
  //获取专科护理列表
  async specialty() {
    const res = await $myRequest({
      url: '/project/get_list',
      data: {
        cate: 2
      }
    })
    this.setData({
      specialtyLists: res.data
    })
  },
   //获取临床护理列表
   async clinic() {
    const res = await $myRequest({
      url: '/project/get_list',
      data: {
        cate: 1
      }
    })
    this.setData({
      list: res.data
    })
    console.log(this.data.list);
  },
  //获取当前位置
  map() {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用获取护士列表
    this.getLsit();
    //调用获取专科护理列表
    this.specialty();
    //调用获取地图
    this.map();
    //调用获取临床护理列表
    this.clinic();
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
 // go_eight(e) {
  //   console.log('你好');
  //   wx.getStorage({
  //     key: 'user',
  //     fail(res) {
  //       wx.showToast({
  //         title: '请先登录',
  //         icon: 'none',
  //         duration: 1000,
  //       });
  //       setTimeout(function () {
  //         console.log('doSomething');
  //         wx.reLaunch({
  //           url: '/pages/login/login',
  //         });
  //       }, 1000);
  //     },
  //   });
  //   console.log(e.currentTarget.dataset.id);
  //   if (
  //     e.currentTarget.dataset.id == '13' ||
  //     e.currentTarget.dataset.id == '30' ||
  //     e.currentTarget.dataset.id == '32' ||
  //     e.currentTarget.dataset.id == '33' ||
  //     e.currentTarget.dataset.id == '16' ||
  //     e.currentTarget.dataset.id == '35'
  //   ) {
  //     wx.navigateTo({
  //       url: `/pages/order/order_eight/order_eight?index=${e.currentTarget.dataset.id}`,
  //     });
  //   } else {
  //     wx.showToast({
  //       title: '敬请期待....',
  //       icon: 'none',
  //       duration: 2000,
  //     });
  //   }
  // },
  // goMap() {
  //   wx.navigateTo({
  //     url: '/pages/map/map',
  //     events: {
  //       // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
  //       acceptDataFromOpenedPage: function (data) {
  //         console.log(data);
  //       },
  //       someEvent: function (data) {
  //         console.log(data);
  //       },
  //     },
  //     success: function (res) {
  //       // 通过eventChannel向被打开页面传送数据
  //       res.eventChannel.emit('acceptDataFromOpenerPage', {
  //         data: 'test'
  //       });
  //     },
  //   });
  // },