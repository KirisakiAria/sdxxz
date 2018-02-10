<template>
	<main class="main">
		<transition name="slide-fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</main>
</template>

<style scoped lang="less" rel="stylesheet/less">
	.main
	{
		height: 100vh;
	}
</style>

<script>
	export default {
		name: 'App'
	}
</script>