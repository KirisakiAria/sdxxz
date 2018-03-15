let state = {
	baseAttributes: {
		eid: 0,
		namespace: 'villageC',
		name: {
			decs: '姓名',
			value: '傻屌村小傻屌'
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
			value: 140
		},
		mp: {
			decs: '魔法',
			value: 0
		},
		maxhp: {
			decs: '生命总量',
			value: 140
		},
		maxmp: {
			decs: '魔法总量',
			value: 0
		},
		exp: {
			desc: '击杀经验',
			value: 40
		}
	},
	extraAttributes: {
		atk: {
			decs: '物攻',
			value: 30
		},
		mga: {
			decs: '魔攻',
			value: 0
		},
		def: {
			decs: '物防',
			value: 16
		},
		res: {
			decs: '魔防',
			value: 18
		},
		crt: {
			decs: '暴击',
			value: 10
		},
		hit: {
			decs: '命中',
			value: 35
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
	changeExtraAttributesValue(state, payload) {
		state.extraAttributes[payload.propety]['value'] = payload.value;
	},
	pushBuff(state, payload) {
		state.buff.push(payload.buff);
	},
	removeDesignatedBuff(state, payload) {
		state.buff.splice(state.buff.findIndex(e => {
			return e.sid === payload.sid;
		}), 1);
	}
}

const actions = {
	changeRound(context) {
		let [buff, length] = [context.state.buff, context.state.buff.length];
		if (length) {
			buff.forEach(e => {
				e.round--;
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
		console.log(context.state.buff);
	},
	changeSkillValue: function (context, payload) {
		let [p1, p2] = [payload.p1, payload.p2];
		let skillState = context.rootState.playerSkills[p1][p2]
		if (p1 === 'damageSkills') {
			skillState.damage.value == payload.value;
		} else if (p1 === 'cureSkills') {
			skillState.cure.value == payload.value;
		}
	}
}

export default {
	state,
	mutations,
	actions,
	namespaced: true
}