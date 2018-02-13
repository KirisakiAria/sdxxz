import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import player from './modules/player/player';
import playerSkills from './modules/player/skills';
import enemy from './modules/enemy/enemy';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		global,
		player,
		playerSkills,
		enemy
	}
});