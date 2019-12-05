// pages/cook/cook.js
Page({

  data: {

  },

  onLoad: function (options) {
     wx.showLoading({
       title: '加载中',
     })
  },

  onReady: function () {
     wx.hideLoading()
  },

})