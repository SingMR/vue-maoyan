<template>
  <div class="cinema-detail">
    <div class="header">
      <span class="icon" @click="goBack"></span>
      <mt-header :title="cinemaTitle">
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
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
    <div class="cinema-wrap">
      <div class="crumbs-nav">
        <a href="/">猫眼电影</a>
        >
        <a>{{cinemaDataList.nm}}</a>
      </div>
      <div class="cinema-info">
        <h2>{{cinemaDataList.nm}}</h2>
        <p>{{cinemaDataList.addr}}</p>
      </div>
    </div>
    <div class="gap"></div>
    <div class="tuan-list">
      <p>影院超值套餐</p>
      <div class="tuan-item" v-for="item in tuanItemList" :key="item.dealId" @click="goOrderPage(item.dealId,item.redirectUrl)">
        <!-- 图片要包含在一个盒子里，除非图片浮动浮动，不然直接给大小会造成不适设置的样式 -->
        <div>
          <img :src="item.imageUrl | cinemafilter" alt />
        </div>
        <div class="hot" v-if="item.cardTag">{{item.cardTag}}</div>
        <div class="item-info">
          <div class="title">
            <span v-if="item.recommendPersonNum=== 1">单人</span>
            <span v-if="item.recommendPersonNum=== 2">双人</span>
            <span v-if="item.recommendPersonNum=== 3">多人</span>
            {{item.title}}
          </div>
          <span class="price">
            <span>¥</span>
            {{item.price}}
          </span>
          <div class="sell-num">{{item.curNumberDesc}}</div>
          <div class="buy-btn">去购买</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
Vue.filter('cinemafilter', function(data) {
  return data.replace(/w.h/, '92.92')
})
// import bus from '../../static/js/eventBus'
export default {
  name: 'CinemaDetail',
  data() {
    return {
      id: this.$route.params.id,
      cinemaDataList: {},
      tuanItemList: [],
      cinemaTitle: ''
    }
  },
  created() {
    this.getTuanList()
  },
  mounted() {
    // alert('我传值了')
    // bus.$emit('tabShow', false)
    this.$store.commit('changeTabbarStatus', false)
    this.$store.commit('getCinemaTitle', false)
  },
  updated() {
    // this.$store.commit('getTitle', this.cinemaDataList.nm)
  },
  beforeDestroy() {
    alert(1)
    // bus.$emit('tabShow', true)
    this.$store.commit('changeTabbarStatus', true)
    this.$store.commit('getCinemaTitle', true)
  },
  methods: {
    async getTuanList() {
      const { data: res } = await this.$http.get(
        `/ajax/cinemaDetail?cinemaId=${this.id}&optimus_uuid=1E81DA407B2E11EAB7392D27D81CD6E34D268A8D3C6F48AE921DEBC8402D2A9D&optimus_risk_level=71&optimus_code=10`,
      )
      // this.tuanItemList = res.dealList.dealList
      
      
      this.cinemaDataList = res.cinemaData
      this.cinemaTitle = res.cinemaData.nm
      res.dealList.divideDealList.filter(item => {
        item.dealList.filter(item => {
          this.tuanItemList.push(item)     
        })     
      })          
    },
    goBack() {
      this.$router.go(-1)
    },
    goOrderPage(id,cinemaId) {  
      this.$router.push({path: '/order/'+id,query:{cinemaId}})
    }
  }
}
</script>
<style lang="less" scoped>

.cinema-detail {
  margin-top: -50px;
}


/* .header img {
  position: absolute;
  top: 17px;
  right: 17px;
  width: 17px;
  height: 16px;
} */

.mint-button {
  margin-right: 20px !important;
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
.cinema-wrap {
  padding: 15px;
  border-top: 1px solid #eee;
  .crumbs-nav {
    color: #777;
    a {
      color: #777;
      font-size: 14px;
    }
  }
  .cinema-info {
    margin-top: 15px;
    h2 {
      color: #333;
      font-size: 17px;
    }

    p {
      color: #999;
      font-size: 13px;
    }
  }
}
.gap {
  height: 10px;
  background-color: #f0f0f0;
}
.tuan-list {
  padding: 15px 0 10px 15px;
  p {
    margin-bottom: 15px;
    color: #666;
    font-size: 15px;
  }
  .tuan-item {
    display: flex;
    position: relative;
    border-top: 1px solid #eee;
    padding: 13px 0;
    .hot {
      position: absolute;
      top: 13px;
      color: #fff;
      background-color: #fa5030;
      font-size: 12px;
      padding: 0 5px;
      border-bottom-right-radius: 5px;
    }
    img {
      width: 92px;
      height: 92px;
    }
    .item-info {
      padding: 0 0px 0 10px;
      margin-right: 15px;
      .title {
        color: #333;
        font-size: 14px;
        span {
          display: inline-block;
          padding: 1px 3px;
          border-radius: 3px;
          background-color: #ff9900;
          font-size: 10px;
          color: #fff;
        }
      }
      .price {
        display: block;
        margin-top: 30px;
        color: #f03d37;
        font-size: 17px;
        span {
          font-size: 14px;
          margin-right: -6px;
        }
      }
      .sell-num {
        position: absolute;
        bottom: 50px;
        right: 15px;
        color: #999;
        font-size: 12px;
      }
      .buy-btn {
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 36px;
        height: 27px;
        color: #fff;
        font-size: 12px;
        background-color: #f0373d;
        padding: 0 8px;
        line-height: 27px;
        border-radius: 5px;
      }
    }
  }
}
</style>