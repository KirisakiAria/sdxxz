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
    }],
    //暗器类
    concealedItems: [{
        iid: 0,
        name: '智障表情',
        desc: '对敌方发出智障表情，使其受到70点物理伤害',
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
    }, {
        iid: 1,
        name: '小红信',
        desc: '向敌方发出一条红信，使敌方收到350点无视魔免的毒属性伤害',
        amount: 0,
        effect: {
            damage: {
                type: {
                    value: 4,
                    name: '毒'
                },
                ignoring: true,
                value: 350
            },
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
    }, {
        iid: 1,
        name: '3Akey',
        desc: '激活3Akey，喜+1，物攻、魔攻分别提升48点',
        amount: 0,
        buffType: 1,
        effect: {
            target: 1,
            buff: [{
                    type: 1,
                    position: ['extraAttributes', 'atk'],
                    value: 48,
                    valueType: 'constant'
                },
                {
                    type: 1,
                    position: ['extraAttributes', 'mga'],
                    value: 48,
                    valueType: 'constant'
                },
            ],
            round: 6
        }
    }],
    //装备
    equipmentsItems: [{
            type: 'weapon',
            desc: '武器',
            list: [{
                iid: 0,
                name: '辣鸡键盘',
                desc: '物攻增加6点，魔攻增加4点。3块钱的键盘，便宜实惠又好用，键盘侠必备',
                own: true,
                equip: false,
                level: 1,
                effect: {
                    target: 1,
                    buff: [{
                            type: 1,
                            position: ['extraAttributes', 'atk'],
                            value: 6,
                            valueType: 'constant'
                        },
                        {
                            type: 1,
                            position: ['extraAttributes', 'mga'],
                            value: 4,
                            valueType: 'constant'
                        },
                    ],
                    round: Infinity
                }
            }, {
                iid: 1,
                name: 'K120',
                desc: '物攻增加27点，魔攻增加10点。K120，肯定比三块钱的键盘好',
                own: true,
                equip: false,
                level: 3,
                effect: {
                    target: 1,
                    buff: [{
                            type: 1,
                            position: ['extraAttributes', 'atk'],
                            value: 27,
                            valueType: 'constant'
                        },
                        {
                            type: 1,
                            position: ['extraAttributes', 'mga'],
                            value: 10,
                            valueType: 'constant'
                        },
                    ],
                    round: Infinity
                }
            }]
        },
        {
            type: 'armor',
            desc: '防具',
            list: []
        },
        {
            type: 'belt',
            desc: '腰带',
            list: []
        },
        {
            type: 'gloves',
            desc: '手套',
            list: []
        },
        {
            type: 'shoes',
            desc: '鞋子',
            list: []
        },
        {
            type: 'necklace',
            desc: '项链',
            list: []
        },
        {
            type: 'ring',
            desc: '指环',
            list: []
        },
        {
            type: 'arcana',
            desc: '秘宝',
            list: []
        }
    ]
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