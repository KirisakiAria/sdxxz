let state = {
	damageSkills: {
		sand: {
			sid: '0000',
			learned: true,
			name: '扬沙',
			desc: '抓起一把沙子扬过去，对敌方造成40点风属性伤害，并减少对方15%命中。',
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
					value: 40
				},
				buff: [{
					type: 1,
					position: ['hit'],
					value: 0.85
				}]
			}
		},
		cnm: {
			sid: '0001',
			learned: false,
			name: '素质对话',
			desc: '与敌方单体进行文明交流，敌方素质明显提高然后受到80点物理伤害。',
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
			sid: '0002',
			learned: true,
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
					value: 390
				},
				buff: [{
					type: 1,
					position: ['def'],
					value: 0.8
				}]
			}
		},
		sputum: {
			sid: '0003',
			learned: false,
			name: '飞痰',
			desc: '一口老痰吐到敌方脸上，使敌方单体受到100点冰属性伤害。',
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
			sid: '0004',
			learned: false,
			name: '蝌蚪',
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
			sid: '0005',
			learned: false,
			name: '纵火',
			desc: '使用打火机点燃敌方的jj，敌方受到250点火焰伤害并附加20点灼伤效果，持续三回合。',
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
				buff: {
					damage: 20,
					type: 'fire',
					round: 3
				}
			}
		},
	},
	cureSkills: {
		buy: {
			sid: '1000',
			learned: true,
			name: '+1',
			desc: '+1使我神清气爽，恢复60点生命。',
			consume: 80,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				cure: {
					value: 60
				}
			}
		},
		cut: {
			sid: '1001',
			learned: true,
			name: '剁手',
			desc: '没钱了但又控制不住欲望，只能把手剁了，失去80点生命恢复120点魔法。',
			consume: 80,
			consumeType: {
				name: '生命',
				value: 2
			},
			effect: {
				cure: {
					value: 120
				}
			}
		},
	},
	//target 1为己方，2为敌方
	//buff类技能的type：1为增加自身属性，2为增加技能的值，3为沉默、缴械等debuff
	buffSkills: {
		login: {
			sid: '2000',
			learned: true,
			name: 'Steam，登录！',
			desc: '登录steam，准备+1，物攻、魔攻提升%18，物防、魔防提升%10，命中提升%40，暴击、速度提升%12，持续两回合。',
			consume: 60,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				target: 1,
				buff: [{
						type: 1,
						position: ['extraAttributes', 'atk'],
						value: 1.18,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'mga'],
						value: 1.18,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'def'],
						value: 1.1,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'res'],
						value: 1.1,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'def'],
						value: 1.4,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'crt'],
						value: 1.12,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'spd'],
						value: 1.12,
						valueType: 'percentage'
					}
				],
				round: 3
			}
		},
		moralityUp: {
			sid: '2001',
			learned: false,
			name: '素质提升',
			desc: '提升自己素质，使物攻、魔攻、暴击提升20%，毒属性提升15%，并使素质三连伤害提高30%，持续3回合。',
			consume: 100,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'percentage',
			effect: {
				target: 1,
				buff: [{
						type: 1,
						position: ['extraAttributes', 'atk'],
						value: 1.12,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'mga'],
						value: 1.12,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'crt'],
						value: 1.12,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['elements', 'toxic'],
						value: 1.5,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['elements', 'toxic'],
						value: 1.5,
						valueType: 'percentage'
					},
					{
						type: 2,
						position: ['damageSkills', 'cnmnmbngsb', 'effect', 'damage'],
						value: 1.3,
						valueType: 'percentage'
					}
				],
				round: 3
			}
		},
		JJ: {
			sid: '2002',
			learned: false,
			name: '可惜没如果',
			desc: '召唤沉默术士，使对方群体沉默，持续5回合。',
			consume: 200,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				target: 2,
				buff: [{
					type: 3,
					position: ['debuff', 'slient'],
					round: 5
				}],
				round: 5
			}
		},
		gabe: {
			sid: '2003',
			learned: false,
			name: 'g胖',
			desc: '召唤g胖附体，使+1技能恢复效果提升三倍，持续4回合。',
			consume: 300,
			consumeType: {
				name: '魔法',
				value: 1
			},
			type: 'static',
			effect: {
				target: 1,
				buff: [{
					type: 2,
					position: ['cureSkills', 'buy'],
					value: 3,
					valueType: 'percentage'
				}],
				round: 4
			}
		}
	},
	passiveSkills: {
		steamer: {
			sid: '3000',
			learned: true,
			name: 'Steamer',
			desc: '你是一名steam玩家，不过这个被动现在好像没什么用。',
			effect: {}
		},
		dotaplus: {
			sid: '3001',
			learned: true,
			name: 'Dota2Plus会员',
			desc: '你开了五千年的Dota2Plus会员，自带血崩光环',
			effect: {}
		},
	}
}

export default {
	state,
	namespaced: true
}