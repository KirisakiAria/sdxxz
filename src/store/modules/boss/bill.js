let state = {
	baseAttributes: {
		eid: '1999',
		namespace: 'bill',
		name: {
			decs: '姓名',
			value: '比尔·盖真'
		},
		description: {
			decs: '描述',
			value: '世界首富，福州全栈王，TI8冠军12345号位，至高节奏大师'
		},
		level: {
			decs: '等级',
			value: 9999999999
		},
		hp: {
			decs: '生命',
			value: 99999999999999
		},
		mp: {
			decs: '魔法',
			value: 9999999999999999
		},
		maxhp: {
			decs: '生命总量',
			value: 99999
		},
		maxmp: {
			decs: '魔法总量',
			value: 99999
		},
		exp: {
			desc: '击杀经验',
			value: 40
		}
	},
	extraAttributes: {
		atk: {
			decs: '物攻',
			value: 25
		},
		mga: {
			decs: '魔攻',
			value: 0
		},
		def: {
			decs: '物防',
			value: 10
		},
		res: {
			decs: '魔防',
			value: 14
		},
		crt: {
			decs: '暴击',
			value: 6
		},
		mul: {
			decs: '暴击系数',
			value: 1.5
		},
		hit: {
			decs: '命中',
			value: 32
		},
		spd: {
			decs: '速度',
			value: 1
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
	buff: []
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
		let [buff, length, ifNotToZero] = [context.state.buff, context.state.buff.length, payload.ifNotToZero];
		if (length) {
			buff.forEach(e => {
				if (ifNotToZero) {
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
	},
	changeSkillValue(context, payload) {
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