// pages/survey/survey.js
import {
  $myRequest
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form1:{
      name:'',//名字
      ID:'',//身份证
      sex:'',//性别
      age:'',//年龄
      nation:'',//民族
      canbaodi:'',//参保地
      shinengTime:'',//失能时间
      isTreat:'',//是否康复治疗
      mouth:'',//治疗月份
      phone:'',//手机号
      isApply:'',//是否首次申请
      safeWay:'',//保障方式
      education:'',//文化程度
      liveStatus:'',//居住情况
      livePlace:'',//居住地
      caregivers:''//照护者
    },
    form2:{
      name1:'',//姓名
      relation:'',//与评估对象关系
      ID1:'',//身份证号
      phone1:'',//联系电话
      site:''//联系地址
    }
  },
  next(){
    console.log(this.data.form1);
    console.log(this.data.form2);
    let form1 = this.data.form1
    let form2 = this.data.form2
    if (this.data.form1.name=== '') {
      wx.showToast({
        title: '姓名为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.age=== '') {
      wx.showToast({
        title: '年龄为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.nation=== '') {
      wx.showToast({
        title: '民族为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.canbaodi=== '') {
      wx.showToast({
        title: '参保地为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.mouth=== '' && this.data.form1.isTreat === '是') {
      wx.showToast({
        title: '治疗月数为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.livePlase=== '') {
      wx.showToast({
        title: '居住地为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form2.name1=== '') {
      wx.showToast({
        title: '姓名为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form2.site=== '') {
      wx.showToast({
        title: '联系地址为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.shinengTime=== '') {
      wx.showToast({
        title: '失能时间未选',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.ID=== '') {
      wx.showToast({
        title: '身份证为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form1.phone=== '') {
      wx.showToast({
        title: '联系电话为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form2.phone1=== '') {
      wx.showToast({
        title: '联系电话为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.form2.ID1=== '') {
      wx.showToast({
        title: '身份证为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (
      this.data.form1.shinengTime=== '' || this.data.form1.sex=== '' || this.data.form1.isApply==='' ||
      this.data.form1.safeWay=== '' || this.data.form1.education=== '' || this.data.form1.liveStatus=== '' ||
      this.data.form1.caregivers=== '' || this.data.form2.relation=== ''
    ) {
      wx.showToast({
        title: '有未选项',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    wx.request({
      url: 'https://www.qycloud.com.cn/bee/open-72810619931328601/ApplicationDate/getLongTermCareRiskAssessment', 
      method:'post',
      data: {
        ...form1,
        ...form2
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success:(res)=> {
        console.log(res.data.data.recordId,'id');
        if(res.data.data.recordId!=""){
            wx.navigateTo({
              url: `../cfxform/cfxform?id=${res.data.data.recordId}`,
            })
        }
      },
    });
  },
  //失去焦点判断格式
  ifInp2() {
     if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.form1.ID))){
      wx.showToast({
        title: '身份证格式错误',
        icon: 'error',
        duration: 2000,
      });
      return
    }
  },
  ifInp7() {
     if(!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.form1.phone))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error',
        duration: 2000,
      });
      return
    }
  } ,
  ifInp10() {
    if(!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.form2.phone1))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error',
        duration: 2000,
      });
      return
    }
  } ,
  ifInp11() {
    if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.form2.ID1))){
      wx.showToast({
        title: '身份证格式错误',
        icon: 'error',
        duration: 2000,
      });
      return
    }
  },
  //name
  nameFn1(v){
    let name1 = 'form1.name'
    this.setData({
      [name1]:v.detail.value
    })
  },
  //身份证
  IDFn1(e){
    let ID1 = 'form1.ID'
    this.setData({
      [ID1]:e.detail.value
    })
  },
  //单选
  radioChange1(e){
    //性别
    if(e.target.id == 1){
      let sex = 'form1.sex'
      this.setData({
        [sex]:e.detail.value
      })
    }
    //是否康复治疗
    if(e.target.id == 2){
      let isTreat = 'form1.isTreat'
      this.setData({
        [isTreat]:e.detail.value
      })
    }
     //是否首次申请
     if(e.target.id == 3){
      let isApply = 'form1.isApply'
      this.setData({
        [isApply]:e.detail.value
      })
    }
     //保障方式
     if(e.target.id == 4){
      let safeWay = 'form1.safeWay'
      this.setData({
        [safeWay]:e.detail.value
      })
    }
    if(e.target.id == 5){
      let education = 'form1.education'
      this.setData({
        [education]:e.detail.value
      })
    }
    if(e.target.id == 6){
      console.log(e.target.id);
      let liveStatus = 'form1.liveStatus'
      this.setData({
        [liveStatus]:e.detail.value
      })
      console.log(this.data.form1.liveStatus,'123');
    }
    if(e.target.id == 7){
      let caregivers = 'form1.caregivers'
      this.setData({
        [caregivers]:e.detail.value
      })
    }
    console.log(this.data.form1.caregivers,'123');
  },
  //年龄
  ageFn1(e){
    let age = 'form1.age'
    this.setData({
      [age]:e.detail.value
    })
  },
  //民族
  nationFn1(e){
    let nationFn1 = 'form1.nation'
    this.setData({
      [nationFn1]:e.detail.value
    })
  },
  //参保地
  canbaodiFn1(e){
    let canbaodi = 'form1.canbaodi'
    this.setData({
      [canbaodi]:e.detail.value
    })
  },
  //失能时间
  shinengTimeFn1(e){
    let shinengTime1 = 'form1.shinengTime'
    this.setData({
      [shinengTime1]:e.detail.value
    })
  },
  //治疗月数
  mouthFn1(e){
    let mouth = 'form1.mouth'
    this.setData({
      [mouth]:e.detail.value
    })
  },
  //联系人手机号
  phoneFn1(e){
    let phone1 = 'form1.phone'
    this.setData({
      [phone1]:e.detail.value
    })
  },
//居住地
  livePlaceFn1(e){
      let livePlace = 'form1.livePlace'
      this.setData({
        [livePlace]:e.detail.value
      })
    },

    //from2


  //name验证
  nameFn2(v){
    let name2 = 'form2.name1'
    this.setData({
      [name2]:v.detail.value
    })
  },

  //评估对象关系
  radioChange(e) {
    let relation = 'form2.relation'
    this.setData({
      [relation]:e.detail.value
    })
  },
  //身份证号码
  IDFn2(e){
    let ID2 = 'form2.ID1'
    this.setData({
      [ID2]:e.detail.value
    })
  },
  //电话
  phoneFn2(e){
    let phone2 = 'form2.phone1'
    this.setData({
      [phone2]:e.detail.value
    })
  },
  //联系地址
  siteFn2(e) {
    let site = 'form2.site'
    this.setData({
      [site]:e.detail.value
    })
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
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