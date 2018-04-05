let state = {
    //装备系统基本继承于技能系统
    //治愈类
    cureItems: [{
        iid: 0,
        name: '土',
        desc: '穷得以土充饥，恢复42点生命',
        amount: 2,
        ifSale: true,
        price: 20,
        buyNum: 1,
        itemType: 'cureItems',
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
        name: '米饭',
        desc: '真香！',
        amount: 0,
        ifSale: true,
        price: 42,
        buyNum: 1,
        itemType: 'cureItems',
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
        ifSale: true,
        price: 20,
        buyNum: 1,
        itemType: 'concealedItems',
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
        ifSale: true,
        price: 35,
        buyNum: 1,
        itemType: 'concealedItems',
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
        ifSale: true,
        price: 10,
        buyNum: 1,
        buffType: 1,
        itemType: 'buffItems',
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
        ifSale: true,
        price: 20,
        buyNum: 1,
        buffType: 1,
        itemType: 'buffItems',
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
            eid: 0,
            itemType: 'weapon',
            desc: '武器',
            list: [{
                iid: 0,
                name: '辣鸡键盘',
                desc: '物攻增加6点，魔攻增加4点。3块钱的键盘，便宜实惠又好用，键盘侠必备',
                own: true,
                equip: false,
                ifSale: false,
                price: 0,
                level: 1,
                effect: {
                    target: 1,
                    buff: [{
                            position: ['extraAttributes', 'atk'],
                            value: 6,
                            valueType: 'constant'
                        },
                        {
                            position: ['extraAttributes', 'mga'],
                            value: 4,
                            valueType: 'constant'
                        },
                    ]
                }
            }, {
                iid: 1,
                name: '裸鸡K021',
                desc: '物攻增加16点，魔攻增加10点。裸鸡K021，肯定比三块钱的键盘好',
                own: false,
                equip: false,
                ifSale: false,
                price: 0,
                level: 1,
                effect: {
                    target: 1,
                    buff: [{
                            position: ['extraAttributes', 'atk'],
                            value: 16,
                            valueType: 'constant'
                        },
                        {
                            position: ['extraAttributes', 'mga'],
                            value: 10,
                            valueType: 'constant'
                        }
                    ]
                }
            }]
        },
        {
            eid: 1,
            itemType: 'armor',
            desc: '防具',
            list: [{
                iid: 0,
                name: '辣鸡机箱',
                desc: '物防魔防各增加4点。辣鸡机箱，勉强能穿',
                own: true,
                equip: false,
                ifSale: false,
                price: 0,
                level: 1,
                effect: {
                    target: 1,
                    buff: [{
                            position: ['extraAttributes', 'def'],
                            value: 4,
                            valueType: 'constant'
                        },
                        {
                            position: ['extraAttributes', 'res'],
                            value: 4,
                            valueType: 'constant'
                        },
                    ]
                }
            }]
        },
        {
            eid: 2,
            itemType: 'belt',
            desc: '腰带',
            list: []
        },
        {
            eid: 3,
            itemType: 'gloves',
            desc: '手套',
            list: []
        },
        {
            eid: 4,
            itemType: 'shoes',
            desc: '鞋子',
            list: []
        },
        {
            eid: 5,
            itemType: 'necklace',
            desc: '项链',
            list: []
        },
        {
            eid: 6,
            itemType: 'ring',
            desc: '指环',
            list: []
        },
        {
            eid: 7,
            itemType: 'arcana',
            desc: '秘宝',
            list: []
        }
    ]
}

const mutations = {
    minusValue(state, payload) {
        state[payload.type][payload.iid]['amount'] -= 1;
    },
    addValue(state, payload) {
        state[payload.type][payload.iid]['amount'] += payload.amount;
    },
    changeBuyValue(state, payload) {
        state[payload.type][payload.iid]['buyNum'] = payload.value;
    },
    addEquipment(state, payload) {
        state.equipmentsItems[payload.eid]['list'][payload.iid]['own'] = true;
    },
    equip(state, payload) {
        state.equipmentsItems[payload.eid]['list'].forEach(e => {
            if (e.iid !== payload.iid) {
                e.equip = false;
            }
        });
        state.equipmentsItems[payload.eid]['list'][payload.iid]['equip'] = true;
    }
}


export default {
    state,
    mutations,
    namespaced: true
}