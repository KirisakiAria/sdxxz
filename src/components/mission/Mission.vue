<template>
	<section class="mission mainSection">
		<transition name="slide-fade" mode="out-in">
			<section v-if="show.list" class="list">
				<section class="mainQuests">
					<h4 class="tac">主线任务</h4>
					<ul>
						<li :key="item.mid" v-for="item in mainQuestsList" v-if="ifShow(item.level,item.ifDone)">
							<div class="ib">
								<span class="title">{{item.name}}</span>
								<span class="level">等级：{{item.level}}</span>
								<p>{{item.des}}</p>
								<p class="reward">任务奖励：经验：{{item.reward.exp}} 物品：{{item.reward.items?item.reward.items:'无'}}</p>
							</div>
							<button class="notyet" @click="take(item)">接受</button>
						</li>
					</ul>
				</section>
				<section class="sideQuests">
					<h4 class="tac">支线任务</h4>
				</section>
			</section>
			<Battle :enemy="enemy" mode="mission" :reward="reward" :times="times" v-if="show.battle" @closeBattle="closeBattle" @done="ifDone"></Battle>
		</transition>
	</section>
</template>

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
			}
			.title {
				margin-right: .15rem;
				font-weight: bold;
			}
			.level {
				color: #70a1ff;
			}
			.reward {
				color: #5352ed;
			}
			p {
				margin-top: .1rem;
				line-height: 1.5;
			}
		}
	}
</style>

<script>
	import Battle from '../battle/Battle';

	export default {
		name: 'Mission',
		data() {
			return {
				show: {
					list: true,
					battle: false
				},
				mission: null,
				enemy: null,
				reward: null,
				times: 1
			}
		},
		methods: {
			//等级不够的和完成的任务都不会显示
			ifShow: function (missionLevel, ifDone) {
				if (missionLevel <= this.playerLevel) {
					if (!ifDone) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			take: function (item) {
				this.mission = item;
				this.reward = item.reward;
				this.enemy = this.$store.state[item.enemy.namespace];
				this.times = item.enemy.times;
				this.show.list = false;
				this.show.battle = true;
			},
			closeBattle: function () {
				this.show.list = true;
				this.show.battle = false;
				this.enemy = null;
			},
			//完成任务
			ifDone: function () {
				this.$store.commit('mission/done', {
					type: this.mission.type,
					mid: this.mission.mid
				});
				this.mission = null;
			}
		},
		computed: {
			mainQuestsList: function () {
				return this.$store.state.mission.mainQuests;
			},
			sideQuestsList: function () {
				return this.$store.state.mission.sideQuests;
			},
			playerLevel: function () {
				return this.$store.state.player.baseAttributes.level.value;
			}
		},
		components: {
			Battle
		}
	}
</script>