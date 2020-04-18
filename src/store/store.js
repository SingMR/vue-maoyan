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
        cinemaList: []
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
        }
              
    },
    actions: {
        getMovieList(context) {
            axios.get(`../../static/json/moviehot.json`)
            .then( res => {
                context.commit('initMovieList', res.data.coming)
            })      
        },
        getCinemaList(context) {
            axios.get('../../static/json/cinema.json')
            .then(res => {    
                context.commit('initCinemaList', res.data.cinemas)
            })
        } 
    },
    getters: {}
})