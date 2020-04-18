<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination film-swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Slider',
  data() {
    return {}
  },
  mounted() {
    new Swiper('.filmswiper', {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })  
  }
}
</script>
<style scoped>
.filmswiper img {
    width: 100%;
    height: 200px;
}
.film-swiper-pagination {
    text-align: right;
    bottom: 0; 
}
.swiper-slide {
    width: 100% !important;
    margin: 0;
}
</style>