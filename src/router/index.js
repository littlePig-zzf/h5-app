import Vue from 'vue'
import Router from 'vue-router'


export function routerFun(resolve, file){
	require(['@/views/' + file], resolve)
}


Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/',
		    name: 'index',
		    component: resolve => routerFun(resolve,'index')
		},
		{
			path: '/LineChart',
		    name: 'charts/LineChart',
		    component: resolve => routerFun(resolve,'charts/LineChart')
		}
	]
})