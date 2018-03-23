let state = {
    //治愈类
    cureItems: [{
        iid: 0,
        name: '馒头',
        desc: '增加60点生命',
        amount: 1,
        effect: {
            target: 1,
            cure: {
                value: 140
            }
        }
    }, {
        iid: 1,
        name: '包子',
        desc: '增加100点生命',
        amount: 1,
        effect: {
            target: 1,
            cure: {
                value: 140
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