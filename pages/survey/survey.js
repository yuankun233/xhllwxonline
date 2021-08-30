// pages/survey/survey.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from1:{
      name:'',//名字
      ID:'',//身份证
      sex:'',//性别
      age:'',//年龄
      nation:'',//民族
      canbaodi:'',//参保地
      shinengTime:'请选择',//失能时间
      isTreat:'',//是否康复治疗
      mouth:'',//治疗月份
      phone:'',//手机号
      isApply:'',//是否首次申请
      safeWay:'',//保障方式
      education:'',//文化程度
      liveStatus:'',//居住情况
      livePlase:'',//居住地
      caregivers:''//照护者
    },
    from2:{
      name:'',
      relation:'',
      ID:'',
      phone:'',
      site:''
    }
  },
  next(){
    if (this.data.from1.name=== '' || this.data.from2.name=== '') {
      wx.showToast({
        title: '姓名为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.from1.ID=== '' || this.data.from2.ID=== '') {
      wx.showToast({
        title: '身份证为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.age=== '') {
      wx.showToast({
        title: '年龄为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.nation=== '') {
      wx.showToast({
        title: '民族为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.canbaodi=== '') {
      wx.showToast({
        title: '参保地为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.shinengTime=== '') {
      wx.showToast({
        title: '失能时间未选',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.mouth=== '') {
      wx.showToast({
        title: '治疗月数为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.from1.phone=== '' || this.data.from2.phone=== '') {
      wx.showToast({
        title: '联系电话为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.livePlase=== '' || this.data.livePlase=== '请输入') {
      wx.showToast({
        title: '居住地为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (this.data.site=== '') {
      wx.showToast({
        title: '联系地址为空',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    if (
      this.data.shinengTime=== '' || this.data.sex=== '' || this.data.isApply==='' ||
      this.data.safeWay=== '' || this.data.education=== '' || this.data.liveStatus=== '' ||
      this.data.caregivers=== '' || this.data.relation=== ''
    ) {
      wx.showToast({
        title: '有未选项',
        icon: 'error',
        duration: 2000,
      });
      return
    }
    wx.navigateTo({
      url: '../cfxform/cfxform',
    })
  },
  //name
  nameFn1(v){
    let name1 = 'from1.name'
    this.setData({
      [name1]:v.detail.value
    })
  },
  //身份证
  IDFn1(e){
    let ID1 = 'from1.ID'
    this.setData({
      [ID1]:e.detail.value
    })
  },
  //单选
  radioChange1(e){
    //性别
    if(e.target.id == 1){
      this.setData({
        sex:e.detail.value
      })
    }
    //是否康复治疗
    if(e.target.id == 2){
      this.setData({
        isTreat:e.detail.value
      })
    }
     //是否首次申请
     if(e.target.id == 3){
      this.setData({
        isApply:e.detail.value
      })
    }
     //保障方式
     if(e.target.id == 4){
      this.setData({
        safeWay:e.detail.value
      })
    }
    if(e.target.id == 5){
      this.setData({
        education:e.detail.value
      })
    }
    if(e.target.id == 6){
      this.setData({
        liveStatus:e.detail.value
      })
    }
    if(e.target.id == 7){
      this.setData({
        caregivers:e.detail.value
      })
    }
  },
  //年龄
  ageFn1(e){
    
    this.setData({
      age:e.detail.value
    })
    console.log(this.data.age);
  },
  //民族
  nationFn1(e){
    this.setData({
      nationFn1:e.detail.value
    })
  },
  //参保地
  canbaodiFn1(e){
    this.setData({
      canbaodi:e.detail.value
    })
  },
  //失能时间
  shinengTimeFn1(e){
    console.log(e);
    let shinengTime1 = 'from1.shinengTime'
    this.setData({
      [shinengTime1]:e.detail.value
    })
    console.log(this.data.from1.shinengTime);
  },
  //治疗月数
  mouthFn1(e){
    this.setData({
      mouth:e.detail.value
    })
  },
  //联系人手机号
  phoneFn1(e){
    let phone1 = 'from1.phone'
    this.setData({
      [phone1]:e.detail.value
    })
  },
//居住地
  livePlaseFn1(e){
      this.setData({
        livePlase:e.detail.value
      })
      console.log(this.data.livePlase);
    },

    //from2


  //name验证
  nameFn2(v){
    let name2 = 'from2.name'
    this.setData({
      [name2]:v.detail.value
    })
  },

  //评估对象关系
  radioChange(e) {
    this.setData({
      relation:e.detail.value
    })
  },
  //身份证号码
  IDFn2(e){
    let ID2 = 'from2.ID'
    this.setData({
      [ID2]:e.detail.value
    })
  },
  //电话
  phoneFn2(e){
    let phone2 = 'from2.phone'
    this.setData({
      [phone2]:e.detail.value
    })
  },
  //联系地址
  siteFn2(e) {
    this.setData({
      site:e.detail.value
    })
    console.log(this.data.site);
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