<template>
	<div id="index">
		<el-container :style="{height:winHeight}">
			<el-aside width="250px">
				<el-menu :default-openeds="['/staff','/company','/project']" default-active="/staff/list" class="el-menu-vertical-demo" background-color="#004343" text-color="#fff" active-text-color="#5ef3b3" router>
					<div class="avatar"><img src="@/assets/img/userface.png"></div>
					<el-submenu index="/staff">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span slot="title">员工管理</span>
						</template>
						<el-menu-item index="/staff/adddept">添加部门</el-menu-item>
						<el-menu-item index="/staff/addpost">添加岗位</el-menu-item>
						<el-menu-item index="/staff/addstaff">添加员工</el-menu-item>
						<el-menu-item index="/staff/list">员工列表</el-menu-item>
					</el-submenu>
					
					<el-submenu index="/project">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span slot="title">项目管理</span>
						</template>
						<el-menu-item index="/project/list">项目列表</el-menu-item>
					</el-submenu>
					
					<el-submenu index="/company">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span slot="title">我的企业</span>
						</template>
						<el-menu-item index="/company/info">企业信息</el-menu-item>
						<el-menu-item index="/company/limit">权限设置</el-menu-item>
						<el-menu-item index="/company/edit">修改密码</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header>
					<Breadcrumb></Breadcrumb>
					<el-button type="primary" round class="signup">退出</el-button>
				</el-header>

				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import Breadcrumb from './Breadcrumb.vue'

	export default {
		name: 'Index',
		components: {
			Breadcrumb
		},
		data() {
			return {
				winHeight: '',
			}
		},
		created() {
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			this.winHeight= h + 'px';
		}
	}
</script>

<style>
	.el-main{
		background-color: #FFFFFF;
	}
</style>