<template>
	<section class="tips mainSection">
		<div class="mask" @click="closeTips"></div>
		<div class="wrapper">
			<p>{{content}}</p>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'Tips',
		props: {
			content: String
		},
		methods: {
			closeTips: function () {
				this.$emit('closeTips');
			}
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";
	.tips {
		&,
		.mask {
			position: fixed;
			width: 100vw;
			height: 100vh;
			z-index: 1000;
			left: 0;
			top: 0;
		}
		.wrapper {
			position: fixed;
			.t50;
			width: 65%;
			padding: .15rem;
			min-height: 1rem;
			.br;
			text-align: center;
			background: rgba(0, 0, 0, .8);
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.cw;
			p {
				line-height: 1.5;
			}
		}
	}
</style>