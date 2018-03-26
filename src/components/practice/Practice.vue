<template>
	<section class="practice mainSection">
		<transition name="slide-fade" mode="out-in">
			<section v-if="show.list" class="list">
				<div :key="item.id" class="item" v-for='item in enemyList'>
					<div class="head">{{item.level}}</div>
					<div class="content">
						<ul>
							<li :key="key.eid" v-for="key in item.list">
								<div class="ib">
									<div class="top">
										<span>{{key.baseAttributes.name.value}}</span>
										<span>等级：{{key.baseAttributes.level.value}}</span>
									</div>
									<div class="bottom">
										<p>{{key.baseAttributes.description.value}}</p>
									</div>
								</div>
								<button @click="battle(key)">挑战</button>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<!-- 传入点击挑战按钮对应的敌人的数据 -->
			<Battle :enemy="enemy" mode="practice" v-if="show.battle" @closeBattle="closeBattle"></Battle>
		</transition>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.practice {

		.head {
			padding: .15rem;

			background: #a5b1c2;

			.cw;
		}
		.list {
			padding-bottom: .7rem;
		}

		.content {
			li {
				padding: .15rem;

				border-bottom: 1px solid #a5b1c2;

				div.ib {
					width: calc(~'100% - 1.05rem');
					padding-right: .1rem;

					.top {
						margin-bottom: .15rem;
						span {
							margin-right: .15rem;
						}
					}

					p {
						line-height: 1.5;

						text-align: justify;
					}
				}
				button {
					.ib;
					.br(8px);
				}
			}
		}
	}
</style>

<script>
	import Battle from '../battle/Battle';

	export default {
		name: 'Practice',
		data() {
			return {
				show: {
					list: false,
					battle: true
				},
				enemy: null
			}
		},
		methods: {
			pushArr: function (target) {
				let [arr, state] = [
					[], this.$store.state
				];
				Array.from(arguments).forEach(e => {
					arr.push(state[e]);
				});
				return arr;
			},
			battle: function (enemy) {
				this.enemy = enemy;
				this.show.list = false;
				this.show.battle = true;
			},
			closeBattle: function () {
				this.show.list = true;
				this.show.battle = false;
				this.enemy = null;
			}
		},
		computed: {
			/*获取敌人列表*/
			level0_5EnemyList: function () {
				return this.pushArr('groupC', 'groupB', 'groupA');
			},
			level6_10EnemyList: function () {
				return this.pushArr('groupS', 'groupSS');
			},
			enemyList: function () {
				return [{
					id: 1,
					level: '0~5级',
					list: this.level0_5EnemyList
				}, {
					id: 2,
					level: '6~10级',
					list: this.level6_10EnemyList
				}]
			}
		},
		components: {
			Battle
		}
	}
</script>