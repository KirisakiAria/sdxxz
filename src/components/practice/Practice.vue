<template>
	<section class="practice mainSection">
		<div class="item">
			<div class="head">0~5级</div>
			<div class="content">
				<ul>
					<li>
						<div class="top">
							<span>傻屌村小傻屌</span>
							<span>等级：5</span>
						</div>
						<div class="bottom">
							<p>最垃圾的傻屌，最垃圾的傻屌，最垃圾的傻屌，最垃圾的傻屌</p>
							<button>挑战</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import '../../less/style';

	.practice {
		.head {
			padding: .15rem;
			background:#a5b1c2;
			.cw;
		}

		.content {
			li {
				padding:.15rem;
				border-bottom: 1px solid #a5b1c2;
				
				.top {
					margin-bottom: .15rem;
					span {
						margin-right: .15rem;
					}
				}
				
				p {
					line-height: 1.5;
					.ib;
					width: calc(~'100% - 1.05rem');
					padding-right: .1rem;
					text-align:justify;
				}
				button {
					.ib;
					.br(8px);
				}
			}
		}
	}	

</style>

<script>
	export default {
		name: 'Practice',
		computed: {
			level0_5EnemyList: function() {
				let arr = [];
				let state = this.$store.state;
				arr.push(state.villageC, state.villageB, state.villageA);
				return arr;
			},
			level6_105EnemyList: function() {
				let arr = [];
				let state = this.$store.state;
				arr.push(state.villageS);
				return arr;
			}
		}
	}
</script>