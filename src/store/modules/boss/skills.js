let state = {
	damageSkills: {
		gugugu: {
			sid: 0,
			learned: false,
			name: '咕咕咕',
			desc: '哞式鸽子叫，对敌人群体造成120点物理伤害，并使敌人非常想鸽，持续两回合。',
			consume: 80,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'static',
			effect: {
				damage: {
					type: {
						value: 1,
						name: 'afk'
					},
					ignoring: false,
					value: 120
				}
			}
		},
	},
	cureSkills: {

	},
	buffSkills: {
		dnf: {
			sid: 8,
			learned: false,
			name: 'DNF，启动！',
			desc: '启动DNF，发动爆肝模式，物防、魔防提升50%，闪避提升15%，回血速度增加25，持续三回合，状态结束后精尽人亡，失去400点血',
			consume: 60,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'percentage',
			effect: {
				buff: {
					def: 1.5,
					res: 1.5,
					dodge: 1.15,
					hps: 25
				},
				round: 3
			}
		},
		zzh: {
			sid: 9,
			learned: false,
			name: '我系渣渣辉',
			desc: '召唤渣渣辉附身，物攻提升%55，暴击提升%15，火属性增加%15，回血速度增加20，持续三回合',
			consume: 450,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'percentage',
			effect: {
				buff: {
					atk: 1.55,
					crt: 1.15,
					elements: {
						fire: 1.15
					},
				},
				round: 3
			}
		}
	},
	passiveSkills: {
		bornToSD: {
			name: '天生傻屌',
			desc: '天生傻屌之力，被动提升所有抗性',
		}
	}
}

const mutations = {
	
}

export default {
	state,
	mutations
}