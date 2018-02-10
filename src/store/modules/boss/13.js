let state = {
	baseAttributes: {
		name: {
			decs: '姓名',
			value: '贪玩JJ'
		},
		description: {
			decs: '描述',
			value: '与哞鸽子合称神屌侠侣，贪玩之王，吊打轱天乐'
		},
		level: {
			decs: '等级',
			value: 20
		},
		hp: {
			decs: '生命',
			value: 1350
		},
		mp: {
			decs: '魔法',
			value: 600
		}
	},
	extraAttributes: {
		hps: {
			decs: '回血',
			value: 15
		},
		mps: {
			decs: '回蓝',
			value: 10
		},
		atk: {
			decs: '物攻',
			value: 125
		},
		mga: {
			decs: '魔攻',
			value: 80
		},
		def: {
			decs: '物防',
			value: 90
		},
		res: {
			decs: '魔防',
			value: 75
		},
		crt: {
			decs: '暴击',
			value: 45
		},
		hit: {
			decs: '命中',
			value: 70
		},
		dodge: {
			decs: '闪避',
			value: 20
		}
	},
	elements: {
		fire: {
			decs: '火属性',
			value: 20
		},
		ice: {
			decs: '冰属性',
			value: 20
		},
		toxic: {
			decs: '毒属性',
			value: 20
		},
		wind: {
			decs: '风属性',
			value: 20
		},
		earth: {
			decs: '土属性',
			value: 20
		}
	},
	equipments: {
		weapon: {
			decs: '武器',
			value: ''
		},
		armor: {
			decs: '防具',
			value: ''
		},
		shoes: {
			decs: '鞋',
			value: ''
		},
		necklace: {
			decs: '项链',
			value: ''
		},
		ring: {
			decs: '戒指',
			value: ''
		},
		arcana: {
			decs: '秘宝',
			value: ''
		}
	},
	buff: [],
	battleSkills: [{
		name: '天生傻屌',
		description: '天生傻屌之力，被动提升暴击系数到三',
		type: 2,
	}, {
		name: '我系渣渣辉',
		description: '召唤渣渣辉附身，攻击提升55，暴击提升15，火属性增加10，回血速度增加20',
		consume: 450,
		type: 1,
	}]
}

const mutations = {
	change(state, payload) {
		state[payload.property] = payload.value;
	},
	increase(state, payload) {
		state[payload.property] += payload.amount;
	},
	arrayPush(state, payload) {
		state[payload.property].push(payload.item);
	}
};

export default {
	state,
	mutations,
	namespaced: true
}