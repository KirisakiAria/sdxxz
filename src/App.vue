<template>
	<main class="main">
		<transition name="slide-fade" mode="out-in">
			<!-- <section v-if="show.main" class="menu mainSection">
				<div class="link">
					<a href="https://github.com/KirisakiAria/sdxxz" target="_blank" title="github">
						<i class="iconfont icon-github"></i>
					</a>
					<a href="http://music.163.com/playlist?id=85667962&userid=55401035" target="_blank" title="网易云歌单">
						<i class="iconfont icon-music"></i>
					</a>
				</div>
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
				<footer class="footer">
					<p>伟大鱼塘</p>
				</footer>
			</section> -->
			<router-view></router-view>
		</transition>
	</main>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import './style/style';

	.menu {
		height: 100vh;
		position: relative;
		.col;
		.link {

			position: absolute;
			top: .1rem;
			right: .05rem;
			a {
				margin: 0 .05rem;

				i {
					font-size: .24rem;
				}
			}
		}

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

		.footer {
			position: absolute;
			bottom: .2rem;
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
			'$route': function (to, from) {
				if (to.path == '/') {
					this.show.main = true;
				} else {
					this.show.main = false;
				}
			}
		}
	}
</script>