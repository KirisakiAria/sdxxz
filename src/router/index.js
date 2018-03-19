import Vue from 'vue';
import Router from 'vue-router';
import Start from '../views/Start';
import Game from '../views/Game';

Vue.use(Router);

export default new Router({
	mode:'history',
	routes: [{
		path: '/new',
		name: 'new',
		component: Start
	}, {
		path: '/game',
		name: 'game',
		component: Game
	}]
});