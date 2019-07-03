// pages/home/home.js
// 初始化数据库
const db=wx.cloud.database()
Page({
  data: {
    // 标签
    label:["热销","爆款","优惠"],
    // 商品列表
    productFamily:[],
    // 保存rba颜色数字
    r:0,
    g:0,
    b:0,
    // 轮播图地址
    imgUrls:[
      "cloud://web-test-01-7cis4.7765-web-test-01-7cis4/slidePic/slide1.jpg",
      "cloud://web-test-01-7cis4.7765-web-test-01-7cis4/slidePic/slide2.jpg",
      "cloud://web-test-01-7cis4.7765-web-test-01-7cis4/slidePic/slide3.jpg",
      "cloud://web-test-01-7cis4.7765-web-test-01-7cis4/slidePic/slide4.jpg"
    ]
  },
  // 搜索
  onSearch: function (event){
    // event.detail为输入的值
    console.log(event.detail)
    var name=event.detail;
    // 根据输入的商品名查询productFamily表找出对应的fid
    db.collection("productFamily").field({
      fid: true
    }).where({ name: name }).get().then(res => {
      console.log(res.data[0].fid)
      var fid = res.data[0].fid;
      wx.navigateTo({
        url: '/pages/detail/detail?fid=' + fid,
      })
    }).catch(err => {
      console.log(err)
    })
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
  // 产生随机rgba
  randomRgba(){
    // 随机生成50以内的值
    var r=Math.floor(Math.random()*85);
    var g = Math.floor(Math.random()*85);
    var b = Math.floor(Math.random()*85);
    this.setData({
      r:r,
      g:g,
      b:b
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载商品列表
    db.collection("productFamily").get().then(res => {
      // console.log(res.data);
      var product=res.data.pop();
      console.log(res.data)
      this.setData({
        productFamily: res.data
      });
    }).catch(err => {
      console.log(err);
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
    this.randomRgba();
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