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
										<span>等级:{{key.baseAttributes.level.value}}</span>
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
			<Battle mode="practice" :enemy="enemy" v-if="show.battle" @closeBattle="closeBattle"></Battle>
		</transition>
	</section>
</template>

<script>
	import Battle from '../battle/Battle';

	export default {
		name: 'Practice',
		data() {
			return {
				show: {
					list: true,
					battle: false
				},
				enemy: null
			}
		},
		methods: {
			pushArr(target) {
				let [arr, state] = [
					[], this.$store.state
				];
				Array.from(arguments).forEach(e => {
					arr.push(state[e]);
				});
				return arr;
			},
			battle(enemy) {
				this.enemy = enemy;
				this.show.list = false;
				this.show.battle = true;
			},
			closeBattle() {
				this.show.list = true;
				this.show.battle = false;
			}
		},
		computed: {
			/*获取敌人列表*/
			level00_05EnemyList() {
				return this.pushArr('groupC');
			},
			level06_10EnemyList() {
				//return this.pushArr('groupS', 'groupSS');
			},
			level11_15EnemyList() {
				//return this.pushArr('groupS', 'groupSS'); 
			},
			level16_20EnemyList() {
				//return this.pushArr('groupS', 'groupSS');
			},
			enemyList() {
				return [{
					id: 0,
					level: '0~5级',
					list: this.level00_05EnemyList
				}, {
					id: 1,
					level: '6~10级',
					list: this.level06_10EnemyList
				}, {
					id: 2,
					level: '11~15级',
					list: this.level11_15EnemyList
				}, {
					id: 3,
					level: '16~20级',
					list: this.level16_20EnemyList
				}]
			}
		},
		components: {
			Battle
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.practice {
		padding-bottom: 0;
		.content {
			li {
				margin-bottom: 0;
				.ib {
					width: calc(~'100% - 1.08rem');
					padding-right: .08rem;
				}
			}
		}
	}
</style>