let state = {
	baseAttributes: {
		eid: 1,
		namespace: 'groupB',
		name: {
			decs: '姓名',
			value: '傻屌群中傻屌'
		},
		description: {
			decs: '描述',
			value: '倒数第二辣鸡的傻屌，打不过你就退群吧'
		},
		level: {
			decs: '等级',
			value: 3
		},
		hp: {
			decs: '生命',
			value: 180
		},
		mp: {
			decs: '魔法',
			value: 0
		},
		maxhp: {
			decs: '生命总量',
			value: 180
		},
		maxmp: {
			decs: '魔法总量',
			value: 0
		},
		exp: {
			desc: '击杀经验',
			value: 68
		}
	},
	extraAttributes: {
		atk: {
			decs: '物攻',
			value: 32
		},
		mga: {
			decs: '魔攻',
			value: 0
		},
		def: {
			decs: '物防',
			value: 18
		},
		res: {
			decs: '魔防',
			value: 20
		},
		crt: {
			decs: '暴击',
			value: 9
		},
		mul: {
			decs: '暴击系数',
			value: 1.5
		},
		hit: {
			decs: '命中',
			value: 40
		},
		spd: {
			decs: '速度',
			value: 3
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