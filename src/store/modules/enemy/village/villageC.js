let state = {
	baseAttributes: {
		eid: 0,
		namespace:'villageC',
		name: {
			decs: '姓名',
			value: '傻屌村小傻屌'
		},
		description: {
			decs: '描述',
			value: '最辣鸡的傻屌，打不过你就退群吧'
		},
		level: {
			decs: '等级',
			value: 2
		},
		hp: {
			decs: '生命',
			value: 120
		},
		mp: {
			decs: '魔法',
			value: 0
		},
		maxhp: {
			decs: '生命总量',
			value: 120
		},
		maxmp: {
			decs: '魔法总量',
			value: 0
		},
		exp: {
			desc: '击杀经验',
			value: 500
		}
	},
	extraAttributes: {
		atk: {
			decs: '物攻',
			value: 30
		},
		mga: {
			decs: '魔攻',
			value: 0
		},
		def: {
			decs: '物防',
			value: 16
		},
		res: {
			decs: '魔防',
			value: 18
		},
		crt: {
			decs: '暴击',
			value: 10
		},
		hit: {
			decs: '命中',
			value: 35
		},
		spd: {
			decs: '速度',
			value: 1
		}
	},
	elements: {
		fire: {
			decs: '火属性',
			value: 0
		},
		ice: {
			decs: '冰属性',
			value: 0
		},
		toxic: {
			decs: '毒属性',
			value: 0
		},
		wind: {
			decs: '风属性',
			value: 0
		},
		earth: {
			decs: '土属性',
			value: 0
		}
	},
	buff: []
}

const mutations = {
	changeBaseValue(state, payload) {
		state.baseAttributes[payload.propety]['value'] = payload.value;
	},
	changeExtValue(state, payload) {
		state.extraAttributes[payload.propety]['value'] = payload.value;
	}
}

export default {
	state,
	mutations,
	namespaced: true
}