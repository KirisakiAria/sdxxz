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
			value: 240,
		},
		mp: {
			decs: '当前魔法',
			value: 180,
		},
		maxhp: {
			decs: '生命总量',
			value: 240,
		},
		maxmp: {
			decs: '魔法总量',
			value: 180,
		},
		namespace: 'player'
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
		sp: {
			decs: '技能点',
			value: 0,
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
	items: [],
	buff: []
}

let getters = {
	levelUpExp: state => {
		return state.level.value * (state.level.value + 5) * 10
	}
}

const mutations = {
	changeBaseAttributesValue(state, payload) {
		state.baseAttributes[payload.propety]['value'] = payload.value;
	},
	changeExtraAttributesOrElementsValue(state, payload) {
		state[payload.type][payload.propety]['value'] = payload.value;
	},
	pushBuff(state, payload) {
		state.buff.push(payload.buff);
	},
	changeRoundToZero(state, payload) {
		state.buff[payload.index].round = 0;
	},
	removeDesignatedBuff(state, payload) {
		state.buff.splice(state.buff.findIndex(e => {
			return e.sid === payload.sid;
		}), 1);
	}
}

const actions = {
	changeRound(context, payload) {
		let [buff, length, ifDecrease] = [context.state.buff, context.state.buff.length, payload.ifDecrease];
		if (length) {
			buff.forEach(e => {
				if (ifDecrease) {
					e.round--;
				}
				if (!e.round) {
					//buff剩余回合为0了就把原始值再赋回去
					e.originalValue.forEach(item => {
						let [p1, p2] = [item.position[0], item.position[1]];
						if (item.type === 1) {
							context.state[p1][p2]['value'] = item.value;
						} else if (item.type === 2) {
							let [p3, p4] = [item.position[2], item.position[3]];
							context.rootState.playerSkills[p1][p2][p3][p4]['value'] = item.value;
						}
					});
				}
			});
			for (let i = 0; i < length; i++) {
				let position = buff.findIndex(e => {
					return e.round === 0;
				});
				if (position >= 0) {
					buff.splice(position, 1);
				}
			}
		}
		//console.log(context.state.buff);
	},
	changeSkillValue: function (context, payload) {
		let [p1, p2, p3, p4] = [payload.p1, payload.p2, payload.p3, payload.p4];
		context.rootState.playerSkills[p1][p2][p3][p4]['value'] = payload.value;
	}
}

export default {
	state,
	mutations,
	actions,
	namespaced: true
}