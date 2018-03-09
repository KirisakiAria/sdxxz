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
			value: 40
		},
		crt: {
			decs: '暴击',
			value: 45
		},
		hit: {
			decs: '命中',
			value: 110
		},
		spd: {
			decs: '速度',
			value: 24
		}
	},
	elements: {
		fire: {
			decs: '火属性',
			value: 35
		},
		ice: {
			decs: '冰属性',
			value: 35
		},
		toxic: {
			decs: '毒属性',
			value: 35
		},
		wind: {
			decs: '风属性',
			value: 35
		},
		earth: {
			decs: '土属性',
			value: 35
		}
	},
	buff: [],
	battleSkills: {
		damageSkills: null,
		cureSkills: null,
		buffSkills: [{
			sid: 1,
			name: '我系渣渣辉',
			desc: '召唤渣渣辉附身，物攻提升%55，暴击提升%15，火属性增加%15，回血速度增加20，持续三回合'
		}],
		passiveSkills: [{
			sid: 1
			name: '天生傻屌',
			desc: '天生傻屌之力，被动提升所有抗性，降低魔防。',
		}]
	}
}

const mutations = {

}

export default {
	state,
	mutations,
	namespaced: true
}