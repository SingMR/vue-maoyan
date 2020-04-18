<template>
  <div class="order-list">
    <div class="header">
      <span class="icon" @click="goBack"></span>
      <mt-header title="我的电影订单">
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="box" v-for="item in getOrderList" :key="item.id">
      <div class="movie-ciy">{{item.cinema.name}}</div>
      <div class="orders">
        <img :src="item.movie.img | orderfilter" alt />
        <div class="order-desc">
          <div class="title text-ellipsis">
            {{item.movie.name}}
            <span>{{item.seats.count}}张</span>
          </div>
          <div class="show-time text-ellipsis">{{item.show.showTime}}</div>
          <div class="position text-ellipsis">
            <span>{{item.seats.hallName}}</span>
            <span v-for="(i, index) in item.seats.list" :key="index">{{i.rowId}}排{{i.columnId}}座</span>
          </div>
        </div>
      </div>
      <div class="price">
        总价：{{item.order.sellMoney}}元
        <span>{{item.otherStatus}}</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="good" v-for="(item,index) in goodList" :key="index">
      <div class="movie-ciy">{{item.title}}</div>
      <div class="orders">
        <div>
          <img :src="item.pic" alt style="width:57px;height:57px" />
        </div>
        <div class="order-desc">
          <div class="title text-ellipsis">{{item.info2}}</div>
          <div class="num">{{item.info3}}</div>
        </div>
      </div>
      <div class="price">
        {{item.bottom}}
        <!-- <button>付款</button> -->
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.filter('orderfilter', function(data) {
  return data.replace(/w.h/, '57.80')
})
export default {
  name: 'myOrderList',
  data() {
    return {
      getOrderList: [],
      goodList: []
    }
  },
  created() {
    this.getMyOrderList()
  },
  mounted() {
    this.$store.commit('getCinemaTitle', false)
    this.$store.commit('changeTabbarStatus', false)
  },
  beforeDestroy() {
    this.$store.commit('getCinemaTitle', true)
    this.$store.commit('changeTabbarStatus', true)
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async getMyOrderList() {
      const { data: res } = await this.$http.get('/ajax/myOrderList')
      console.log(res)

      res.orderlist.filter(item => {
        if (item.award) {
          this.getOrderList.push(item)
        } else {
          this.goodList.push(item)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order-list {
  margin: -50px 0 -35px 0;
}

.movie-ciy {
  color: #666;
  font-size: 13px;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}
.orders {
  position: relative;
  margin: 10px 0px 10px 15px;
  padding-bottom: 10px;
  display: flex;
  border-bottom: 1px solid #eee;
  img {
    width: 57px;
    height: 80px;
  }
  .order-desc {
    width: 230px;
    margin-left: 12px;
    div {
      color: #888;
      font-size: 12px;
    }
    .title {
      color: #000;
      font-size: 15px;
      margin-bottom: 8px;
      margin-top: 3px;
      span {
        position: absolute;
        top: 2px;
        right: 20px;
      }
    }
  }
}
.price {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 13px;
  margin: 0 15px;
}
.line {
  height: 10px;
  background-color: #f3f3f3;
  margin-top: 10px;
}
.num {
}
.movie-ciy::after {
  display: inline-block;
  content: '';
  width: 7px;
  height: 7px;
  border-left: 1px solid #777;
  border-top: 1px solid #777;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  margin-left: 6px;
}
</style>