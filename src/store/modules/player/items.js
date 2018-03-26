let state = {
    //治愈类
    cureItems: [{
        iid: 0,
        name: '馒头',
        desc: '恢复45点生命',
        amount: 1,
        consumeType: {
            value: 1
        },
        effect: {
            cure: {
                type: 1,
                value: 45
            }
        }
    }, {
        iid: 1,
        name: '包子',
        desc: '恢复70点生命',
        amount: 1,
        consumeType: {
            value: 1
        },
        effect: {
            cure: {
                type: 1,
                value: 70
            }
        }
    }],
    //暗器类
    concealedItems: {

    },
    //效果类
    buffItems: {

    },
    //装备
    equipmentsItems: {

    }
}

export default {
    state,
    namespaced: true
}