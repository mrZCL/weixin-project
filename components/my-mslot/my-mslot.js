// components/my-mslot/my-mslot.js
Component({
// 使用多插槽
  options: {
    multipleSlots: true
  },
  // 组件中监听声明周期
  //1.监听所在页面的生命周期
  pageLifetimes: {
    show() {
      console.log('监听组件所在页面显示出来时的')
    },
    hide() {
      console.log('监听组件所在页面隐藏起来时')
    },
    resize(){
      console.log('监听页面尺寸的改变')
    }
  },
  //2.监听组件本身的生命周期
  lifetimes: {
    created() {
      console.log('组件被创建出来')
    },
    attached(){
      console.log('组件被添加到页面')
    },
    ready(){
      console.log('页面被渲染出来')
    }
  }
})
