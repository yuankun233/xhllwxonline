// pages/cfxform/cfxform.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    form: {
      feedsco:2, //进食  
      dresssco:2,
      bathtakesco:2,
      controlBodilysco:2,
      wcsco:2,
      transfersco:2,
    },
    form1:{
      feed:'', //进食  
      dress:'',// 穿衣
      bathtake:'', //洗澡
      controlBodilyFunctions:'', //大小便控制
      wc:'',//用厕
      transfer:'',//床椅转移
    },
    grade:'',
    topic1: [
      {
        type: 1,
        text: "独立，无需帮助",
        isActive: false
      },
      {
        type: 1,
        text: "部分独立，自己能吃，但需辅助",
        isActive: false
      },
      {
        type: 1,
        text: "不能独立完成，部分或全部靠喂食或鼻饲",
        isActive: false
      }
    ],
    topic2: [
      {
        type: 2,
        text: "独立，无需帮助，能独立拿取衣服，穿上并扣好",
        isActive: false
      },
      {
        type: 2,
        text: "部分独立，能独立拿去衣服及穿上，需帮助系鞋带",
        isActive: false
      },
      {
        type: 2,
        text: "不能独立完成，完全不能穿，要靠他人拿衣穿衣或自己穿上部分",
        isActive: false
      }
    ],
    topic3: [
      {
        type: 3,
        text: "独立，自己能够完全控制",
        isActive: false
      },
      {
        type: 3,
        text: "部分独立，偶尔失控",
        isActive: false
      },
      {
        type: 3,
        text: "不能自控，失控，需帮助处理大小便，如导尿，灌肠等",
        isActive: false
      }
    ],
    topic4: [
      {
        type: 4,
        text: "独立，无需帮助，能独立用厕、便后拭净及整理衣裤，可用手杖、助步器或轮椅，能处理便盆、尿壶",
        isActive: false
      },
      {
        type: 4,
        text: "不能独立完成，需要帮助如厕、做便后处理，清洁、整理衣裤及处理便盆、尿壶",
        isActive: false
      },
      {
        type: 4,
        text: "不能独立完成，不能用厕",
        isActive: false
      }
    ],
    topic5: [
      {
        type: 5,
        text: "独立，无须帮助，自己能进出浴室，淋浴、盆浴，独立洗澡",
        isActive: false
      },
      {
        type: 5,
        text: "部分独立，需帮助洗一部分，背部或腿",
        isActive: false
      },
      {
        type: 5,
        text: "不能独立完成，不能洗澡、或大部分需帮助洗",
        isActive: false
      }
    ],
    topic6: [
      {
        type: 6,
        text: "独立，无须帮助，自己能下场，坐上及离开椅、凳，可用手杖、助步器",
        isActive: false
      },
      {
        type: 6,
        text: "不能独立完成，需帮助上、下床椅",
        isActive: false
      },
      {
        type: 6,
        text: "不能独立完成，卧床不起",
        isActive: false
      }
    ],
    modelName:''
  },
  // 方法
  // 自定义单选
  radioChange(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type1
    let index = e.currentTarget.dataset.index
    let value = e.currentTarget.dataset.value
    console.log(type)
    //得分
    let score = ''
    if(index === 0){
      score = 2
    }else if(index === 1){
      score = 1
    }else if(index === 2){
      score = 0
    }
    
    if (type == 1) {
      console.log(type, index,value)
      //1 遍历所有选项，勾选状态变为false
      this.data.topic1.forEach((item, index) => {
        let key = `topic1[${index}].isActive`
        this.setData({
          [key]: false
        })
      }) // 先把所有的单选状态变为false

      // 2.再把当前点击的变为true
      let key = `topic1[${index}].isActive`
      this.setData({
        [key]: true
      })

      // 3.储存到data
      let key2 = `form.feedsco`
      this.setData({
        [key2]: score
      })
      let key3 = `form1.feed`
      this.setData({
        [key3]: value
      })
    }
    if (type == 2) {
      console.log(type, index)

      //1 遍历所有选项，勾选状态变为false
      this.data.topic2.forEach((item, index) => {
        let key = `topic2[${index}].isActive`
        this.setData({
          [key]: false
        })
      }) // 先把所有的单选状态变为false

      // 2.再把当前点击的变为true
      let key = `topic2[${index}].isActive`
      this.setData({
        [key]: true
      })

      // 3.储存到data
      let key2 = `form.dresssco`
      this.setData({
        [key2]: score
      })
      //
      let key3 = `form1.dress`
      this.setData({
        [key3]: value
      })
    }
    if (type == 3) {
      console.log(type, index)

      //1 遍历所有选项，勾选状态变为false
      this.data.topic3.forEach((item, index) => {
        let key = `topic3[${index}].isActive`
        this.setData({
          [key]: false
        })
      }) // 先把所有的单选状态变为false

      // 2.再把当前点击的变为true
      let key = `topic3[${index}].isActive`
      this.setData({
        [key]: true
      })

      // 3.储存到data
      let key2 = `form.controlBodilysco`
      this.setData({
        [key2]: score
      })
      //
      let key3 = `form1.controlBodilyFunctions`
      this.setData({
        [key3]: value
      })
    }
    if (type == 4) {
      console.log(type, index)

      //1 遍历所有选项，勾选状态变为false
      this.data.topic4.forEach((item, index) => {
        let key = `topic4[${index}].isActive`
        this.setData({
          [key]: false
        })
      }) // 先把所有的单选状态变为false

      // 2.再把当前点击的变为true
      let key = `topic4[${index}].isActive`
      this.setData({
        [key]: true
      })

      // 3.储存到data
      let key2 = `form.wcsco`
      this.setData({
        [key2]: score
      })
      //
      let key3 = `form1.wc`
      this.setData({
        [key3]: value
      })
    }
    if (type == 5) {
      console.log(type, index)

      //1 遍历所有选项，勾选状态变为false
      this.data.topic5.forEach((item, index) => {
        let key = `topic5[${index}].isActive`
        this.setData({
          [key]: false
        })
      }) // 先把所有的单选状态变为false

      // 2.再把当前点击的变为true
      let key = `topic5[${index}].isActive`
      this.setData({
        [key]: true
      })

      // 3.储存到data
      let key2 = `form.bathtakesco`
      this.setData({
        [key2]: score
      })
      //
      let key3 = `form1.bathtake`
      this.setData({
        [key3]: value
      })
    }
    if (type == 6) {
      console.log(type, index)

      //1 遍历所有选项，勾选状态变为false
      this.data.topic6.forEach((item, index) => {
        let key = `topic6[${index}].isActive`
        this.setData({
          [key]: false
        })
      }) // 先把所有的单选状态变为false

      // 2.再把当前点击的变为true
      let key = `topic6[${index}].isActive`
      this.setData({
        [key]: true
      })

      // 3.储存到data
      let key2 = `form.transfersco`
      this.setData({
        [key2]: score
      })
      //
      let key3 = `form1.transfer`
      this.setData({
        [key3]: value
      })
    }
  },
  // 提交表单
  submit(e) {
    let _this = this
    let form = _this.data.form
    let form1 = _this.data.form1
    let flag = Object.values(_this.data.form1).every(function(item) {
      return item != ''
   })
   console.log(flag)
   if (flag == false) {
    wx.showToast({
     title: '有未填选项',
     icon: 'none'
    })
    return
   }
    console.log(form1);
    console.log(form);
    wx.request({
      url: 'https://www.qycloud.com.cn/bee/open-72810619931328627/xhll/Level/numberTwo', 
      method:'post',
      data: {
            id:_this.data.id,
            ...form,
            ...form1
        },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        _this.setData({
          grade:res.data.data.grade
        })
        if(_this.data.grade!=''){
          _this.setData({
            modalName: e.currentTarget.dataset.target
          }) 
        }
      },
    });
      },
      //关闭模态框跳转到我的
      closeHint() {
        this.setData({
          modalName: null
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '../my/my',
          })
        }, 1000);
      },

      //
  onLoad: function (options) {
        console.log(options);
        this.setData({
          id:options.id
        })
      },
})
