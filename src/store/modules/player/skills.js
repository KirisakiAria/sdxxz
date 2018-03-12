let state = {
	damageSkills: {
		sand: {
			sid: 0,
			learned: true,
			name: '扬沙',
			desc: '抓起一把沙子扬过去，对敌方造成40点风属性伤害，并减少对方5点命中。',
			consume: 60,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'static',
			effect: {
				damage: {
					type: {
						value: 5,
						name: '风'
					},
					ignoring: false,
					value: 30
				},
				debuff: {
					hit: 5
				}
			}
		},
		cnm: {
			sid: 1,
			learned: false,
			name: '素质对话',
			desc: '与敌方单体进行文明交流，敌方十分感动然后受到80点物理伤害。',
			consume: 50,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				damage: {
					type: {
						value: 1,
						name: '物理'
					},
					ignoring: false,
					value: 80
				}
			}
		},
		cnmnmbngsb: {
			sid: 2,
			learned: false,
			name: '素质三连',
			desc: '与敌方单体长时间进行文明交流，敌方热泪盈眶，受到300点无视防御的物理伤害，物防降低20%，持续三回合。',
			consume: 180,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'percentage',
			effect: {
				damage: {
					type: {
						value: 1,
						name: '物理'
					},
					ignoring: true,
					value: 300
				},
				debuff: {
					def: 0.8,
					round: 3
				}
			}
		},
		sputum: {
			sid: 3,
			learned: false,
			name: '飞痰术',
			desc: '发射飞痰，对敌方单体造成100点冰属性伤害。',
			consume: 90,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				damage: {
					type: {
						value: 3,
						name: '冰'
					},
					ignoring: false,
					value: 100
				}
			}
		},
		cumming: {
			sid: 4,
			learned: false,
			name: '蝌蚪术',
			desc: '喷射出大量白色蝌蚪，对敌方全体造成200点毒属性伤害。',
			consume: 120,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				damage: {
					type: {
						value: 4,
						name: '毒'
					},
					ignoring: false,
					value: 200
				}
			}
		},
		arson: {
			sid: 5,
			learned: false,
			name: '纵火',
			desc: '使用打火机点燃对方的jj，敌方受到250点火焰伤害并附加20点灼伤效果，持续三回合。',
			consume: 165,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'percentage',
			effect: {
				damage: {
					type: {
						value: 2,
						name: '火'
					},
					ignoring: false,
					value: 250
				},
				debuff: {
					damage: 20,
					type: 'fire',
					round: 3
				}
			}
		},
	},
	cureSkills: {
		buy: {
			sid: 6,
			learned: true,
			name: '+1',
			desc: '+1使我神清气爽，恢复60点生命。',
			consume: 80,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				cure: 60
			}
		},
		cut: {
			sid: 7,
			learned: false,
			name: '剁手',
			desc: '没钱了但又控制不住欲望，只能把手剁了，失去100点生命恢复120点魔法。',
			consume: 100,
			consumeType: {
				name: '生命',
				value: 2
			},
			effect: {
				cure: 120
			}
		},
	},
	buffSkills: {
		login: {
			sid: 8,
			learned: true,
			name: 'Steam，登录！',
			desc: '登录steam，准备+1，物攻、魔攻提升%17，物防、魔防提升%10，命中提升%40，暴击、闪避提升%10，持续两回合',
			consume: 60,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'percentage',
			effect: {
				buff: {
					atk: 1.17,
					mga: 1.17,
					def: 1.1,
					res: 1.1,
					hit: 1.4,
					crt: 1.1,
					dodge: 1.1
				},
				round: 2
			}
		},
		moralityUp: {
			sid: 9,
			learned: false,
			name: '素质提升',
			desc: '提升自己素质，使物攻、魔攻、暴击提升40%，毒属性攻击提升20%，并使素质系技能伤害提高30%，持续3回合',
			consume: 100,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'percentage',
			effect: {
				buff: {
					atk: 1.4,
					mga: 1.4,
					crt: 1.4,
					elements: {
						toxic: 1.2
					},
				},
				round: 3
			}
		},
		JJ: {
			sid: 10,
			learned: false,
			name: '林俊杰',
			desc: '使对方群体沉默，持续5回合',
			consume: 200,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				debuff: {
					slience: true
				},
				round: 5
			}
		},
		gabe: {
			sid: 11,
			learned: false,
			name: 'g胖',
			desc: '召唤g胖附体，每秒额外恢复100点魔法，使+1技能恢复效果提升三倍，持续4回合',
			consume: 300,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'static',
			effect: {
				buff: {
					mps: 100
				},
				round: 4
			}
		}
	},
	passiveSkills: {

	}
}

const mutations = {}

export default {
	state,
	mutations
}