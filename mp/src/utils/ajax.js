

const header = {'content-type': 'application/json'};

if(wx.getStorageSync("token")){
  header['token'] = wx.getStorageSync("token");
}

exports.http = function({url,method,data,success}){
    wx.showLoading({title: '加载中'});
    wx.request({
      url,
      method,
      data,
      header,
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