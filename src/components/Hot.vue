<template>
  <div class="hot">
    <div class="film-content" v-for="item in movieList" :key="item.id">
      <div class="film-img">
        <img :src="item.img | imgfliter" alt />
      </div>
      <div class="film-desc">
        <p class="film-name">{{item.nm}}</p>
        <p class="film-score">
          <span>
            <em>{{item.wish}}</em> 人想看
          </span>
        </p>
        <p v-if="item.star" class="film-actor">主演：{{item.star}}</p>
        <p class="film-area-lasting">{{item.rt}}上映</p>
      </div>
      <button>想看</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Hot',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getMovieList')
  },
  computed: {
    ...mapState(['movieList'])
  }
}
</script>
<style lang="less" scoped>


.hot {
  background-color: #ffffff;
}
.film-img img {
  width: 64px;
  height: 90px;
}
.film-content {
  display: flex;
  position: relative;
  padding: 15px;
}
.film-desc {
  margin-left: 10px;
  font-size: 13px;
  color: #666;
}
.film-name {
  font-size: 17px;
  color: #333;
  font-weight: 700;
}
em {
  font-size: 15px;
  color: #faaf00;
  font-weight: 700;
}
.film-desc p {
  margin-top: 3px;
}
.film-actor {
  width: 204px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
button {
  position: absolute;
  width: 47px;
  height: 27px;
  top: 50%;
  right: 27px;
  transform: translateY(-50%);
  border: 0;
  border-radius: 4px;
  background-color: #faaf00;
  color: #fff;
  font-size: 12px;
}
</style>