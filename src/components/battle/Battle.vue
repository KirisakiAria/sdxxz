<template>
    <section class="battle mainSection">
        <section class="control section">
            <h5 class="tac">战斗信息</h5>
            <p>傻吊村小傻吊对你发动了物理攻击，生命损失20点</p>
        </section>
        <section class="enemy section">
            <div v-if="round.enemy" class="round">
                <i class="iconfont icon-round"></i>
            </div>
            <h4 class="tac">
                <span>等级{{enemy.baseAttributes.level.value}}</span>
                {{enemy.baseAttributes.name.value}}
            </h4>
            <div class="content">
                <div class="attr">
                    <div class="con card tac">
                        <div class="hp">
                            <span class="title">生命</span>
                            <span>{{enemyPanel.hp}}</span>
                            <span>/</span>
                            <span>{{enemyPanel.maxhp}}</span>
                        </div>
                        <div class="mp">
                            <span class="title">魔法</span>
                            <span>{{enemyPanel.mp}}</span>
                            <span>/</span>
                            <span>{{enemyPanel.maxmp}}</span>
                        </div>
                    </div>
                </div>
                <div class="buff">
                    <h6 class="tac">状态</h6>
                    <div class="con">
                        <div>无</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="player section">
            <div v-if="round.player" class="round">
                <i class="iconfont icon-round"></i>
            </div>
            <h4 class="tac">
                <span>等级{{player.baseAttributes.level.value}}</span>
                {{player.baseAttributes.name.value}}
            </h4>
            <div class="content">
                <div class="attr">
                    <div class="con card tac">
                        <div class="hp">
                            <span class="title">生命</span>
                            <span>{{playerPanel.hp}}</span>
                            <span>/</span>
                            <span>{{playerPanel.maxhp}}</span>
                        </div>
                        <div class="mp">
                            <span class="title">魔法</span>
                            <span>{{playerPanel.mp}}</span>
                            <span>/</span>
                            <span>{{playerPanel.maxmp}}</span>
                        </div>
                    </div>
                </div>
                <div class="buff">
                    <h6 class="tac">状态</h6>
                    <div class="con">
                        <div>无</div>
                    </div>
                </div>
                <div class="operation">
                    <h6 class="tac">操作</h6>
                    <div class="con">
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="attack('player','enemy')">攻击</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="toggleSkillsPanel()">技能</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="items(1)">道具</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="suicide(1)">自杀</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="escape(1)">逃跑</button>
                        <button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="auto(1)">自动</button>
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
                        <transition name="slide2-fade" mode="out-in">
                            <div v-if="show.skillPanleList.damage" class="damageSkillsList">
                                <ul>
                                    <li :key="item.name" v-if="item.learned" v-for="item in damageSkillsList" @click="useDamageSkill('player','enemy',item.sid)">
                                        <div class="top">
                                            <span>{{item.name}}</span>
                                            <span>{{item.consumeType.name}}消耗：{{item.consume}}</span>
                                            <span>伤害类型：{{item.effect.damage.type.name}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍：{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="show.skillPanleList.cure" class="cureSkillsList">
                                <ul>
                                    <li :key="item.name" v-if="item.learned" v-for="item in cureSkillsList" @click="useCureSkill('player',item.sid)">
                                        <div class="top">
                                            <span>{{item.name}}</span>
                                            <span>{{item.consumeType.name}}消耗：{{item.consume}}</span>
                                            <span>治疗量：{{item.effect.cure}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍：{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="show.skillPanleList.buff" class="buffSkillsList">
                                <ul>
                                    <li :key="item.name" v-if="item.learned" v-for="item in buffSkillsList" @click="useBuffSkillitem.sid(item.sid)">
                                        <div class="top">
                                            <span>{{item.name}}</span>
                                            <span>{{item.consumeType.name}}消耗：{{item.consume}}</span>
                                            <span>持续回合数：{{item.effect.round}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍：{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="show.skillPanleList.passive" class="passiveSkillsList">
                                <ul>
                                    <li :key="item.name" v-if="item.learned" v-for="item in passiveSkillsList">
                                        <div class="top">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="bottom">
                                            <p>技能介绍：{{item.desc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                        <button @click="toggleSkillsPanel()">返回</button>
                    </section>
                </div>
            </section>
        </transition>
    </section>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../style/style";

    .skillPanel {
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
        .tab {
            padding: .15rem;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            button {
                width: 45%;
                margin-top: .075rem;
                display: block;
                &:nth-of-type(1),
                &:nth-of-type(2) {
                    margin-top: 0;
                }
                &.active {
                    background: #ff6b81;
                    .bor(#ff6b81);
                    .cw;
                }
            }
        }
        .content {
            >p {
                text-align: center;
                margin-bottom: .15rem;
                color: #ff6348;
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
            li {
                margin-bottom: .1rem;
                padding: .12rem;
                border-top: 1px solid #a5b1c2;
                border-bottom: 1px solid #a5b1c2;
                .top {
                    margin-bottom: .15rem;
                    span {
                        margin-right: .1rem;
                    }
                }
                .bottom {
                    p {
                        line-height: 1.5;
                    }
                }
            }
        }
    }

    .battle {
        padding-bottom: 0.71rem;
        .control {
            font-size: 0.12rem;
            padding: 0.1rem;
            h5 {
                margin-bottom: 0.1rem;
                font-size: 0.16rem;
            }
        }
        .section {
            border-bottom: 1px solid #666;
            position: relative;

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
                padding-right: .25rem;
                span {
                    font-size: 0.12rem;
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
    }
</style>
<script>
    export default {
        name: 'Battle',
        data() {
            return {
                round: {
                    num: 0,
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
                    skillPanel: false
                }
            };
        },
        methods: {
            //初始化战斗
            battleStart: function () {
                this.initSpeed();
                this.initBuff();
            },
            //初始化双方速度
            initSpeed: function () {
                let [pSpd, eSpd] = [this.getValue('player', 'extraAttributes', 'spd'), this.getValue('enemy',
                    'extraAttributes', 'spd')];
                if (eSpd > pSpd) {
                    this.round.player = !this.round.player;
                    this.round.enemy = !this.round.enemy;
                }
            },
            //初始化状态
            initBuff: function () {

            },
            //回合变化
            roundCount: function () {
                this.round.num++;
                this.round.enemy = !this.round.enemy;
                this.round.player = !this.round.player;
                if (this.round.num % 2 == 0) {
                    this.recover();
                }
            },
            //计算伤害
            //四个参数分别为攻击类型（物理，技能）、发起攻击者、被攻击者、技能
            calculateDamage: function (type, attacker, target, skill) {
                let tarPanel = this[`${target}Panel`];
                let losingHp = 0;
                let defCache = this.getValue(target, 'extraAttributes', 'def');
                if (type === 1) {
                    let atkCache = this.getValue(attacker, 'extraAttributes', 'atk');
                    let atkValue = parseInt(this.randomNum(atkCache * 0.9, atkCache * 1.1));
                    let defValue = parseInt(defCache *
                        0.4);
                    losingHp = atkValue - defValue;
                } else {
                    //首先计算是否有足够血量/魔法能发动技能
                    let atkPanel = this[`${attacker}Panel`];
                    let ifEnough = this.consume(skill, atkPanel);
                    if (ifEnough === 1) {
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
                        //元素伤害固定为魔攻的50%
                        let damage = skill.effect.damage.value;
                        let damageTypeValue = skill.effect.damage.type.value;
                        let ifIgnoring = skill.effect.damage.ignoring;
                        let elementsDamage = mgaCache * 0.5;
                        if (!ifIgnoring) {
                            //判断技能伤害类型，结算附加伤害
                            switch (damageTypeValue) {
                                case 1:
                                    elementsDamage -= defCache * 0.2;
                                    break;
                                case 2:
                                    elementsDamage = elementsDamage + attackerElements.fire * 1.5 - targetElements.fire *
                                        0.4;
                                    break;
                                case 3:
                                    elementsDamage = elementsDamage + attackerElements.ice * 1.5 - targetElements.ice *
                                        0.4;
                                    break;
                                case 4:
                                    elementsDamage = elementsDamage + attackerElements.toxic * 1.5 - targetElements
                                        .toxic *
                                        0.4;
                                    break;
                                case 5:
                                    elementsDamage = elementsDamage + attackerElements.wind * 1.5 - targetElements.wind *
                                        0.4;
                                    break;
                                case 6:
                                    elementsDamage = elementsDamage + attackerElements.earth * 1.5 - targetElements
                                        .earth *
                                        0.4;
                                    break;
                            }
                            //实际造成的魔法伤害
                            let mgaValue = parseInt(this.randomNum(mgaCache * 0.85, mgaCache * 1.2)) + parseInt(
                                elementsDamage);
                            let resValue = parseInt(resCache * 0.3);
                            losingHp = mgaValue - resValue;
                        } else {
                            losingHp = parseInt(this.randomNum(mgaCache * 0.85, mgaCache * 1.2)) + parseInt(
                                elementsDamage);
                        }
                        this.toggleSkillsPanel();
                    } else {
                        return alert(ifEnough);
                    }
                }
                let hpCache = this.changeValue(0, tarPanel.hp, losingHp);
                let namespace = this[`${target}Namespace`];
                this.$store.commit(`${namespace}/changeBaseValue`, {
                    propety: 'hp',
                    value: hpCache
                });
                this.roundCount();
            },
            //计算治疗量
            //参数为发动技能者，技能
            calculateCure: function (target, skill) {
                let panel = this[`${target}Panel`];
                let ifEnough = this.consume(skill, panel);
                if (ifEnough === 1) {
                    if (skill.consumeType.value === 1) {
                        panel.hp = this.changeValue(1, panel.hp, skill.effect.cure, panel.maxhp)
                    } else {
                        panel.mp = this.changeValue(1, panel.mp, skill.effect.cure, panel.maxmp)
                    }
                } else {
                    return alert(ifEnough);
                }
                this.toggleSkillsPanel();
                this.roundCount();
            },
            //每回合回复
            recover: function () {
                let playerHpsCache = this.getValue('player', 'extraAttributes', 'hps');
                let playerMpsCache = this.getValue('player', 'extraAttributes', 'mps');
                let enemyHpsCache = this.getValue('enemy', 'extraAttributes', 'hps');
                let enemyMpsCache = this.getValue('enemy', 'extraAttributes', 'mps');
                //玩家
                this.playerPanel.hp = this.changeValue(1, this.playerPanel.hp, playerHpsCache, this.playerPanel.maxhp);
                this.playerPanel.mp = this.changeValue(1, this.playerPanel.mp, playerMpsCache, this.playerPanel.maxmp);
                //敌方
                this.enemyPanel.hp = this.changeValue(1, this.enemyPanel.hp, playerHpsCache, this.enemyPanel.maxhp);
                this.enemyPanel.mp = this.changeValue(1, this.enemyPanel.mp, playerMpsCache, this.enemyPanel.maxmp);
            },
            consume: function (skill, panel) {
                if (skill.consumeType.value == 1) {
                    if (panel.mp - skill.consume >= 0) {
                        panel.mp -= skill.consume;
                        return 1;
                    } else {
                        return '发动技能失败，魔法不足';
                    }
                } else {
                    if (panel.hp - skill.consume >= 0) {
                        panel.hp -= skill.consume;
                        return 1;
                    } else {
                        return '发动技能失败，血量不足';
                    }
                }
            },
            //改变量，并判断超出最大、最小数值，1为增0为减
            changeValue: function (type, now, increment, edge) {
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
            attack: function (attacker, target) {
                let hitCache = this.getValue(attacker, 'extraAttributes', 'hit');
                let spdCache = this.getValue(target, 'extraAttributes', 'spd');
                let hitRate = (hitCache + 100) / (spdCache + 100) * .75;
                let random = Math.random();
                if (random > hitRate) {
                    console.log('攻击落空！');
                    this.roundCount();
                } else {
                    this.calculateDamage(1, attacker, target);
                }
            },
            //发动伤害技能
            useDamageSkill: function (attacker, target, sid) {
                let skill = null;
                this.damageSkillsList.forEach(e => {
                    if (e.sid === sid) {
                        skill = e;
                    }
                });
                this.calculateDamage(2, attacker, target, skill);
            },
            //发动治疗技能
            useCureSkill: function (target, sid) {
                let skill = null;
                this.cureSkillsList.forEach(e => {
                    if (e.sid === sid) {
                        skill = e;
                    }
                });
                this.calculateCure(target, skill);
            },
            //发动增/减益技能
            useBuffSkill: function (sid) {

                this.toggleSkillsPanel();
            },
            items: function () {
                this.roundCount();
            },
            suicide: function () {
                this.roundCount();
            },
            escape: function () {
                let enemySpdCache = this.getValue('enemy', 'extraAttributes', 'spd');
                let playerSpdCache = this.getValue('player', 'extraAttributes', 'spd');
                let escapeRate = (playerSpdCache + 100) / (enemySpdCache + 100) * .8;
                let random = Math.random();
                if (random > escapeRate) {
                    alert('逃跑失败！');
                } else {
                    this.$emit('close');
                }
            },
            auto: function () {
                this.roundCount();
            },
            //展开/收起技能面板
            toggleSkillsPanel: function () {
                this.show.skillPanel = !this.show.skillPanel;
            },
            //切换技能面板
            changeSkillsTab: function (tab) {
                Object.keys(this.show.skillPanleList).forEach(e => {
                    this.show.skillPanleList[e] = false;
                });
                this.show.skillPanleList[tab] = true;
            },
            //获取技能列表
            getSkillsArr: function (origin) {
                let arr = [];
                let skills = this.$store.state.playerSkills[origin];
                Object.values(skills).forEach(e => {
                    arr.push(e);
                });
                return arr;
            },
            //获取数据
            getValue: function (target, type, property) {
                return this[target][type][property].value;
            },
            enemyAction: function () {
                let that = this;
                setTimeout(function () {
                    that.attack('enemy', 'player');
                }, 1000);
            },
            //随机数
            randomNum: function (minNum, maxNum) {
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
            }
        },
        // props: [
        // 	'enemy'
        // ],
        computed: {
            //用来获取不同命名空间的同名方法以便提交
            playerNamespace: function () {
                return this.$store.state.player.baseAttributes.namespace;
            },
            enemyNamespace: function () {
                return this.$store.state.villageC.baseAttributes.namespace;
            },
            player: function () {
                return this.$store.state.player;
            },
            enemy: function () {
                return this.$store.state.villageC;
            },
            //战斗的生命、魔法皆从面板中计算，战斗结束统一提交
            //玩家面板
            playerPanel: function () {
                return {
                    hp: this.getValue('player', 'baseAttributes', 'hp'),
                    mp: this.getValue('player', 'baseAttributes', 'mp'),
                    maxhp: this.getValue('player', 'baseAttributes', 'maxhp'),
                    maxmp: this.getValue('player', 'baseAttributes', 'maxmp')
                };
            },
            //敌人面板
            enemyPanel: function () {
                return {
                    hp: this.getValue('enemy', 'baseAttributes', 'hp'),
                    mp: this.getValue('enemy', 'baseAttributes', 'mp'),
                    maxhp: this.getValue('enemy', 'baseAttributes', 'maxhp'),
                    maxmp: this.getValue('enemy', 'baseAttributes', 'maxmp')
                };
            },
            //技能列表
            damageSkillsList: function () {
                return this.getSkillsArr('damageSkills');
            },
            cureSkillsList: function () {
                return this.getSkillsArr('cureSkills');
            },
            buffSkillsList: function () {
                return this.getSkillsArr('buffSkills');
            },
            passiveSkillsList: function () {
                return this.getSkillsArr('passiveSkills');
            }
        },
        watch: {
            //监听回合
            round: {
                handler(newValue, oldValue) {
                    let [pHp, eHp] = [this.playerPanel.hp, this.enemyPanel.hp];
                    //死亡
                    if (!pHp) {
                        alert('失败！');
                        this.$emit('close');
                        //获胜
                    } else if (!eHp) {
                        alert('获胜');
                        //经验获取、升级
                        let [ownedExp, gotExp, levelUpExp] = [
                            this.player.baseAttributes.exp.value,
                            this.enemy.baseAttributes.exp.value,
                            this.player.levelUpExp
                        ];
                        this.$store.commit('player/changeExp', {
                            value: ownedExp + gotExp
                        });
                        let [nowExp, upExp] = [this.player.baseAttributes.exp.value, 0];
                        levelUpExp.forEach(e => {
                            if (nowExp > e) {
                                upExp = e;
                            }
                        });
                        let level = levelUpExp.findIndex(value => {
                            return value == upExp;
                        });
                        this.$store.commit('player/changeLevel', {
                            value: level
                        });
                        this.$emit('close');
                    } else if (newValue.enemy) {
                        this.enemyAction();
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.battleStart();
        }
    };
</script>