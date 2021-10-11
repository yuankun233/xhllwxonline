// pages/merchant/merchant.js
import { $myRequestW } from '../../utils/requestWadmin'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: '',
  },
  getList(user) {},
  /**
   * 生命周期函数--监听页面加载
   */
  navto: function (option) {
    console.log(option.currentTarget.id);
    wx.navigateTo({
      url: '/pages/merdetails/merdetails?id=' + option.currentTarget.id,
    });
  },
  //获取护理站列表
  async getNursingStation(res1) {
    const res = await $myRequestW({
      url: 'Nursing/index',
      data: {
        longitude: res1.longitude,
        latitude: res1.latitude
      }
    })
    console.log(res,'hlz');
    this.setData({
      list: res
    })
  },
  onLoad: function (options) {
    var _this = this;
        wx.getLocation({
          success(res1) {
            _this.getNursingStation(res1)
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
