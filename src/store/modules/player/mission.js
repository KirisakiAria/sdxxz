let state = {
    mainQuests: [{
        mid: 0,
        type: 'mainQuests',
        name: '入群',
        des: '新来的会口交吗.jpg，新来的我问你会不会口交你是不是聋了.jpg',
        execute: 'battle',
        level: 1,
        acceptable: true,
        ifDone: false,
        //完成此任务时会触发的任务
        trigger: [{
            type: 'sideQuests',
            mid: 0
        }],
        enemy: {
            namespace: 'groupC'
        },
        reward: {
            exp: 30,
            items: [{
                name: '土',
                type: 'cureItems',
                iid: 0,
                amount: 2
            }],
            gold: 35
        }
    }],
    sideQuests: [{
        mid: 0,
        type: 'sideQuests',
        name: '新人傻屌培训',
        des: '大佬们训♂练新人',
        execute: 'battle',
        level: 1,
        acceptable: false,
        ifDone: false,
        enemy: {
            namespace: 'groupC'
        },
        reward: {
            exp: 5,
            gold: 15
        }
    }],
    events: [{
        mid: 0,
        type: 'events',
        name: '群主试炼',
        des: '群主在买买买之余，对入群不久的新人做一下考核',
        execute: 'interlocution',
        level: 1,
        acceptable: true,
        ifDone: false,
        reward: {
            exp: 70,
            title: '',
            gold: 300
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