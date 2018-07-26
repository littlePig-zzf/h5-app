import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const view = (file) => () => import(`@/views/${file}.vue`)

const router = new Router({
	routes: [
		{
			path: '/',
		    name: 'index',
		    component: view('index/index')
		},
		{
			path: '/LineChart',
		    name: 'charts/LineChart',
		    component: view('charts/LineChart')
		}
	]
})

router.beforeEach((to, from, next) => {
	Vue.$vux.loading.show({
	 	text: 'Loading'
	})
	next()
})

router.beforeResolve((to, from, next) => {
	Vue.$vux.loading.hide()
	next()
})


export default router
