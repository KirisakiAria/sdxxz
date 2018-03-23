<template>
	<section class="inventory mainSection">
		<section class="tab">
			<button :class="{active:show.cure}" @click="changeTab('cure')">治愈类</button>
			<button :class="{active:show.concealed}" @click="changeTab('concealed')">暗器类</button>
			<button :class="{active:show.buff}" @click="changeTab('buff')">效果类</button>
			<button :class="{active:show.equipments}" @click="changeTab('equipments')">装备类</button>
		</section>
		<section class="content">
			<transition name="slide-fade" mode="out-in">
				<div key="cureItemsList" v-if="show.cure">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in cureItemsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">治疗量：{{item.effect.cure.value}}</span>
								<span class="i2">数量：{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="concealedItemsList" v-if="show.concealed">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in concealedItemsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">治疗量：{{item.effect.cure.value}}</span>
								<span class="i2">数量：{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="buffItemsList" v-if="show.buff">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in buffItemsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">治疗量：{{item.effect.cure.value}}</span>
								<span class="i2">数量：{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="equipmentsItemList" v-if="show.equipments">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in equipmentsItemsList" @click="learn(item)">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">治疗量：{{item.effect.cure.value}}</span>
								<span class="i2">数量：{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>技能介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
			</transition>
			<transition name="scale-fade">
				<Tips :content="tips.data" v-show="tips.show" @closeTips="closeTips"></Tips>
			</transition>
		</section>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.inventory {

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
		name: 'Inventory',
		data() {
			return {
				show: {
					cure: true,
					concealed: false,
					buff: false,
					equipments: false,
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
			getItemsArr: function (origin) {
				return this.$store.state.items[origin];
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
			cureItemsList: function () {
				return this.getItemsArr('cureItems');
			},
			concealedItemsList: function () {
				return this.getItemsArr('concealedItems');
			},
			buffItemsList: function () {
				return this.getItemsArr('buffItems');
			},
			equipmentsItemsList: function () {
				return this.getItemsArr('equipmentsItems');
			}
		},
		components: {
			Tips
		},
	}
</script>