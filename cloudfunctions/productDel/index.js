// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 初始化云数据库
const db=cloud.database();
const _ = db.command
// 删除多条数据
exports.main = async (event, context) => {
  try {
    return await db.collection("cart").where({
      _id:event._id,
      _openid:event._openid
    }).remove();
  } catch (e) {
    console.log(e);
  }
}