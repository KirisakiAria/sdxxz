<template>
	<section class="mission mainSection">
		<section class="mainQuests">
			<h4 class="tac">主线任务</h4>
			<ul>
				<li :key="item.mid" v-for="item in mainQuestsList" v-if="ifShow(item.level,item.ifDone)">
					<div class="ib">
						<span class="title">{{item.name}}</span>
						<span class="level">等级：{{item.level}}</span>
						<p>{{item.des}}</p>
						<p class="reward">任务奖励：</p>
					</div>
					<button class="notyet" @click="take()">接受</button>
				</li>
			</ul>
		</section>
		<section class="sideQuests">
			<h4 class="tac">支线任务</h4>
		</section>
	</section>
</template>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../style/style";
	.mission {
		padding-bottom: .7rem;
		h4 {
			padding: .12rem;
			border-bottom: 1px solid #e1e1e1;
			font-weight: bold;
			font-size: .16rem;
			color: #57606f;

		}
		li {
			padding: .12rem;
			border-bottom: 1px solid #e1e1e1;

			button {
				width: .8rem;
			}

			.ib {
				width: calc(~'100% - .9rem');
				width: -webkit-calc(~'100% - .9rem');
			}
			.title {
				margin-right: .15rem;
				font-weight: bold;
			}
			.level {
				color: #70a1ff;
			}
			.reward {
				color: #5352ed;
			}
			p {
				margin-top: .1rem;
				line-height: 1.5;
			}
		}
	}
</style>

<script>
	export default {
		name: 'Mission',
		methods: {
			ifShow: function (missionLevel, ifDone) {
				if (missionLevel <= this.playerLevel) {
					if (!ifDone) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			take:function(){
				
			}
		},
		computed: {
			mainQuestsList: function () {
				return this.$store.state.mission.mainQuests;
			},
			sideQuestsList: function () {
				return this.$store.state.mission.sideQuests;
			},
			playerLevel: function () {
				return this.$store.state.player.baseAttributes.level.value;
			}
		}
	}
</script>