<template>
  <div class="cinema">
    <nav>
      <div class="location">
        <span class="city-name" @click="selectCity">{{showCityName}}</span>
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
      <ul class="navbar" ref="navRef">
        <li @click="quanCheng('0')">
          <span class="quancheng text-ellipsis" ref="qcRef">全城</span>
          <span class="icon"></span>
        </li>
        <li @click="pinPai('1')">
          <span class="pinpai text-ellipsis" ref="ppRef">品牌</span>
          <span class="icon"></span>
        </li>
        <li @click="teSe('2')">
          <span class="pinpai text-ellipsis" ref="tsRef">特色</span>
          <span class="icon" ref="teSeRef"></span>
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
    <el-dialog
      :visible.sync="allDialogVisible"
      width="100%"
      :show-close="false"
      @open="qcHandleOpen"
    >
      <div class="one">
        <el-tabs v-model="activeName">
          <el-tab-pane name="0">
            <span slot="label" class="lable-name">
              <span class="label-one" style="margin-right: -51px;">{{cityName}}</span>
              <i class="el-icon-caret-bottom" ref="qcIconRef" style="margin-left: 51px;"></i>
            </span>
            <div class="second">
              <div class="line-r" ref="linrRef"></div>
              <div class="line-l" ref="linlRef"></div>
              <el-tabs v-model="qcactiveName">
                <el-tab-pane label="商区" name="shop">
                  <div class="three">
                    <el-tabs tab-position="left" v-model="shopactiveName" style="height: 200px;">
                      <el-tab-pane
                        :label="shop.name+' ('+shop.count+')'"
                        v-for="shop in districtList"
                        :key="shop.id"
                      >
                        <div
                          class="name-count"
                          v-for="shop1 in shop.subItems"
                          :key="shop1.id"
                          @click="shopClikHandle(shop1.name,shop.id,shop1.id,shop.name)"
                          ref="shopRef"
                        >
                          <i class="el-icon-check"></i>
                          <span class="name">{{shop1.name}}</span>
                          <span class="count">{{shop1.count}}</span>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="地铁站" name="subway">
                  <div class="three">
                    <el-tabs tab-position="left" style="height: 200px;">
                      <el-tab-pane
                        :label="sub.name +' ('+sub.count+')'"
                        v-for="sub in subwayList"
                        :key="sub.id"
                      >
                        <div
                          class="name-count"
                          v-for="sub1 in sub.subItems"
                          :key="sub1.id"
                          ref="subwayRef"
                          @click="subwayClikHandle(sub1.name,sub.id,sub1.id,sub.name)"
                        >
                          <i class="el-icon-check"></i>
                          <span class="name">{{sub1.name}}</span>
                          <span class="count">{{sub1.count}}</span>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
          <el-tab-pane name="1">
            <span slot="label" class="lable-name label-spec">
              <span class="label-two">{{brandName}}</span>
              <i class="el-icon-caret-bottom" ref="ppIconRef"></i>
            </span>
            <div class="pp-list">
              <div
                class="pp-list-item"
                v-for="(brand, index) in brandList"
                :key="brand.id"
                @click="brandClikHandle(brand.name,index, brand.id)"
                ref="brandRef"
              >
                <i class="el-icon-check" style="visibility: hidden;"></i>
                <div class="pp-name-count">
                  <span class="pp-name">{{brand.name}}</span>
                  <span class="pp-count">{{brand.count}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label" class="lable-name">
              <span class="label-three">{{characteristicName}}</span>
              <i class="el-icon-caret-bottom" ref="tsIconRef"></i>
            </span>
            <div class="tab-content">
              <div class="special">
                <div class="spec-func">
                  <p class="title">特色功能</p>
                  <div class="tag-desc">
                    <span
                      class="text-ellipsis"
                      v-for="(service,index) in serviceList"
                      :key="service.id"
                      @click="serviceHandle(index,service.id)"
                      ref="serviceRef"
                    >{{service.name}}</span>
                  </div>
                </div>
                <div class="spec-hall">
                  <p class="title">特殊厅</p>
                  <div class="tag-desc">
                    <span
                      class="text-ellipsis"
                      v-for="(hall, index) in hallTypeList"
                      :key="hall.id"
                      @click="hallTypeHandle(index,hall.id)"
                      ref="hallRef"
                    >{{hall.name}}</span>
                  </div>
                </div>
              </div>
              <div class="footer">
                <div class="reset-certain">
                  <button @click="resetHandle">重置</button>
                  <button class="btn" @click="certainHandle">确定</button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
// 异常处理
Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`)
}
import { mapState } from 'vuex'
import { Indicator } from 'mint-ui'
import { formDate } from '../../static/js/global'
export default {
  name: 'Cinema',
  data() {
    return {
      // 判断影院数据是否加载完
      loding: true,
      offset: 0,
      showCityName: localStorage.getItem('show')
        ? JSON.parse(localStorage.getItem('show')).nm
        : '广州',
      // 全城对话框的显示与隐藏
      allDialogVisible: false,
      activeName: 'quanCheng',
      districtList: [],
      subwayList: [],
      // 存储品牌影城列表
      brandList: [],
      num: '',
      qcactiveName: 'shop',
      shopactiveName: '',
      cityName: '全城',
      brandName: '品牌',
      characteristicName: '特色',
      // 特殊厅
      hallTypeList: [],
      // 特色功能
      serviceList: [],
      districtId: -1,
      areaId: -1,
      lineId: -1,
      stationId: -1,
      brandId: -1,
      hallId: -1,
      serviceId: -1,
      serviceIndex: '',
      hallIndex: ''
    }
  },
  created() {
    this.getFilterCinemas()
    // tabbar的跳转不出现加载提示
    if (this.showCityName != sessionStorage.getItem('showCityName')) {
      this.$store.commit('initCinemaList', [])
    }
    sessionStorage.setItem('showCityName', this.showCityName)
    // 浏览器刷新事件
    window.onload  = this.wOnload
  },
  activated() {
    // 缓存组件进来执行
    window.onscroll = this.moreCinemaList
    
  },
  deactivated() {
    //缓存组件离开执行
    window.onscroll = ''
    
  },
  mounted() {
    if (this.cinemaList.length == 0) {
      Indicator.open({
        text: '正在加载...',
        spinnerType: 'snake'
      })
      var timer = setTimeout(() => {
        this.load()
        Indicator.close()
      }, 3000)
    } else {
      this.load()
    }
  },
  beforeDestroy() {
    this.timer = null
    
  },
  watch: {
    activeName(val) {
      this.$refs.qcIconRef.style.transform = ''
      this.$refs.ppIconRef.style.transform = ''
      this.$refs.tsIconRef.style.transform = ''
      if (val == 0) {
        this.$refs.qcIconRef.style.transform = 'rotateZ(182deg)'
      } else if (val == 1) {
        this.$refs.ppIconRef.style.transform = 'rotateZ(182deg)'
      } else {
        this.$refs.tsIconRef.style.transform = 'rotateZ(182deg)'
      }
    },
    qcactiveName(val) {
      if (val == 'shop') {
        this.$refs.linlRef.style.display = 'inline-block'
        this.$refs.linrRef.style.display = 'none'
      } else if (val == 'subway') {
        this.$refs.linlRef.style.display = 'none'
        this.$refs.linrRef.style.display = 'inline-block'
      }
    },
    shopactiveName(val) {}
  },
  computed: {
    ...mapState(['cinemaList','hasMore'])
  },
  methods: {
    // allDialogClose() {
    //   alert('close')
    //   window.onscroll = this.moreCinemaList
    // },
    // 浏览器刷新清空sessionStorage,以至于让对话框恢复初始状态
    wOnload() {
      sessionStorage.removeItem('hall-default')
      sessionStorage.removeItem('service-default')
      sessionStorage.removeItem('brand-default')
      sessionStorage.removeItem('certainHandle')
    },
    moreCinemaList() {
      let cityid = JSON.parse(localStorage.getItem('show')).id
      if (
        document.documentElement.scrollTop + window.screen.height >=
          this.$refs.articleHeight.offsetHeight &&
        this.loding && this.hasMore
      ) {
        this.loding = false
        this.offset += 20
        this.$http
          .get(
            `/ajax/cinemaList?day=${formDate()}&offset=${
              this.offset
            }&limit=20&districtId=${this.districtId}&lineId=${
              this.lineId
            }&hallType=${this.hallId}&brandId=${this.brandId}&serviceId=${
              this.serviceId
            }&areaId=${this.areaId}&stationId=${
              this.stationId
            }&item=&updateShowDay=true&reqId=${+new Date()}&cityId=${
              JSON.parse(localStorage.getItem('show')).id
            }&optimus_uuid=2E686A407F4411EA8C922F818FF720E83748459079E94ED9850FF08D9BC60368&optimus_risk_level=71&optimus_code=10`
          )
          .then(res => {
            // 以免直接加载，用户体验较好
              setTimeout(_ => {
                this.$store.commit('initCinemaList', res.data.cinemas)
              },2000)          
              this.$store.commit('getHasMore', res.data.paging.hasMore)
              this.$nextTick(() => {
                this.loding = true
              })
            
          })
      }
    },
    goCinemaDetail(id) {
      this.$router.push('/yingyuan/detail/' + id)
    },
    searchHandle() {
      this.$router.push('/search')
    },
    selectCity() {
      this.$router.push('/city')
    },
    load() {
      if (localStorage.getItem('show') != null) {
        let cityid = JSON.parse(localStorage.getItem('show')).id
        this.$store.dispatch('getCinemaList', { cityid })
      } else {
        this.$store.dispatch('getCinemaList', null)
      }
    },
    quanCheng(value) {
      this.allDialogVisible = true
      this.num = value
      this.activeName = '0'
    },
    pinPai(value) {
      this.allDialogVisible = true
      this.num = value
      this.activeName = '1'
    },
    teSe(value) {
      this.allDialogVisible = true
      this.num = value
      this.activeName = '2'
    },
    qcHandleOpen() {
      this.$nextTick(_ => {
        if (
          sessionStorage.getItem('certainHandle') &&
          sessionStorage.getItem('service-default')
        ) {
          this.$refs.serviceRef[
            sessionStorage.getItem('service-default')
          ].className = 'text-ellipsis service-chosen'
        }
        if (!sessionStorage.getItem('certainHandle')) {
          this.$refs.hallRef.filter((item, index) => {
            item.className = 'text-ellipsis'
          })
          this.$refs.serviceRef.filter((item, index) => {
            item.className = 'text-ellipsis'
          })
          this.$refs.hallRef[0].className = 'text-ellipsis service-chosen'
          this.$refs.serviceRef[0].className = 'text-ellipsis service-chosen'
        }

        if (!sessionStorage.getItem('brand-default')) {
          this.$refs.brandRef[0].children[0].style.visibility = 'visible'
          this.$refs.brandRef[0].style.color = '#dd403b'
          this.$refs.brandRef[0].children[1].children[0].style.color = '#dd403b'
        }
        this.$refs.toRef.children[this.num].style.transform = 'rotateZ(182deg)'
        this.$refs.toRef.children[this.num].style.color = '#e54847'
      })
    },
    async getFilterCinemas() {
      let id = JSON.parse(localStorage.getItem('show')).id
      const { data: res } = await this.$http.get(
        `/ajax/filterCinemas?ci=${id}&optimus_uuid=2E686A407F4411EA8C922F818FF720E83748459079E94ED9850FF08D9BC60368&optimus_risk_level=71&optimus_code=10`
      )
      this.districtList = res.district.subItems
      this.subwayList = res.subway.subItems
      this.brandList = res.brand.subItems
      this.hallTypeList = res.hallType.subItems
      this.serviceList = res.service.subItems
    },
    shopClikHandle(name, districtId, areaId, shopName) {
      this.shop_subwayClickHandle(this.$refs.shopRef, name, shopName)
      // 根据选择的地点进行请求
      let cityid = JSON.parse(localStorage.getItem('show')).id

      // 先保存起来，以至于点击地铁站的时候判断有没有点击过商区
      this.districtId = districtId
      this.areaId = areaId
      if (districtId) {
        Indicator.open({
          text: '正在加载...',
          spinnerType: 'snake'
        })
        var timer = setTimeout(() => {
          this.$store.dispatch('getCinemaList', {
            cityid,
            districtId,
            areaId,
            lineId: this.lineId,
            stationId: this.stationId,
            brandId: this.brandId,
            serviceId: this.serviceId,
            hallId: this.hallId
          })
          Indicator.close()
        }, 3000)
      }
    },
    subwayClikHandle(name, lineId, stationId, subName) {
      this.shop_subwayClickHandle(this.$refs.subwayRef, name, subName)
      let cityid = JSON.parse(localStorage.getItem('show')).id

      // 先保存起来，以至于点击商区的时候判断有没有点击过地铁站
      this.lineId = lineId
      this.stationId = stationId
      if (lineId) {
        Indicator.open({
          text: '正在加载...',
          spinnerType: 'snake'
        })
        var timer = setTimeout(() => {
          this.$store.dispatch('getCinemaList', {
            cityid,
            districtId: this.districtId,
            areaId: this.areaId,
            lineId,
            stationId,
            brandId: this.brandId,
            serviceId: this.serviceId,
            hallId: this.hallId
          })
          Indicator.close()
        }, 3000)
      }
    },
    shop_subwayClickHandle(arr, name, shopName) {
      // 排它思想
      for (var i = 0; i < arr.length; i++) {
        arr[i].style.color = ''
        arr[i].children[0].style.display = 'none'
      }
      arr.filter((item, index) => {
        if (item.children[1].innerText == name) {
          item.children[0].style.display = 'inline-block'
          item.style.color = '#f03d37'
        }
      })
      if (name == '全部') {
        this.cityName = shopName
        this.$refs.qcRef.innerText = shopName
      } else {
        this.cityName = name
        this.$refs.qcRef.innerText = name
      }
      this.allDialogVisible = false
      // 更换地区时，清空影院数组
      this.$store.commit('initCinemaList', [])
    },
    brandClikHandle(name, val, brandId) {
      sessionStorage.setItem('brand-default', name)
      this.$refs.brandRef.filter((item, index) => {
        if (val == index) {
          item.children[0].style.visibility = 'visible'
          item.style.color = '#dd403b'
          item.children[1].children[0].style.color = '#dd403b'
        } else {
          item.children[0].style.visibility = 'hidden'
          item.style.color = ''
          item.children[1].children[0].style.color = ''
        }
      })
      this.brandId = brandId
      this.$store.commit('initCinemaList', [])
      let cityid = JSON.parse(localStorage.getItem('show')).id
      if (brandId) {
        Indicator.open({
          text: '正在加载...',
          spinnerType: 'snake'
        })
        var timer = setTimeout(() => {
          this.$store.dispatch('getCinemaList', {
            cityid,
            districtId: this.districtId,
            areaId: this.areaId,
            lineId: this.lineId,
            stationId: this.stationId,
            brandId,
            serviceId: this.serviceId,
            hallId: this.hallId
          })
          Indicator.close()
        }, 3000)
      }
      this.brandName = name
      this.$refs.ppRef.innerText = name
      this.allDialogVisible = false
    },
    serviceHandle(val, serviceId) {
      sessionStorage.setItem('service-default', val)
      this.$refs.serviceRef.filter((item, index) => {
        if (val == index) {
          item.className = 'text-ellipsis service-chosen'
        } else {
          item.className = 'text-ellipsis'
        }
      })
      this.serviceId = serviceId
      this.serviceIndex = val
    },
    hallTypeHandle(val, hallId) {
      sessionStorage.setItem('hall-default', val)
      this.$refs.hallRef.filter((item, index) => {
        if (val == index) {
          item.className = 'text-ellipsis service-chosen'
        } else {
          item.className = 'text-ellipsis'
        }
      })
      this.hallId = hallId
      this.hallIndex = val
    },
    resetHandle() {
      this.$refs.hallRef.filter((item, index) => {
        item.className = 'text-ellipsis'
      })
      this.$refs.serviceRef.filter((item, index) => {
        item.className = 'text-ellipsis'
      })
      this.$refs.serviceRef[0].className = 'text-ellipsis service-chosen'
      this.$refs.hallRef[0].className = 'text-ellipsis service-chosen'
    },
    certainHandle() {
      sessionStorage.setItem('certainHandle', 'confirm')
      this.$store.commit('initCinemaList', [])
      let cityid = JSON.parse(localStorage.getItem('show')).id
      if (this.serviceId || this.hallId) {
        Indicator.open({
          text: '正在加载...',
          spinnerType: 'snake'
        })
        var timer = setTimeout(() => {
          this.$store.dispatch('getCinemaList', {
            cityid,
            districtId: this.districtId,
            areaId: this.areaId,
            lineId: this.lineId,
            stationId: this.stationId,
            brandId: this.brandId,
            serviceId: this.serviceId,
            hallId: this.hallId
          })
          Indicator.close()
        }, 3000)
      }
      if (this.serviceIndex != 0 || this.hallIndex != 0) {
        this.$refs.tsRef.style.color = '#e54847'
        this.$refs.teSeRef.className = 'icon ts-icon'
        console.log(this.$refs.tsIconRef.style)
      } else {
        this.$refs.tsRef.style.color = ''
        this.$refs.teSeRef.className = 'icon'
      }
      this.allDialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.lable-name {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: inline-block;
    text-align: right;
    width: 70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.label-spec {
  margin: 0 20px 0 10px;
}
.el-icon-caret-bottom {
  font-size: 13px;
}

.line-r {
  position: absolute;
  display: none;
  top: 43px;
  right: 38px;
  width: 45%;
  height: 2.5px;
  background-color: red;
  z-index: 99;
}
.line-l {
  position: absolute;
  top: 43px;
  left: 0;
  width: 45%;
  height: 2.5px;
  background-color: red;
  z-index: 99;
}
.cinema {
  position: relative;
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
    // padding-left: 10px;
    .city-name {
      color: #666;
      font-size: 15px;
    }
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
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
  left: 0;
  width: 100%;
  padding: 8px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}
.navbar {
  display: flex;
  align-items: center;
  li {
    width: 33.3%;
    padding: 3px 0;
    text-align: center;
    font-size: 13px;
    color: #777;
    // line-height: 26px;
    span:nth-child(1) {
      display: inline-block;
      max-width: 90px;
    }
    .quancheng {
      margin-right: -3px;
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
.ts-icon {
  border-top-color: #e54847;
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
.three {
  margin-top: 8px;
  height: 457px;
}

.name-count {
  position: relative;
  margin-bottom: 20px;
  padding-left: 18px;
  .el-icon-check {
    display: none;
    position: absolute;
    top: 2px;
    left: 0;
    font-size: 15px;
  }
  .count {
    float: right;
    margin-right: 20px;
    font-size: 12px;
  }
}
.pp-list {
  height: 366px;
  margin-right: 40px;
  overflow-y: scroll;
  .pp-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 10px 13px 15px;
    border-bottom: 1px solid #eee;
    color: #8f9296;
    .pp-name-count {
      width: 95%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pp-name {
        color: #333;
        font-size: 15px;
      }
      .pp-count {
        text-align: right;
        font-size: 12px;
      }
    }
  }
}
.tab-content {
  position: relative;
  height: 350px;
  .special {
    overflow: scroll;
    height: 290px;
    margin: 15px 30px 0 10px;
    .spec-hall,
    .spec-func {
      margin-bottom: 15px;
    }
  }
}
.tag-desc {
  span {
    display: inline-block;
    width: 71px;
    height: 38px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    color: #878787;
    margin-top: 10px;
    margin-right: 8px;
  }
}
.title {
  font-size: 15px;
  color: #777;
}
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  .reset-certain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    margin-right: 15px;
    background-color: #fafafa;
    border-top: 1px solid #e5e5e5;
    button {
      width: 26%;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #777;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      text-align: center;
      border-radius: 5px;
    }
    .btn {
      color: #fff;
      background: #f03d37;
      border: 1px solid #f03d37;
    }
  }
}
.service-chosen {
  background: #fcf0f0;
  color: #f03d37 !important;
  border: 1px solid #f03d37 !important;
}
</style>