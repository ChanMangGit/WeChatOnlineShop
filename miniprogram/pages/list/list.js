// pages/list/list.js
// 初始化数据库
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fid:[],
    list:[]
   
  },
  // 跳转到详情页
  jumpDetail: function (e) {
    // 获取商品id
    // e事件对象；target 触发事件元素 ；dataset所有自定义属性
    var fid = e.target.dataset.fid;
    // 跳转:保留并且跳转
    wx.navigateTo({
      url: '/pages/detail/detail?fid=' + fid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存传过来的fid
    var arr=[];
    // 保存查询到的商品
    var list=[]
    // 得到传过来fid数组
    this.setData({
      fid:options.fid
    }); 
    var fid=this.data.fid
    // 切割字符串成数组
    arr=fid.split(",")
    for(fid of arr){
      // 把数组中的fid字符串转为数字
      fid=parseInt(fid)
      db.collection("productFamily").where({
        fid:fid
      }).get().then(res=>{
        // 拼接数组
        list=list.concat(res.data)
        this.setData({
          list:list
        })
        console.log(this.data.list)
      }).catch(err=>{
        console.log(err)
      })
    }
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