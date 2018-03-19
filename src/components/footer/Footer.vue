<template>
	<footer class="footer">
		<ul>
			<li :key="item.title" v-for="item in footerData">
				<button :disabled="item.disabled" :class="{active:item.isActive}" @click="changeClass(item)">
					<i :class="item.fontClass"></i>
					<span>{{item.title}}</span>
				</button>
			</li>
		</ul>
	</footer>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.footer {
		position: fixed;
		width: 100vw;
		bottom: 0;
		left: 0;
		background: #f2f2f2;
		ul {
			display: flex;
			li {
				.transition;
				text-align: center;
				padding: .12rem 0;
				flex-grow: 1;
				cursor: pointer;
				button {
					display: block;
					border: none;
					width: 100%;
					height: auto;
					&.active {
						color: #ff6b81;
					}
				}
				i,
				span {
					display: block;
					margin: auto;
				}
				i {
					font-size: .2rem;
				}
				span {
					margin-top: .08rem;
				}
			}
		}
	}
</style>

<script>
	export default {
		name: 'Footer',
		data() {
			return {
				footerData: [{
					isActive: false,
					title: '任务',
					fontClass: 'iconfont icon-mission',
					show: 'mission',
					disabled: false
				}, {
					isActive: false,
					title: '修炼场',
					fontClass: 'iconfont icon-practice',
					show: 'practice',
					disabled: false
				}, {
					isActive: false,
					title: '技能',
					fontClass: 'iconfont icon-skill',
					show: 'skill',
					disabled: false
				}, {
					isActive: false,
					title: '背包',
					fontClass: 'iconfont icon-backpack',
					show: 'backpack',
					disabled: false
				}, {
					isActive: true,
					title: '个人',
					fontClass: 'iconfont icon-my',
					show: 'my',
					disabled: false
				}]
			}
		},
		methods: {
			changeClass: function (item) {
				this.footerData.forEach(e => {
					e.isActive = false;
				});
				item.isActive = true;
				//显示页面
				this.$store.commit('global/show', {
					property: item.show
				})
			}
		},
		//在战斗时限制能够载入的页面
		computed: {
			ifBattle: function () {
				return this.$store.state.global.battle;
			}
		},
		watch: {
			ifBattle: function () {
				this.footerData[0].disabled = !this.footerData[0].disabled
				this.footerData[2].disabled = !this.footerData[2].disabled
				this.footerData[3].disabled = !this.footerData[3].disabled
			}
		}
	}
</script>