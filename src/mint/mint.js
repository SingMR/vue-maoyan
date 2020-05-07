import Vue from 'vue'
import {Header, Tabbar, TabItem, Button, Navbar, Field, Lazyload } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(Field.name, Field)
Vue.use(Lazyload, {
    preLoad: 1.3,
    error: '../assets/movie.jpg',
    loading: '../../static/img/loading.gif',
    attempt: 1
})
