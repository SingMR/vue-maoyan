import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        includePages: []
        
    },
    mutations: {
        initMovieList(state, movie) {          
            state.movieList = movie
        },
        initCinemaList(state,cinema) {  
            state.cinemaList = cinema  
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

            if(typeof val.hallId == 'undefined') {
                var hallId = -1
            }else {
                var hallId = val.hallId
            }
            // 一开始请求页面时
            if(val == null) {
                var cityId = '20'
                var resId = '1588074875593'             
            }else { 
                var cityId = val.cityid + ''
                var resId = val.resid + ''  
            }         
            axios.get(`/ajax/cinemaList?day=2020-04-28&offset=0&limit=20&districtId=${districtId}&lineId=${lineId}&hallType=${hallId}&brandId=${brandId}&serviceId=${serviceId}&areaId=${areaId}&stationId=${stationId}&item=&updateShowDay=true&reqId=${resId}&cityId=${cityId}&optimus_uuid=2E686A407F4411EA8C922F818FF720E83748459079E94ED9850FF08D9BC60368&optimus_risk_level=71&optimus_code=10`)
            .then(res => {             
                context.commit('initCinemaList', res.data.cinemas)
            })
        } 
    },
    getters: {}
})