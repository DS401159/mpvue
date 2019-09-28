
<<<<<<< HEAD
=======
const header = {'content-type': 'application/json'};

if(wx.getStorageSync("token")){
  header['token'] = wx.getStorageSync("token");
}
>>>>>>> 1246c008f1af074febc61a2ea3d24f79f40cfe21

exports.http = function({url,method,data,success}){
    wx.showLoading({title: '加载中'});
    wx.request({
      url,
      method,
      data,
<<<<<<< HEAD
      header: {
        'content-type': 'application/json' // 默认值
      },
=======
      header,
>>>>>>> 1246c008f1af074febc61a2ea3d24f79f40cfe21
      success:res=>{
        wx.hideLoading();
        wx.showToast({
          title:res.data.msg
        });
        success(res);
      }
    })
}

// "https://peng47.com:2906/react/sendCode"