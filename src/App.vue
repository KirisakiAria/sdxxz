<template>
	<main class="main">
		<transition name="slide-fade" mode="out-in">
			<section v-if="show.main" class="menu mainSection">
				<h1>傻屌修仙传</h1>
				<ul>
					<li>
						<router-link to="/new">新的游戏</router-link>
					</li>
					<li>
						<router-link to="/load">读取存档</router-link>
					</li>
					<li>
						<router-link to="/setting">设置</router-link>
					</li>
				</ul>
			</section>
			<router-view></router-view>
		</transition>
	</main>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import './less/style';

	.menu
	{
		.col;

		ul {

			margin-top: .618rem;

			li {
				padding: .14rem;
				font-size: .16rem;
				margin: .18rem 0;
				.bor(#ccc);
				text-align: center;
			}
		}
	}
</style>

<script>
	export default {
		name: 'App',
		data() {
			return {
				show: {
					main: true
				}
			}
		},
		watch: {
			'$route': function(to, from) {
				if (to.path == '/') {
					this.show.main = true;
				} else {
					this.show.main = false;
				}
			}
		}
	}
</script>