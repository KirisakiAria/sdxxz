let state = {
    //装备系统基本继承于技能系统
    //治愈类
    cureItems: [{
        iid: 0,
        name: '土',
        desc: '穷得以土充饥，恢复42点生命',
        amount: 2,
        //这里使用consumeType为了区别是回血还是回蓝
        consumeType: {
            value: 1
        },
        effect: {
            cure: {
                value: 42
            }
        }
    }, {
        iid: 1,
        name: '包子',
        desc: '恢复50点魔法',
        amount: 0,
        consumeType: {
            value: 2
        },
        effect: {
            cure: {
                value: 70
            }
        }
    }],
    //暗器类
    concealedItems: [{
        iid: 0,
        name: '智障表情',
        desc: '对敌方发出智障表情，使其受到70点物理伤害',
        buffType: 1,
        amount: 2,
        effect: {
            damage: {
                type: {
                    value: 1,
                    name: '物理'
                },
                ignoring: false,
                value: 65
            }
        }
    }],
    //效果类
    buffItems: [{
        iid: 0,
        name: '辣鸡key',
        desc: '激活辣鸡key，喜+1，物攻、魔攻分别提升15点',
        amount: 2,
        buffType: 1,
        effect: {
            target: 1,
            buff: [{
                    type: 1,
                    position: ['extraAttributes', 'atk'],
                    value: 15,
                    valueType: 'constant'
                },
                {
                    type: 1,
                    position: ['extraAttributes', 'mga'],
                    value: 15,
                    valueType: 'constant'
                },
            ],
            round: 6
        }
    }],
    //装备
    equipmentsItems: []
}

const mutations = {
    minusValue(state, payload) {
        state[payload.type][payload.iid]['amount'] = payload.amount - 1;
    },
    addValue(state, payload) {
        state[payload.type][payload.iid]['amount'] += payload.amount;
    }
}


export default {
    state,
    mutations,
    namespaced: true
}