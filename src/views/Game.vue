<template>
	<section class="game">
		<transition name="slide-fade" mode="out-in">
			<keep-alive>
				<Mission v-if="showList[0]"></Mission>
				<Practice v-if="showList[1]"></Practice>
				<Skill v-if="showList[2]"></Skill>
				<Inventory v-if="showList[3]"></Inventory>
				<My v-if="showList[4]"></My>
			</keep-alive>
		</transition>
		<transition name="slideY-fade">
			<keep-alive>
				<footerView v-if="!ifBattle&&!ifInterlocution"></footerView>
			</keep-alive>
		</transition>
	</section>
</template>

<script>
	import FooterView from '../components/footer/Footer';
	import Mission from '../components/mission/Mission';
	import Practice from '../components/practice/Practice';
	import Skill from '../components/skill/Skill';
	import Inventory from '../components/inventory/Inventory';
	import My from '../components/my/My';

	export default {
		name: 'Game',
		computed: {
			showList() {
				let [arr, list] = [
					[], this.$store.state.global.show
				];
				Object.values(list).forEach(e => {
					arr.push(e);
				});
				return arr;
			},
			ifBattle() {
				return this.$store.state.global.battle;
			},
			ifInterlocution() {
				return this.$store.state.global.interlocution;
			}
		},
		components: {
			FooterView,
			Mission,
			Practice,
			Skill,
			Inventory,
			My
		},
		mounted() {

		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import '../style/style';
</style>
