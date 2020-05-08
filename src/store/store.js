import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {formDate} from '../../static/js/global'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: '',
        isShow: true,
        cinemaTitle: true,
        goodName:'',
        movieList: [],
        cinemaList: [],
        // 存储缓存的页面
        includePages: [],
        resId: (new Date()).getTime(),
        // 判断影院数据是否还有，防止继续加载
        hasMore: null
    },
    mutations: {
        initMovieList(state, movie) {          
            state.movieList = movie
        },
        initCinemaList(state,cinema) {              
            if(cinema.length == 0) {
                state.cinemaList = []
            }else{
                cinema.filter(item => {
                    state.cinemaList.push(item)
                }) 
            }
        },
        getHasMore(state, val) {
            state.hasMore = val
        },
        getTitle(state, val) {
            state.title = val
        },
        changeTabbarStatus(state, val) {
            state.isShow = val
        },
        getCinemaTitle(state, val) {    
            state.cinemaTitle = val           
        },
        getGoodName(state,val) {            
            state.goodName = val
        },
        getIncludePages(state, val) {     
            state.includePages = val
        }    
    },
    actions: {
        getMovieList(context) {
            axios.get(`../../static/json/moviehot.json`)
            .then( res => {
                context.commit('initMovieList', res.data.coming)
            })      
        },
        getCinemaList(context,val) {          
            if(typeof val.districtId == 'undefined') {         
                var districtId = -1
                var areaId = -1
            }else {
                var districtId = val.districtId
                var areaId = val.areaId 
            }

            if(typeof val.lineId == 'undefined') {         
                var lineId = -1
                var stationId = -1
            }else {
                var lineId = val.lineId
                var stationId = val.stationId 
            }

            if(typeof val.brandId == 'undefined') {
                var brandId = -1
            }else {
                var brandId = val.brandId
            }

            if(typeof val.serviceId == 'undefined') {
                var serviceId = -1
            }else {
                var serviceId = val.serviceId
            }

            if(typeof val.hallId == 'undefined' || val == null) {
                var hallId = -1
            }else {
                var hallId = val.hallId
            }
            // 一开始请求页面时
            if(val == null) {
                var cityId = '20'           
            }else { 
                var cityId = val.cityid + ''
            }         
            axios.get(`/ajax/cinemaList?day=${formDate()}&offset=0&limit=20&districtId=${districtId}&lineId=${lineId}&hallType=${hallId}&brandId=${brandId}&serviceId=${serviceId}&areaId=${areaId}&stationId=${stationId}&item=&updateShowDay=true&reqId=${this.state.resId}&cityId=${cityId}&optimus_uuid=2E686A407F4411EA8C922F818FF720E83748459079E94ED9850FF08D9BC60368&optimus_risk_level=71&optimus_code=10`)
            .then(res => {                                               
                context.commit('initCinemaList', res.data.cinemas)
                context.commit('getHasMore', res.data.paging.hasMore)
            })
        } 
    },
    getters: {}
})