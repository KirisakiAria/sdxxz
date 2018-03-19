const state = {
	show: {
		mission: false,
		practice: false,
		skill: false,
		backpack: false,
		my: true
	},
	battle: false
}

const mutations = {
	show: function (state, payload) {
		Object.keys(state.show).forEach(e => {
			if (e !== payload.property) {
				state.show[e] = false;
			}
		});
		state.show[payload.property] = true;
	},
	toggleBattle: function (state) {
		state.battle = !state.battle;
	}
}

export default {
	state,
	mutations,
	namespaced: true
}