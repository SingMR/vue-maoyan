<template>
  <div class="tabbar">
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="dianying">
        <span class="iconfont">&#xe6be;</span>
        电影
      </mt-tab-item>
      <mt-tab-item id="yingyuan">
        <span class="iconfont">&#xe8c0;</span>
        影院
      </mt-tab-item>
      <mt-tab-item id="zixun">
        <span class="iconfont">&#xe630;</span>
        资讯
      </mt-tab-item>
      <mt-tab-item id="my">
        <span class="iconfont">&#xe60b;</span>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
// import bus from '../../static/js/eventBus'
export default {
  name: 'TabBar',
  data() {
    return {
      // 默认显示id为dianying的tab-item, 当监听到tab-item切换时，获取sessionStorage中的selected
      selected: sessionStorage.getItem('selected'),
      val: ''
    }
  },
  created() {
    // 此处为刷新后，重新渲染标题
    switch (this.selected) {
        case 'dianying':
          this.val = '猫眼电影'
          break
        case 'yingyuan':
          this.val = '影院'
          break
        case 'zixun':
          this.val = '资讯'
          break
        default:
          this.val = '我的'
          break
      }
      this.$store.commit('getTitle', this.val)
    
  },
  watch: {
    selected(val, oldVal) {  
      sessionStorage.setItem('selected', val)
      this.$router.push({ path: '/' + this.selected })   
      // 此处为tab-item切换时，重新渲染标题
      switch (val) {
        case 'dianying':
          val = '猫眼电影'
          break
        case 'yingyuan':
          val = '影院'
          break
        case 'zixun':
          val = '资讯'
          break
        default:
          val = '我的'
          break
      }
      this.$store.commit('getTitle', val)     
    }
  },
  methods: {
    // 主动传值的兄弟组件 $emit
    // bus.$emit('headerTitle', this.titles)
    // }
  }
}
</script>
<style scoped>

span {
  display: block;
  font-size: 23px;
  margin-bottom: 3px;
}

</style>