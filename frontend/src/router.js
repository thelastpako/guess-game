import Vue from 'vue'
import Router from 'vue-router'
import gameHome from './views/GameHome.vue'
import WordsView from './views/WordsView.vue'
import CanvasView from './views/CanvasView.vue'
import WaitingVue from './views/WaitingView.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gameHome',
      component: gameHome
    },
    {
      path: '/game',
      name: 'game-view',
      component:WordsView
    },
    {
      path: '/canvas',
      name: 'canvas-view',
      component:CanvasView
    },
    {
      path: '/waiting',
      name: 'waiting-view',
      component:WaitingVue
    }
    
  ]
})
