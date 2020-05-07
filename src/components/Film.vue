<template>
  <div class="film">
    <div class="film-header" ref="myBar">
      <div class="download-app-bar">
        <h1>
          <img src="http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" alt />
        </h1>
        <div class="app-name-desc">
          <div class="app-name">猫眼</div>
          <div class="app-desc">在线选座，热门影讯，爱上看电影</div>
        </div>
        <button class="btn-open-app">立即打开</button>
      </div>
      <!-- swiper初始化过早 所以需要加key diff算法 -->
      <Swiper :key="getLunBo.length">
        <div class="swiper-slide" v-for="(item, index) in getLunBo" :key="index">
          <img :src="item.imgUrl" alt />
        </div>
      </Swiper>
    </div>
    <div class="topbar" :class="isFixed ? 'fixed': ''">
      <router-link :to="'hot'" tag="div" activeClass="myactive" exact>正在热映</router-link>
      <router-link :to="'coming'" tag="div" activeClass="myactive">即将上映</router-link>
    </div>
    <keep-alive :include="incluePages">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Swiper from '../components/slider/Slider'
export default {
  name: 'Film',
  data() {
    return {
      getLunBo: [],
      isFixed: false,
      incluePages: ['Hot', 'Coming'],
    }
  },
  created() {
    this.$http({
      url: 'https://m.maizuo.com/gateway?type=2&cityId=310100&k=721294',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1586523505863288426720","bc":"310100"}',
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      this.getLunBo = res.data.data
    })
  },
  mounted() {
    window.onscroll = this.getFiexdHeight
  },
  beforeDestroy() {
    window.onscroll = ''
  },
  methods: {
    getFiexdHeight() {
      if (document.documentElement.scrollTop >= this.$refs.myBar.offsetHeight) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  components: {
    Swiper
  }
}
</script>

<style lang="less" scoped>
img[lazy='loading'] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.myactive {
  color: red;
  border-bottom: 2px solid #ef4238;
}
.download-app-bar {
  display: flex;
  position: relative;
  padding: 5px 10px;
  overflow: hidden;
  // width: 100%;
  .btn-open-app {
    position: absolute;
    border: 0;
    width: 68px;
    height: 30px;
    background-color: #ef4238;
    color: #fff;
    border-radius: 3px;
    top: 17px;
    right: 10px;
  }
  .app-name-desc {
    .app-name {
      color: #222;
      font-size: 17px;
    }
    .app-desc {
      color: #999;
      font-size: 12px;
    }
  }
}
.download-app-bar h1 img {
  width: 44px;
  height: 44px;
  margin-right: 10px;
}
.topbar {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  color: #666;
  font-weight: 700;
  background-color: #fff;
  div {
    height: 100%;
    line-height: 44px;
    padding: 0 10px;
  }
}
.fixed {
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 999;
}
// .topbar::after {
//   content: '';
//   display: block;
//   position: absolute;
//   width: 80px;
//   height: 2px;
//   left: 53px;
//   bottom: -1px;
//   background-color: red;
// }
</style>