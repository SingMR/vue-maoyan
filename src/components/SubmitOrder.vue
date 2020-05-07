<template>
  <div class="submit-order">
    <div class="header">
      <span class="icon" @click="goBack"></span>
      <mt-header title="确认订单">
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <section class="deal-info">
      <div class="pic">
        <img :src="orderList.imageUrl" alt />
      </div>
      <div class="deal-detail">
        <div>
          <span>{{orderList.titleTag}}</span>
          {{orderList.title}}
        </div>
        <p
          v-for="(item, index) in orderList.validTime"
          :key="index"
        >{{item.title}} : {{item.content}}</p>
        <p class="price">
          <em>{{orderList.originPrice}}元</em>
          <del>{{orderList.value}}元</del>
        </p>
      </div>
    </section>
    <div class="content-box">
      <div class="detail">
        <h4>套餐详情</h4>
        <span class="title">{{orderList.title}}</span>
        <span class="num">1份</span>
      </div>
      <div class="add-num">
        <h4>数量</h4>
        <div class="add-sub">
          <div class="sub" @click="sub" @mousedown="subDown" ref="subRef" @mouseup="subUp">-</div>
          <input type="text" ref="iptVal" v-model="num" @change="changeNum" />
          <div class="add" @click="add" ref="addRef" @mouseup="addUp" @mousedown="addDown">+</div>
        </div>
      </div>
      <div class="message">
        <h4>提示信息</h4>
        <span>使用时间：请在影城卖品部营业时间兑换</span>
      </div>
      <div class="phone">
        <span>手机号</span>
        168-168-168
      </div>
      <div class="order">
        <div class="total">
          <span>随时可退</span>
          <span class="total-money">
            <em>小计</em>
            <span>￥</span>
            {{money}}
          </span>
        </div>
        <button class="submit">确定下单</button>
      </div>
    </div>
  </div>
