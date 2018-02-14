<template>
	<section class="battle mainSection">
		<section class="control section">
			<h5 class="tac">战斗信息</h5>
			<p>傻吊村小傻吊对你发动了物理攻击，生命损失20点</p>
		</section>
		<section class="enemy section">
			<div v-if="round.enemy" class="round"> <i class="iconfont icon-round"></i>
			</div>
			<h4 class="tac">
				<span>敌方</span>
				{{enemy.baseAttributes.name.value}}
			</h4>
			<div class="content">
				<div class="attr">
					<div class="con card tac">
						<div class="level">
							<span>等级</span>
							<span>{{enemy.baseAttributes.level.value}}</span>
						</div>
						<div class="hp">
							<span>生命</span>
							<span>{{enemyPanel.hp}}</span>
						</div>
						<div class="mp">
							<span>魔法</span>
							<span>{{enemyPanel.mp}}</span>
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
			<div v-if="round.player" class="round"> <i class="iconfont icon-round"></i>
			</div>
			<h4 class="tac">
				<span>玩家</span>
				{{player.baseAttributes.name.value}}
			</h4>
			<div class="content">
				<div class="attr">
					<div class="con card tac">
						<div class="level">
							<span>等级</span>
							<span>{{player.baseAttributes.level.value}}</span>
						</div>
						<div class="hp">
							<span>生命</span>
							<span>{{playerPanel.hp}}</span>
						</div>
						<div class="mp">
							<span>魔法</span>
							<span>{{playerPanel.mp}}</span>
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
						<button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="attack(1)">攻击</button>
						<button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="skills(1)">技能</button>
						<button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="items(1)">道具</button>
						<button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="suicide(1)">自杀</button>
						<button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="escape(1)">逃跑</button>
						<button :class="{disabled:round.enemy}" :disabled="round.enemy" class="btn" @click="auto(1)">自动</button>
					</div>
				</div>
			</div>
		</section>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import '../../less/style';

	.battle {
		padding-bottom: .71rem;
		.control {
			font-size: .12rem;
			padding: .1rem;
			h5 {
				margin-bottom: .1rem;
				font-size: .16rem;
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
				top: .1rem;
				right: .05rem;
				i {
					font-size: .2rem;
					color: #2ed573;
				}	
			}
			h4 {	
				padding: .1rem;
				span {
					font-size: .12rem;
				}
			}
			h6 {
				padding: .1rem;
				font-weight: bold;
			}
			.con {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				padding:.1rem;
				padding-top: 0;
				button {
					margin: .1rem 0;
					&.disabled{
						.cw;
						background: #ccc;
					}
				}		
			}
			.card div{
				position: relative;
			    width: 28%;
			    padding: .15rem;
			    background: #70a1ff;
			    border-radius: 15px;
			    color: #fff;
			    span {
			    	display: block;
			    	line-height: 1.5;
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
					num: 1,
					enemy: false,
					player: true,
				}
			}
		},
		methods: {
			//判断谁先发动攻击
			battleStart: function() {
				let [pSpd, mSpd] = [this.getValue('player', 'extraAttributes', 'spd'), this.getValue('enemy', 'extraAttributes', 'spd')];
				if (mSpd > pSpd) {
					this.round.player = !this.round.player;
					this.round.enemy = !this.round.enemy;
				}
			},
			//回合变化
			roundCount: function() {
				this.round.num++;
				this.round.enemy = !this.round.enemy;
				this.round.player = !this.round.player;
			},
			attack: function(flag) {
				let [atkCache, defCache, panel] = [0, 0, null];
				if (flag) {
					atkCache = this.getValue('player', 'extraAttributes', 'atk');
					defCache = this.getValue('player', 'extraAttributes', 'def');
					panel = this.enemyPanel;
				} else {
					atkCache = this.getValue('enemy', 'extraAttributes', 'atk');
					defCache = this.getValue('enemy', 'extraAttributes', 'def');
					panel = this.playerPanel;
				}
				let atkValue = parseInt(this.randomNum(atkCache * 0.9, atkCache * 1.1));
				let defValue = parseInt(defCache * .35);
				let losingHp = atkValue - defValue;
				if (panel.hp - losingHp >= 0) {
					panel.hp -= losingHp;
				} else {
					panel.hp = 0;
				}
				this.roundCount();
			},
			skills: function() {
				this.roundCount();
			},
			items: function() {
				this.roundCount();
			},
			suicide: function() {
				this.roundCount();
			},
			escape: function() {
				this.roundCount();
			},
			auto: function() {
				this.roundCount();
			},
			getValue: function(target, type, property) {
				let targetCache = this[target];
				let typeCache = targetCache[type];
				let propertyCache = typeCache[property];
				return propertyCache.value;
			},
			enemyAction: function() {
				let that = this;
				setTimeout(function() {
					that.attack(0);
				}, 1000);
			},
			randomNum: function(minNum, maxNum) {
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
			player: function() {
				return this.$store.state.player;
			},
			enemy: function() {
				return this.$store.state.enemy.villageC
			},
			playerPanel: function() {
				return {
					hp: this.getValue('player', 'baseAttributes', 'hp'),
					mp: this.getValue('player', 'baseAttributes', 'mp')
				}
			},
			enemyPanel: function() {
				return {
					hp: this.getValue('enemy', 'baseAttributes', 'hp'),
					mp: this.getValue('enemy', 'baseAttributes', 'mp')
				}
			}
		},
		watch: {
			//监听回合
			round: {
				handler(newValue, oldValue) {
					let [pHp, eHp] = [this.playerPanel.hp, this.enemyPanel.hp];
					if (!pHp) {
						alert('失败！');
						this.$emit('close');
					} else if (!eHp) {
						alert('获胜');
						//经验获取、升级
						let [ownedExp, gotExp, levelUpExp] = [this.player.baseAttributes.exp.value, this.enemy.baseAttributes.exp.value, this.player.levelUpExp];

						this.$store.commit('player/changeExp', {
							value: ownedExp + gotExp
						});
						let [nowExp, upExp] = [this.player.baseAttributes.exp.value, 0];
						levelUpExp.forEach(e => {
							if (nowExp > e) {
								upExp = e;
							}
						});
						let level = levelUpExp.findIndex((value) => {
							return value == upExp;
						});
						this.$store.commit('player/changeLevel', {
							value: level
						});
						this.$emit('close');
					}　
					else if (newValue.enemy) {
						this.enemyAction();
					}　　　　
				},
				deep: true
			}
		},
		mounted() {
			this.battleStart();
		}
	}
</script>