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
        level: 5,
        acceptable: true,
        ifDone: false,
        questions: [{
            qid: 0,
            desc: '傻屌群最大鸽子是谁',
            answer: [{
                index: 0,
                value: '婷鸽耳'
            }, {
                index: 1,
                value: '哞鸽子'
            }, {
                index: 2,
                value: '大二鸽'
            }],
            type: 'radio',
            correct: 0
        }, {
            qid: 1,
            desc: '傻屌群最壕的是谁',
            answer: [{
                index: 0,
                value: '群主'
            }, {
                index: 1,
                value: '管理员'
            }, {
                index: 2,
                value: '除我皆壕'
            }],
            type: 'radio',
            correct: 2
        }, {
            qid: 2,
            desc: '傻屌群最常见的活动是什么',
            answer: [{
                index: 0,
                value: '薅羊毛'
            }, {
                index: 1,
                value: '复读'
            }, {
                index: 2,
                value: '禁言'
            }],
            type: 'radio',
            correct: 1
        }],
        reward: {
            exp: 70,
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