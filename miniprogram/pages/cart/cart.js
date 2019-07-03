// pages/cart/cart.js
// 引入确认弹框
import Dialog from 'vant-weapp/dialog/dialog';
// 初始化数据库
const db=wx.cloud.database();
Page({
  data: {
    // popup弹出层
    show:false,
    // 购物车默认隐藏
    isHide:false,
    // 购物车默认显示
    isShow:true,
    // 保存用户openId
    openId:"",
    // 保存商品数组下标
    name:[],
    // 保存商品
    cart:[],
    // 全选复选框状态
    selectAll:false,
    // 总价
    total:0,
    // 复选框选中状态
    result:false,
    areaList: {
      province_list: {
        110000: '北京市',
        120000: '天津市'
      },
      city_list: {
        110100: '北京市',
        120100: '天津市',
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
        110105: '朝阳区',
        110106: '丰台区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区',
      
      }
    }
  },
  // popup弹出层
  open(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  // 删除按钮
  del(e){
    // 拿到所要删除的商品对应的下标
    var num = e.target.dataset.num;
    // 对应下标的标题
    var title = this.data.cart[num].title;
    var id=this.data.cart[num]._id;
    console.log(id);
    // 用户openId
    var openId=this.data.openId;
    console.log(openId)
    // 删除确认框
    Dialog.confirm({
      message:title
    }).then(() => {
      // 调用云函数
      wx.cloud.callFunction({
        name:"productDel",
        data:{
          _id:id,
          _openid:openId
        }
      }).then(res=>{
        // 删除成功后刷新页面
        this.loadCart()
      }).catch(err=>{
        console.log(err);
      })
    }).catch(() => {
      // on cancel
    });

  },
  // 复选框
  onChange(event) {
    // console.log(event.detail);
    // 有一个商品没勾上，全选按钮不勾
    this.setData({
      result:event.detail,
      selectAll:false
    });
    // 如果商品全部被勾上，全选按钮也勾上
    if (this.data.result.length == this.data.name.length){
      this.setData({
        selectAll:true
      })
    }
    // 总价 
    var price=0;
    // result为选中的下标的数组
    for(var num of this.data.result){
      console.log(num);
      price+=this.data.cart[num].price*this.data.cart[num].count
    }
    // price=price.toFixed(2);
    // 由于vant SubmitBar 提交订单栏价格单位是分
    price=price*100;
    this.setData({
      total:price
    })
    console.log(price);
    // var number = this.data.result;
    // console.log(this.data.cart[number].price)

  },
  // 全选
  selectAll(e){
    // 全选
    if(this.data.result!=this.data.name){
      this.setData({
        result: this.data.name,
        selectAll:true
      });
      // 总价 
      var price = 0;
      // result为选中的下标的数组
      for (var num of this.data.result) {
        console.log(num);
        price += this.data.cart[num].price * this.data.cart[num].count
      }
      // 由于vant SubmitBar 提交订单栏价格单位是分
      price = price * 100;
      this.setData({
        total: price
      })
    }else{
      // 反选
      this.setData({
        result:false,
        selectAll:false,
        total:0
      })
    }
    
  },
  // 加载购物车商品
  loadCart(){
    var arr = [];
    var openId=this.data.openId;
    if(openId){
      db.collection("cart").where({ openId:openId }).get().then(res => {
        this.setData({
          cart: res.data
        })
        if(res.data.length != 0) {
          // 购物车为空更改显示状态
          this.setData({
            isShow: false,
            isHide: true
          })
        }else {
          this.setData({
            isShow: true,
            isHide: false
          })
        }
        // 得到数组的下标为全选框准备
        for (var name in res.data) {
          arr.push(name);
        }
        // console.log(arr);
        this.setData({
          name: arr
        })
        // console.log(this.data.name);
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onload只加载一次
  onLoad: function (options) {
    // 获取用户openId
    wx.getStorage({
      key: 'openId',
      success: res=> {
        this.setData({
          openId:res.data
        })
      },
    });
    this.loadCart()
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
    this.loadCart()
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