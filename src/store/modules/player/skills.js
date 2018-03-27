let state = {
	damageSkills: [{
			sid: 0,
			learned: true,
			level: 1,
			point: 0,
			name: '扬沙',
			desc: '抓起一把沙子扬过去，对敌方造成34点风属性伤害，并减少对方24%命中，持续两回合',
			buffType: 1,
			consume: 50,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				damage: {
					type: {
						value: 5,
						name: '风'
					},
					ignoring: false,
					value: 34
				},
				target: 2,
				buff: [{
					type: 1,
					position: ['extraAttributes', 'hit'],
					value: 0.76,
					valueType: 'percentage'
				}],
				round: 3
			}
		},
		{
			sid: 1,
			learned: true,
			level: 5,
			point: 2,
			name: '素质对话',
			desc: '与敌方单体进行文明交流，敌方素质明显提高然后受到68点物理伤害。',
			consume: 55,
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
					value: 68
				}
			}
		},
		{
			sid: 2,
			learned: true,
			level: 20,
			point: 5,
			name: '素质三连',
			desc: '与敌方单体长时间进行文明交流，敌方热泪盈眶，受到255点无视魔防的物理伤害，物防降低28%，持续三回合',
			buffType: 1,
			consume: 155,
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
					value: 255
				},
				target: 2,
				buff: [{
					type: 1,
					position: ['extraAttributes', 'def'],
					value: 0.72,
					valueType: 'percentage'
				}],
				round: 4
			}
		},
		{
			sid: 3,
			learned: true,
			level: 12,
			point: 4,
			name: '飞痰',
			desc: '一口老痰吐到敌方脸上，使敌方单体受到106点冰属性伤害。',
			buffType: 1,
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
					value: 106
				}
			}
		},
		{
			sid: 4,
			learned: true,
			level: 17,
			point: 4,
			name: '蝌蚪',
			desc: '喷射出大量白色蝌蚪，对敌方全体造成185点毒属性伤害并降低毒属性26%，持续3回合',
			buffType: 1,
			consume: 117,
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
					value: 185
				},
				target: 2,
				buff: [{
					type: 1,
					position: ['elements', 'toxic'],
					value: 0.74,
					valueType: 'percentage'
				}],
				round: 4
			}
		},
		{
			sid: 5,
			learned: true,
			level: 24,
			point: 5,
			name: '纵火',
			desc: '使用打火机点燃敌方的jj，敌方受到272点火属性伤害并降低魔防33%，持续四回合。',
			buffType: 1,
			consume: 168,
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
					value: 272
				},
				target: 2,
				buff: [{
					type: 1,
					position: ['extraAttributes', 'res'],
					value: 0.67,
					valueType: 'percentage'
				}],
				round: 5
			}
		},
	],
	cureSkills: [{
			sid: 0,
			learned: true,
			level: 2,
			point: 1,
			name: '+1',
			desc: '+1使我神清气爽，恢复82点生命。',
			consume: 44,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				cure: {
					value: 82
				}
			}
		},
		{
			sid: 1,
			learned: true,
			level: 6,
			point: 2,
			name: '剁手',
			desc: '没钱了但又控制不住欲望，只能把手剁了，失去74点生命恢复140点魔法。',
			consume: 66,
			consumeType: {
				name: '生命',
				value: 2
			},
			effect: {
				cure: {
					value: 140
				}
			}
		}
	],
	//target：1为己方，2为敌方
	//技能类的buffType：1为增加一定数值的技能，2为沉默、缴械等类型的技能
	//每种buff的type：1为增加自身属性，2为增加技能的值，3为沉默、缴械等debuff
	//实际持续回合数要把回合数-1，因为施放技能的那一回合也算入在内
	buffSkills: [{
			sid: 0,
			learned: true,
			level: 4,
			point: 1,
			name: 'Steam，登录！',
			desc: '登录steam，准备+1，物攻、魔攻提升%18，物防、魔防提升%10，命中提升%40，暴击、速度提升%12',
			buffType: 1,
			consume: 62,
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
				round: 4
			}
		},
		{
			sid: 1,
			learned: true,
			level: 10,
			point: 2,
			name: '素质提升',
			desc: '提升自己素质，使物攻、魔攻、暴击提升20%，毒属性提升15%，并使素质三连伤害提高30%',
			buffType: 1,
			consume: 94,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				target: 1,
				buff: [{
						type: 1,
						position: ['extraAttributes', 'atk'],
						value: 1.2,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'mga'],
						value: 1.2,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'crt'],
						value: 1.2,
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
						position: ['damageSkills', 2, 'effect', 'damage'],
						value: 1.3,
						valueType: 'percentage'
					}
				],
				round: 4
			}
		},
		{
			sid: 2,
			learned: true,
			level: 12,
			point: 3,
			name: '可惜没如果',
			desc: '召唤沉默术士，使对方群体沉默',
			buffType: 2,
			consume: 178,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				target: 2,
				buff: [{
					type: 3,
					position: 'slient',
					round: 5
				}],
				round: 4
			}
		},
		{
			sid: 3,
			learned: true,
			level: 15,
			point: 4,
			name: 'g胖',
			desc: '召唤g胖附体，使+1技能恢复效果提升三倍',
			buffType: 1,
			consume: 95,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				target: 1,
				buff: [{
					type: 2,
					position: ['cureSkills', 0, 'effect', 'cure'],
					value: 3,
					valueType: 'percentage'
				}],
				round: 5
			}
		},
		{
			sid: 4,
			learned: true,
			level: 12,
			point: 3,
			name: '反向剁手',
			desc: '剁掉敌方双手，在长出来之前不能攻击',
			buffType: 2,
			consume: 175,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				target: 2,
				buff: [{
					type: 3,
					position: 'disarm',
					round: 5
				}],
				round: 3
			}
		},
		{
			sid: 5,
			learned: true,
			level: 12,
			point: 3,
			name: '传销三连',
			desc: '71附体，疯狂搞敌方，物攻、物防、魔攻、魔防降低30%',
			buffType: 1,
			consume: 128,
			consumeType: {
				name: '魔法',
				value: 1
			},
			effect: {
				target: 2,
				buff: [{
						type: 1,
						position: ['extraAttributes', 'atk'],
						value: 0.7,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'mga'],
						value: 0.7,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'def'],
						value: 0.7,
						valueType: 'percentage'
					},
					{
						type: 1,
						position: ['extraAttributes', 'res'],
						value: 0.7,
						valueType: 'percentage'
					}
				],
				round: 5
			}
		}
	],
	passiveSkills: [{
			sid: 0,
			learned: true,
			name: 'Steamer',
			desc: '你是一名steam玩家，不过这个被动现在好像没什么用。',
			effect: {}
		},
		{
			sid: 1,
			learned: true,
			name: 'Dota2Plus会员',
			desc: '你开了五千年的Dota2Plus会员，自带血崩光环',
			effect: {}
		}
	]
}

export default {
	state,
	namespaced: true
}