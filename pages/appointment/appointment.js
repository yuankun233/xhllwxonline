// pages/appointment/appointment.js
import {
  $myRequest
} from "../../utils/request"
Page({
  /**
   * 页面的初始数据
   */
  data() {
    return {
      //tab标题
      title: '预约服务',
      //是否分享
      ifFx: false,
      //专科列表
      zkserveList: '',
      //临床列表
      lcserveList: '',
      //居家康复
      jjserveList: '',
      useNum1:[
      {
        num:160
      },
      {
        num:161
      }, {
        num:160
      }
      ]
    }
  },
  onLoad() {
    this.getserveList()
  },
  //请求数据
  async getserveList() {
    const res = await $myRequest({
      url: '/project/get_list',
      methods: 'POST',
      data: {
        cate: 2
      }
    })
    
    this.setData({
      zkserveList: res.data
    });
    console.log(this.data.zkserveList)
            // this.data.zkserveList = res.data
            // console.log(this.data.zkserveList,"4444444")
    
    const res1 = await $myRequest({
    	url: '/project/get_list',
    	methods: 'POST',
    	data: {
    		cate: 1
    	}
    })
    console.log(res1,"res1的值")
    this.setData({
      lcserveList: res1.data
    });

    // this.lcserveList = res1.data.selectItems
    const res2 = await $myRequest({
    	url: '/project/get_list',
    	methods: 'POST',
    	data: {
    		cate: 3
    	}
    })
    console.log(res2,"res2的值")
    this.setData({
      jjserveList: res2.data
    });
    //返回上一个页面
  },

  //跳转项目详情
  goOrder(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
       url: `/pages/order/order_eight/order_eight?index=${e.currentTarget.dataset.id}`
    })
  },


  mounted() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});