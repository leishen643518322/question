// app.js
import api from 'api/api.js'
import util from 'utils/util.js'
App({
  onLaunch() {
    let menuVersion = util.getMenuVersionIndex() || 0;
    api.systemInit().then(res=>{
      let category=res.category;
      console.log(category)
      let systemVersion = parseInt(category)
      if (systemVersion > menuVersion) {
        this.loadMenu(systemVersion);
      }else{
        console.log('题库分类已经最新无需加载');
      }
    })
    // 登录
    /*
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    */
  },
  loadMenu:function(systemVersion){
    api.getQuestionMenu(0).then(res =>{
      console.log('menu info ', res);
      wx.setStorageSync('cidInfo', res)
      util.setMenuVersionIndex(systemVersion);
    });
  },
  globalData: {
    userInfo: null
  },
  apis: api,
  utils: util
})
