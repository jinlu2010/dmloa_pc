import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/login',
		name: 'login',
		meta: {title: '登陆'},
		component: () => import('../pages/login/Login.vue')
	},
	{
		path: '/breadcrumb',
		name: 'breadcrumb',
		component: () => import('../pages/index/Breadcrumb.vue')
	},
	
	{
		path: '/index',
		name: 'index',
		meta: {title: '首页'},
		redirect: '/staff/list',
		component: () => import('../pages/index/Index.vue'),
		children:[
			{
				path: '/staff',
				name: 'staff',
				meta: {title: '员工管理'},
				redirect: '/staff/list',
				component: () => import('../pages/index/staff/Index.vue'),
				children:[
					{
						path: '/staff/index',
						name: 'staffindex',
						meta: {title: '员工列表'},
						redirect: '/staff/list',
						component: () => import('../pages/index/staff/Index.vue'),
						children: [
							{
								path: '/staff/staff/kpi',
								name: 'staffkpi',
								meta: {title: '绩效考核'},
								component: () => import('../pages/index/staff/staff/Kpi.vue')
							},
							{
								path: '/staff/staff/edit',
								name: 'staffedit',
								meta: {title: '详细信息'},
								component: () => import('../pages/index/staff/staff/Edit.vue')
							}
						]
					},
					{
						path: '/staff/list',
						name: 'stafflist',
						meta: {title: '员工列表'},
						component: () => import('../pages/index/staff/List.vue'),
					},
					{
						path: '/staff/adddept',
						name: 'adddept',
						meta: {title: '添加部门'},
						component: () => import('../pages/index/staff/addDept.vue')
					},
					{
						path: '/staff/addpost',
						name: 'addpost',
						meta: {title: '添加岗位'},
						component: () => import('../pages/index/staff/addPost.vue')
					},
					{
						path: '/staff/addstaff',
						name: 'addstaff',
						meta: {title: '添加员工'},
						component: () => import('../pages/index/staff/addStaff.vue')
					},
					{
						path: '/staff/menu',
						name: 'staffmenu',
						meta: {title: '岗位列表'},
						component: () => import('../pages/index/staff/StaffMenu.vue')
					},
					{
						path: '/staff/table',
						name: 'stafftable',
						meta: {title: '岗位成员'},
						component: () => import('../pages/index/staff/StaffTable.vue')
					}
				]
			},
			{
				path: '/project',
				name: 'project',
				meta: {title: '项目管理'},
				redirect: '/project/list',
				component: () => import('../pages/index/project/Index.vue'),
				children: [
					{
						path: '/project/index',
						name: 'projectindex',
						meta: {title: '项目列表'},
						redirect: '/project/list',
						component: () => import('../pages/index/project/Index.vue'),
						children:[
							{
								path: '/project/project/detail',
								name: 'projectdetail',
								meta: {title: '项目详情'},
								component: () => import('../pages/index/project/project/Detail.vue')
							},
							{
								path: '/project/project/progress',
								name: 'progress',
								meta: {title: '项目进度'},
								component: () => import('../pages/index/project/project/Progress.vue')
							}
						]
					},
					{
						path: '/project/list',
						name: 'projectlist',
						meta: {title: '项目列表'},
						component: () => import('../pages/index/project/List.vue')
					}
				]
			},
			{
				path: '/company',
				name: 'company',
				meta: {title: '我的企业'},
				redirect: '/company/info',
				component: () => import('../pages/index/company/Index.vue'),
				children:[
					{
						path: '/company/info',
						name: 'companyinfo',
						meta: {title: '公司信息'},
						component: () => import('../pages/index/company/Info.vue'),
					},
					{
						path: '/company/edit',
						name: 'editpassword',
						meta: {title: '修改密码'},
						component: () => import('../pages/index/company/Edit.vue')
					},
					{
						path: '/company/limit',
						name: 'companylimit',
						meta: {title: '权限设置'},
						component: () => import('../pages/index/company/Limit.vue')
					}
				]
			},
		]
	}	
]

const router = new VueRouter({
	routes
})

/*router.beforeEach(function(to,from,next){
	if(!localStorage.getItem('token')){
		if(to.path!='/login'){
			next('/login');
		}
	};
	next()
})*/

export default router
