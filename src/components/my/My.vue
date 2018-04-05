<template>
	<section class="my mainSection">
		<section class="top cw">
			<div class="avatar">
				<img :src="img.avatar">
			</div>
			<h4 class="tac">{{baseAttributes[0].value}}</h4>
			<h6 class="tac">称号:{{baseAttributes[1].value}}</h6>
			<button class="openShop" @click="toggleShop()">商店</button>
			<button class="save" @click="save()">存档</button>
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
					<li :key="item.desc" v-for="item in extraAttributes">{{item.desc}}:{{item.value}}</li>
				</ul>
			</div>
			<div class="equipments">
				<ul>
					<li :key="item.desc" v-for="item in equipments">{{item.type}}:{{item.which}}</li>
				</ul>
			</div>
			<div class="elements">
				<ul>
					<li :key="item.desc" v-for="item in elements">{{item.desc}}:{{item.value}}</li>
				</ul>
			</div>
			<div class="buff">
				<span>状态:</span>
			</div>
		</section>
		<transition name="scale-fade" mode="out-in">
			<Shop v-show="show.shop" @closeShop="toggleShop" class="shop"></Shop>
		</transition>
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

			button {
				position: absolute;
				top: .15rem;
				width: .7rem;
				height: .25rem;
				font-size: .1rem;
				.br;
				border: none;
				background: #00b894;
				&.save {
					right: .15rem;
				}
				&.openShop {
					left: 0.15rem;
					background: #0984e3;
				}
			}
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

		.shop {
			position: fixed;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			background: #fff;
			z-index: 1000;
		}
	}
</style>

<script>
	import Shop from '../shop/Shop'
	import avatarImg from '../../assets/images/avatar.jpg'
	import ProgressBar from '../progressbar/ProgressBar'
	import FileSaver from 'file-saver'

	export default {
		name: 'My',
		data() {
			return {
				img: {
					avatar: avatarImg
				},
				show: {
					shop: false
				}
			}
		},
		methods: {
			getPlayerArr(origin) {
				let [arr, attribute] = [
					[], this.$store.state.player[origin]
				];
				Object.values(attribute).forEach(e => {
					arr.push(e);
				});
				return arr;
			},
			save() {
				let profile = {
					playerData: this.$store.state.player,
					skillsData: this.$store.state.playerSkills,
					missionData: this.$store.state.mission,
					itemsData: this.$store.state.items
				}
				let blob = new Blob([JSON.stringify(profile)], {
					type: ""
				});
				FileSaver.saveAs(blob, "save.json");
			},
			toggleShop() {
				this.show.shop = !this.show.shop;
			}
		},
		computed: {
			baseAttributes() {
				return this.getPlayerArr('baseAttributes');
			},
			extraAttributes() {
				return this.getPlayerArr('extraAttributes');
			},
			equipmentsList() {
				return this.$store.state.items.equipmentsItems;
			},
			equipments() {
				let arr = [];
				this.equipmentsList.forEach(e => {
					let data = {
						type: e.desc,
						which: ''
					};
					e.list.forEach(k => {
						if (k.equip) {
							data.which = k.name;
						}
					});
					arr.push(data);
				});
				return arr;
			},
			elements() {
				return this.getPlayerArr('elements');
			},
			currentLevelExp() {
				let prevlevel = this.baseAttributes[2]['value'] - 1;
				return prevlevel * (prevlevel + 5) * 10;
			},
			start() {
				return this.baseAttributes[3]['value'] - this.currentLevelExp;
			},
			end() {
				return this.$store.getters['player/levelUpExp'] - this.currentLevelExp;
			}
		},
		components: {
			ProgressBar,
			Shop
		}
	}
</script>