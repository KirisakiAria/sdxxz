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
					<li :key="speciality" v-for="item in specialitArray">
						<button @click="setSpeciality(item.speciality,item.spid)">{{ item.speciality }}</button>
					</li>
				</ul>
			</div>
		</section>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import '../style/style';
	.start {
		.col;

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
				}]
			}
		},
		methods: {
			changeUsername() {
				this.$store.commit('player/changeBaseValue', {
					propety: 'name',
					value: this.username
				});
			},
			setSpeciality: function (speciality, spid) {
				this.$store.commit('player/changeBaseValue', {
					propety: 'spid',
					value: spid
				});
				this.$store.commit('player/changeBaseValue', {
					propety: 'speciality',
					value: speciality
				});
				if (this.username != '') {
					this.goStart();
				} else {
					alert('请输入角色名');
				}
			},
			goStart: function () {
				this.$router.push({
					path: 'game'
				});
			}
		}
	}
</script>