</template>
<script>
// import { oo } from '../../static/js/btn'
export default {
  name: 'SubmitOrder',
  data() {
    return {
      orderList: {},
      num: 1,
      money: 137.2
    }
  },
  created() {
    this.getOrderList()
    // 通过正则获取cinemaId
    // let cinemaId = this.$route.query.cinemaId
    // cinemaId = cinemaId.match(/cinemaId=(\d+)\&/)[1] 
    
    
  },
  mounted() {
    this.$store.commit('getCinemaTitle', false)
    this.$store.commit('changeTabbarStatus', false)
    var sub = document.querySelector('.sub')
    sub.onmouserdown = function() {
      this.style.backgroundColor = ''
    }
    sub.onmouseup = function() {
      this.style.backgroundColor = ''
    }
  },
  beforeDestroy() {
    this.$store.commit('getCinemaTitle', true)
    this.$store.commit('changeTabbarStatus', true)
  },
  watch: {
    num(val, oldVal) {
      if(val == 1) {
        this.$refs.subRef.style.color = '#999'
        this.$refs.subRef.style.backgroundColor = '#dcdcdc'
        this.$refs.subRef.style.border = '0.1rem solid #dcdcdc'      
      }else if(val > 1) {
        this.$refs.subRef.style.backgroundColor = '#fff'
        this.$refs.subRef.style.border = '0.1rem solid #e54847'
        this.$refs.subRef.style.color = '#e54847'
      }
      
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async getOrderList() {
      const data = await this.$http.get('../../static/json/order.json')
      if (data.status != 200) return false
      this.orderList = data.data.dealBrief
      console.log(this.orderList)
    },
    sub() {
      if (this.num > 1) {
        this.num--
        this.money = (
          Number(this.money) - Number(this.orderList.originPrice)
        ).toFixed(2)
      }
    },
    changeNum() {
      if (this.num < 1) {
        this.num = 1
      }
      this.money = (
        Number(this.num) * Number(this.orderList.originPrice)
      ).toFixed(2)
    },

    add() {
      this.num++
      this.money = (
        Number(this.money) + Number(this.orderList.originPrice)
      ).toFixed(2)
    },
    subDown() {
      if (this.num > 2 ) {     
        this.$refs.subRef.className = 'sub sub-down'
      }
      if(this.num <= 2 ) {
         this.$refs.subRef.className = 'sub'
      }
           
    },
    subUp() {
      if (this.num > 2) {     
        setTimeout(() => {
          this.$refs.subRef.className = 'sub sub-up'
        }, 200)
      }
    },
    addDown() {
      this.$refs.addRef.className = 'add add-down'      
    },
    addUp() {
      setTimeout(() => {
        this.$refs.addRef.className = 'add add-up'
      }, 200)
    }
  }
}
</script>
<style lang="less" scoped>
.sub-up {
  background-color: #fff !important;
  border: 0.1rem solid #e54847 !important;
}

.sub-down {
  color: #fff !important;
  background-color: #e54847 !important;
  border: 0.1rem solid #e54847 !important;
}

.add-up {
  background-color: #fff !important;
}
.add-down {
  color: #fff !important;
  background-color: #e54847 !important;
}

.submit-order {
  margin: -50px 0 -30px 0;

  background-color: #f0efed;
  .deal-info {
    display: flex;
    padding: 15px 15px;
    background-color: #fff;
    .pic {
      img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
    }
    .deal-detail {
      div {
        color: #333;
        font-size: 15px;
        margin-bottom: 3px;
        span {
          padding: 1px 3px;
          margin-right: 2px;
          border-radius: 3px;
          color: #fff;
          font-size: 11px;
          background-color: #ff9900;
        }
      }
      p {
        color: #999;
        font-size: 14px;
      }
      .price {
        em {
          color: #f0373d;
          font-size: 16px;
          font-style: normal;
        }
      }
    }
  }
  .content-box {
    // display: flex;

    // flex-wrap: wrap;
    // padding: 15px;
    margin-top: 10px;

    .detail {
      position: relative;
      padding: 15px;
      background-color: #fff;

      h4 {
        margin-bottom: 15px;
        color: #333;
      }
      .title {
        display: inline-block;
        width: 80%;
        color: #999;
        font-size: 13px;
      }
      .num {
        position: absolute;
        bottom: 35px;
        right: 15px;
        color: #999;
        font-size: 13px;
        //   background-color: #fff;
      }
    }

    .add-num {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 15px;
      background-color: #fff;
      h4 {
        display: inline-block;
        color: #333;
      }
      .add-sub {
        display: flex;
        .sub {
          width: 30px;
          height: 28px;
          background-color: #dcdcdc;
          border: 0.1rem solid #dcdcdc;
          color: #999;
          font-size: 28px;
          text-align: center;
          line-height: 28px;
          border-radius: 3px;
        }
        input {
          width: 60px;
          height: 26px;
          border: 0.1rem solid #ddd8ce;
          text-align: center;
          margin: 0 5px;
          border-radius: 3px;
          outline: none;
          padding: 1px 0;
        }
        .add {
          width: 30px;
          height: 28px;
          color: #e54847;
          font-size: 23px;
          text-align: center;
          line-height: 28px;
          border-radius: 3px;
          border: 0.1rem solid #e54847;
        }
      }
    }
    .message {
      background-color: #fff;
      margin-bottom: 10px;
      h4 {
        color: #333;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
      }
      span {
        display: inline-block;
        padding: 15px;
        color: #999;
        font-size: 14px;
      }
    }
    .phone {
      padding: 10px 15px;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      margin-bottom: 40px;
      span {
        margin-right: 5px;
      }
    }
    .order {
      padding: 0 15px;
      background-color: #fff;
      .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0 10px 0;
        span {
          color: #68bd00;
          font-size: 15px;
        }
        .total-money {
          color: #33c1af;
          font-size: 23px;
          em {
            color: #333;
            font-size: 15px;
            font-style: normal;
            font-weight: 700;
          }
          span {
            color: #33c1af;
          }
        }
      }
      .submit {
        width: 100%;
        color: #fff;
        background-color: #ff9900;
        border: 0;
        outline: none;
        // margin-bottom: 50px;
        padding: 13px 0;
        font-size: 18px;
        border-radius: 4px;
      }
    }
  }
}
</style>