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
			value: 180,
			grow: 30
		},
		mp: {
			decs: '当前魔法',
			value: 120,
			grow: 20
		},
		maxhp: {
			decs: '生命总量',
			value: 180,
			grow: 30
		},
		maxmp: {
			decs: '魔法总量',
			value: 120,
			grow: 20
		},
		namespace: 'player'
	},
	extraAttributes: {
		atk: {
			decs: '物攻',
			value: 28,
			grow: 6
		},
		mga: {
			decs: '魔攻',
			value: 21,
			grow: 4
		},
		def: {
			decs: '物防',
			value: 14,
			grow: 4
		},
		res: {
			decs: '魔防',
			value: 12,
			grow: 3
		},
		crt: {
			decs: '暴击',
			value: 6,
			grow: 1
		},
		mul: {
			decs: '暴击系数',
			value: 1.5
		},
		hit: {
			decs: '命中',
			value: 48,
			grow: 4
		},
		spd: {
			decs: '速度',
			value: 4,
			grow: 1
		},
		chr: {
			decs: '魅力',
			value: 12,
			grow: 3
		},
		luk: {
			decs: '幸运',
			value: 5,
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
			grow: 2
		},
		ice: {
			decs: '冰属性',
			value: 5,
			grow: 2
		},
		toxic: {
			decs: '毒属性',
			value: 5,
			grow: 2
		},
		wind: {
			decs: '风属性',
			value: 5,
			grow: 2
		},
		earth: {
			decs: '土属性',
			value: 5,
			grow: 2
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
		let level = state.baseAttributes.level.value;
		return level * (level + 5) * 10;
	}
}

const mutations = {
	changeBaseAttributesValue(state, payload) {
		state.baseAttributes[payload.propety]['value'] = payload.value;
	},
	changeExtraAttributesOrElementsValue(state, payload) {
		state[payload.type][payload.propety]['value'] = payload.value;
	},
	levelup(state) {
		state.baseAttributes.level.value++;
		Object.keys(state).forEach(e => {
			Object.keys(state[e]).forEach(e2 => {
				if (state[e][e2]['grow']) {
					state[e][e2]['value'] += state[e][e2]['grow'];
				}
			});
		});
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
	},
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
	},
	loadData: function (context, payload) {
		Object.keys(context.state).forEach(e => {
			if (e === 'baseAttributes' || e === 'extraAttributes' || e === 'elements')
				context.state[e] = payload.data.playerData[e];
		});
		Object.keys(context.rootState.playerSkills).forEach(e => {
			context.rootState.playerSkills[e] = payload.data.skillsData[e];
		});
		Object.keys(context.rootState.mission).forEach(e => {
			context.rootState.mission[e] = payload.data.missionData[e];
		});
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}