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
						<button>读取存档</button>
						<input class="file" type="file" @change="load()" ref="file" />
					</li>
					<li>
						<router-link to="/setting">设置</router-link>
					</li>
				</ul>
				<footer class="footer">
					<p>
						<a href="https://weibo.com/KanzakiHAria" target="_blank" title="微博">伟大鱼塘</a>
					</p>
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
		.file {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
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
				margin: .18rem 0;
				.bor(#ccc);
				text-align: center;
				position: relative;
				a,
				button {
					width: auto;
					height: auto;
					border: none;
					padding: .14rem;
					display: inline-block;
					font-size: .16rem;
				}
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
		methods: {
			//读档
			load() {
				let vm = this;
				let file = this.$refs.file.files[0];
				let reader = new FileReader();
				reader.readAsText(file, 'utf-8');
				reader.onload = function () {
					let data = JSON.parse(this.result);
					vm.$store.dispatch('player/loadData', {
						data: data
					});
					vm.$router.push('game');
				}
			}
		},
		watch: {
			'$route' (to, from) {
				if (to.path == '/') {
					this.show.main = true;
				} else {
					this.show.main = false;
				}
			}
		}
	}
</script>