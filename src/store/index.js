import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import player from './modules/player';
import skills from './modules/skills';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		global,
		player,
		skills
	}
});