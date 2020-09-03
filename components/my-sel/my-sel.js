// components/my-sel/my-sel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    count :0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    incrementCount(num){
      this.setData({
        count: this.data.count + num
      })
    }
  },
  // 外界给组件传入额外的样式
  externalClasses: [],

  // 可监听properties/data的改变
  observers: {
    count: function(newVal){

    }
  },
  
})
