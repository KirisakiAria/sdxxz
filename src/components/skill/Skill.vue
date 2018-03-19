<template>
	<section class="skill mainSection">
		<section class="tab">
			<button :class="{active:show.damage}" @click="changeTab('damage')">伤害技能</button>
			<button :class="{active:show.cure}" @click="changeTab('cure')">治疗技能</button>
			<button :class="{active:show.buff}" @click="changeTab('buff')">增/减益技能</button>
			<button :class="{active:show.passive}" @click="changeTab('passive')">被动技能</button>
		</section>
		<section class="content">
			<p class="tips">tips：深色背景为尚未学习的技能，点击学习</p>
			<transition name="slide2-fade" mode="out-in">
				<div key="damageSkillsList" v-if="show.damage" class="damageSkillsList">
					<ul>
						<li :key="item.name" :class="{no:!item.learned}" v-for="item in damageSkillsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">伤害量：{{item.effect.damage.value}}</span>
								<span class="i2">{{item.consumeType.name}}消耗：{{item.consume}}</span>
								<span class="i3">技能点：{{item.point}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="cureSkillsList" v-if="show.cure" class="cureSkillsList">
					<ul>
						<li :key="item.name" :class="{no:!item.learned}" v-for="item in cureSkillsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">治疗量：{{item.effect.cure.value}}</span>
								<span class="i2">{{item.consumeType.name}}消耗：{{item.consume}}</span>
								<span class="i3">技能点：{{item.point}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="buffSkillsList" v-if="show.buff" class="buffSkillsList">
					<ul>
						<li :key="item.name" :class="{no:!item.learned}" v-for="item in buffSkillsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i2">{{item.consumeType.name}}消耗：{{item.consume}}</span>
								<span class="i1">持续回合数：{{item.effect.round - 1}}</span>
								<span class="i3">技能点：{{item.point}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="passiveSkillsList" v-if="show.passive" class="passiveSkillsList">
					<ul>
						<li :key="item.name" :class="{no:!item.learned}" v-for="item in passiveSkillsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
			</transition>
			<transition name="scale-fade">
				<Tips :content="tips.data" v-show="tips.show" @closeTips="closeTips()"></Tips>
			</transition>
		</section>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.skill {

		padding-bottom: .7rem;

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
			li {
				margin-bottom: .1rem;
				padding: .12rem;
				border-top: 1px solid #a5b1c2;
				border-bottom: 1px solid #a5b1c2;

				.name {
					display: block;
					margin-bottom: .1rem;
					font-weight: bold;
				}
				.i1 {
					color: #ff6b81;
				}
				.i2 {
					color: #1e90ff;
				}
				.i3 {
					color: #487eb0;
				}
				&.no {
					.cw;
					background: #747d8c;
					border-color: #747d8c;
					.i1,
					.i2,
					.i3 {
						color: #fff;
					}
				}
				.top {
					margin-bottom: .1rem;
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
</style>

<script>
	import Tips from '../tips/Tips';

	export default {
		name: 'Skill',
		data() {
			return {
				show: {
					damage: true,
					cure: false,
					buff: false,
					passive: false,
				},
				tips: {
					data: '',
					show: false
				}
			}
		},
		methods: {
			changeTab: function (tab) {
				Object.keys(this.show).forEach(e => {
					this.show[e] = false;
				});
				this.show[tab] = true;
			},
			getSkillsArr: function (origin) {
				let arr = [];
				let skills = this.$store.state.playerSkills[origin];
				Object.values(skills).forEach(e => {
					arr.push(e);
				});
				return arr;
			},
			learn: function (item) {
				if (item.learned) {
					this.openTips('该技能已经学习');
				} else {
					let level = this.player.baseAttributes.level.value;
					if (level < item.level) {
						this.openTips('等级不够，无法学习');
					} else {
						let point = this.player.extraAttributes.sp.value;
						if (point < item.point) {
							this.openTips('技能点不足，无法学习');
						} else {
							item.learned = true;
							this.$store.commit('player/changeExtraAttributesOrElementsValue', {
								type: 'extraAttributes',
								propety: 'sp',
								value: point - item.point
							});
							this.openTips(`${item.name}学习成功`);
						}
					}
				}
			},
			openTips: function (content) {
				this.tips.show = true;
				this.tips.data = content;
			},
			closeTips: function () {
				this.tips.show = false;
			}
		},
		computed: {
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
			},
			player: function () {
				return this.$store.state.player;
			}
		},
		components: {
			Tips
		},
	}
</script>