<template>
  <div class="zixun">
    <div class="header">
      <mt-header title="音你而动">
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <h4>大咖新动态</h4>
    <div class="stars">
      <ul>
        <li v-for="item in starsList" :key="item.id">
          <img :src="item.headUrl" alt />
          <p class="name">{{item.celebrityName}}</p>
          <p class="status">{{item.recommendTag}}</p>
          <span class="dot"></span>
        </li>
      </ul>
    </div>
    <h4>为你推荐</h4>
    <div class="content-bg">
      <div class="content" ref="contentRef">
        <div class="left">
          <div v-for="(item, index) in recommendListLeft" :key="index">
            <div class="recommend-item-wrapper">
              <div class="poseter-wrapper">
                <img v-lazy="item.posterUrl" alt />
              </div>
              <div class="content-wrapper">
                <div class="title">[{{item.cityName}}] {{item.name}}</div>
                <div class="time">{{item.showTimeRange}}</div>
                <div class="price">
                  <span>￥{{item.priceRange}}</span>
                  <span class="price-label">起</span>
                </div>
              </div>
              <div class="wrapper-modal"></div>
            </div>
          </div>
          <div></div>
        </div>
        <div class="right">
          <div></div>
          <div>
            <div class="recommend-item-wrapper" v-if="img">
              <img :src="img" alt />
              <!-- <div class="wrapper-modal"></div> -->
            </div>
          </div>
          <div></div>
          <div v-for="(item1, index) in recommendListRight" :key="index">
            <div class="recommend-item-wrapper">
              <div class="poseter-wrapper">
                <img :src="item1.posterUrl" alt />
              </div>
              <div class="content-wrapper">
                <div class="title">[{{item1.cityName}}] {{item1.name}}</div>
                <div class="time">{{item1.showTimeRange}}</div>
                <div class="price">
                  <span>¥ {{item1.priceRange}}</span>
                  <span class="price-label">起</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ZiXun',
  data() {
    return {
      starsList: [],
      recommendListLeft: [],
      recommendListRight: [],
      page: 1,
      total: null,
      isLoding: true,
      img: ''
    }
  },
  created() {
    this.getStarsList()
    this.getRecommendList()
  },
  mounted() {
    this.$store.commit('getCinemaTitle', false)

    window.onscroll = this.getMoreRecommend
  },
  beforeDestroy() {
    this.$store.commit('getCinemaTitle', true)
    // 退出该页面记得解绑事件
    window.onscroll = ''
  },
  methods: {
    async getStarsList() {
      const res = await this.$http.get(
        '/maoyansh/myshow/ajax/celebrityBasicList/query?uuid=tt9v2iios2240oz4u3km8rdi5pi7u6usf3mrk5suym9p8zf66jjw95srvypko80x&clientType=1&os=1&sellChannel=13&cityId=20&lng=0&lat=0&token=kRA2fg8C4A2mKIf1bqkrxZpj_wEAAAAAWwoAAO7HZXmfdsPlCfS8c39Jb-kE9hzBOR0h1s12C2ewIMqKmHf7C4cqGmqW_k3ZstODLw'
      )
      if (res.status != 200) return false
      // console.log(res)
      // 防止图片过早渲染在页面上
      this.img =
        'https://img.meituan.net/kylisean/5657a927e4c4ee8d2d6b3e662a834fba297943.png'
      this.starsList = res.data.data
    },
    async getRecommendList() {
      var cityId = JSON.parse(localStorage.getItem('show')).id
      const res = await this.$http.get(
        `/maoyansh/myshow/ajax/performances/0;st=4;p=1;s=10;tft=0?sellChannel=13&cityId=${cityId}&lng=0&lat=0&token=kRA2fg8C4A2mKIf1bqkrxZpj_wEAAAAAWwoAAO7HZXmfdsPlCfS8c39Jb-kE9hzBOR0h1s12C2ewIMqKmHf7C4cqGmqW_k3ZstODLw`
      )
      if (res.status != 200) return false
      this.total = res.data.paging.totalHits
      var recommendListFilter = res.data.data
      recommendListFilter.filter((item, index) => {
        if (index == 0 || index == 1 || index % 2 != 0) {
          this.recommendListLeft.push(item)
        } else {
          this.recommendListRight.push(item)
        }
      })
    },
    getMoreRecommend() {
      if (
        document.documentElement.scrollTop + window.screen.height - 190 >=
          this.$refs.contentRef.offsetHeight &&
        this.isLoding
      ) {
        this.isLoding = false
        this.page++
        // 防止没数据还在加载
        if (
          this.recommendListLeft.length + this.recommendListRight.length <
          this.total
        ) {
          this.$http
            .get(
              `/maoyansh/myshow/ajax/performances/0;st=4;p=${this.page};s=10;tft=0?sellChannel=13&cityId=20&lng=0&lat=0&token=kRA2fg8C4A2mKIf1bqkrxZpj_wEAAAAAWwoAAO7HZXmfdsPlCfS8c39Jb-kE9hzBOR0h1s12C2ewIMqKmHf7C4cqGmqW_k3ZstODLw`
            )
            .then(res => {
              res.data.data.filter((item, index) => {
                if (index % 2 === 0) {
                  this.recommendListRight.push(item)
                } else {
                  this.recommendListLeft.push(item)
                }
                this.isLoding = true
              })
            })
            .catch(err => err)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.zixun {
  margin-top: -50px;
}
h4 {
  padding: 20px 15px 0;
  color: #333;
}

.stars {
  padding: 15px 0 0 0;
  margin-left: 15px;
  // margin-right: 10px;
  overflow: scroll;

  ul {
    display: flex;

    // justify-content: space-between;
    li {
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 13px;
      width: 70px;
      text-align: center;

      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }
      .name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        color: #333;
        font-size: 13px;
        font-weight: 700;
        margin: 5px 0 2px;
      }
      .status {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        color: #999;
        font-size: 11px;
      }
      .dot {
        position: absolute;
        bottom: 9px;
        right: -6px;
        width: 4px;
        height: 4px;
        background-color: #f04444;
        border-radius: 100%;
      }
    }
  }
}

.content-bg {
  padding: 10px 15px;
  text-align: left;
  .content {
    clear: both;
    overflow: hidden;
    .right {
      float: right;
      width: 48.7%;
    }
    .left {
      float: left;
      width: 48.7%;
    }
  }
}
.recommend-item-wrapper {
  position: relative;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  img {
    width: 100%;
  }
  .poseter-wrapper {
    position: relative;
    img {
      width: 100%;
    }
  }
}
img {
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.content-wrapper {
  // border: 1px solid rgba(0, 0, 0, 0.15);
  // border-top: 0;
  // border-bottom-left-radius: 5px;
  // border-bottom-right-radius: 5px;
  margin-top: -3px;
  text-align: left;
  padding: 5px 8px;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 700;
    color: #333;
    // line-height: 20px;
    max-height: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .time {
    color: #999;
    font-size: 12px;
    margin-top: 5px;
  }
  .price {
    font-weight: 700;
    color: #f03d37;
    font-family: DINAlternate-Bold, Roboto-Medium;
    margin: 5px 0 5px -2px;
    .price-label {
      font-weight: 400;
      font-size: 12px;
    }
  }
}
.wrapper-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.stars::-webkit-scrollbar  {
  display: none;
}
</style>