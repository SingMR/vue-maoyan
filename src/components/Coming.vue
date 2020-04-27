<template>
  <div class="coming">
    <div class="desc">
      <p>最近最受期待</p>
    </div>
    <Swiper :key="getComingMovie.length">
      <div class="swiper-slide" v-for="item in getComingMovie" :key="item.id">
        <div class="toggle-wish">
          <span></span>
        </div>
        <img :src="item.img | comimgfilter" alt />
        <p class="title">{{item.nm}}</p>
        <p class="open">{{item.comingTitle.split(' ')[0]}}</p>
      </div>
    </Swiper>
  </div>
</template>

<script>
import Swiper from '../components/slider/DetailSlider'
import Vue from 'vue'
Vue.filter('comimgfilter', function(data) {
  return data.replace(/w.h/, 85.115)
})
export default {
  name: 'Coming',
  data() {
    return {
      getComingMovie: []
    }
  },
  created() {
    this.getComingList()
  },
  methods: {
    async getComingList() {
      const { data: res } = await this.$http.get('/coming')   
      this.getComingMovie = res.coming
    }
  },
  components: {
    Swiper
  }
}
</script>
<style lang="less" scoped>
.coming {
  background-color: #fff;
  padding: 12px 0 12px 15px;
  .desc p {
    color: #333;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .swiper-slide {
    .toggle-wish {
        position: relative;
        span {
            position: absolute;
            top: 0;
            left: 0;
            width: 28px;
            height: 28px;
            background: rgba(61,63,71,.6);
            border-bottom-right-radius: 8px;

        }
    }
    p {
      width: 85px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      color: #999;
      margin: 3px 0 0 0;
    }
    .title {
      font-size: 13px;
      font-weight: 700;
      color: #222;
    }
    .open {
      margin-bottom: 10px;
    }
  }
}
</style>