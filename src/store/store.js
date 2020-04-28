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
        // getId(state, cityId) {
        //     // console.log(cityId);
            
        //     // if(cityid) {
        //     //     state.cityId = cityId
        //     // }else {
        //     //     state.cityId = '20'
        //     // }
        //     state.cityId = cityId
            
        // },
        // getResId(state, resId) {
        //     // console.log(resId);
            
        //     // if(resId) {
        //     //     state.resId = resId
        //     // }else {
        //     //     state.resId = '1588074875593'
        //     // }  
        //     state.resId = resId      
        // }
           
    },
    actions: {
        getMovieList(context) {
            axios.get(`../../static/json/moviehot.json`)
            .then( res => {
                context.commit('initMovieList', res.data.coming)
            })      
        },
        getCinemaList(context,val) {    
            if(val == null) {
                var cityId = '20'
                var resId = '1588074875593'             
            }else { 
                var cityId = val.cityid + ''
                var resId = val.resid + ''                
            }         
            axios.get(`/ajax/cinemaList?day=2020-04-28&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=${resId}&cityId=${cityId}&optimus_uuid=2E686A407F4411EA8C922F818FF720E83748459079E94ED9850FF08D9BC60368&optimus_risk_level=71&optimus_code=10`)
            .then(res => {             
                context.commit('initCinemaList', res.data.cinemas)
            })
        } 
    },
    getters: {}
})