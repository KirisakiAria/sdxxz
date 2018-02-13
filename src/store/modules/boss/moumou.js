let state = {
	baseAttributes: {
		name: {
			decs: '姓名',
			value: '哞鸽子'
		},
		description: {
			decs: '描述',
			value: '与贪玩JJ合称神屌侠侣，潍坊奶粉王，绝活给吃树'
		},
		level: {
			decs: '等级',
			value: 20
		},
		hp: {
			decs: '生命',
			value: 1650
		},
		mp: {
			decs: '魔法',
			value: 480
		}
	},
	extraAttributes: {
		hps: {
			decs: '回血',
			value: 25
		},
		mps: {
			decs: '回蓝',
			value: 8
		},
		atk: {
			decs: '物攻',
			value: 140
		},
		mga: {
			decs: '魔攻',
			value: 60
		},
		def: {
			decs: '物防',
			value: 120
		},
		res: {
			decs: '魔防',
			value: 80
		},
		crt: {
			decs: '暴击',
			value: 30
		},
		hit: {
			decs: '命中',
			value: 80
		},
		spd: {
			decs: '速度',
			value: 15
		}
	},
	elements: {
		fire: {
			decs: '火属性',
			value: 15
		},
		ice: {
			decs: '冰属性',
			value: 12
		},
		toxic: {
			decs: '毒属性',
			value: 24
		},
		wind: {
			decs: '风属性',
			value: 18
		},
		earth: {
			decs: '土属性',
			value: 15
		}
	},
	buff: [],
	battleSkills: {
		damageSkills: [{
			sid: 1,
			name: '咕咕咕',
			desc: '哞式鸽子叫，对敌人群体造成120点物理伤害，并使敌人非常想鸽，持续两回合。'
		}],
		cureSkills: null,
		buffSkills: [{
			sid: 1,
			name: 'DNF，启动',
			desc: '启动DNF，发动爆肝模式，物防、魔防提升50%，闪避提升15%，回血速度增加25，持续三回合，状态结束后精尽人亡，失去400点血'
		}],
		passiveSkills: null
	}
}

const mutations = {

}

export default {
	state,
	mutations,
	namespaced: true
}