<template>
  <div class="login">
    <div class="logo">
      <img src="http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" alt />
    </div>
    <form class="info">
      <input
        class="username"
        type="text"
        placeholder="手机号"
        v-model="username"
        autocomplete="off"
        @blur="usernameBlur"
        @focus="usernameFocus"
      />
      <span class="one" ref="usernameRef" @mousedown.prevent="clearUn" @click="clearUn">×</span>
      <input
        class="password"
        :type="pdType? 'password': 'text'"
        placeholder="密码"
        v-model="password"
        autocomplete="off"
        ref="passwordRef"
        @blur="passwordBlur"
        @focus="passwordFocus"
      />
      <div class="tip" ref="tipRef">账号或密码错误，请重新输入</div>
      <span class="two" ref="passwordRef" @mousedown.prevent="clearPd" @click="clearPd">×</span>
      <div class="show-pd" @click="changeShowPd">
        <img :src="isChange? showPd:hiddenPd" alt ref="imgRef" />
      </div>
      <div class="search-pd">忘记密码</div>
      <div>
        <button
          type="submit"
          ref="btnRef"
          :class="btnChange?'btn':'btn btn-active'"
          @click.prevent="handForm"
          :disabled="isBan"
        >登录</button>
      </div>
    </form>
  </div>
</template>
<script>
import show from '../assets/show.png'
import hidden from '../assets/hidden.png'
import { usernameReg } from '../../static/js/global'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isChange: false,
      pdType: false,
      showPd: show,
      hiddenPd: hidden,
      btnChange: true,
      isBan: true
    }
  },
  mounted() {
    this.$store.commit('changeTabbarStatus', false)
    this.$store.commit('getCinemaTitle', false)
  },
  beforeDestroy() {
    this.$store.commit('changeTabbarStatus', true)
    this.$store.commit('getCinemaTitle', true)
  },
  watch: {
    username() {
      if (this.username.trim().length > 0) {
        this.$refs.usernameRef.style.display = 'block'
      } else {
        this.username = ''
        this.$refs.usernameRef.style.display = 'none'
      }
      if (usernameReg.test(this.username)) {
        this.btnChange = false
        // 改变按钮状态
        this.isBan = false
      } else {
        this.btnChange = true
      }
      this.$refs.tipRef.style.display = 'none'
    },
    password() {
      if (this.password.trim().length > 0) {
        this.$refs.passwordRef.style.display = 'block'
      } else {
        this.password = ''
        this.$refs.passwordRef.style.display = 'none'
      }
      this.$refs.tipRef.style.display = 'none'
    }
  },
  methods: {
    usernameFocus() {
      if (this.username) {
        this.$refs.usernameRef.style.display = 'block'
      }
    },
    usernameBlur() {
      this.$refs.usernameRef.style.display = 'none'
    },
    passwordFocus() {
      if (this.password) {
        this.$refs.passwordRef.style.display = 'block'
      }
    },
    passwordBlur() {
      this.$refs.passwordRef.style.display = 'none'
    },

    clearUn() {
      this.username = ''
      // this.$refs.usernameRef.style.display = 'none'
    },
    clearPd() {
      this.password = ''
    },
    changeShowPd() {
      this.isChange = !this.isChange
      this.pdType = !this.pdType
    },
    handForm() {
      if (this.username == '13556730677' && this.password == '123456') {
        sessionStorage.setItem('token', Math.random().toString(16).slice(2))
        sessionStorage.setItem('selected', 'dianying')
        this.$router.push('/')
      } else {
        this.$refs.tipRef.style.display = 'block'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  margin: -50px 0 0 0;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  img {
    width: 80px;
    height: 80px;
  }
}
.info {
  position: relative;
  padding: 0 0 0 30px;
  text-align: center;
  input {
    display: block;
    margin-bottom: 40px;
    border: 0;
    border-bottom: 1px solid #e5e5e5;
    font-family: PingFang-SC-Regular;
    outline: none;
    width: 100%;
    height: 30px;
    // font-size: 1.7rem;
    font-size: 15px;
    color: #191a1b;
  }
  div {
    margin-right: 30px;
    .btn {
      opacity: 0.7;
      width: 100%;
      height: 60px;
      border: 0;
      outline: 0;
      border-radius: 10px;
      // color: #e5e5e5;
      color: #fff;
      background-color: #ed1c23;
      font-size: 16px;
    }
    .btn-active {
      opacity: 1;
    }
  }
  .one {
    display: none;
    position: absolute;
    top: -5px;
    right: 20px;
    font-size: 27px;
    color: #ccc;
  }
  .two {
    display: none;
    position: absolute;
    top: 68px;
    right: 120px;
    font-size: 27px;
    color: #ccc;
  }
  .show-pd {
    position: absolute;
    top: 76px;
    right: 65px;
    width: 18px;
    height: 10px;
    img {
      width: 18px;
      height: 10px;
    }
  }
  .search-pd {
    position: absolute;
    bottom: 107px;
    right: 5px;
    color: #666;
    font-size: 12px;
  }
}
.tip {
  display: none;
  position: absolute;
  top: 105px;
  left: 29px;
  color: #ff4a4a;
  font-size: 11px;
}
</style>