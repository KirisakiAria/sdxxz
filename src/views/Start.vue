<template>
	<section class="start tac mainSection">
		<section class="username">
			<p>请输入角色名</p>
			<div class="group">
				<input type="text" name="" @input="changeUsername" v-model.trim="username">
			</div>
		</section>
		<section class="speciality">
			<p>请选择特长</p>
			<div class="group">
				<ul>
					<li :key="item.spid" v-for="item in specialitArray">
						<button @click="setSpeciality(item.speciality,item.spid)">{{ item.speciality }}</button>
					</li>
				</ul>
			</div>
		</section>
		<transition name="scale-fade">
			<Tips :content="tips.data" v-show="tips.show" @closeTips="closeTips()"></Tips>
		</transition>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import '../style/style';
	.start {
		.col;
		height: 100vh;
		.username {
			input {
				display: block;
				width: 100%;
				.bor(#a4b0be);
				height: .4rem;
				padding: .15rem;
			}
			padding-bottom: .5rem;
		}
		.speciality {
			li {
				margin: .15rem 0;
				button {
					display: inline-block;

					margin: 0;
				}
			}
		}
		p {
			font-size: .18rem;

			margin-bottom: .2rem;
		}
		button {
			margin: 0 .15rem;
		}
	}
</style>

<script>
	import Tips from '../components/tips/Tips';

	export default {
		name: 'Start',
		data() {
			return {
				username: '',
				specialitArray: [{
					speciality: '吹逼',
					spid: 1
				}, {
					speciality: '薅羊毛',
					spid: 2
				}, {
					speciality: '禁言',
					spid: 3
				}, {
					speciality: '+1',
					spid: 4
				}, {
					speciality: '摸鱼',
					spid: 5
				}],
				tips: {
					data: '',
					show: false
				}
			}
		},
		methods: {
			changeUsername() {
				this.$store.commit('player/changeBaseAttributesValue', {
					propety: 'name',
					value: this.username
				});
			},
			setSpeciality(speciality, spid) {
				this.$store.commit('player/changeBaseAttributesValue', {
					propety: 'spid',
					value: spid
				});
				this.$store.commit('player/changeBaseAttributesValue', {
					propety: 'speciality',
					value: speciality
				});
				if (this.username != '') {
					this.goStart();
				} else {
					this.openTips('请输入角色名');
				}
			},
			goStart() {
				this.$router.push({
					path: 'game'
				});
			},
			openTips(content) {
				this.tips.data = content;
				this.tips.show = true;
			},
			closeTips() {
				this.tips.show = false;
			},
		},
		components: {
			Tips
		}
	}
</script>