import Vue from 'vue'
import Router from 'vue-router'


const index = resolve => require(['@/views/index'], resolve)

Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/',
		    name: 'index',
		    component: index
		}
	]
})