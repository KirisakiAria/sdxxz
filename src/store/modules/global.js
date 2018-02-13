const state = {
	show: {
		mission: false,
		practice: true,
		skill: false,
		backpack: false,
		my: false
	}
}

const mutations = {
	show: function(state, payload) {
		Object.keys(state.show).forEach(e => {
			if (e !== payload.property) {
				state.show[e] = false;
			}
		});
		state.show[payload.property] = true;
	}
}

export default {
	state,
	mutations,
	namespaced: true
}