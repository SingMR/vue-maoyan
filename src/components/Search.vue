<template>
  <div class="search">
    <div class="header">
      <span class="icon" @click="goBack"></span>
      <mt-header title="猫眼电影">
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="search-content">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAwFJREFUSA3FVs1qU0EUTibBRQiCRF3UB3BTcFHwJ0XRJ+gDhDaQ5vcJ3PgCfYL80AYSyQP4BIKQiosuhLoQXOjCbqQIJUgoyY3fdzNnmCRzk3uvBQfmzrlzzvm+OTNzz7mJxH9qyTC83W733mQyeTKbzbbQc8lk8hL9Ip1OfyqVSr/CYCzbBBKDQHU6nX2MZfQ8HNWyM949LOAU/bharb7F6DlsnFNOYhDmp9NpGx7bTi/35HkqlaphAadu9eLsCjFIS57nNRHlLct0AnmIiL5ivETPQf8Q4y56Gt1v0F8rpRog78pc0LhATFJEemIZXwHoKJvNNguFwm9r3hcHg8Gd0WjUwEJfY+K26BH54SZyQ8ztBcB7K9IzAO01Go2fAhg0NpvNB9C9Q9+hjY781bpt9y8MyBTP1CZFpC/CkJKIdrSHyMUmiKPxXBeSJvOb2mq1DiDLRbqCvFer1f7QIGzT9nuwpz/bNnZxfy6uPv0VYWvKouKZho1UfGTUkR/JOyI3uDIno2JygMEzPTHhRRJlnFH78yvglueJ78JRzEhQyFkMXbfX5Rg0p/2HWi/4K+YKq9qSWf2dymvs0cax8W1AEuesCSaHm2gGZwnfYCuszhhh1l6EMYohGJwlfANF4gt5w+qYBv+52Tg2vg2sWNowIVVll2nQNogqa3/mcDZP48/frKdiPcWqpKKkmXstfWRR+/uFg7hB9VpSpikMTPg690YmpR/834gjiI9FXh79IoEzUUibn6GUtHnG3Bslbbbb7QxIfwDjriY5r9frj0Aux7jALSnTYxGH0bXW7gDkQ9jIdaRfLFLCfEefUXA1UxapvKl6bBF1EXUZAa0sYIFYyBFt7D8QHBu/kuebyFeINXnsf65KpfIR94WXqrSO3ElMB33hDrBNh5DX/mVCf4It7ctFwntyE3kgsbXaRL/fvz8ejx8DMPR/9SbyUMT2IqLIa8mjAMWxdZB/y2QyT80/cRzQMD78lNDKOHOa84fwZbFYtCtiGJj4Noy81+uZcvkXH+aXwmK6+EsAAAAASUVORK5CYII="
        alt
      />
      <input type="text" placeholder="搜电影，搜影院" autocomplete="off" v-model="ipt" />
      <img style="display:none;"
        src="https://s0.meituan.net/bs/?f=myfe/canary:/static/deploy/images/close.png"
        alt
        @click="del"
        ref="delRef"
      />
      <span class="back" @click="goBack">取消</span>
    </div>
    <div class="type" v-if="movieListFilter.length == 0?false:true">电影/电视剧/综艺</div>
    <article>
      <div class="movie-list" v-for="item in movieListFilter" :key="item.id">
        <div>
          <img :src="item.img | imgfliter" alt />
        </div>
        <div class="info">
          <div class="name-score">
            <span class="name text-ellipsis">{{item.nm}}</span>
            <!-- <span class="ico"></span> -->
            <span class="wish">
              <em>{{item.wish}}</em>
              想看
            </span>
          </div>
          <div class="detail-section">
            <div class="detail-item">
              <p class="actors text-ellipsis">{{item.star}}</p>
              <p class="time">{{item.rt}}</p>
            </div>
            <button>想看</button>
          </div>
        </div>
      </div>
      <div class="line" v-if="movieListFilter.length == 0?false:true"></div>
      <div class="ci-type" v-if="cinemaListFilter.length == 0?false:true">影院</div>
      <div class="cinema-list" v-for="item in cinemaListFilter" :key="item.id">
        <div class="cinema-cell">
          <div class="name-price">
            <div class="name text-ellipsis">{{item.nm}}</div>
            <div class="price">
              <em>28</em>元起
            </div>
          </div>
          <div class="address text-ellipsis">{{item.addr}}</div>
          <div class="tag">
            <span class="allowRefund" v-if="item.tag.allowRefund">退</span>
            <span class="endorse" v-if="item.tag.endorse">改签</span>
            <span class="snack" v-if="item.tag.snack">小吃</span>
            <span class="vipTag" v-if="item.tag.vipTag">折扣卡</span>
            <span class="hallType" v-for="(hall, index) in item.tag.hallType" :key="index">{{hall}}</span>
          </div>
        </div>
        <div class="distance">{{item.distance}}</div>
      </div>
    </article>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Vue from 'vue'
Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`)
}
export default {
  name: 'Search',
  data() {
    return {
      ipt: ''
    }
  },
  created() {    
    this.$store.dispatch('getMovieList')
    if (localStorage.getItem('show') != null) {
        let cityid = JSON.parse(localStorage.getItem('show')).id
        let resid = JSON.parse(localStorage.getItem('show')).resId
        this.$store.dispatch('getCinemaList', { cityid, resid })
      } else {
        this.$store.dispatch('getCinemaList', null)
      }
  },
  mounted() {
    this.$store.commit('getCinemaTitle', false)
    this.$store.commit('changeTabbarStatus', false)
  },
  beforeDestroy() {
    this.$store.commit('getCinemaTitle', true)
    this.$store.commit('changeTabbarStatus', true)
  },
watch: {
    ipt(val) {
        if(val.trim().length > 0) {
            this.$refs.delRef.style.display = 'inline-block'
        }else {
            this.$refs.delRef.style.display = 'none'

        }
    }
},
  computed: {
    ...mapState(['movieList', 'cinemaList']),
    movieListFilter() {
        return this.movieList.filter(item => {
            if(this.ipt.trim().length != 0) {
                return item.nm.match(this.ipt)
            }else {
                return ''
            }
            
        })
    },
    cinemaListFilter() {
        return this.cinemaList.filter(item => {
            if(this.ipt.trim().length != 0) {
                return item.nm.match(this.ipt)
            }else {
                return ''
            }
            
        })
    }
  },
  methods: {
    goBack() {
      this.$router.push('/yingyuan')
    },
    del() {
      this.ipt = ''
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  margin: -50px 0 -20px;
  background-color: #f5f5f5;
}
.search-content {
  position: relative;
  margin: 10px 60px 10px 15px;
  padding: 3px 10px;
  background-color: #fff;
  flex-grow: 1;
  border: 1px solid #e6e6e6;
  border-radius: 5px;

  input {
    width: calc(100% - 40px);
    height: 22px;
    color: #333;
    border: none;
    font-size: 13px;
    line-height: 28px;
    outline: none;
  }
  img {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
  .back {
    position: absolute;
    right: -47px;
    color: #f0373d;
    font-size: 16px;
  }
}
article {
  padding: 0 0 0 15px;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.type {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  background-color: #fff;
}
.movie-list {
  position: relative;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  div {
    img {
      width: 64px;
      height: 90px;
    }
  }
  .info {
    margin-left: 10px;

    .name-score {
      .name {
        max-width: 180px;
        font-weight: 700;
        font-size: 17px;
      }
      .wish {
        position: absolute;
        top: 10px;
        right: 15px;
        color: #fa0;
        font-size: 10px;
        em {
          font-style: normal;
          font-size: 16px;
        }
      }
    }
  }
  .detail-section {
    display: flex;
    // justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #666;
    margin-top: 2px;
    .detail-item {
      .actors {
        max-width: 190px;
        margin: 5px 0 3px;
      }
    }
    button {
      position: absolute;
      top: 50px;
      right: 15px;
      padding: 5px 10px;
      border: 0;
      background-color: #faaf00;
      color: #fff;
      border-radius: 5px;
    }
  }
}
.line {
  // width: 100%;
  height: 10px;
  margin: 30px -15px 0;
  background-color: #f5f5f5;
}
.ci-type {
  margin-left: -15px;
  font-size: 15px;
  color: #999;
  padding: 9px 15px 9px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
.cinema-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 15px 0;
  border-bottom: 1px solid #eee;
  .cinema-cell {
    //   flex: 1;
      overflow: hidden;
    .name-price {
      display: flex;
      //   justify-content: space-between;
      align-items: center;
      //   text-align: center;
      .name {
        max-width: 250px;
        font-size: 16px;
        color: #000;
      }
      .price {
        margin-left: 20px;
        font-size: 11px;
        color: #999;
        white-space: nowrap;
        em {
          font-style: normal;
          margin-right: 5px;
          font-size: 17px;
          color: #ef4238;
        }
      }
    }
    .address {
      max-width: 280px;
      margin-top: 10px;
      font-size: 13px;
      color: #999;
    }
    .tag {
      margin-top: 5px;
    }
  }
  .distance {
    font-size: 13px;
    color: #999;
  }
}
.allowRefund,
.endorse,
.hallType {
  display: inline-block;
  color: #589daf !important;
  border: 1px solid #589daf;
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  font-size: 0.6rem;
}
.snack,
.vipTag {
  display: inline-block;
  color: #f90 !important;
  border: 1px solid #f90;
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  font-size: 0.6rem;
}
.hallType {
  margin-right: 5px;
}
</style>