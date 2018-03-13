let state = {
	baseAttributes: {
		name: {
			decs: '姓名',
			value: '测试'
		},
		title: {
			decs: '称号',
			value: '测试'
		},
		level: {
			decs: '等级',
			value: 1
		},
		exp: {
			decs: '经验',
			value: 0
		},
		speciality: {
			decs: '特长',
			value: ''
		},
		spid: {
			decs: '特长ID',
			value: 0
		},
		hp: {
			decs: '当前生命',
			value: 200,
		},
		mp: {
			decs: '当前魔法',
			value: 50,
		},
		maxhp: {
			decs: '生命总量',
			value: 200,
		},
		maxmp: {
			decs: '魔法总量',
			value: 150,
		},
		namespace:'player'
	},
	extraAttributes: {
		atk: {
			decs: '物攻',
			value: 25,
			grow: 7
		},
		mga: {
			decs: '魔攻',
			value: 20,
			grow: 5
		},
		def: {
			decs: '物防',
			value: 15,
			grow: 4.6
		},
		res: {
			decs: '魔防',
			value: 15,
			grow: 2.8
		},
		//暴击系数默认1.5
		crt: {
			decs: '暴击',
			value: 5,
			grow: 1.2
		},
		hit: {
			decs: '命中',
			value: 40,
			grow: 2.5
		},
		spd: {
			decs: '速度',
			value: 3,
			grow: 0.4
		},
		chr: {
			decs: '魅力',
			value: 10,
			grow: 3
		},
		luk: {
			decs: '幸运',
			value: 10,
			grow: 5
		},
		gold: {
			decs: '金钱',
			value: 0
		},
		points: {
			decs: '属性点',
			value: 0
		},
		sp: {
			decs: '技能点',
			value: 1,
			grow: 1
		}
	},
	elements: {
		fire: {
			decs: '火属性',
			value: 5,
			grow: 1.5
		},
		ice: {
			decs: '冰属性',
			value: 5,
			grow: 1.5
		},
		toxic: {
			decs: '毒属性',
			value: 5,
			grow: 1.5
		},
		wind: {
			decs: '风属性',
			value: 5,
			grow: 1.5
		},
		earth: {
			decs: '土属性',
			value: 5,
			grow: 1.5
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
	levelUpExp: [0, 0, 100, 140, 196, 274, 384, 537, 752, 1054, 1475, 2066, 2892, 4049, 5669, 7937, 11112, 15556, 21779, 30491, 42687, 59763, 83668],
	items: [],
	buff: [],
	debuff: {
		slience: false,
		disarm: false
	}
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