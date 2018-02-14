let state = {
	baseAttributes: {
		name: {
			decs: '姓名',
			value: '奶子！'
		},
		title: {
			decs: '称号',
			value: '绅士'
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
			decs: '生命',
			value: 200
		},
		mp: {
			decs: '魔法',
			value: 80
		}
	},
	extraAttributes: {
		hps: {
			decs: '回血',
			value: 3
		},
		mps: {
			decs: '回蓝',
			value: 2
		},
		atk: {
			decs: '物攻',
			value: 2500
		},
		mga: {
			decs: '魔攻',
			value: 20
		},
		def: {
			decs: '物防',
			value: 15
		},
		res: {
			decs: '魔防',
			value: 15
		},
		crt: {
			decs: '暴击',
			value: 5
		},
		hit: {
			decs: '命中',
			value: 20
		},
		spd: {
			decs: '速度',
			value: 2
		},
		chr: {
			decs: '魅力',
			value: 10
		},
		luk: {
			decs: '幸运',
			value: 10
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
			value: 1
		}
	},
	elements: {
		fire: {
			decs: '火属性',
			value: 5
		},
		ice: {
			decs: '冰属性',
			value: 5
		},
		toxic: {
			decs: '毒属性',
			value: 5
		},
		wind: {
			decs: '风属性',
			value: 5
		},
		earth: {
			decs: '土属性',
			value: 5
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
	},
	survivalSkills: [],
	battleSkills: {
		damageSkills: [{
			sid: 0,
			name: '扬沙'
		}],
		cureSkills: [{
			sid: 6,
			name: '+1'
		}],
		buffSkills: [],
		passiveSkills: []
	}
}

const mutations = {
	changeUsername(state, payload) {
		state.baseAttributes.name.value = payload.value;
	},
	chooseSpeciality(state, payload) {
		state.baseAttributes.speciality.value = payload.speciality;
		state.baseAttributes.spid.value = payload.spid;
	},
	changeExp(state,payload){
		state.baseAttributes.exp.value = payload.value;
	},
	changeLevel(state,payload){
		state.baseAttributes.level.value = payload.value;
	}
}

export default {
	state,
	mutations,
	namespaced: true
}