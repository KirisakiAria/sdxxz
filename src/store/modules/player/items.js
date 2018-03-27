let state = {
    //治愈类
    cureItems: [{
        iid: 0,
        name: '馒头',
        desc: '恢复65点生命',
        amount: 2,
        consumeType: {
            value: 1
        },
        effect: {
            cure: {
                value: 45
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
        name: '待定',
        desc: '待定',
        buffType: 1,
        amount: 0,
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
    }],
    //效果类
    buffItems: [],
    //装备
    equipmentsItems: []
}

const mutations = {
    changeValue(state, payload) {
        state[payload.type][payload.iid]['amount'] = payload.amount;
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