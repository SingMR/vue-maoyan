<template>
  <div class="header">
    <mt-header fixed :title="title">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>
<script>
// import bus from '../../static/js/eventBus'
import {mapState} from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      
    }
  },
  created() {
    // 接受兄弟组件传值 $on
    // bus.$on('headerTitle', item => {    
    //   this.handTitle = item
    // })
  },
  methods: {  
  },
  computed: {
    ...mapState(['title'])
  }
}
</script>
<style scoped>
.header {
  position: fixed;
  z-index: 999;
  width: 100%;
}
.mint-button {
  margin-right: 20px !important;
}
</style>