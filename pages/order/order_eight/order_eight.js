// pages/order/order_eight/order_eight.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    times: [
      {
        id: 1,
        time: '08:00-12:00',
      },
      {
        id: 2,
        time: '13:00-18:00',
      },
      {
        id: 3,
        time: '18:00-22:00',
      },
    ],
    xdlc:[
      {text:"1.预约上门"},
      {text:"2.首诊评估"},
      {text:"3.签订知情通知书"},
      {text:"4.专项操作"},
      {text:"5.宣教指导"},
      {text:"6.记录、评价"}
    ],
    textnum:0,
    archive_id:'',
    time: '请选择被服务时间段',
    now: '',
    data: '请选择服务日期',
    checkbox: '',
    modalName: '',
    user: '',
    eightList: '',
    eightListLC: '',
    minute: 1,
    price: 0,
    p_price:0,
    index:0,
    total_fee:0,
    top:1,
    modalName:'',
    name:"请选择信息",
    nums: 1,
    numes: 1,
    xbxy:1,
    scrollTops:'',
    time_slot:'',
    text:'',
    isPay:false,
    mingxi:1,
    check:true
  },
  yuyuebottom(e){
    this.setData({
      check:''
    })
  },
  mingxis(){
    let that = this

    if (that.__data__.mingxi == 1) {
      that.setData({
        mingxi:2
      })
    }else{
      that.setData({
        mingxi:1
      })
    }

  },
  total(){
    let that = this;
    that.setData({
      total_fee: that.__data__.price
    })
  },
  xuyao(){
    var that = this
    that.setData({
      xbxy:1,
      // p_price:that.__data__.eightList.p_price,
      numes:1
    })
    that.total();
  },
  bxuyao(){
    var that = this
    that.setData({
      xbxy:2,
      // p_price:0,
      numes:1
    })
    that.total();
  },
  // 拟态框
  showModal(e) {
    console.log(1233);
    console.log(e,"这里");
    this.huoqubfw();
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
  },
  DateChange(e) {
    this.setData({
      data: e.detail.value,
    });
  },
  radioChange_1(e) {
    var _this = this;
    console.log(
      'radio发生change事件，携带index值为：',
      e.currentTarget.dataset.id
    );
    var _this = this;
    _this.setData({
      time_slot: e.detail.value,
      time: _this.__data__.times[e.detail.value - 1].time,
    });
  },
  huoqubfw:function(){
    console.log('12333333')
    var _this = this;

    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          users: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/my/archive', //仅为示例，并非真实的接口地址
          // url: 'https://159.75.47.247/xh/p/wxcx/my/archive',
          method: 'post',
          data: {
            user_token: res.data.user_token,
            my_id: res.data.my_id,
          },
          header: {
            'content-type': 'application/json', // 默认值
          },
          success(res) {
            console.log(res.data.data);
            _this.setData({ user_list: res.data.data });
          },
        });
      },
    });
  },
    //单选
    radioChange(e) {
      console.log(
        'radio发生change事件，携带index值为：',
        e.currentTarget.dataset.index
      );
      var _this = this;
      _this.setData({
        archive_id: e.detail.value,
      });
      var list = _this.__data__.user_list;
      var obj = list.find(function (obj) {
        return obj.id == e.detail.value;
      });
      console.log(obj);
      _this.setData({
        name: obj.name,
      });

    },
  // 订单数
  jiaFN(e) {
    console.log(e);
    var _this = this;
    if (e.currentTarget.dataset.id == -1) {
      if (_this.__data__.nums == 1) {
        return;
      } else {
        _this.setData({
          nums: _this.__data__.nums + parseInt(e.currentTarget.dataset.id),
        });
        _this.setData({
          numes:_this.__data__.nums
        })
        _this.setData({
          price:_this.__data__.nums*_this.__data__.eightList.price
        })
        if(_this.__data__.xbxy == 1){
          _this.setData({
            p_price:_this.__data__.numes*_this.__data__.eightList.p_price
          })
        }
        _this.total();
      }
      return;
    } else {
      _this.setData({
        nums: _this.__data__.nums + parseInt(e.currentTarget.dataset.id),
      });
      _this.setData({
        numes:_this.__data__.nums
      })
      //删除耗材包价格
      // if(_this.__data__.xbxy == 1){
      //   _this.setData({
      //     p_price:_this.__data__.numes*_this.__data__.eightList.p_price
      //   })
      // }
      _this.setData({
        price:_this.__data__.nums*_this.__data__.eightList.price
      })
      _this.total();
    }
  },
  jiaFNs(e) {
    var _this = this;
    if (e.currentTarget.dataset.id == -1) {
      if (_this.__data__.numes == 1) {
        return;
      } else {
        _this.setData({
          numes: _this.__data__.numes + parseInt(e.currentTarget.dataset.id),
        });
        //删除耗材包价格
        // _this.setData({
        //   p_price:_this.__data__.numes*_this.__data__.eightList.p_price
        // })
        _this.total();
      }
      return;
    } else {
      if(_this.__data__.numes < _this.__data__.nums){
        _this.setData({
          numes: _this.__data__.numes + parseInt(e.currentTarget.dataset.id),
        });
        //删除耗材包价格
        // _this.setData({
        //   p_price:_this.__data__.numes*_this.__data__.eightList.p_price
        // })
        _this.total();
      }else{
        wx.showToast({
          title: '材料包购买数量不得超过服务项目次数!',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },
  xiangshang(){
    let that = this
    const query = wx.createSelectorQuery()
    query.select('.order_eight_project').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){

        res[0].top       // #the-id节点的上边界坐标
        res[1].scrollTop // 显示区域的竖直滚动位置
        console.log(res[0].top)
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 500
         });
    })
  },
  xiangqing(){
    let that = this
    const query = wx.createSelectorQuery()
    query.select('.order_eight_2').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      that.setData({
        top:2,
      })
        res[0].top       // #the-id节点的上边界坐标
        res[1].scrollTop // 显示区域的竖直滚动位置
        console.log(res[0].top-50)
        wx.pageScrollTo({
          scrollTop: res[0].top-100,
          duration: 500
         });
    })
  },
  onPageScroll (e) { 
    let that = this
    if(e.scrollTop == 0){
      that.setData({
        top:1
      })
    }
    if(e.scrollTop > that.__data__.scrollTops-50 || e.scrollTop == that.__data__.scrollTops-50){
        that.setData({
          top:2
        })
    }
    },
  back(){
    wx.navigateBack({
      delta: 0,
    })
  },
  TJfn() {
    console.log('提交订单');
  },
  // 拟态框
  hideModal(e) {
    console.log('111');
    this.setData({
      modalName: null,
    });
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break;
      }
    }
    this.setData({
      checkbox: items,
    });
  },
  texts(e){
    console.log(e)
    if (e.detail.cursor > 100) {
      wx.showToast({
        title: '请输入一百字以内的描述!',
        icon: 'none',
        duration: 1500
      })
    }else{
      this.setData({
        text:e.detail.value,
        textnum:e.detail.cursor
      })
    }

  },
    // 付钱了
    payFn() {
      var _this = this;
      if (
        _this.__data__.archive_id == '' ||
        _this.__data__.data == '请选择服务日期' ||
        _this.__data__.time_slot == ''
      ) {
        wx.showToast({
          title: '请选择基本信息',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      if (_this.__data__.isPay) {
        return;
      }
      _this.setData({
        isPay: true,
      });
      console.log('付钱');
      wx.request({
        url: 'https://www.xiaohulaile.com/xh/p/wxcx/pay/pay',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        data: {
          body: _this.__data__.eightList.title,
          project_id: _this.__data__.eightList.id,
          num: _this.__data__.nums,
          total_fee: 0.01,
          archive_id: _this.__data__.archive_id,
          time_slot: _this.__data__.time_slot,
          content: _this.__data__.text,
          minute: 1,
          openid: _this.__data__.users.openid,
          start_time: _this.__data__.data,
          my_id: _this.__data__.users.my_id,
          consumables_num:_this.__data__.numes,
          consumables:_this.__data__.eightList.pid
        },
        success(res) {
          console.log(res, '看一下11');
          console.log(res.data, '22');
          console.log(res.header.Date,'时间');
          _this.setData({
            isPay: false,
          });
          if (res.data.code == 0) {
            wx.requestPayment({
              timeStamp: res.data.data.timeStamp,
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              signType: res.data.data.signType,
              paySign: res.data.data.paySign,
              success(res) {
                console.log(res, '成功');
                wx.redirectTo({
                  url: '/pages/order/order?index=0',
                });
              },
              fail(res) {
                console.log(res);
                console.log(_this.__data__.now,'时间');
                wx.redirectTo({
                  url: '/pages/order/order?index='+0,
                });
              },
            });
          } else if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
            });
          } else if (res.data.code == 2) {
            wx.navigateTo({
              url: '/pages/home/login/login',
            });
          }
        },
      });
    },
  // 勾选
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    this.setData({
      checkbox: e.detail.value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options.index, '参数');
    this.setData({
    index:options.index
    })
    var _this = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data);
        _this.setData({
          user: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/wxcx/project/index',
          header: {
            'content-type': 'application/json', // 默认值
          },
          method: 'post',
          data: {
            id: options.index,
            user_token: res.data.user_token,
          },
          success(res) {
            if(res.data.message == "请重新登录"){
              console.log(res,111111)
                wx.showToast({
                  title: '请先登录',
                  icon: 'none',
                  duration: 1000,
                });
                setTimeout(function () {
                  console.log('doSomething');
                  wx.reLaunch({
                    url: '/pages/login/login',
                  });
                }, 1000);
              }
            _this.setData({
              eightList: res.data.data,
              price: res.data.data.price,
              // p_price:res.data.data.p_price,
              total_fee:  _this.__data__.price
            });
            console.log(res.data.data,'数据')
            _this.setData({
              total_fee:_this.__data__.price
            })
            wx.hideLoading()
          },
        });
        
      },
      fail(res) {
        console.log(res)
        wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
        });
        setTimeout(function () {
        console.log('doSomething');
        wx.reLaunch({
        url: '/pages/login/login'
        });
        }, 1000);
        }
    });
    var datetime = new Date();
    var year = datetime.getFullYear(); //获取完整的年份(4位,1970)
    var month = (datetime.getMonth() + 1).toString().padStart(2,0); //获取月份(0-11,0代表1月,用的时候记得加上1)
    var hours = datetime.getHours().toString().padStart(2,0);
    var minute = datetime.getMinutes().toString().padStart(2,0);
    var second = datetime.getSeconds().toString().padStart(2,0);
    var date = datetime.getDate().toString().padStart(2,0); //获取日(1-31)

    var dateformat = year + '-' + month + '-' + date + '-' + hours + '-' + minute + '-' + second;
    this.setData({
      now:dateformat
    })
    const query = wx.createSelectorQuery()
    query.select('.order_eight_2').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      _this.setData({
        scrollTops:res[0].top   
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    var datetime = new Date();
    var year = datetime.getFullYear(); //获取完整的年份(4位,1970)
    var month = datetime.getMonth() + 1; //获取月份(0-11,0代表1月,用的时候记得加上1)
    if (month <= 9) {
      month = '0' + month;
    }
    var date = datetime.getDate(); //获取日(1-31)
    if (date <= 9) {
      date = '0' + date;
    }
    var dateformat = year + '-' + month + '-' + date;

    const query = wx.createSelectorQuery()
    query.select('.order_eight_2').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      _this.setData({
        scrollTops:res[0].top   
      })
    })
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
  onReachBottom: function () {
    this.setData({
      top:2
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
