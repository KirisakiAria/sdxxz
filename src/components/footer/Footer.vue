<template>
	<footer class="footer">
		<ul>
			<li :class="{active:item.isActive}" v-for="item in footerDate" @click="changeClass(item)"> <i :class="item.fontClass"></i>
				<span>{{item.title}}</span>
			</li>
		</ul>
	</footer>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import '../../less/style';

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
				flex-grow:1;

				&.active {
					color: #ff6b81;
				}

				i,span {
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
				footerDate: [{
					isActive: false,
					title: '任务',
					fontClass: 'iconfont icon-mission',
					show:'mission'
				}, {
					isActive: true,
					title: '修炼场',
					fontClass: 'iconfont icon-practice',
					show:'practice'
				}, {
					isActive: false,
					title: '技能',
					fontClass: 'iconfont icon-skill',
					show:'skill'
				}, {
					isActive: false,
					title: '背包',
					fontClass: 'iconfont icon-backpack',
					show:'backpack'
				}, {
					isActive: false,
					title: '个人',
					fontClass: 'iconfont icon-my',
					show:'my'
				}]
			}
		},
		methods: {
			changeClass: function(item) {
				this.footerDate.forEach(e => {
					e.isActive = false;
				});
				item.isActive = true;
				//显示页面
				this.$store.commit('global/show',{
					property:item.show
				})
			}
		}
	}
</script>