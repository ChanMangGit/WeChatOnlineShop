// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName:1,
    // 保存头像
    avatar:'../../images/avatar.png',
    // 保存用户名
    name:"授权登录",
    // 判断是否授权
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },

  onGotUserInfo:function(e){
    // 获取用户信息
    console.log(e.detail.userInfo);
    this.setData({
      avatar: e.detail.userInfo.avatarUrl,
      name: e.detail.userInfo.nickName
    })
    // 获取用户openId
    // 调用云函数
    wx.cloud.callFunction({
      name: "login",
      complete: res => {
        // console.log(res.result.openId)
        // 本地缓存，保存用户openId
        wx.setStorage({
          key: 'openId',
          data: res.result.openId,
        })
      },
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