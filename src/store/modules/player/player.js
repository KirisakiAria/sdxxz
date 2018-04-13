let state = {
	baseAttributes: {
		name: {
			desc: '姓名',
			value: '测试'
		},
		title: {
			desc: '称号',
			value: '测试'
		},
		level: {
			desc: '等级',
			value: 1
		},
		exp: {
			desc: '经验',
			value: 0
		},
		speciality: {
			desc: '特长',
			value: ''
		},
		spid: {
			desc: '特长ID',
			value: 0
		},
		hp: {
			desc: '当前生命',
			value: 180,
			grow: 30
		},
		mp: {
			desc: '当前魔法',
			value: 120,
			grow: 20
		},
		maxhp: {
			desc: '生命总量',
			value: 180,
			grow: 30
		},
		maxmp: {
			desc: '魔法总量',
			value: 120,
			grow: 20
		},
		namespace: 'player'
	},
	extraAttributes: {
		gold: {
			desc: '金钱',
			value: 0
		},
		sp: {
			desc: '技能点',
			value: 0,
			grow: 2
		},
		atk: {
			desc: '物攻',
			value: 30,
			grow: 6
		},
		mga: {
			desc: '魔攻',
			value: 22,
			grow: 4
		},
		def: {
			desc: '物防',
			value: 17,
			grow: 4
		},
		res: {
			desc: '魔防',
			value: 14,
			grow: 3
		},
		crt: {
			desc: '暴击',
			value: 8,
			grow: 1
		},
		mul: {
			desc: '暴击系数',
			value: 2
		},
		hit: {
			desc: '命中',
			value: 50,
			grow: 5
		},
		spd: {
			desc: '速度',
			value: 6,
			grow: 1
		},
		chr: {
			desc: '魅力',
			value: 14,
			grow: 3
		},
		luk: {
			desc: '幸运',
			value: 8,
			grow: 5
		}
	},
	elements: {
		fire: {
			desc: '火属性',
			value: 5,
			grow: 2
		},
		ice: {
			desc: '冰属性',
			value: 5,
			grow: 2
		},
		toxic: {
			desc: '毒属性',
			value: 5,
			grow: 2
		},
		wind: {
			desc: '风属性',
			value: 5,
			grow: 2
		},
		earth: {
			desc: '土属性',
			value: 5,
			grow: 2
		}
	},
	permanentlyBuff: {
		weapon: [],
		armor: [],
		belt: [],
		gloves: [],
		shoes: [],
		necklace: [],
		ring: [],
		arcana: [],
		passiveSkills: []
	},
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
	clearPermanentlyBuff(state, payload) {
		let buffList = state.permanentlyBuff[payload.pType];
		if (buffList.length) {
			buffList[0].originalValue.forEach(item => {
				let [p1, p2] = [item.position[0], item.position[1]];
				state[p1][p2]['value'] = item.value;
			});
			buffList.splice(0, 1);
		}
	},
	updatePermanentlyBuff(state, payload) {
		let buffList = state.permanentlyBuff[payload.pType];
		buffList.push(payload.buff);
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
		let [buff, length, ifNotToZero] = [context.state.buff, context.state.buff.length, payload.ifNotToZero];
		if (length) {
			buff.forEach(e => {
				if (ifNotToZero) {
					e.round--;
				}
				if (!e.round) {
					//buff剩余回合为0了就把原始值再赋回去
					if (e.originalValue.lenght) {
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
	},
	changeSkillValue(context, payload) {
		let [p1, p2, p3, p4] = [payload.p1, payload.p2, payload.p3, payload.p4];
		context.rootState.playerSkills[p1][p2][p3][p4]['value'] = payload.value;
	},
	loadData(context, payload) {
		Object.keys(context.state).forEach(e => {
			context.state[e] = payload.data.playerData[e];
		});
		Object.keys(context.rootState.playerSkills).forEach(e => {
			context.rootState.playerSkills[e] = payload.data.skillsData[e];
		});
		Object.keys(context.rootState.mission).forEach(e => {
			context.rootState.mission[e] = payload.data.missionData[e];
		});
		Object.keys(context.rootState.items).forEach(e => {
			context.rootState.items[e] = payload.data.itemsData[e];
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