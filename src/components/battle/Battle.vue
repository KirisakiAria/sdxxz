<template>
    <section class="battle mainSection">
        <section class="control section tac">
            <h5>战斗信息</h5>
            <p>{{battleMessage}}</p>
        </section>
        <section class="enemy section">
            <transition name="scale-fade">
                <div v-if="round.enemy" class="round">
                    <i class="iconfont icon-round"></i>
                </div>
            </transition>
            <h4 class="tac">
                {{enemy.baseAttributes.name.value}}
            </h4>
            <div class="info tac">
                <span>等级:{{enemy.baseAttributes.level.value}}</span>
                <span>击杀经验:{{enemy.baseAttributes.exp.value}}</span>
                <span>击杀金钱:{{enemy.baseAttributes.gold.value}}</span>
            </div>
            <div class="content">
                <div class="attr">
                    <div class="con card tac">
                        <div class="hp">
                            <span class="title">生命</span>
                            <span>{{enemyRegularData.hp}}</span>
                            <span>/</span>
                            <span>{{enemyRegularData.maxhp}}</span>
                        </div>
                        <div class="mp">
                            <span class="title">魔法</span>
                            <span>{{enemyRegularData.mp}}</span>
                            <span>/</span>
                            <span>{{enemyRegularData.maxmp}}</span>
                        </div>
                    </div>
                </div>
                <div class="buff">
                    <h6 class="tac">状态</h6>
                    <div class="con">
                        <span :key="item.name" v-for="item in enemyBuffList">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="player section">
            <transition name="scale-fade">
                <div v-if="round.player" class="round">
                    <i class="iconfont icon-round"></i>
                </div>
            </transition>
            <h4 class="tac">
                {{player.baseAttributes.name.value}}
            </h4>
            <div class="info tac">
                <span>等级{{player.baseAttributes.level.value}} {{player.baseAttributes.title.value}}</span>
            </div>
            <div class="content">
                <div class="attr">
                    <div class="con card tac">
                        <div class="hp">
                            <span class="title">生命</span>
                            <span>{{playerRegularData.hp}}</span>
                            <span>/</span>
                            <span>{{playerRegularData.maxhp}}</span>
                        </div>
                        <div class="mp">
                            <span class="title">魔法</span>
                            <span>{{playerRegularData.mp}}</span>
                            <span>/</span>
                            <span>{{playerRegularData.maxmp}}</span>
                        </div>
                    </div>
                </div>
                <div class="buff">
                    <h6 class="tac">状态</h6>
                    <div class="con">
                        <span :key="item.name" v-for="item in playerBuffList">{{item.name}}</span>
                    </div>
                </div>
                <div class="operation">
                    <h6 class="tac">操作</h6>
                    <div class="con">
                        <button :class="{disabled:round.enemy||disabled.player.disarm}" :disabled="round.enemy||disabled.player.disarm" class="btn"
                            @click="attack('player','enemy')">攻击</button>
                        <button :class="{disabled:round.enemy||disabled.player.slient}" :disabled="round.enemy||disabled.player.slient" class="btn"
                            @click="toggleSkillsPanel">技能</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="toggleInventory">道具</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="anger">怒气</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="escape">逃跑</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="skip">跳过</button>
                    </div>
                </div>
            </div>
        </section>
        <transition name="scale-fade">
            <section v-if="show.skillPanel" class="skillPanel">
                <div class="wrapper">
                    <section class="tab">
                        <button :class="{active:show.skillPanleList.damage}" @click="changeSkillsTab('damage')">伤害技能</button>
                        <button :class="{active:show.skillPanleList.cure}" @click="changeSkillsTab('cure')">治疗技能</button>
                        <button :class="{active:show.skillPanleList.buff}" @click="changeSkillsTab('buff')">增/减益技能</button>
                        <button :class="{active:show.skillPanleList.passive}" @click="changeSkillsTab('passive')">被动技能</button>
                    </section>
                    <section class="content">
                        <p>点击使用技能</p>
                        <transition name="slide-fade" mode="out-in">
                            <div key="damageSkillsList" v-if="show.skillPanleList.damage" class="damageSkillsList">
                                <ul>
                                    <li :key="item.sid" v-if="item.learned" v-for="item in damageSkillsList" @click="useDamageSkill('player','enemy','damageSkillsList',item.sid)">
                                        <div class="top">
                                            <span class="name">{{item.name}}</span>
                                            <span class="i1">伤害量:{{item.effect.damage.value}}</span>
                                            <span class="i2">{{item.consumeType.name}}消耗:{{item.consume}}</span>
                                            <span class="i3">伤害类型:{{item.effect.damage.type.name}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍:{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div key="cureSkillsList" v-if="show.skillPanleList.cure" class="cureSkillsList">
                                <ul>
                                    <li :key="item.sid" v-if="item.learned" v-for="item in cureSkillsList" @click="useCureSkill('player','cureSkillsList',item.sid)">
                                        <div class="top">
                                            <span class="name">{{item.name}}</span>
                                            <span class="i1">治疗量:{{item.effect.cure.value}}</span>
                                            <span class="i2">{{item.consumeType.name}}消耗:{{item.consume}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍:{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div key="buffSkillsList" v-if="show.skillPanleList.buff" class="buffSkillsList">
                                <ul>
                                    <li :key="item.sid" v-if="item.learned" v-for="item in buffSkillsList" @click="useBuffSkill('player','buffSkillsList',item.sid)">
                                        <div class="top">
                                            <span class="name">{{item.name}}</span>
                                            <span class="i2">{{item.consumeType.name}}消耗:{{item.consume}}</span>
                                            <span class="i3">持续回合数:{{item.effect.round - 1}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍:{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div key="passiveSkillsList" v-if="show.skillPanleList.passive" class="passiveSkillsList">
                                <ul>
                                    <li :key="item.sid" v-if="item.learned" v-for="item in passiveSkillsList">
                                        <div class="top">
                                            <span class="name">{{item.name}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍:{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                        <button @click="toggleSkillsPanel">返回</button>
                    </section>
                </div>
            </section>
        </transition>
        <transition name="scale-fade">
            <section v-if="show.inventory" class="inventory">
                <section class="tab">
                    <button :class="{active:show.inventoryList.cure}" @click="changeInventory('cure')">治愈类</button>
                    <button :class="{active:show.inventoryList.concealed}" @click="changeInventory('concealed')">暗器类</button>
                    <button :class="{active:show.inventoryList.buff}" @click="changeInventory('buff')">效果类</button>
                </section>
                <section class="content">
                    <transition name="slide-fade" mode="out-in">
                        <div key="cureItemsList" v-if="show.inventoryList.cure">
                            <ul>
                                <li :key="item.iid" v-if="item.amount" v-for="item in cureItemsList" @click="useCureItem('player','cureItemsList',item.iid)">
                                    <div class="top">
                                        <span class="name">{{item.name}}</span>
                                        <span class="i1">治疗量:{{item.effect.cure.value}}</span>
                                        <span class="i2">数量:{{item.amount}}</span>
                                    </div>
                                    <div class="bottom">
                                        <p>道具介绍:{{item.desc}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div key="concealedItemsList" v-if="show.inventoryList.concealed">
                            <ul>
                                <li :key="item.iid" v-if="item.amount" v-for="item in concealedItemsList" @click="useConcealedItem('player','enemy','concealedItemsList',item.iid)">
                                    <div class="top">
                                        <span class="name">{{item.name}}</span>
                                        <span class="i1">伤害量:{{item.effect.damage.value}}</span>
                                        <span class="i2">数量:{{item.amount}}</span>
                                    </div>
                                    <div class="bottom">
                                        <p>道具介绍:{{item.desc}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div key="buffItemsList" v-if="show.inventoryList.buff">
                            <ul>
                                <li :key="item.iid" v-if="item.amount" v-for="item in buffItemsList" @click="useBuffItem('player','buffItemsList',item.iid)">
                                    <div class="top">
                                        <span class="name">{{item.name}}</span>
                                        <span class="i1">持续回合数:{{item.effect.round}}</span>
                                        <span class="i2">数量:{{item.amount}}</span>
                                    </div>
                                    <div class="bottom">
                                        <p>道具介绍:{{item.desc}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </transition>
                    <button @click="toggleInventory">返回</button>
                </section>
            </section>
        </transition>
        <transition name="scale-fade">
            <Tips :content="tips.data" v-show="tips.show" @closeTips="closeTips" @click.native="closeBattle"></Tips>
        </transition>
    </section>
</template>

<script>
    import Tips from '../tips/Tips';

    export default {
        name: 'Battle',
        data() {
            return {
                round: {
                    num: 0, //此数值*2为正常情况下的一回合
                    enemy: false,
                    player: true
                },
                show: {
                    skillPanleList: {
                        damage: true,
                        cure: false,
                        buff: false,
                        passive: false
                    },
                    inventoryList: {
                        cure: true,
                        concealed: false,
                        buff: false
                    },
                    skillPanel: false,
                    inventory: false,

                },
                //用来判断是否进入沉默、缴械状态
                disabled: {
                    player: {
                        disarm: false,
                        slient: false
                    },
                    enemy: {
                        disarm: false,
                        slient: false
                    }
                },
                tips: {
                    data: '',
                    show: false,
                    close: false //此变量用来标志战斗是否已经结束，若为false点击tips模块只是关闭tips
                },
                battleMessage: '战斗开始'
            };
        },
        methods: {
            //初始化战斗
            battleStart() {
                this.initSpeed();
            },
            //初始化双方速度
            initSpeed() {
                let [pSpd, eSpd] = [this.getValue('player', 'extraAttributes', 'spd'), this.getValue('enemy',
                    'extraAttributes', 'spd')];
                if (eSpd > pSpd) {
                    this.round.player = !this.round.player;
                    this.round.enemy = !this.round.enemy;
                }
            },
            //回合变化
            roundCount() {
                this.round.num++;
                this.round.enemy = !this.round.enemy;
                this.round.player = !this.round.player;
                //正常情况下的一回合
                if (!(this.round.num % 2)) {
                    let enemy = this.enemyNamespace;
                    //敌我双方debuff持续时间各减少一回合
                    //ifNotToZero为true时代表根据战斗回合减少而不是直接清零从而清除buff
                    this.$store.dispatch('player/changeRound', {
                        ifNotToZero: true
                    });
                    this.$store.dispatch(`${enemy}/changeRound`, {
                        ifNotToZero: true
                    });
                    this.deBuff('player', 'slient');
                    this.deBuff('enemy', 'slient');
                    this.deBuff('player', 'disarm');
                    this.deBuff('enemy', 'disarm');
                }
            },
            //检测目标的buff中是否存在沉默、缴械等状态，没有则还原相关状态
            deBuff(target, debuffName) {
                let buffList = this[`${target}BuffList`];
                let ifDebuff = buffList.findIndex(e => {
                    return e.originalValue === debuffName;
                });
                if (ifDebuff !== -1) {
                    this.disabled[target][debuffName] = true;
                } else {
                    this.disabled[target][debuffName] = false;
                }
            },
            //计算伤害
            //四个参数分别为攻击类型（物理，技能）、发起攻击者、被攻击者、技能
            calculateDamage(type, attacker, target, object) {
                let atkRegularData = this[`${attacker}RegularData`];
                let atkNamespace = this[`${attacker}Namespace`];
                let tarRegularData = this[`${target}RegularData`];
                let tarNamespace = this[`${target}Namespace`];
                let losingValue = 0;
                let defCache = this.getValue(target, 'extraAttributes', 'def');
                let [attackerName, targetName] = [this.getValue(attacker, 'baseAttributes', 'name'), this.getValue(
                    target, 'baseAttributes',
                    'name')];
                if (type === 1) {
                    //计算闪避
                    let hitCache = this.getValue(attacker, 'extraAttributes', 'hit');
                    let spdCache = this.getValue(target, 'extraAttributes',
                        'spd');
                    let hitRate = (hitCache + 100) / (spdCache + 100) * .62;
                    let random = Math.random();
                    if (random > hitRate) {
                        this.battleMessage = `${attackerName}对${targetName}的攻击落空`;
                        return false;
                    } else {
                        let atkCache = this.getValue(attacker, 'extraAttributes', 'atk');
                        let atkValue = parseInt(this.randomNum(atkCache * 0.85, atkCache * 1.2));
                        let defValue = parseInt(defCache *
                            0.65);
                        //是否暴击
                        let crtCache = this.getValue(attacker, 'extraAttributes', 'crt');
                        let mulCache = this.getValue(attacker, 'extraAttributes', 'mul');
                        let crtRate = crtCache / 285;
                        let random = Math.random();
                        let ifCrt = false;
                        if (random < crtRate) {
                            atkValue *= mulCache;
                            ifCrt = true;
                        }
                        losingValue = atkValue - defValue;
                        this.battleMessage = `${attackerName}对${targetName}发动普攻，造成${losingValue}点伤害`;
                        if (ifCrt) {
                            this.battleMessage += '(暴击)'
                        }
                    }
                } else {
                    //首先计算是否有足够血量/魔法能发动技能，如果此技能会施加负面状态则在计算状态时已经判断过消耗，如果能计算到此步说明足够消耗。
                    let mgaCache = this.getValue(attacker, 'extraAttributes', 'mga');
                    let resCache = this.getValue(target, 'extraAttributes', 'res');
                    let attackerElements = {
                        fire: this.getValue(attacker, 'elements', 'fire'),
                        ice: this.getValue(attacker, 'elements', 'ice'),
                        toxic: this.getValue(attacker, 'elements', 'toxic'),
                        wind: this.getValue(attacker, 'elements', 'wind'),
                        earth: this.getValue(attacker, 'elements', 'earth'),
                    }
                    let targetElements = {
                        fire: this.getValue(target, 'elements', 'fire'),
                        ice: this.getValue(target, 'elements', 'ice'),
                        toxic: this.getValue(target, 'elements', 'toxic'),
                        wind: this.getValue(target, 'elements', 'wind'),
                        earth: this.getValue(target,
                            'elements', 'earth'),
                    }
                    //伤害数值、伤害元素类型、是否无视魔防
                    let damage = object.effect.damage.value;
                    let damageTypeValue = object.effect.damage.type.value;
                    let ifIgnoring = object.effect.damage.ignoring;
                    let elementsDamage = 0;
                    if (!ifIgnoring) {
                        //判断技能伤害类型，结算附加伤害，在这里物理伤害类型也当做元素伤害类型来计算
                        switch (damageTypeValue) {
                            case 1:
                                elementsDamage = mgaCache * 0.85 - defCache * 0.57;
                                break;
                            case 2:
                                elementsDamage = mgaCache * 0.3 * (attackerElements.fire * 1.1 - targetElements
                                    .fire *
                                    0.8);
                                break;
                            case 3:
                                elementsDamage = mgaCache * 0.3 * (attackerElements.ice * 1.1 - targetElements
                                    .ice *
                                    0.8);
                                break;
                            case 4:
                                elementsDamage = mgaCache * 0.3 * (attackerElements.toxic * 1.1 -
                                    targetElements
                                    .toxic *
                                    0.8);
                                break;
                            case 5:
                                elementsDamage = mgaCache * 0.3 * (attackerElements.wind * 1.1 -
                                    targetElements.wind *
                                    0.8);
                                break;
                            case 6:
                                elementsDamage = mgaCache * 0.3 * (attackerElements.earth * 1.1 -
                                    targetElements
                                    .earth *
                                    0.8);
                                break;
                        }
                        //实际造成的魔法伤害
                        let mgaValue = parseInt(this.randomNum(damage * 0.88, damage * 1.12)) + parseInt(
                            elementsDamage);
                        let resValue = parseInt(resCache * 0.6);
                        losingValue = mgaValue - resValue;
                        this.battleMessage = `${attackerName}对${targetName}使用了${object.name}，造成${losingValue}点伤害`;
                    } else {
                        losingValue = parseInt(this.randomNum(damage * 0.88, damage * 1.12)) + parseInt(
                            elementsDamage);
                    }
                }
                let hpCache = this.changeValue(0, tarRegularData.hp, losingValue);
                this.$store.commit(`${tarNamespace}/changeBaseAttributesValue`, {
                    propety: 'hp',
                    value: hpCache
                });
            },
            //计算治疗量
            //参数为发动技能者，技能
            calculateCure(regularData, namespace, object) {
                let addCache = 0;
                let property = '';
                //消耗蓝就加血、消耗血就加蓝，技能设定总是如此。
                if (object.consumeType.value === 1) {
                    property = 'hp';
                    addCache = this.changeValue(1, regularData.hp, object.effect.cure.value, regularData.maxhp)
                } else {
                    property = 'mp';
                    addCache = this.changeValue(1, regularData.mp, object.effect.cure.value, regularData.maxmp)
                }
                this.$store.commit(`${namespace}/changeBaseAttributesValue`, {
                    propety: property,
                    value: addCache
                });
            },
            //添加buff的相关逻辑
            calculateBuff(user, object) {
                let [vm, buff, target] = [this, object.effect.buff, ''];
                if (buff) {
                    //首先判断施放buff的目标对象
                    if (object.effect.target === 1) {
                        target = user;
                    } else {
                        if (user === 'enemy') {
                            target = 'player';
                        } else {
                            target = 'enemy';
                        }
                    }
                    let [namespace, originalValue] = [this[`${target}Namespace`],
                        []
                    ];
                    //同一种类型的buff只能存在一个,push新的buff之前需pop已存在相同类型的buff
                    let ifIdentical = this[`${target}BuffList`].findIndex(e => {
                        return e.buffType === object.buffType;
                    });
                    if (ifIdentical !== -1) {
                        this.$store.commit(`${namespace}/changeRoundToZero`, {
                            index: ifIdentical
                        });
                        this.$store.dispatch(`${namespace}/changeRound`, {
                            ifNotToZero: false
                        });
                    }
                    //若技能是提升一定数值的类型则先缓存原始值到originalValue数组中
                    if (object.buffType === 1) {
                        buff.forEach(e => {
                            let value = 0;
                            //缓存自身属性值
                            if (e.type === 1) {
                                let [p1, p2] = [e.position[0], e.position[1]];
                                value = vm.getValue(target, p1, p2);
                                //缓存技能的值
                            } else {
                                let [p1, p2, p3, p4] = [e.position[0], e.position[1], e.position[
                                    2], e.position[3]];
                                value = this.$store.state[`${target}Skills`][p1][p2][p3][p4]['value'];
                            }
                            originalValue.push({
                                type: e.type,
                                position: e.position,
                                value: value
                            });
                        });
                        //如果是沉默、缴械等状态
                    } else {
                        originalValue = buff[0].position;
                    }
                    //将buff push进目标的buff数组中
                    this.$store.commit(`${namespace}/pushBuff`, {
                        buff: {
                            sid: object.sid,
                            name: object.name,
                            round: object.effect.round,
                            buffType: object.buffType,
                            originalValue
                        }
                    });
                    //buff生效，更改相关值，沉默类状态技能无需更改值
                    buff.forEach(e => {
                        //更改自身属性
                        if (e.type === 1) {
                            let [p1, p2] = [e.position[0], e.position[1]];
                            let [changeValue, originValue] = [0, vm.getValue(target, p1, p2)];
                            //判断技能是提升倍数还是增加固定数值
                            if (e.valueType === 'percentage') {
                                changeValue = Math.ceil(originValue * e.value);
                            } else {
                                changeValue = Math.ceil(originValue + e.value);
                            }
                            this.$store.commit(`${namespace}/changeExtraAttributesOrElementsValue`, {
                                type: e.position[0],
                                propety: e.position[1],
                                value: changeValue
                            });
                            //更改技能属性
                        } else if (e.type === 2) {
                            let [p1, p2, p3, p4] = [e.position[0], e.position[1], e.position[2], e.position[
                                3]];
                            let [changeValue, originValue] = [0, this.$store.state[`${target}Skills`][p1][
                                p2
                            ][p3][p4]['value']];
                            if (e.valueType === 'percentage') {
                                changeValue = Math.ceil(originValue * e.value);
                            } else {
                                changeValue = Math.ceil(originValue + e.value);
                            }
                            this.$store.dispatch(`${namespace}/changeSkillValue`, {
                                p1: e.position[0],
                                p2: e.position[1],
                                p3: e.position[2],
                                p4: e.position[3],
                                value: changeValue
                            });
                        }
                    });
                }
            },
            //因为不同列表的id前缀不同，所以需要sign参数判断
            findList(list, id, sign) {
                let object = null;
                let objectList = this[list];
                objectList.forEach(e => {
                    if (e[`${sign}id`] === id) {
                        object = e;
                        return;
                    }
                });
                return object;
            },
            //施放技能后的魔法/生命消耗操作
            consume(skill, regularData, namespace) {
                if (skill.consumeType.value === 1) {
                    if (regularData.mp - skill.consume >= 0) {
                        let consumeValue = regularData.mp - skill.consume;
                        this.$store.commit(`${namespace}/changeBaseAttributesValue`, {
                            propety: 'mp',
                            value: consumeValue
                        });
                        return true;
                    } else {
                        this.openTips('魔法不足');
                        return false;
                    }
                } else {
                    if (regularData.hp - skill.consume >= 0) {
                        let consumeValue = regularData.hp - skill.consume;
                        this.$store.commit(`${namespace}/changeBaseAttributesValue`, {
                            propety: 'hp',
                            value: consumeValue
                        });
                        return true;
                    } else {
                        this.openTips('生命不足');
                        return false;
                    }
                }
            },
            //改变量，并判断超出最大、最小数值，1为增0为减
            changeValue(type, now, increment, edge) {
                if (type) {
                    if (now + increment <= edge) {
                        now += increment;
                    } else {
                        now = edge;
                    }
                } else {
                    if (now - increment >= 0) {
                        now -= increment;
                    } else {
                        now = 0;
                    }
                }
                return now;
            },
            //物理攻击
            attack(attacker, target) {
                this.calculateDamage(1, attacker, target);
                this.roundCount();
            },
            //发动伤害技能
            useDamageSkill(attacker, target, list, sid) {
                let skill = this.findList(list, sid, 's');
                let atkRegularData = this[`${attacker}RegularData`];
                let atkNamespace = this[`${attacker}Namespace`];
                let ifEnough = this.consume(skill, atkRegularData, atkNamespace);
                if (ifEnough) {
                    this.calculateBuff(attacker, skill);
                    this.calculateDamage(2, attacker, target, skill);
                    this.toggleSkillsPanel();
                    this.roundCount();
                }
            },
            //发动治疗技能
            useCureSkill(target, list, sid) {
                let skill = this.findList(list, sid, 's');
                let [regularData, namespace] = [this[`${target}RegularData`], this[`${target}Namespace`]];
                let ifEnough = this.consume(skill, regularData, namespace);
                if (ifEnough) {
                    this.calculateCure(regularData, namespace, skill);
                    let targetName = this.getValue(target, 'baseAttributes', 'name');
                    this.battleMessage = `${targetName}使用了${skill.name},恢复${skill.effect.cure.value}点${skill.cureType}`;
                    this.toggleSkillsPanel();
                    this.roundCount();
                }
            },
            //发动增/减益技能
            useBuffSkill(user, list, sid) {
                let skill = this.findList(list, sid, 's');
                let [regularData, userNamespace] = [this[`${user}RegularData`], this[`${user}Namespace`]];
                let ifEnough = this.consume(skill,
                    regularData, userNamespace);
                if (ifEnough) {
                    this.calculateBuff(user, skill);
                    let userName = this.getValue(user, 'baseAttributes', 'name');
                    this.battleMessage = `${userName}使用了${skill.name}`;
                    this.toggleSkillsPanel();
                    this.roundCount();
                }
            },
            useCureItem(target, list, iid) {
                let [item, regularData, namespace] = [this.findList(list, iid, 'i'), this[`${target}RegularData`],
                    this[`${target}Namespace`]
                ];
                this.calculateCure(regularData, namespace, item);
                let targetName = this.getValue(target, 'baseAttributes', 'name');
                this.battleMessage = `${targetName}使用了${item.name},恢复${item.effect.cure.value}点${item.cureType}`;
                this.$store.commit('items/minusValue', {
                    type: 'cureItems',
                    iid: item.iid
                });
                this.toggleInventory();
                this.roundCount();

            },
            useConcealedItem(attacker, target, list, iid) {
                let item = this.findList(list, iid, 'i');
                this.calculateBuff(attacker, item);
                this.calculateDamage(2, attacker, target,
                    item);
                this.$store.commit('items/minusValue', {
                    type: 'concealedItems',
                    iid: item.iid
                });
                this.toggleInventory();
                this.roundCount();
            },
            useBuffItem(user, list, iid) {
                let item = this.findList(list, iid, 'i');
                this.calculateBuff(user, item);
                let userName = this.getValue(user, 'baseAttributes', 'name');
                this.battleMessage = `${userName}使用了${item.name}`;
                this.$store.commit('items/minusValue', {
                    type: 'buffItems',
                    iid: item.iid
                });
                this.toggleInventory();
                this.roundCount();
            },
            escape() {
                let enemySpdCache = this.getValue('enemy', 'extraAttributes', 'spd');
                let playerSpdCache = this.getValue('player', 'extraAttributes', 'spd');
                let escapeRate = (playerSpdCache + 100) / (enemySpdCache + 100) * .8;
                let random = Math.random();
                if (random > escapeRate) {
                    this.openTips('逃跑失败');
                    this.roundCount();
                } else {
                    //重置怪物的状态
                    let [emaxhp, emaxmp] = [this.enemy.baseAttributes.maxhp.value, this.enemy.baseAttributes.maxmp.value];
                    this.resetStatus('enemy',
                        emaxhp, emaxmp);
                    this.tips.close = true;
                    this.openTips('逃跑成功');
                }
            },
            anger() {
                this.openTips('此功能尚未开发');
            },
            skip() {
                this.battleMessage = '跳过本回合';
                this.roundCount();
            },
            //展开/收起道具面板 
            toggleInventory() {
                this.show.inventory = !this.show.inventory;
            },
            changeInventory(tab) {
                Object.keys(this.show.inventoryList).forEach(e => {
                    this.show.inventoryList[e] = false;
                });
                this.show.inventoryList[tab] = true;
            },
            //展开/收起技能面板
            toggleSkillsPanel() {
                this.show.skillPanel = !this.show.skillPanel;
            },
            //切换技能面板
            changeSkillsTab(tab) {
                Object.keys(this.show.skillPanleList).forEach(e => {
                    this.show.skillPanleList[e] = false;
                });
                this.show.skillPanleList[tab] = true;
            },
            //获取玩家技能列表
            getPlayerSkills(origin) {
                return this.$store.state.playerSkills[origin];
            },
            //获取BOSS技能列表 
            getEnemySkills(origin) {
                let namespace = this.enemyNamespace;
                return this.$store.state[`${namespace}Skills`][origin];
            },
            //获取道具列表
            getItemsArr(origin) {
                return this.$store.state.items[origin];
            },
            //获取数据
            getValue(target, type, property) {
                return this[target][type][property].value;
            },
            //敌方行为
            enemyAction() {
                let vm = this;
                setTimeout(function () {
                    if (!vm.disabled.enemy.disarm) {
                        vm.attack('enemy', 'player');
                    } else {
                        vm.roundCount();
                    }
                }, 500);
            },
            //随机数
            randomNum(minNum, maxNum) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * minNum + 1);
                        break;
                    case 2:
                        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
                        break;
                    default:
                        return 0;
                        break;
                }
            },
            openTips(content) {
                this.tips.data = content;
                this.tips.show = true;
            },
            closeTips() {
                this.tips.show = false;
            },
            closeBattle() {
                if (this.tips.close) {
                    this.$store.commit('global/toggleBattle');
                    this.$emit('closeBattle', {
                        type: 'battle'
                    });
                }
            },
            //战斗结束后重置状态
            resetStatus(target, maxhp, maxmp) {
                let namespace = this[`${target}Namespace`];
                this.$store.commit(`${namespace}/changeBaseAttributesValue`, {
                    propety: 'hp',
                    value: maxhp
                });
                this.$store.commit(`${namespace}/changeBaseAttributesValue`, {
                    propety: 'mp',
                    value: maxmp
                });
                let buffList = this[`${target}BuffList`];
                buffList.forEach((e, i) => {
                    this.$store.commit(`${namespace}/changeRoundToZero`, {
                        index: i
                    });
                });
                this.$store.dispatch(`${namespace}/changeRound`, {
                    ifNotToZero: false
                });
            },
            //奖励
            rewardPlayer(reward) {
                this.$store.commit('player/changeBaseAttributesValue', {
                    propety: 'exp',
                    value: this.nowExp + reward.exp
                });
                if (this.levelUpExp <= this.nowExp) {
                    this.$store.commit('player/levelup');
                }
                if (reward.items) {
                    reward.items.forEach(e => {
                        this.$store.commit('items/addValue', {
                            type: e.type,
                            iid: e.iid,
                            amount: e.amount
                        });
                    });
                }
                this.$store.commit('player/changeExtraAttributesOrElementsValue', {
                    type: 'extraAttributes',
                    propety: 'gold',
                    value: this.nowGold + reward.gold
                });
            }
        },
        props: {
            enemy: Object, //敌人
            mode: String, //模式
            reward: Object //奖励
        },
        computed: {
            //取得命名空间用来commit
            playerNamespace() {
                return this.$store.state.player.baseAttributes.namespace;
            },
            enemyNamespace() {
                return this.enemy.baseAttributes.namespace;
            },
            player() {
                return this.$store.state.player;
            },
            // enemy() {
            //     return this.$store.state.moumou;
            // },
            //玩家生命、魔法信息等几个常用量，设置此对象用来快速获取
            playerRegularData() {
                return {
                    hp: this.getValue('player', 'baseAttributes', 'hp'),
                    mp: this.getValue('player', 'baseAttributes', 'mp'),
                    maxhp: this.getValue('player', 'baseAttributes', 'maxhp'),
                    maxmp: this.getValue('player', 'baseAttributes', 'maxmp')
                };
            },
            //敌人生命、魔法信息
            enemyRegularData() {
                return {
                    hp: this.getValue('enemy', 'baseAttributes', 'hp'),
                    mp: this.getValue('enemy', 'baseAttributes', 'mp'),
                    maxhp: this.getValue('enemy', 'baseAttributes', 'maxhp'),
                    maxmp: this.getValue('enemy', 'baseAttributes', 'maxmp')
                };
            },
            //玩家技能列表
            damageSkillsList() {
                return this.getPlayerSkills('damageSkills');
            },
            cureSkillsList() {
                return this.getPlayerSkills('cureSkills');
            },
            buffSkillsList() {
                return this.getPlayerSkills('buffSkills');
            },
            passiveSkillsList() {
                return this.getPlayerSkills('passiveSkills');
            },
            //BOSS技能列表 
            e_damageSkillsList() {
                return this.getEnemySkills('damageSkills');
            },
            e_cureSkillsList() {
                return this.getEnemySkills('cureSkills');
            },
            e_buffSkillsList() {
                return this.getEnemySkills('buffSkills');
            },
            //道具列表
            cureItemsList() {
                return this.getItemsArr('cureItems');
            },
            concealedItemsList() {
                return this.getItemsArr('concealedItems');
            },
            buffItemsList() {
                return this.getItemsArr('buffItems');
            },
            //buff列表
            playerBuffList() {
                return this.player.buff;
            },
            enemyBuffList() {
                return this.enemy.buff;
            },
            //当前经验
            nowExp() {
                return this.player.baseAttributes.exp.value;
            },
            nowGold() {
                return this.player.extraAttributes.gold.value;
            },
            //升级经验
            levelUpExp() {
                return this.$store.getters['player/levelUpExp'];
            }
        },
        watch: {
            //监听回合
            round: {
                handler(newValue, oldValue) {
                    let [pHp, eHp] = [this.playerRegularData.hp, this.enemyRegularData.hp];
                    //死亡
                    if (!pHp || !eHp) {
                        //重置自己的状态 
                        let [pmaxhp, pmaxmp] = [this.player.baseAttributes.maxhp.value, this.player.baseAttributes.maxmp
                            .value
                        ];
                        this.resetStatus('player', pmaxhp, pmaxmp);
                        //重置怪物的状态
                        let [emaxhp, emaxmp] = [this.enemy.baseAttributes.maxhp.value, this.enemy.baseAttributes.maxmp.value];
                        this.resetStatus('enemy', emaxhp, emaxmp);
                        this.tips.close = true;
                        //经验获取、升级
                        if (!pHp) {
                            //失败后会掉经验
                            this.$store.commit('player/changeBaseAttributesValue', {
                                propety: 'exp',
                                value: this.nowExp - gotValue
                            });
                            //经验最多降到当前等级开始
                            let prevlevel = this.player.baseAttributes.level.value - 1;
                            let prevLevelUpExp = prevlevel * (prevlevel + 5) * 10;
                            if (this.prevLevelUpExp >= this.nowExp) {
                                this.$store.commit('player/changeBaseAttributesValue', {
                                    propety: 'exp',
                                    value: prevLevelUpExp
                                });
                            }
                            this.openTips('gg');
                        } else {
                            //击败敌人经验
                            this.$store.commit('player/changeBaseAttributesValue', {
                                propety: 'exp',
                                value: this.nowExp + this.enemy.baseAttributes.exp.value
                            });
                            //升级
                            if (this.levelUpExp <= this.nowExp) {
                                this.$store.commit('player/levelup');
                            }
                            //击败敌人金钱奖励
                            this.$store.commit('player/changeExtraAttributesOrElementsValue', {
                                type: 'extraAttributes',
                                propety: 'gold',
                                value: this.nowGold + this.enemy.baseAttributes.gold.value
                            });
                            //完成任务奖励
                            if (this.mode === 'mission') {
                                this.rewardPlayer(this.reward);
                                this.$emit('done');
                            }
                            this.openTips('获胜！');
                        }
                    } else if (newValue.enemy) {
                        this.enemyAction();
                    }
                },
                deep: true
            }
        },
        components: {
            Tips
        },
        created() {
            this.$store.commit('global/toggleBattle');
            this.battleStart();
        }
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../style/style";

    .skillPanel,
    .inventory {
        position: fixed;
        width: 100vw;
        height: 100vh;
        .bw;
        top: 0;
        left: 0;
        z-index: 100;
        overflow: auto;
        .wrapper {
            padding-bottom: .5rem;
        }
        &.inventory {
            .tab {
                button {
                    width: 30%;
                    margin-top: 0;
                }
            }
        }
        .content {
            li {
                border-bottom: 1px solid #a4b0be;
            }
            button {
                display: block;
                margin: auto;
                width: 100%;
                .bw;
                left: 0;
                bottom: 0;
                width: 100vw;
                position: fixed;
                border: none;
                background: #f1f1f1;
            }
        }
    }

    .battle {
        .control {
            font-size: 0.12rem;
            padding: 0.1rem;
            h5 {
                margin-bottom: 0.1rem;
                font-size: 0.16rem;
            }
            p {
                height: .15rem;
            }
        }
        .section {
            border-bottom: 1px solid #666;
            position: relative;
            &.player {
                border-bottom: none;
            }
            &:last-child {
                border-bottom: 0;
            }
            .round {
                position: absolute;
                top: 0.1rem;
                right: 0.05rem;
                i {
                    font-size: 0.2rem;
                    color: #2ed573;
                }
            }
            h4 {
                padding: 0.1rem;
            }
            .info {
                margin-bottom: .15rem;
                span {
                    font-size: 0.12rem;
                    margin: 0 .05rem;
                }
            }
            h6 {
                padding: 0.1rem;
                font-weight: bold;
            }
            .con {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                padding: 0.1rem;
                padding-top: 0;
                button {
                    margin: 0.1rem 0;
                    &.disabled {
                        .cw;
                        background: #ccc;
                    }
                }
            }
            .card div {
                position: relative;
                width: 40%;
                max-width: 150px;
                padding: 0.15rem;
                background: #70a1ff;
                border-radius: 15px;
                color: #fff;
                .title {
                    display: block;
                    margin-bottom: 0.12rem;
                    &~span {
                        font-weight: bold;
                    }
                }
                &.level {
                    background: #a4b0be;
                }
                &.hp {
                    background: #ff6b81;
                }
                &.mp {
                    background: #70a1ff;
                }
            }
        }
        .buff {
            .con {
                min-height: .25rem;
            }
            span {
                font-size: 0.1rem;
            }
        }
        .operation {
            h6 {
                padding-top: 0;
            }
        }
    }
</style>