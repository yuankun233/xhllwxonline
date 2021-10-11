// pages/merdetails/merdetails.js
import { $myRequestW } from '../../utils/requestWadmin'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    list:''
  },
  back(){
    wx.navigateBack({})
  },
  //调用导航
  daohang:function(){
    let _this = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = parseFloat(_this.__data__.list.latitude)
        console.log(latitude);
        const longitude = parseFloat(_this.__data__.list.longitude)
        const name = _this.__data__.list.name
        const address = _this.__data__.list.address
        wx.openLocation({
          latitude,
          longitude,
          name,
          address,
          scale: 18
        })
      }
     })
  },
  //拨打电话
  goSpecialty() {
    wx.makePhoneCall({
      phoneNumber: '4009155291',
    });
  },
  //获取护理站详情
  async getNursingStationDetail(options) {
    const res = await $myRequestW({
      url: 'Nursing/get_data',
      data: {
        nursing_id:options.id
      }
    })
    this.setData({
      list: res
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNursingStationDetail(options)
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