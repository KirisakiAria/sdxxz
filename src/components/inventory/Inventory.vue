<template>
	<section class="inventory mainSection">
		<section class="tab">
			<button :class="{active:show.equipments}" @click="changeTab('equipments')">装备类</button>
			<button :class="{active:show.cure}" @click="changeTab('cure')">治愈类</button>
			<button :class="{active:show.concealed}" @click="changeTab('concealed')">暗器类</button>
			<button :class="{active:show.buff}" @click="changeTab('buff')">效果类</button>
		</section>
		<section class="content">
			<p class="tips">tips:深色背景为等级需求不够的装备，无法使用</p>
			<transition name="slide-fade" mode="out-in">
				<div key="equipmentsItemsList" v-if="show.equipments" class="equipmentsItemsList">
					<div :key="item.desc" class="item" v-for="item in equipmentsItemsList">
						<div class="head" @click="expand(item)">{{item.desc}}</div>
						<div class="content" v-show="item.eid===index">
							<ul>
								<li :key="key.iid" v-if="key.own" v-for="key in item.list" @click="equip(item,key)" :class="{no:playerLevel<key.level?true:false}">
									<transition name="scale-fade">
										<div class="equip" v-if="key.equip">
											<i class="iconfont icon-round"></i>
										</div>
									</transition>
									<div class="top">
										<span class="name">{{key.name}}</span>
										<span class="i2">等级需求:{{key.level}}</span>
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
						<li :key="item.iid" v-if="item.amount" v-for="item in cureItemsList">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">治疗量:{{item.effect.cure.value}}</span>
								<span class="i2">数量:{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>道具介绍:{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="concealedItemsList" v-if="show.concealed" class="concealedItemsList">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in concealedItemsList">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">伤害量:{{item.effect.damage.value}}</span>
								<span class="i2">数量:{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>道具介绍:{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="buffItemsList" v-if="show.buff" class="buffItemsList">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in buffItemsList">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">持续回合数:{{item.effect.round}}</span>
								<span class="i2">数量:{{item.amount}}</span>
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
	</section>
</template>

<script>
	import Tips from '../tips/Tips';

	export default {
		name: 'Inventory',
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
			equip(item, key) {
				if (this.playerLevel < key.level) {
					this.openTips('等级不足，无法装备');
				} else {
					this.$store.commit('items/equip', {
						eid: item.eid,
						iid: key.iid
					});
					this.calculateBuff(item, key);
				}
			},
			calculateBuff(item, key) {
				let [vm, buff, list, originalValue, pType] = [this, key.effect
					.buff, this.playerPermanentlyBuffList, [], item.itemType,
				];
				this.$store.commit('player/clearPermanentlyBuff', {
					pType,
				});
				buff.forEach(e => {
					let value = 0;
					let [p1, p2] = [e.position[0], e.position[1]];
					value = this.$store.state.player[p1][p2]['value'];
					originalValue.push({
						position: e.position,
						value: value
					});
				});
				this.$store.commit('player/updatePermanentlyBuff', {
					pType,
					buff: {
						iid: key.iid,
						name: key.name,
						originalValue
					}
				});
				buff.forEach(e => {
					let [p1, p2] = [e.position[0], e.position[1]];
					let [changeValue, originValue] = [0, this.$store.state.player[p1][p2]['value']];
					if (e.valueType === 'percentage') {
						changeValue = Math.ceil(originValue * e.value);
					} else {
						changeValue = Math.ceil(originValue + e.value);
					}
					this.$store.commit('player/changeExtraAttributesOrElementsValue', {
						type: e.position[0],
						propety: e.position[1],
						value: changeValue
					});

				});
			},
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
			playerLevel() {
				return this.$store.state.player.baseAttributes.level.value;
			},
			playerPermanentlyBuffList() {
				return this.$store.state.player.permanentlyBuff;
			}
		},
		components: {
			Tips
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.inventory {
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
		}
	}
</style>