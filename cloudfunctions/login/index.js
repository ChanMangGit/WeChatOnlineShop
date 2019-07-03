// 云函数模板
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
// 获取用户openid
exports.main = async(event, context) => {
  console.log(event)
  console.log(context)
  // 返回用户信息
  return event.userInfo;
}
