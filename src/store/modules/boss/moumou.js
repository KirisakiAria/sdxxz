const state = {
	name: '哞鸽子',
	description: '与贪玩JJ合称神屌侠侣，潍坊奶粉王，绝活给吃树',
	level: 20,
	hp: 1600,
	mp: 750,
	hps: 18,
	mps: 20,
	atk: 175,
	def: 110,
	res: 30,
	crt: 18,
	hit: 80,
	dodge: 40,
	buff: [],
	element: {
		fire: 0,
		ice: 0,
		toxic: 10,
		wind: 0,
		earth: 0
	},
	battleSkills: [{
		name: '咕咕咕',
		description: '哞式鸽子叫，对敌人群体造成120点伤害，并使敌人非常想鸽，持续两回合',
		damage: 0,
		consume: 80,
		type: 1,
	}, {
		name: 'DNF，启动！',
		description: '启动DNF，发动爆肝模式，防御提升50，闪避提升15，回血速度增加25，持续三回合，状态结束后精尽人亡，失去400点血',
		consume: 500,
		type: 1,
	}]
}

export default {
	state
}