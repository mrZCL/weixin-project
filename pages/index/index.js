// pages/index/index.js
import {
  getMultiData,
  getGoodsData
} from "../../service/home.js"

const TOP_DISTANCE = 1000;
const types = ['pop', 'new', 'sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goods: {
      'pop': {page:0, list: []},
      'new': {page:0, list: []},
      'sell': {page:0, list: []}
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  /**
   * 时间监听函数--------------------
   */
  handleTabClick(event){
    //取出index
    const index = event.detail.index;
    
    //设置currentType
    this.setData({
      currentType: types[index]
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.发送网络请求发送轮播图和推荐数据
    this._getMultidata();

    //2.请求商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },


  _getMultidata(){
    getMultiData().then(res => {
      //取出轮播图和推荐数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;

      //将我们的banners和recommends放到Data中
      this.setData({
        banners: banners,
        recommends: recommends
      })
    }).catch(err => {

    })
  },

 _getGoodsData(type){
     //1.获取页码
     const page = this.data.goods[type].page + 1
     console.log("页码数："+page);
     //2.发送网络请求
    getGoodsData(type, page).then(res => {
      //2.1取出数据
      const list = res.data.data.list;

      //2.2将数据设置到对应type 的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      //2.3将数据设置到Data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
  })
 },

 handleImageLoad(){
  console.log('图片加载完成')
  wx.createSelectorQuery().select('#tab-control').boundingClientRect(rest => {
    console.log(rest);
    this.data.tabScrollTop = rest.top
  }).exec()
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

  },

    //上拉加载更多
    onReachBottom() {
      //上拉请求更多数据
      this._getGoodsData(this.data.currentType);
    },

    onPageScroll(options){
      //取出ScrollTop
      const scrollTop = options.scrollTop;

      //修改backtop属性
      const flag1 = scrollTop >= TOP_DISTANCE;
      if(flag1 != this.data.showBackTop){
        this.setData({
          showBackTop: flag1
        })
      }
       // 3.修改isTabFixed属性
      const flag2 = scrollTop >= this.data.tabScrollTop;
      if (flag2 != this.data.isTabFixed) {
        this.setData({
          isTabFixed: flag2
        })
      }
      
    }
})