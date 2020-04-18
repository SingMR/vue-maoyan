<template>
  <div id="app">
    <Header-Title v-if="cinemaTitle"></Header-Title>
    <router-view></router-view>
    <Tab-Bar v-if="isShow"></Tab-Bar>
  </div>
</template>

<script>
import HeaderTitle from './components/Header.vue'
import TabBar from './components/TabBar.vue'
import bus from '../static/js/eventBus'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      // isShow: true
    }
  },
  created() {
    if (this.$route.path) {
      sessionStorage.clear()
      if (this.$route.path == '/dianying/hot') {
        sessionStorage.setItem('selected', 'dianying')
        // alert('d')
      } else if (this.$route.path == '/yingyuan') {
        sessionStorage.setItem('selected', 'yingyuan')
        // alert('y')
      } else if (this.$route.path == '/zixun') {
        sessionStorage.setItem('selected', 'zixun')
        // alert('z')
      } else {
        sessionStorage.setItem('selected', 'my')
      }
    }
  },
  mounted() {
    // if (this.$route.path) {
    //   sessionStorage.clear()   
    //   if (this.$route.path == '/dianying/hot') {
    //     sessionStorage.setItem('selected', 'dianying')
    //   } else if (this.$route.path == '/yingyuan') {
    //     sessionStorage.setItem('selected', 'yingyuan')
    //   } else if (this.$route.path == '/zixun') {
    //     sessionStorage.setItem('selected', 'zixun')
    //   } else {
    //     sessionStorage.setItem('selected', 'my')
    //   }
    // }
  },
  // 如果是mounted的话，传值的子组件已经传完，但是mounted接收不到传过来的值,因为传值之前还没开始订阅 (先传值再触发的订阅，所以不能接收了)，
  // 按正常访问的话，是可以控制tabbar的显示与隐藏，但是直接访问cinemadetail页面的话，就不能控制了
  // 如果beforeMount的话，不管你怎么访问都是先订阅，然后在传值过来，再接收
  beforeMount() {
    // alert('先订阅')
    // $on接收值
    // bus.$on('tabShow', item => {
    //   this.isShow = item
    //   // alert('我接受到了')
    // })
  },

  components: {
    HeaderTitle,
    TabBar
  },
  computed: {
    ...mapState(['isShow', 'cinemaTitle'])
  }
}
</script>

<style>
</style>
