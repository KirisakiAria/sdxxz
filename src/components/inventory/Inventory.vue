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
				<div key="cureItemsList" v-if="show.cure" class="cureItemsList">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in cureItemsList">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">治疗量：{{item.effect.cure.value}}</span>
								<span class="i2">数量：{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>道具介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="concealedItemsList" v-if="show.concealed" class="concealedItemsList">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in concealedItemsList">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">伤害量：{{item.effect.damage.value}}</span>
								<span class="i2">数量：{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>道具介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="buffItemsList" v-if="show.buff" class="buffItemsList">
					<ul>
						<li :key="item.iid" v-if="item.amount" v-for="item in buffItemsList">
							<div class="top">
								<span class="name">{{item.name}}</span>
								<span class="i1">持续回合数：{{item.effect.round}}</span>
								<span class="i2">数量：{{item.amount}}</span>
							</div>
							<div class="bottom">
								<p>道具介绍：{{item.desc}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div key="equipmentsItemsList" v-if="show.equipments" class="equipmentsItemsList">
					<div :key="item.desc" class="item" v-for="item in equipmentsItemsList">
						<div class="head">{{item.desc}}</div>
						<div class="content">
							<ul>
								<li :key="key.iid" v-if="key.own" v-for="key in item.list" @click="equip(item)" :class="{no:playerLevel<key.level?true:false}">
									<div class="top">
										<span class="name">{{key.name}}</span>
										<span class="i2">等级需求：{{key.level}}</span>
									</div>
									<div class="bottom">
										<p>装备介绍：{{key.desc}}</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
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
</style>

<script>
	import Tips from '../tips/Tips';

	export default {
		name: 'Inventory',
		data() {
			return {
				show: {
					cure: false,
					concealed: true,
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
			},
			equip: function () {

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
			},
			playerLevel: function () {
				return this.$store.state.player.baseAttributes.level.value;
			}
		},
		components: {
			Tips
		}
	}
</script>