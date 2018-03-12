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
				<div :key="damage" v-if="show.damage" class="damageSkillsList">
					<ul>
						<li :class="{no:!item.learned}" v-for="item in damageSkillsList">
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
				<div :key="cure" v-if="show.cure" class="cureSkillsList">
					<ul>
						<li :class="{no:!item.learned}" v-for="item in cureSkillsList">
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
				<div :key="buff" v-if="show.buff" class="buffSkillsList">
					<ul>
						<li :class="{no:!item.learned}" v-for="item in buffSkillsList">
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
				<div :key="passive" v-if="show.passive" class="passiveSkillsList">
					<ul>
						<li :class="{no:!item.learned}" v-for="item in passiveSkillsList">
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
		</section>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import '../../less/style';

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

				&.no {
					.cw;
					background: #747d8c;
					border-color: #747d8c;
				}

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
</style>

<script>
	export default {
		name: 'Skill',
		data() {
			return {
				show: {
					damage: true,
					cure: false,
					buff: false,
					passive: false
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
			}
		}
	}
</script>