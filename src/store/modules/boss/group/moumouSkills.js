let state = {
	damageSkills: [],
	cureSkills: [],
	buffSkills: [],
	passiveSkills: [{
			sid: 0,
			learned: false,
			name: '世界首富',
			desc: '你是一名steam玩家，不过这个被动现在好像没什么用。',
			effect: {}
		},
		{
			sid: 1,
			learned: false,
			name: 'Dota2Plus会员',
			desc: '你开了五千年的Dota2Plus会员，自带血崩光环',
			effect: {}
		}
	]
}

export default {
	state,
	namespaced: true
}