// pages/indexfb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    funlist:[
      {
        img:'../../images/syImage/wenzhen.png',
        title:'极速问诊',
        mes:'专人在线答疑'
      },
      {
        img:'../../images/syImage/ystb.png',
        title:'在线医生',
        mes:'一键语音问诊'
      },
      {
        img:'../../images/syImage/yyfw.png',
        title:'预约服务',
        mes:'按需求找服务'
      },
    ],
    wdlist:[
      {
        img1:'../../images/syImage/wen.png',
        mes1:'小护你好：你们上门会带些什么工具？',
        

      },
      {
        img1:'../../images/syImage/da.png',
        mes1:'你好,我们护士上门会带一些健康测量的工具的,如血压器等。也会根据服务的内容准备好相应的物品。'
      },
      {
        img1:'../../images/syImage/wen.png',
        mes1:'小护你好,我表哥刚做完腹膜透析,那个肚子里的管子一直要放在里面的？全家人都很担心',
      },
      {
        img1:'../../images/syImage/da.png',
        mes1:'你好,一般来说腹膜透析是终生的治疗方案之一,但各项条件允许的话可以进行肾移植。那么可以停止腹膜透析治疗了。'
      }
    ],
    address:''//地址
  },
  //获取地理位置
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
        that.setData({
          address: res.result.address_component.city.substring(0,2)
        });
      },
      fail: function (res) {},
      complete: function (res) {},
    });
  },
  //功能
  goSpecialty(e) {
   console.log();
   if(e.currentTarget.dataset.id == 1) {
    wx.makePhoneCall({
      phoneNumber: '4009155291',
    });
   }
   if(e.currentTarget.dataset.id == 2) {
    wx.navigateTo({
      url: '/pages/appointment/appointment'
    });
   }
  },
   //跳转到订单详情
  goOrder(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `/pages/order/order_eight/order_eight?index=${e.currentTarget.dataset.id}`,
    });
  },
  //跳转机构护士
  goMes(e) {
    if(e.currentTarget.dataset.id == 0) {
      wx.switchTab({
        url: '../merchant/merchant',
      })
    }else if(e.currentTarget.dataset.id == 1) {
      wx.navigateTo({
        url: '../nurseList/nurseList',
      })
    }
  },

    // 处理url
    parseQuery(url) {
      var queryObj={};
      var reg=/[?&]([^=&#]+)=([^&#]*)/g;
      var querys=url.match(reg);
      if(querys){
          for(var i in querys){
              var query=querys[i].split('=');
              var key=query[0].substr(1),
                  value=query[1];
              queryObj[key]?queryObj[key]=[].concat(queryObj[key],value):queryObj[key]=value;
          }
      }
      return queryObj;
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const q = decodeURIComponent(options.q) // 获取到二维码原始链接内容
    let params = this.parseQuery(q)//处理获取的参数
    console.log("二维码携带参数:",params)
    wx.setStorageSync('tid', params.tid)
    //调用获取地图
    this.map();
  }
})