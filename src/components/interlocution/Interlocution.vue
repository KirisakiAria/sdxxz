<template>
    <section class="interlocution mainSection">
        <section class="content">
            <p class="tips">提问教授:炮神</p>
            <ul>
                <li :key="item.qid" v-for="item in questions">
                    <div class="bottom">
                        <p>{{item.qid+1}}.{{item.desc}}</p>
                    </div>
                    <div class="answer">
                        <div class="ib" :key="key.index" v-for="key in item.answer">
                            <input :id="`o${item.qid}${key.index}`" type="radio" :name="`q${item.qid}`" :value="key.index" v-model="userAnswer[item.qid]['ans']">
                            <label :for="`o${item.qid}${key.index}`">{{key.value}}</label>
                        </div>
                    </div>
                </li>
            </ul>
            <button @click="check">提交答案</button>
        </section>
        <transition name="scale-fade">
            <Tips :content="tips.data" v-show="tips.show" @closeTips="closeInterlocution" @click.native="closeInterlocution"></Tips>
        </transition>
    </section>
</template>

<script>
    import Tips from '../tips/Tips';

    export default {
        name: 'Interlocution',
        data() {
            return {
                tips: {
                    show: false,
                    data: ''
                },
                count: 0
            }
        },
        props: {
            questions: Array,
            reward: Object
        },
        methods: {
            check() {
                this.correctAnswer.forEach((e, i) => {
                    if (e.ans === this.userAnswer[i].ans) {
                        this.count++;
                    }
                });
                const times = this.count / this.correctAnswer.length;
                this.rewardPlayer(this.reward, times);
                this.openTips(
                    `回答正确${this.count}题，得到${Math.ceil(this.reward.exp * times)}经验${Math.ceil(this.reward.gold * times)}金钱`
                );
                this.$store.commit('global/toggleInterlocution');
            },
            rewardPlayer(reward, times) {
                this.$store.commit('player/changeBaseAttributesValue', {
                    propety: 'exp',
                    value: this.nowExp + Math.ceil(reward.exp * times)
                });
                if (this.levelUpExp <= this.nowExp) {
                    this.$store.commit('player/levelup');
                }
                this.$store.commit('player/changeExtraAttributesOrElementsValue', {
                    type: 'extraAttributes',
                    propety: 'gold',
                    value: this.nowGold + Math.ceil(reward.gold * times)
                });
            },
            openTips(content) {
                this.tips.data = content;
                this.tips.show = true;
            },
            closeInterlocution() {
                this.$emit('closeInterlocution', {
                    type: 'interlocution'
                });
                this.$emit('done');
            }
        },
        computed: {
            userAnswer() {
                let arr = [];
                this.questions.forEach(e => {
                    arr.push({
                        ans: 0
                    });
                });
                return arr;
            },
            correctAnswer() {
                let arr = [];
                this.questions.forEach(e => {
                    arr.push({
                        ans: e.correct
                    });
                });
                return arr;
            },
            nowExp() {
                return this.$store.state.player.baseAttributes.exp.value
            },
            nowGold() {
                return this.$store.state.player.extraAttributes.gold.value
            },
            levelUpExp() {
                return this.$store.getters['player/levelUpExp'];
            }
        },
        components: {
            Tips
        },
        created() {
            this.$store.commit('global/toggleInterlocution');
        }
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../style/style";

    .interlocution {
        .content {
            padding-top: .15rem;
            li {
                margin-bottom: 0;
                .answer {
                    margin-top: .1rem;
                    .ib {
                        margin-right: .15rem;
                    }
                }
            }
            button {
                display: block;
                width: 45%;
                margin: auto;
                margin-top: .2rem;
                .bor(#ccc);
            }
        }
    }
</style>