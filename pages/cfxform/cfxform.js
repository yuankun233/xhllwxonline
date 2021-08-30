// pages/cfxform/cfxform.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      topic1: "独立，无需帮助",
      topic2: "独立，无需帮助，能独立拿取衣服，穿上并扣好",
      topic3: "独立，自己能够完全控制",
      topic4:
        "独立，无需帮助，能独立用厕、便后拭净及整理衣裤，可用手杖、助步器或轮椅，能处理便盆，尿壶",
      topic5: "独立，无需帮助，自己能进出浴室，淋浴、浴盆，独立洗澡",
      topic6: "独立，无需帮助，能自己下场，坐上及离开椅，凳，可用手杖、助步器",
      grade: ""
    },
    topic1: [
      {
        type: 1,
        text: "独立，无需帮助",
        isActive: true
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
        isActive: true
      },
      {
        type: 2,
        text: "部分独立，能独立拿取衣服及穿上，需帮助系鞋带",
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
        isActive: true
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
        text: "独立，无需帮助，能独立用厕、便后拭净及整理衣裤，可用手杖、助步器或轮椅，能处理便盆，尿壶",
        isActive: true
      },
      {
        type: 4,
        text: "不能独立完成，需要帮助入厕、做便后处理，清洁、整理衣裤及处理便盆、尿壶",
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
        text: "独立，无需帮助，自己能进出浴室，淋浴、浴盆，独立洗澡",
        isActive: true
      },
      {
        type: 5,
        text: "部分独立，需帮助洗一部分，背部或腿",
        isActive: false
      },
      {
        type: 5,
        text: "不能独立完成，不能洗澡、或大部分需要帮助洗",
        isActive: false
      }
    ],
    topic6: [
      {
        type: 6,
        text: "独立，无需帮助，能自己下场，坐上及离开椅，凳，可用手杖、助步器",
        isActive: true
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
    ]
  },
  // 方法
  // 自定义单选
  radioChange(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type1
    let index = e.currentTarget.dataset.index
    console.log(type)
    if (type == 1) {
      console.log(type, index)

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
      let key2 = `form.topic1`
      this.setData({
        [key2]: this.data.topic1[index].text
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
      let key2 = `form.topic2`
      this.setData({
        [key2]: this.data.topic2[index].text
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
      let key2 = `form.topic3`
      this.setData({
        [key2]: this.data.topic3[index].text
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
      let key2 = `form.topic4`
      this.setData({
        [key2]: this.data.topic4[index].text
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
      let key2 = `form.topic5`
      this.setData({
        [key2]: this.data.topic5[index].text
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
      let key2 = `form.topic6`
      this.setData({
        [key2]: this.data.topic6[index].text
      })
    }
  },
  // 自评单选
  myRadio(e) {
    let value = e.detail.value
    let key = `form.grade`
    this.setData({
      [key]: value
    })
    console.log(value)
  },
  // 提交表单
  submit() {
    console.log(this.data.form)
        wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 2000,
            });
            setTimeout(() => {
              wx.reLaunch({
                url: '../my/my',
              })
            }, 1000);
      }
})
