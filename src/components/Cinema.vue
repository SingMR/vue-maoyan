<template>
  <div class="cinema">
    <nav>
      <div class="location">
        <span class="city-name">广州</span>
        <span class="icon"></span>
      </div>
      <div class="search" @click="searchHandle">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAwFJREFUSA3FVs1qU0EUTibBRQiCRF3UB3BTcFHwJ0XRJ+gDhDaQ5vcJ3PgCfYL80AYSyQP4BIKQiosuhLoQXOjCbqQIJUgoyY3fdzNnmCRzk3uvBQfmzrlzzvm+OTNzz7mJxH9qyTC83W733mQyeTKbzbbQc8lk8hL9Ip1OfyqVSr/CYCzbBBKDQHU6nX2MZfQ8HNWyM949LOAU/bharb7F6DlsnFNOYhDmp9NpGx7bTi/35HkqlaphAadu9eLsCjFIS57nNRHlLct0AnmIiL5ivETPQf8Q4y56Gt1v0F8rpRog78pc0LhATFJEemIZXwHoKJvNNguFwm9r3hcHg8Gd0WjUwEJfY+K26BH54SZyQ8ztBcB7K9IzAO01Go2fAhg0NpvNB9C9Q9+hjY781bpt9y8MyBTP1CZFpC/CkJKIdrSHyMUmiKPxXBeSJvOb2mq1DiDLRbqCvFer1f7QIGzT9nuwpz/bNnZxfy6uPv0VYWvKouKZho1UfGTUkR/JOyI3uDIno2JygMEzPTHhRRJlnFH78yvglueJ78JRzEhQyFkMXbfX5Rg0p/2HWi/4K+YKq9qSWf2dymvs0cax8W1AEuesCSaHm2gGZwnfYCuszhhh1l6EMYohGJwlfANF4gt5w+qYBv+52Tg2vg2sWNowIVVll2nQNogqa3/mcDZP48/frKdiPcWqpKKkmXstfWRR+/uFg7hB9VpSpikMTPg690YmpR/834gjiI9FXh79IoEzUUibn6GUtHnG3Bslbbbb7QxIfwDjriY5r9frj0Aux7jALSnTYxGH0bXW7gDkQ9jIdaRfLFLCfEefUXA1UxapvKl6bBF1EXUZAa0sYIFYyBFt7D8QHBu/kuebyFeINXnsf65KpfIR94WXqrSO3ElMB33hDrBNh5DX/mVCf4It7ctFwntyE3kgsbXaRL/fvz8ejx8DMPR/9SbyUMT2IqLIa8mjAMWxdZB/y2QyT80/cRzQMD78lNDKOHOa84fwZbFYtCtiGJj4Noy81+uZcvkXH+aXwmK6+EsAAAAASUVORK5CYII="
          alt
        />
        <span>搜影院</span>
      </div>
    </nav>
    <section>
      <ul class="navbar">
        <li>
          全城
          <span class="icon"></span>
        </li>
        <li>
          品牌
          <span class="icon"></span>
        </li>
        <li>
          特色
          <span class="icon"></span>
        </li>
      </ul>
    </section>
    <article ref="articleHeight">
      <div class="box" v-for="item in cinemaList" :key="item.id" @click="goCinemaDetail(item.id)">
        <div class="content">
          <p class="title">{{item.nm}}</p>
          <p class="desc">{{item.addr}}</p>
          <div class="tag">
            <span class="allowRefund" v-if="item.tag.allowRefund">退</span>
            <span class="endorse" v-if="item.tag.endorse">改签</span>
            <span class="snack" v-if="item.tag.snack">小吃</span>
            <span class="vipTag" v-if="item.tag.vipTag">折扣卡</span>
            <span class="hallType" v-for="(hall, index) in item.tag.hallType" :key="index">{{hall}}</span>
          </div>
          <img
            v-if="item.promotion.cardPromotionTag"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
            alt
          />
          <span v-if="item.promotion.cardPromotionTag">{{item.promotion.cardPromotionTag}}</span>
        </div>
        <div class="distance">{{item.distance}}</div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: 'Cinema',
  data() {
    return {
      // cinemaList: [],
      offset: 20,
      isLoding: true
    }
  },
  created() {
    this.$store.dispatch('getCinemaList')
    
  },
  computed: {
    ...mapState(['cinemaList'])
  },
  methods: {
    goCinemaDetail(id) {
      this.$router.push('/yingyuan/detail/' + id)
    },
    searchHandle() {
      this.$router.push('/search')
      
    }
  }
}
</script>
<style lang="less" scoped>
.cinema {
  padding-top: 90px;
  padding-bottom: 10px;
}
nav {
  display: flex;
  position: fixed;
  top: 50px;
  width: 100%;
  height: 44px;
  justify-content: center;
  align-items: center;
  //   padding: 10px 15px;
  background-color: #f5f5f5;
  .location {
    line-height: 31px;
    .city-name {
      color: #666;
      font-size: 15px;
    }
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 278px;
    height: 27px;
    border: 1px solid #eee;
    border-radius: 5px;
    font-size: 13px;
    color: #b2b2b2;
    background-color: #fff;
    margin-left: 20px;
    img {
      width: 14px;
      height: 14px;
      margin-top: 2px;
      margin-right: 3px;
    }
  }
}
section {
  position: fixed;
  top: 94px;
  width: 100%;
  padding: 10px 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  .navbar {
    display: flex;
    li {
      width: 33.3%;
      padding: 3px 0;
      text-align: center;
      font-size: 13px;
      color: #777;
    }
  }
}
.icon {
  display: inline-block;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-top-color: #b0b0b0;
}
.navbar li:nth-child(2) {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.box {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  padding-bottom: 15px;
  margin: 15px 15px 0 15px;
  .content {
    .title {
      font-size: 16px;
      color: #000;
      margin-bottom: 5px;
    }
    .desc {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 270px;
    }
    .tag {
      margin: 2px 0;
    }
    img {
      width: 15px;
      height: 14px;
    }
    span {
      font-size: 11px;
      color: #999;
    }
  }
}
.distance {
  padding-top: 20px;
}
.desc,
.distance {
  font-size: 13px;
  color: #666;
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
  color: #f90 !important    ;
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