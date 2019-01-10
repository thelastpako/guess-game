import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedWord:null,
    baseImg:null,
    diff:null,
    words:null,
    bestTime:null,
    score:null,
  },
  mutations: {
    setWord(state,{word}){
      state.selectedWord = word
    },
    setImage(state,img){
      state.baseImg = img
    },
    setDiff(state,diff){
      state.diff = diff
    },
    setWords(state,words){
      state.words = words
    },
    setBestTime(state,time){
      state.bestTime = time
    },
    setScore(state,score){
      state.score = score
    },
  },
  actions: {
    setWord(commit,word){
      this.commit('setWord',{word})
    },
    setImage(commit,img){
      this.commit('setImage',img)
    },
    setDiff(commit,diff){
      this.commit('setDiff',diff)
    },
    setWords(commit,words){
      this.commit('setWords',words)
    },
    setBestTime(commit,time){
      this.commit('setBestTime',time)
    },
    setScore(commit,score){
      this.commit('setScore',score)
    },
},
  getters:{
    getBaseImg: (state) => {
      return state.baseImg
    },
    getDiff: (state) => {
      return state.diff
    },
    getSelectedWord: (state) => {
      return state.selectedWord
    },
    getWords: (state) => {
      return state.words
    },
    getBestTime: (state) => {
      return state.bestTime
    },
    getScore: (state) => {
      return state.score
    }
  }
})
