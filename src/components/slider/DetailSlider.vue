<template>
  <div class="swiper-container detailswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'DetailSlider',
  data() {
    return {}
  },
  mounted() {
    new Swiper('.detailswiper', {
      slidesPerView: 3,
      spaceBetween: -60,
      freeMode: true
    })
  }
}
</script>
<style scoped>
.swiper-wrapper img {
  width: 85px;
  height: 115px;
}
</style>