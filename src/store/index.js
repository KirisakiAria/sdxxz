import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import player from './modules/player/player';
import playerSkills from './modules/player/skills';
import villageC from './modules/enemy/village/villageC';
import villageB from './modules/enemy/village/villageB';
import villageA from './modules/enemy/village/villageA';
import villageS from './modules/enemy/village/villageS';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		global,
		player,
		playerSkills,
		villageC,
		villageB,
		villageC,
		villageS
	}
});