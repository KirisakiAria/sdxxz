const state = {
	show: {
		mission: false,
		practice: false,
		skill: false,
		inventory: false,
		my: true
	},
	battle: false
}

const mutations = {
	show(state, payload) {
		Object.keys(state.show).forEach(e => {
			if (e !== payload.property) {
				state.show[e] = false;
			}
		});
		state.show[payload.property] = true;
	},
	toggleBattle(state) {
		state.battle = !state.battle;
	}
}

export default {
	state,
	mutations,
	namespaced: true
}