export default {
	baseAttributes: {
		eid:1,
		name: {
			decs: '姓名',
			value: '傻屌村中傻屌'
		},
		description: {
			decs: '描述',
			value: '倒数第二辣鸡的傻屌，打不过你就退群吧'
		},
		level: {
			decs: '等级',
			value: 4
		},
		hp: {
			decs: '生命',
			value: 220
		},
		mp: {
			decs: '魔法',
			value: 0
		},
		exp: {
			desc: '击杀经验',
			value: 70
		}
	},
	extraAttributes: {
		hps: {
			decs: '回血',
			value: 6
		},
		mps: {
			decs: '回蓝',
			value: 0
		},
		atk: {
			decs: '物攻',
			value: 45
		},
		mga: {
			decs: '魔攻',
			value: 0
		},
		def: {
			decs: '物防',
			value: 30
		},
		res: {
			decs: '魔防',
			value: 28
		},
		crt: {
			decs: '暴击',
			value: 14
		},
		hit: {
			decs: '命中',
			value: 38
		},
		spd: {
			decs: '速度',
			value: 4
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
	buff: [],
	battleSkills: {
		damageSkills: null,
		cureSkills: null,
		buffSkills: null,
		passiveSkills: null
	}
}