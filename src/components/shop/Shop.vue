<template>
	<section class="shop mainSection">
		<section class="tab">
			<button :class="{active:show.equipments}" @click="changeTab('equipments')">装备类</button>
			<button :class="{active:show.cure}" @click="changeTab('cure')">治愈类</button>
			<button :class="{active:show.concealed}" @click="changeTab('concealed')">暗器类</button>
			<button :class="{active:show.buff}" @click="changeTab('buff')">效果类</button>
		</section>
		<section class="content">
			<p class="tips">现任商店老板：一旁冷笑</p>
			<transition name="slide-fade" mode="out-in">
				<div key="equipmentsItemsList" v-if="show.equipments" class="equipmentsItemsList">
					<div :key="item.desc" class="item" v-for="item in equipmentsItemsList">
						<div class="head" @click="expand(item)">{{item.desc}}</div>
						<div class="content" v-show="item.eid===index">
							<ul>
								<li :key="key.iid" v-if="key.ifSale&&!key.own" v-for="key in item.list" @click="buy(item,key)">
									<transition name="scale-fade">
										<div class="equip" v-if="key.equip">
											<i class="iconfont icon-round"></i>
										</div>
									</transition>
									<div class="top">
										<div class="ib left">
											<span class="name">{{key.name}}</span>
											<span class="i2">等级需求:{{key.level}}</span>
											<span class="i3">总价格:{{key.price}}</span>
										</div>
									</div>
									<div class="bottom">
										<p>装备介绍:{{key.desc}}</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div key="cureItemsList" v-if="show.cure" class="cureItemsList">
					<ul>
						<li :key="item.iid" v-if="item.ifSale" v-for="item in cureItemsList">
							<div class="top">
								<div class="ib left">
									<span class="name">{{item.name}}</span>
									<span class="i1">治疗量:{{item.effect.cure.value}}</span>
									<span class="i3">总价格:{{item.price*item.buyNum}}</span>
								</div>
								<div class="ib right">
									<label for="number">购买数量</label>
									<input id="number" type="number" :value='item.buyNum' @input="changeBuyNum(item.itemType,item.iid,$event)">
									<button @click="buy(item)">购买</button>
								</div>
							</div>
							<div class="bottom">
								<p>道具介绍:{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="concealedItemsList" v-if="show.concealed" class="concealedItemsList">
					<ul>
						<li :key="item.iid" v-if="item.ifSale" v-for="item in concealedItemsList">
							<div class="top">
								<div class="ib left">
									<span class="name">{{item.name}}</span>
									<span class="i1">伤害量:{{item.effect.damage.value}}</span>
									<span class="i3">总价格:{{item.price*item.buyNum}}</span>
								</div>
								<div class="ib right">
									<label for="number">购买数量</label>
									<input id="number" type="number" :value='item.buyNum' @input="changeBuyNum(item.itemType,item.iid,$event)">
									<button @click="buy(item)">购买</button>
								</div>
							</div>
							<div class="bottom">
								<p>道具介绍:{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="buffItemsList" v-if="show.buff" class="buffItemsList">
					<ul>
						<li :key="item.iid" v-if="item.ifSale" v-for="item in buffItemsList">
							<div class="top">
								<div class="ib left">
									<span class="name">{{item.name}}</span>
									<span class="i1">持续回合数:{{item.effect.round}}</span>
									<span class="i3">总价格:{{item.price*item.buyNum}}</span>
								</div>
								<div class="ib right">
									<label for="number">购买数量</label>
									<input id="number" type="number" :value='item.buyNum' @input="changeBuyNum(item.itemType,item.iid,$event)">
									<button @click="buy(item)">购买</button>
								</div>
							</div>
							<div class="bottom">
								<p>道具介绍:{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
			</transition>
			<transition name="scale-fade">
				<Tips :content="tips.data" v-show="tips.show" @closeTips="closeTips"></Tips>
			</transition>
		</section>
		<button class="return" @click="closeShop">返回</button>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.shop {
		li {
			position: relative;
			.equip {
				position: absolute;
				top: 0.1rem;
				right: 0.05rem;
				i {
					font-size: 0.2rem;
					color: #2ed573;
				}
			}
			.left {
				width: calc(~'100% - 0.99rem');
			}
			.right {
				width: 0.94rem;
				input {
					text-align: center;
					width: .3rem;
					vertical-align: middle;
					margin-top: .02rem;
					color: #f6b93b;
				}
				button {
					width: .8rem;
					height: .25rem;
					margin-top: .1rem;
					.br(8px)
				}
			}
		}
		.return {
			display: block;
			margin: auto;
			width: 100%;
			.bw;
			left: 0;
			bottom: 0;
			width: 100vw;
			position: fixed;
			border: none;
			background: #f1f1f1;
		}
	}
</style>

<script>
	import Tips from '../tips/Tips';

	export default {
		name: 'Shop',
		data() {
			return {
				show: {
					equipments: true,
					cure: false,
					concealed: false,
					buff: false,
				},
				tips: {
					data: '',
					show: false
				},
				index: 0
			}
		},
		methods: {
			changeTab(tab) {
				Object.keys(this.show).forEach(e => {
					this.show[e] = false;
				});
				this.show[tab] = true;
			},
			getItemsArr(origin) {
				return this.$store.state.items[origin];
			},
			openTips(content) {
				this.tips.show = true;
				this.tips.data = content;
			},
			closeTips() {
				this.tips.show = false;
			},
			expand(item) {
				this.index = item.eid;
			},
			changeBuyNum(type, iid, e) {
				let value = parseInt(e.target.value);
				if (Number.isNaN(value)) {
					value = 0;
				}
				this.$store.commit('items/changeBuyValue', {
					type,
					iid,
					value
				});
			},
			buy(item, key) {
				if (key) {
					this.number = 1;
					let price = key.price;
					if (price > this.gold) {
						this.openTips('金钱不足');
					} else {
						this.$store.commit('player/changeExtraAttributesOrElementsValue', {
							type: 'extraAttributes',
							propety: 'gold',
							value: this.gold - price
						});
						this.$store.commit('items/addEquipment', {
							eid: item.eid,
							iid: key.iid,
							amount: this.number
						});
						console.log(`购买${key.name} ${this.number}个,花费金钱${price}`);
					}
				} else {
					let price = item.price * item.buyNum;
					if (price > this.gold) {
						this.openTips('金钱不足');
					} else {
						this.$store.commit('player/changeExtraAttributesOrElementsValue', {
							type: 'extraAttributes',
							propety: 'gold',
							value: this.gold - price
						});
						this.$store.commit('items/addValue', {
							type: item.itemType,
							iid: item.iid,
							amount: item.buyNum
						});
						console.log(`购买${item.name} ${item.buyNum}个,花费金钱${price}`);
					}
				}
			},
			closeShop() {
				this.$emit('closeShop');
			}
		},
		computed: {
			cureItemsList() {
				return this.getItemsArr('cureItems');
			},
			concealedItemsList() {
				return this.getItemsArr('concealedItems');
			},
			buffItemsList() {
				return this.getItemsArr('buffItems');
			},
			equipmentsItemsList() {
				return this.getItemsArr('equipmentsItems');
			},
			gold() {
				return this.$store.state.player.extraAttributes.gold.value;
			}
		},
		components: {
			Tips
		}
	}
</script>