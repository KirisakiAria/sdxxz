export default {
	baseAttributes: {
		eid:3,
		name: {
			decs: '姓名',
			value: '傻屌村精英傻屌'
		},
		description: {
			decs: '描述',
			value: '稍微有点实力的傻屌，不过讲道理打不过你退群也不过分'
		},
		level: {
			decs: '等级',
			value: 8
		},
		hp: {
			decs: '生命',
			value: 520
		},
		mp: {
			decs: '魔法',
			value: 0
		},
		exp: {
			desc: '击杀经验',
			value: 150
		}
	},
	extraAttributes: {
		hps: {
			decs: '回血',
			value: 8
		},
		mps: {
			decs: '回蓝',
			value: 0
		},
		atk: {
			decs: '物攻',
			value: 55
		},
		mga: {
			decs: '魔攻',
			value: 0
		},
		def: {
			decs: '物防',
			value: 35
		},
		res: {
			decs: '魔防',
			value: 38
		},
		crt: {
			decs: '暴击',
			value: 15
		},
		hit: {
			decs: '命中',
			value: 46
		},
		spd: {
			decs: '速度',
			value: 4
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
			value: 8
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
	buff: [],
	battleSkills: {
		damageSkills: null,
		cureSkills: null,
		buffSkills: null,
		passiveSkills: null
	}
}