// pages/hb/hb.js
const app = getApp()
Page({
  data: {

  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })

  },

  onReady: function () {
    wx.hideLoading()
    
  },

})