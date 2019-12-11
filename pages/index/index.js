//index.js
//获取应用实例
const app = getApp()
Page({
  
  data: {
    showModal: false,
    inputPhone:'',

  },
  onLoad:function(){
     wx.showLoading({
       title: '加载中',
     })
  },
  onReady:function(){
    wx.hideLoading()
  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
     let phone = this.data.inputPhone
     let local = wx.getStorageSync('phone')
     if(local)
     {
       wx.showToast({
         title: '红包只能领取一次',
         icon:'none'
       })
       return
     }
     if(phone.length!= 11)
     {
       wx.showToast({
         title: '手机号不正确',
         icon: 'none'
       })
       return
     }
    let thisobj = this
       wx.request({
         url: 'https://www.aj-beef.com/api/deal.html',
         method: 'POST',
         header: {
           'content-type': 'application/x-www-form-urlencoded'
         },
         data: {
           act: 'get_hb',
           phone: phone
         },
         success: function (e) {
           
           if(!e.data.code)
            {
             wx.showToast({
               title: e.data.msg,
               success:function(){
                 setTimeout(function(){
                   thisobj.hideModal();
                 },1800)
               }
             })
             wx.setStorageSync('phone', phone)
            }
            else
            wx.showToast({
              title: e.data.msg,
              icon: 'none',
              success:function(){
                wx.setStorageSync('phone', phone)
              }
            })
         }
       })   
      
  },
  inputChange:function(e){
    let phone = e.detail.value    
    this.setData({
        inputPhone:phone
      })  

  },
  onShareAppMessage: function () {
    return {
      title: '西兰澳佳-进口原切牛排',
      desc: '新用户可领最高50元红包，使用无门槛'
    }

  }

})
