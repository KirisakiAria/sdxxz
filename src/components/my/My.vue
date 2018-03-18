<template>
	<section class="my mainSection">
		<section class="top cw">
			<div class="avatar">
				<img :src="img.avatar">
			</div>
			<h4 class="tac">{{baseAttributes[0].value}}</h4>
			<h6 class="tac">称号:{{baseAttributes[1].value}}</h6>
		</section>
		<section class="data">
			<div class="card">
				<div class="level">
					<span>等级</span>
					<span>{{baseAttributes[2].value}}</span>
				</div>
				<div class="hp">
					<span>生命</span>
					<span>{{baseAttributes[6].value}}/{{baseAttributes[8].value}}</span>
				</div>
				<div class="mp">
					<span>魔法</span>
					<span>{{baseAttributes[7].value}}/{{baseAttributes[9].value}}</span>
				</div>
			</div>
			<ProgressBar :value="start" :max="end"></ProgressBar>
			<div class="attributes">
				<ul>
					<li :key="items.decs" v-for="items in extraAttributes">{{items.decs}}：{{items.value}}</li>
				</ul>
			</div>
			<div class="equipments">
				<ul>
					<li :key="items.decs" v-for="items in equipments">{{items.decs}}：{{items.value}}</li>
				</ul>
			</div>
			<div class="elements">
				<ul>
					<li :key="items.decs" v-for="items in elements">{{items.decs}}：{{items.value}}</li>
				</ul>
			</div>
			<div class="buff">
				<span>状态：</span>
			</div>
		</section>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import '../../style/style';

	.my {
		padding-bottom: .7rem;

		.top {
			padding: .2rem 0;

			background-image: url(../../assets/images/bg.png);
			background-size: cover;
		}

		.avatar {
			width: .8rem;
			height: .8rem;
			margin: auto;
			overflow: hidden;

			background: #fff;

			.br(50%);
		}

		h4,
		h5 {
			margin-top: .15rem;
			margin-bottom: .15rem;
		}

		.card,
		.attributes,
		.equipments,
		.elements,
		.buff {
			display: flex;

			text-align: center;
			padding: .1rem .12rem;
		}

		.card {
			margin-top: .15rem;

			justify-content: space-around;

			div {
				position: relative;

				width: 28.5%;
				padding: .12rem;
				max-width: 175px;

				.br(15px);
				.cw;

				span {
					display: block;

					text-align: center;

					&:last-of-type {
						font-weight: bold;

						margin-top: .15rem;
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

		ul {
			width: 100%;
			box-shadow: 4px 4px 12px rgba(164, 176, 190, .4);
			display: flex;
			flex-wrap: wrap;

			.br;
			li {
				text-align: left;
				color: #747d8c;
				width: 50%;
				padding: .12rem;
				padding-left: .3rem;
			}
		}

		.buff {
			color: #ff6348;
			justify-content: center;
		}
	}
</style>

<script>
	import avatarImg from '../../assets/images/avatar.jpg'
	import bgImg from '../../assets/images/bg.png'
	import ProgressBar from '../progressbar/ProgressBar'

	export default {
		name: 'My',
		data() {
			return {
				img: {
					avatar: avatarImg,
					bg: bgImg
				}
			}
		},
		methods: {
			getPlayerArr: function (origin) {
				let [arr, attribute] = [
					[], this.$store.state.player[origin]
				];
				Object.values(attribute).forEach(e => {
					arr.push(e);
				});
				return arr;
			}
		},
		computed: {
			baseAttributes: function () {
				return this.getPlayerArr('baseAttributes');
			},
			extraAttributes: function () {
				return this.getPlayerArr('extraAttributes');
			},
			equipments: function () {
				return this.getPlayerArr('equipments');
			},
			elements: function () {
				return this.getPlayerArr('elements');
			},
			currentLevelExp: function () {
				let prevlevel = this.baseAttributes[2]['value'] - 1;
				return prevlevel * (prevlevel + 5) * 10;
			},
			start: function () {
				return this.baseAttributes[3]['value'] - this.currentLevelExp;
			},
			end: function () {
				return this.$store.getters['player/levelUpExp'] - this.currentLevelExp;
			}
		},
		components: {
			ProgressBar
		},
	}
</script>