<template>
	<section class="mission mainSection">
		<transition name="slide-fade" mode="out-in">
			<section v-if="show.list" class="list">
				<section class="mainQuests">
					<h4 class="tac">主线任务</h4>
					<ul>
						<li :key="item.mid" v-for="item in mainQuestsList" v-if="ifShow(item.level,item.ifDone,item.acceptable)">
							<div class="top">
								<div class="ib">
									<span class="title">{{item.name}}</span>
									<span class="level">等级:{{item.level}}</span>
									<p>{{item.des}}</p>
								</div>
								<button class="notyet" @click="take(item)">接受</button>
							</div>
							<div class="reward">
								<span>经验:{{item.reward.exp}}</span>
								<span class="items">物品:</span>
								<span :key="key.name" v-for="key in item.reward.items">{{key.name}}×{{key.amount}}</span>
								<span v-if="!item.reward.items">无</span>
								<span>金钱:{{item.reward.gold}}</span>
							</div>

						</li>
					</ul>
				</section>
				<section class="sideQuests">
					<h4 class="tac">支线任务</h4>
					<ul>
						<li :key="item.mid" v-for="item in sideQuestsList" v-if="ifShow(item.level,item.ifDone,item.acceptable)">
							<div class="top">
								<div class="ib">
									<span class="title">{{item.name}}</span>
									<span class="level">等级:{{item.level}}</span>
									<p>{{item.des}}</p>
								</div>
								<button class="notyet" @click="take(item)">接受</button>
							</div>
							<div class="reward">
								<span>经验:{{item.reward.exp}}</span>
								<span class="items">物品:</span>
								<span :key="key.name" v-for="key in item.reward.items">{{key.name}}×{{key.amount}}</span>
								<span v-if="!item.reward.items">无</span>
								<span>金钱:{{item.reward.gold}}</span>
							</div>
						</li>
					</ul>
				</section>
				<section class="events">
					<h4 class="tac">事件</h4>
					<ul>
						<li :key="item.mid" v-for="item in eventsList" v-if="ifShow(item.level,item.ifDone,item.acceptable)">
							<div class="top">
								<div class="ib">
									<span class="title">{{item.name}}</span>
									<span class="level">等级:{{item.level}}</span>
									<p>{{item.des}}</p>
								</div>
								<button class="notyet" @click="take(item)">接受</button>
							</div>
							<div class="reward">
								<span>经验:{{item.reward.exp}}</span>
								<span class="items">物品:</span>
								<span :key="key.name" v-for="key in item.reward.items">{{key.name}}×{{key.amount}}</span>
								<span v-if="!item.reward.items">无</span>
								<span>金钱:{{item.reward.gold}}</span>
							</div>
						</li>
					</ul>
				</section>
			</section>
			<Battle mode="mission" :enemy="enemy" :reward="reward" v-if="show.battle" @closeBattle="close" @done="done"></Battle>
			<Interlocution :questions="questions" :reward="reward" v-if="show.interlocution" @closeInterlocution="close" @done="done"></Interlocution>
		</transition>
	</section>
</template>

<script>
	import Battle from '../battle/Battle';
	import Interlocution from '../interlocution/Interlocution';

	export default {
		name: 'Mission',
		data() {
			return {
				show: {
					list: true,
					battle: false,
					interlocution: false
				},
				mission: null,
				enemy: null,
				questions: null,
				reward: null
			}
		},
		methods: {
			//等级不够的和完成的任务都不会显示
			ifShow(missionLevel, ifDone, acceptable) {
				if (missionLevel <= this.playerLevel && !ifDone && acceptable) {
					return true;
				} else {
					return false;
				}
			},
			take(item) {
				this.mission = item;
				this.reward = item.reward;
				this.show.list = false;
				if (item.execute === 'battle') {
					this.enemy = this.$store.state[item.enemy.namespace];
					this.show.battle = true;
				} else {
					this.questions = item.questions;
					this.show.interlocution = true;
				}
			},
			close(e) {
				this.show.list = true;
				this.show[e.type] = false;
			},
			//完成任务
			done() {
				this.$store.commit('mission/done', {
					type: this.mission.type,
					mid: this.mission.mid
				});
				this.$store.commit('mission/trigger', {
					type: this.mission.type,
					mid: this.mission.mid
				});
			}
		},
		computed: {
			mainQuestsList() {
				return this.$store.state.mission.mainQuests;
			},
			sideQuestsList() {
				return this.$store.state.mission.sideQuests;
			},
			eventsList() {
				return this.$store.state.mission.events;
			},
			playerLevel() {
				return this.$store.state.player.baseAttributes.level.value;
			}
		},
		components: {
			Battle,
			Interlocution
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";
	.mission {
		padding-bottom: .7rem;
		h4 {
			padding: .12rem;
			border-bottom: 1px solid #e1e1e1;
			font-weight: bold;
			font-size: .16rem;
			color: #57606f;

		}
		li {
			padding: .12rem;
			border-bottom: 1px solid #e1e1e1;
			button {
				width: .8rem;
			}
			.ib {
				width: calc(~'100% - .9rem');
				width: -webkit-calc(~'100% - .9rem');
				padding-right: .08rem;
			}
			.title {
				margin-right: .15rem;
				font-weight: bold;
			}
			.level {
				color: #70a1ff;
			}
			.reward {
				color: #ff7f50;
				margin-top: .1rem;
				span {
					margin-right: .1rem;
					&.items {
						margin-right: 0;
					}
				}
			}
			p {
				margin-top: .1rem;
				line-height: 1.5;
			}
		}
	}
</style>