let state = {
    damageSkills: [{
            sid: 0,
            learned: true,
            level: 1,
            point: 0,
            name: '扬沙',
            desc: '抓起一把沙子扬过去，对敌方造成34点风属性伤害，并减少对方24%命中，持续两回合',
            buffType: 1,
            consume: 50,
            consumeType: {
                name: '魔法',
                value: 1
            },
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
        }
    ],
    cureSkills: [{
            sid: 0,
            learned: false,
            level: 2,
            point: 1,
            name: '+1',
            desc: '+1使我神清气爽，恢复82点生命。',
            consume: 44,
            consumeType: {
                name: '魔法',
                value: 1
            },
            cureType: '生命',
            effect: {
                cure: {
                    value: 82
                }
            }
        }
    ]
}

export default {
    state,
    namespaced: true
}