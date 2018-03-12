import './style/base.css';
import './style/iconfont.css';
import './lib/flex';
import App from './App';
import router from './router';
import store from './store';

let app = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})