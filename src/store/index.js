import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import mission from './modules/player/mission';
import player from './modules/player/player';
import playerSkills from './modules/player/skills';
import items from './modules/player/items';
import groupC from './modules/enemy/group/C';
// import groupB from './modules/enemy/group/B';
// import groupA from './modules/enemy/group/A';
// import groupS from './modules/enemy/group/S';
// import groupSS from './modules/enemy/group/SS';
import enemySkills from './modules/enemy/skills';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		global,
		mission,
		player,
		playerSkills,
		items,
		groupC,
		// groupB,
		// groupA,
		// groupS,
		// groupSS,
		enemySkills
	}
});