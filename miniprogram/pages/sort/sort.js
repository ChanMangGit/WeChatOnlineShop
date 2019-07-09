// pages/sort/sort.js
// 初始化数据库
const db=wx.cloud.database();
Page({
  data: {
    // 默认tab
    active:0,
    // tab跳转
    currentTab:0,
    // 保存商品列表
    productFamily:[]
  },
  // 搜索
  onSearch: function (event) {
    var fid = [];
    // event.detail为输入的值
    console.log(event.detail);
    var name = event.detail;
    // 根据输入的商品名查询productFamily表找出对应的fid
    db.collection("productFamily").where({
      name: db.RegExp({
        regexp: name,
        options: "i"
      })
    }).get().then(res => {
      for (var num in res.data) {
        // console.log(res.data[num].fid)
        fid.push(res.data[num].fid)
      }
      console.log(fid);
      wx.navigateTo({
        url: '/pages/list/list?fid=' + fid,
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 侧边导航栏跳转
  switchNav: function (e) {
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
  // 跳转到详情页
  jumpDetail:function(e){
    // 获取商品id
    // e事件对象；target 触发事件元素 ；dataset所有自定义属性
    var fid=e.target.dataset.fid;
    // 跳转:保留并且跳转
    wx.navigateTo({
      url: '/pages/detail/detail?fid='+fid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载商品列表
    db.collection("productFamily").get().then(res=>{
      // console.log(res.data);
      this.setData({
        productFamily:res.data
      });
    }).catch(err=>{
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