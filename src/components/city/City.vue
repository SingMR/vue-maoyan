<template>
  <div class="city">
    <div id="locate" class="position-city same">
      <p>定位城市</p>
      <div>
        <span class="location-city">定位失败,请点击重试</span>
      </div>
    </div>
    <div id="history" class="history-city same">
      <p>最近访问的城市</p>
      <div>
        <span class="city-list" v-for="item in historyCity" :key="item.cityid">{{item.cityname}}</span>
      </div>
    </div>
    <div id="hot" class="hot-city same">
      <p>热门成熟</p>
      <div>
        <span class="hot-city-list" v-for="item in hotCity" :key="item.id">{{item.nm}}</span>
      </div>
    </div>
    <div class="all-city" v-for="item in city" :key="item.id">
      <!-- <p>A</p> -->
      <div class="city-list">
        <div class="city-item">{{item.nm}}</div>
      </div>
      <!-- <p>B</p>
       <div class="city-list" v-for="item in city" :key="item.id">
        <div class="city-item">{{item.nm}}</div>
      </div>-->
    </div>
    <div class="nav">
      <div class="nav-item" data-id="locate">定位</div>
      <div class="nav-item" data-id="history">最近</div>
      <div class="nav-item" data-id="hot">热门</div>
      <div class="nav-letter">A</div>
      <div class="nav-letter">B</div>
      <div class="nav-letter">C</div>
      <div class="nav-letter">D</div>
      <div class="nav-letter">E</div>
      <div class="nav-letter">F</div>
      <div class="nav-letter">G</div>
      <div class="nav-letter">H</div>
      <div class="nav-letter">J</div>
      <div class="nav-letter">K</div>
      <div class="nav-letter">L</div>
      <div class="nav-letter">M</div>
      <div class="nav-letter">N</div>
      <div class="nav-letter">P</div>
      <div class="nav-letter">Q</div>
      <div class="nav-letter">R</div>
      <div class="nav-letter">S</div>
      <div class="nav-letter">T</div>
      <div class="nav-letter">W</div>
      <div class="nav-letter">X</div>
      <div class="nav-letter">Y</div>
      <div class="nav-letter">Z</div>
    </div>
  </div>
</template>
<script>
import '../../../static/js/lift.js'
export default {
  name: 'City',
  data() {
    return {
      historyCity: [],
      hotCity: [],
      city: []
    }
  },
  created() {
    this.getHistoryCity()
    this.getHotCity()
  },
  mounted() {
    this.$store.commit('getCinemaTitle', false)
    this.$store.commit('changeTabbarStatus', false)
    //浏览器刷新事件
    window.addEventListener('beforeunload', _ => {
      window.scrollTo(0, 0)
    })
  },
  beforeDestroy() {   
    this.$store.commit('getCinemaTitle', true)
    this.$store.commit('changeTabbarStatus', true)
  },
  methods: {
    getHistoryCity() {
      this.$http
        .get('../../../static/json/history-city.json')
        .then(res => {
          this.historyCity = res.data.data
        })
        .catch(err => err)
    },

    getHotCity() {
      this.$http.get('../../../static/json/city.json').then(res => {
        this.hotCity = res.data.data.slice(0, 11)
        var city = res.data.data
        var res = city.sort(this.compare('py'))
        // console.log(res)
        this.city = res
      })
    },
    compare(property) {
      return function(a, b) {
        a = a[property][0].charCodeAt()
        b = b[property][0].charCodeAt()
        return a - b
      }
    },
    
  }
}
</script>
<style lang="less" scoped>
.city {
  margin-top: -50px;
  background-color: #ebebeb;
  font-size: 14px;
  color: #333;
  p {
    padding-left: 15px;
    line-height: 30px;
  }

  .position-city {
    div {
      // width: 412px;
      background-color: #f5f5f5;
      margin-right: 15px;
      .location-city {
        display: inline-block;
        padding: 5px 20px;
        margin: 15px 0 10px 15px;
        background-color: #fff;
        border-radius: 3px;
        border: 1px solid #e6e6e6;
      }
    }
  }
  .history-city {
    div {
      // width: 412px;
      background-color: #f5f5f5;
      margin-right: 15px;
      .city-list {
        display: inline-block;
        padding: 5px 30px;
        margin: 15px 0 10px 15px;
        background-color: #fff;
        border-radius: 3px;
        border: 1px solid #e6e6e6;
      }
    }
  }
  .hot-city {
    div {
      // width: 412px;
      background-color: #f5f5f5;
      margin-right: 15px;
      padding-bottom: 10px;
      .hot-city-list {
        display: inline-block;
        padding: 5px 30px;
        margin: 15px 0 0 15px;
        background-color: #fff;
        border-radius: 3px;
        border: 1px solid #e6e6e6;
      }
    }
  }
  .all-city {
    p {
      padding-left: 30px;
    }
    .city-list {
      padding: 0 20px 0 15px;
      margin-right: 15px;
      background-color: #f5f5f5;
      .city-item {
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .nav {
    position: fixed;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    text-align: center;
    font-size: 12px;
    .nav-item,
    .nav-letter {
      margin-bottom: 3px;
    }
  }
}
</style>