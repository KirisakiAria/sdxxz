let state = {
	baseAttributes: {
		eid: '0000',
		namespace: 'groupC',
		name: {
			decs: '姓名',
			value: '傻屌群小傻屌'
		},
		description: {
			decs: '描述',
			value: '最辣鸡的傻屌，打不过你就退群吧'
		},
		level: {
			decs: '等级',
			value: 2
		},
		hp: {
			decs: '生命',
			value: 125
		},
		mp: {
			decs: '魔法',
			value: 0
		},
		maxhp: {
			decs: '生命总量',
			value: 125
		},
		maxmp: {
			decs: '魔法总量',
			value: 0
		},
		exp: {
			desc: '击杀经验',
			value: 12
		},
		gold: {
			desc: '击杀所得金钱',
			value: 25
		}
	},
	extraAttributes: {
		atk: {
			decs: '物攻',
			value: 27
		},
		mga: {
			decs: '魔攻',
			value: 0
		},
		def: {
			decs: '物防',
			value: 14
		},
		res: {
			decs: '魔防',
			value: 14
		},
		crt: {
			decs: '暴击',
			value: 4
		},
		mul: {
			decs: '暴击系数',
			value: 2
		},
		hit: {
			decs: '命中',
			value: 40
		},
		spd: {
			decs: '速度',
			value: 1
		}
	},
	elements: {
		fire: {
			decs: '火属性',
			value: 1
		},
		ice: {
			decs: '冰属性',
			value: 1
		},
		toxic: {
			decs: '毒属性',
			value: 1
		},
		wind: {
			decs: '风属性',
			value: 1
		},
		earth: {
			decs: '土属性',
			value: 1
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
	}
}

export default {
	state,
	mutations,
	actions,
	namespaced: true
}