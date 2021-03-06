const state = {
	show: {
		mission: true,
		practice: false,
		skill: false,
		inventory: false,
		my: false
	},
	battle: false,
	interlocution: false
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
	},
	toggleInterlocution(state) {
		state.interlocution = !state.interlocution;
	}
}

export default {
	state,
	mutations,
	namespaced: true
}