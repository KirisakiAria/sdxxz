let state = {
    mainQuests: [{
        mid: 0,
        type: 'mainQuests',
        name: '入群',
        des: '新来的会口交吗.jpg，新来的我问你会不会口交你是不是聋了.jpg',
        level: 1,
        accept: false,
        ifDone: false,
        enemy: {
            namespace: 'groupC',
            times: 1
        },
        reward: {
            exp: 30,
            items: null
        }
    }],
    sideQuests: [

    ]
}

const mutations = {
    done: function (state, payload) {
        state[payload.type][payload.mid]['ifDone'] = true;
    }
}

export default {
    state,
    mutations,
    namespaced: true
}