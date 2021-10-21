// pages/nurseList/nurseList.js
import {
  $myRequestTwo
} from '../../utils/qyyRequestTwo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nurseList:[],//数据
    text:""//简介
  },
  //封装护士列表
  async getList() {
    const res = await $myRequestTwo({
      url: 'attendant/api/starteam',
      data: {
      }
    })
    console.log(res,'护士列表接口')
    this.setData({
      nurseList: res
    })
  },
  //跳转护士详情
  goNurseMes(e) {
    wx.navigateTo({
      url: `../start/start?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取护士列表
    this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})