<template>
	<section class="tips mainSection">
		<div class="wrapper">
			<p>{{content}}</p>
			<button @click="closeTips">确定</button>
		</div>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.wrapper {
		z-index: 1000;
		position: fixed;
		.t50;
		width: 60%;
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

		button {
			height: .25rem;
			margin-top: 0.2rem;
			border-color: #fff;
		}
	}
</style>

<script>
	export default {
		name: 'Tips',
		data() {
			return {

			}
		},
		props: ['content'],
		methods: {
			closeTips: function () {
				this.$emit('closeTips');
			}
		},
	}
</script>