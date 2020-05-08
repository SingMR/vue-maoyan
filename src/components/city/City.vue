<template>
  <div class="city">
    <div id="locate" class="position-city same">
      <p>定位城市</p>
      <div>
        <span class="location-city">定位失败,请点击重试</span>
      </div>
    </div>
    <div id="history" class="history-city same" v-if="historyCity.length">
      <p>最近访问的城市</p>
      <div>
        <span
          class="city-list"
          v-for="his in historyCity"
          :key="his.cityid"
          @click="selecteArea(his)"
        >{{his.nm}}</span>
      </div>
    </div>
    <div id="hot" class="hot-city same">
      <p>热门城市</p>
      <div>
        <span
          class="hot-city-list"
          v-for="hot in hotCity"
          :key="hot.id"
          @click="selecteArea(hot)"
        >{{hot.nm}}</span>
      </div>
    </div>
    <div class="all-city" v-for="(item, index) in city" :key="index">
      <p class="same">{{index}}</p>
      <div class="city-list">
        <div
          class="city-item"
          v-for="area in item"
          :key="area.id"
          @click="selecteArea(area)"
        >{{area.nm}}</div>
      </div>
    </div>
    <div class="nav">
      <div class="nav-item" data-id="locate">定位</div>
      <div class="nav-item" data-id="history" v-if="historyCity.length">最近</div>
      <div class="nav-item" data-id="hot">热门</div>
      <div class="nav-letter" v-for="(item, index) in city" :key="index">{{index}}</div>
    </div>
  </div>
</template>
<script>
import { lift } from '../../../static/js/lift'
export default {
  name: 'City',
  data() {
    return {
      historyCity: localStorage.getItem('history-city')
        ? JSON.parse(localStorage.getItem('history-city'))
        : [],
      hotCity: [],
      city: {},
      isShow: null,
      show: []
    }
  },
  created() {
    lift()
    this.getHotCity()
  },
  mounted() {
    this.$store.commit('getCinemaTitle', false)
    this.$store.commit('changeTabbarStatus', false)
    //浏览器刷新事件
    // window.addEventListener('unload', _ => {
    //   // document.documentElement.scrollTop = 0
    //   window.scrollTo(0,0)
    // })
    window.onload = this.wOnload
  },
  beforeDestroy() {
    this.$store.commit('getCinemaTitle', true)
    this.$store.commit('changeTabbarStatus', true)
  },
  methods: {
    // 浏览器刷新事件，因为刷新是浏览器最后执行的事件，所以给延迟
    wOnload() {
      setTimeout(() => {
        window.scrollTo(0,0)
      },10)
      
    },
    getHotCity() {
      this.$http.get('../../../static/json/city.json').then(res => {
        this.hotCity = res.data.data.slice(0, 11)
        var city = res.data.data
        var a = [],
          b = [],
          c = [],
          d = [],
          e = [],
          d = [],
          f = [],
          g = [],
          h = [],
          j = [],
          k = [],
          l = [],
          m = [],
          n = [],
          p = [],
          q = [],
          r = [],
          s = [],
          t = [],
          w = [],
          x = [],
          y = [],
          z = []
        var res = city.sort(this.compare('py'))
        res.filter(item => {
          // console.log(item);
          switch (item.py[0]) {
            case 'a':
              a.push(item)
              this.city['A'] = a
              break
            case 'b':
              b.push(item)
              this.city['B'] = b
              break
            case 'c':
              c.push(item)
              this.city['C'] = c
              break
            case 'd':
              d.push(item)
              this.city['D'] = d
              break
            case 'e':
              e.push(item)
              this.city['E'] = e
              break
            case 'f':
              f.push(item)
              this.city['F'] = f
              break
            case 'g':
              g.push(item)
              this.city['G'] = g
              break
            case 'h':
              h.push(item)
              this.city['H'] = h
              break
            case 'j':
              j.push(item)
              this.city['J'] = j
              break
            case 'k':
              k.push(item)
              this.city['K'] = k
              break
            case 'l':
              l.push(item)
              this.city['L'] = l
              break
            case 'm':
              m.push(item)
              this.city['M'] = m
              break
            case 'n':
              n.push(item)
              this.city['N'] = n
              break
            case 'p':
              p.push(item)
              this.city['P'] = p
              break
            case 'q':
              q.push(item)
              this.city['Q'] = q
              break
            case 'r':
              r.push(item)
              this.city['R'] = r
              break
            case 's':
              s.push(item)
              this.city['S'] = s
              break
            case 't':
              t.push(item)
              this.city['T'] = t
              break
            case 'w':
              w.push(item)
              this.city['W'] = w
              break
            case 'x':
              x.push(item)
              this.city['X'] = x
              break
            case 'y':
              y.push(item)
              this.city['Y'] = y
              break
            case 'z':
              z.push(item)
              this.city['Z'] = z
              break
          }
        })
      })
    },
    compare(property) {
      return function(a, b) {
        a = a[property][0].charCodeAt()
        b = b[property][0].charCodeAt()
        return a - b
      }
    },
    selecteArea(val) {
      // unshift将元素加到数组最前面 改变原先数组
      this.historyCity.unshift(val)
      // 检验在存储中是否重复
      let result = this.historyCity
      if (result) {
        var obj = {}
        var unique = result.filter(item => {
          return obj.hasOwnProperty(item.id) ? false : (obj[item.id] = true)
        })
        // end---
        this.historyCity = unique
        if (this.historyCity.length > 3) {
          this.historyCity.pop()
        }
        localStorage.setItem('history-city', JSON.stringify(this.historyCity))
        // 动态控制影院keep-alive是否使用
        if (val.id != JSON.parse(localStorage.getItem('show')).id) {
          this.$store.commit('getIncludePages', ['Film'])
        }else {
           this.$store.commit('getIncludePages', ['Cinema','Film'])
        }
        // 用来Cinema页面获取城市数据
        localStorage.setItem('show', JSON.stringify(val))  
        this.$router.push('/yingyuan')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.city {
  margin-top: -50px;
  margin-bottom: -35px;
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
    z-index: 99;
    .nav-item,
    .nav-letter {
      margin-bottom: 3px;
    }
  }
}
</style>