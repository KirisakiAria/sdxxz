let state = {
    mainQuests: [{
        mid: 0,
        type: 'mainQuests',
        name: '入群',
        des: '新来的会口交吗.jpg，新来的我问你会不会口交你是不是聋了.jpg',
        level: 1,
        acceptable: true,
        ifDone: false,
        //完成此任务时会触发的任务
        trigger: [{
            type: 'sideQuests',
            mid: 0
        }],
        enemy: {
            namespace: 'groupC',
            times: 1
        },
        reward: {
            exp: 30,
            items: [{
                name:'馒头',
                type: 'cureItems',
                iid: 0,
                amount: 2
            }]
        }
    }],
    sideQuests: [{
        mid: 0,
        type: 'sideQuests',
        name: '新人傻屌培训',
        des: '大佬们训♂练新人',
        level: 1,
        acceptable: false,
        ifDone: false,
        enemy: {
            namespace: 'groupC',
            times: 1
        },
        reward: {
            exp: 5,
            items: [{
                type: 'cureItems',
                iid: 0,
                amount: 1
            }]
        }
    }]
}

const mutations = {
    done(state, payload) {
        state[payload.type][payload.mid]['ifDone'] = true;
    },
    trigger(state, payload) {
        let missionArr = state[payload.type][payload.mid]['trigger'];
        if (missionArr) {
            state[payload.type][payload.mid]['trigger'].forEach(e => {
                state[e.type][e.mid]['acceptable'] = true;
            });
        }
    }
}

export default {
    state,
    mutations,
    namespaced: true
}