import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
import Layout from '@/components/Layout.vue'
const routes = [{
		path: '/login',
		alias: '/',
		name: 'Login',
		meta: { requiresAuth: false },
		component: () => import('@/views/Login.vue') //懒加载
	},
	{
		path: '/register',
		name: 'Register',
		meta: { requiresAuth: false },
		component: () => import('@/views/Register.vue') //懒加载
	},{
		path:'/goods/',
		name:'Goods',
		meta:{requiresAuth:true},
		component:Layout,
		children:[{
			path:'list',
			name:'GoodsList',
			component:() =>import('@/views/Goods/List.vue')
		},{
			path:'category',
			name:'GoodsCategory',
			component:() =>import('@/views/Goods/Category.vue')
		},{
			path:'release',
			name:'GoodsRelease',
			component:() =>import('@/views/Goods/Release.vue')
		},{
			path:'edit/:id',
			name:'GoodsEdit',
			props:true,
			component:() =>import('@/views/Goods/Edit.vue')
		}]
	},{
		path:'/auth/',
		name:'Auth',
		meta:{requiresAuth:true},
		component:Layout,
		children:[{
			path:'menu/',
			name:'AuthMenu',
			component:() =>import('@/views/Auth/Menu.vue')
		},{
			path:'role',
			name:'AuthRole',
			component:() =>import('@/views/Auth/Role.vue')
		}]
	},{
		path:'/order/',
		name:'Order',
		meta:{requiresAuth:true},
		component:Layout,
		children:[{
			path:'list',
			name:'OrderList',
			component:() =>import('@/views/Order/List.vue')
		}]
	},{
		path:'/user/',
		name:'User',
		meta:{requiresAuth:true},
		component:Layout,
		children:[{
			path:'info/',
			name:'UserInfo',
			component:() =>import('@/views/User/Info.vue')
		},{
			path:'list',
			name:'UserList',
			component:() =>import('@/views/User/List.vue')
		}]
	},

]

const router = new VueRouter({
	routes
})
router.beforeEach((to,from,next)=>{
	let isRequireAuthor =to.matched.some(path =>path.meta.requiresAuth);
	if(!isRequireAuthor){
		next();
		return;
	}
	let token=sessionStorage.token;
	if(token){
		next();
		return;
	}
	Message.error('无效的token，请重新登录');
	setTimeout(() =>{
		next(`/login?redirect =$(to.path)`);
	},2000);
});
export default router
