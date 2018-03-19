<template>
	<section class="bar tac">
		<span>经验值：</span>
		<progress :value="value" :max="max"></progress>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";

	.bar {
		padding: .15rem;

		progress {
			width: 60%;
			.ib;
			height: .1rem;
		}
		progress::-webkit-progress-bar {
			background: #ced6e0;
			border-radius: 8px;
		}
		progress::-webkit-progress-value {
			background: #00cec9;
			border-radius: 8px;
		}
	}
</style>

<script>
	export default {
		name: 'ProgressBar',
		props: ['value', 'max']
	}
</script>