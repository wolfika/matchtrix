import Vue from 'vue';
import Router from 'vue-router';
import StartScreen from './views/StartScreen.vue';
import Game from './views/Game.vue';
import Lose from './views/Lose.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'startScreen',
      component: StartScreen,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
    {
      path: '/lose',
      name: 'lose',
      component: Lose,
    },
  ],
});
