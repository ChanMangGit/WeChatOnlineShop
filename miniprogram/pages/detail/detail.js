// pages/detail/detail.js
// 引入vant notify通知提示框
import Notify from 'vant-weapp/notify/notify';
import Dialog from 'vant-weapp/dialog/dialog'
// 初始化数据库
const db=wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认tab
    active:0,
    // 规格按钮默认第一个
    select:0,
    // tab跳转id
    currentTab: 0,
    // 保存商品图片 轮播图
    productPic:[],
    // 保存商品
    product:[],
    // 保存商品规格
    productSpec:[],
    // 保存客户端高度
    clientHeight:[],
    // 保存用户openId
    openId:[],
    // 保存购买数量
    num:1,
    // 视频覆盖层是否显示
    isShow:false,
    // 是否自动播放
    auto:false
  },
  // 覆盖层确认按钮
  confirm(){
    this.setData({
      isShow: true,
      auto: true
    })
  },
  // 覆盖层取消按钮
  cancel(){
    this.setData({
      isShow:true,
      auto:false
    })
  },
  // 判断是否为wifi
  isWifi(){
    var $this = this;
    wx.getNetworkType({
      success: function(res) {
        if(res.networkType=="wifi"){
          $this.setData({
            auto:true,
            isShow:true
          })
        }else{
          $this.setData({
            auto: false,
            isShow: false
          })
        }
      },
    })
  },
  // 数量按钮
  add(){
    var num = this.data.num+1
    this.setData({
      num:num
    })
  },
  sub(){
    var num=this.data.num
    num=num>1?num-1:num
    this.setData({
      num:num
    })
  },
  // 规格按钮
  spec:function(e){
    var pid = e.target.dataset.pid;
    var spec=e.target.dataset.spec;
    var index=e.target.dataset.index;
    this.setData({
      select:index
    })
    db.collection("product").where({pid:pid},{spec:spec}).get().then(res=>{
      // console.log(res.data);
      this.setData({
        product:res.data,
      })
    });
  },
  // 面板切换
  nav: function (e) {
    var $this = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      $this.setData({
        currentTab: id
      });
    }
    $this.setData({
      active: id
    });
  },
  // 加入购物车
  addCart:function(e){    
    var productlist = this.data.product
    console.log(productlist[0].fid)
    // 判断是否登录
    if (this.data.openId.length != 0){
      var openId=this.data.openId;
      var productPic=productlist[0].productPic;
      var price=productlist[0].price;
      var count=this.data.num;
      var title=productlist[0].title;
      var spec=productlist[0].spec;
      console.log(openId,productPic,price,count,title,spec);
      db.collection("cart").add({
        data:{
          openId:openId,
          productPic:productPic,
          price:price,
          count:count,
          title:title,
          spec:spec
        }
      }).then(res=>{
        Notify({
          text: '成功加入购物车！',
          duration: 2000,
          selector: '#custom-selector',
          backgroundColor: '#ff976a'
        });
        console.log("加入成功")
      }).catch(err=>{
        console.log(err)
      })
    }else{
      Dialog.alert({
        message: '请先登录！'
      }).then(() => {
        // on close
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 接收sort传过来的fid
    this.setData({
      fid:options.fid
    });  
    // let id = this.data.fid;
    var fid = parseInt(this.data.fid)
    // 轮播图 productPic表
    db.collection("productPic").where({fid:fid}).get().then(res=>{
      console.log(res.data)
      this.setData({
        productPic:res.data
      })
    }).catch(err=>{
      console.log(err)
    })
    // 查询product表
    db.collection("product").where({fid:fid}).get().then(res=>{
      console.log(res.data)
      var obj=res.data[0];
      // 把对象放入数组
      var arr=[];
      arr.push(obj);
      this.setData({
        product:arr
      })
    }).catch(err=>{
      console.log(err)
    })
    // 查询规格 product表
    db.collection("product").field({
      pid:true,
      spec:true
    }).where({ fid: fid }).get().then(res => {
      console.log(res.data)
      this.setData({
        productSpec: res.data
      })
    }).catch(err => {
      console.log(err)
    })
    // 获取客户端高度
    wx.getSystemInfo({   
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    // 获取用户openId
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        console.log(res.data);
        that.setData({
          openId:res.data
        })
      },
    })

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
    this.isWifi();
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