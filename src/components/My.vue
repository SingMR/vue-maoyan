<template>
  <div class="my">
    <div class="header">
      <img src="https://img.meituan.net/maoyanuser/675d3a8bbe27febcf1ccd8c2a25d891210399.png" alt />
    </div>
    <div class="my-order">
      <div>我的订单</div>
      <div class="list">
        <div class="list-one">
          <a href="/MyOrderList">
            <img src="../assets/movie.jpg" alt />
            <p>电影</p>
          </a>
        </div>
        <div class="list-two">
          <a href="javascript:;">
            <img src="../assets/shop.png" alt />
            <p>商城</p>
          </a>
        </div>
      </div>
    </div>
    <div class="you-zhe">
      <a href="javascript:;" class="you">优惠券</a>
      <a href="javascript:;" class="zhe">折扣卡</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'My',
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.my {
  background-color: #f3f3f3;
  padding-bottom: 130px;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background: url(https://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png)
    no-repeat;
  background-color: #f0373d;
  background-size: 100% 150px;
  img {
    width: 66px;
    height: 66px;
    border-radius: 50%;
  }
}
.my-order {
  margin: 10px 0;
  text-align: center;
  background-color: #fff;
  div {
    padding: 15px 0 10px 0;
  }
  .list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    div {
      width: 33.33%;
      a {
        color: #333;
      }
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
}
.you-zhe {
  background-color: #fff;
  padding: 15px;
  a {
    display: block;
    color: #333;
    font-size: 15px;
  }
  .you {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .zhe {
    padding: 10px 0;
  }
}
</style>