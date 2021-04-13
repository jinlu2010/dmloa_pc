<template>
	<div id="navitem">
		<!--没有子菜单-->
		<el-menu-item index="2" v-if="!data.children">
			<span slot="title">{{data.label}}</span>
		</el-menu-item>

		<!--有子菜单-->
		<el-submenu index="2" v-else>
			<template slot="title">{{data.label}}</template>
			<NavItem v-for="children in data.children" :key="children.id" :data="children"/>
		</el-submenu>
	</div>
</template>

<script>
	export default {
		name:'NavItem',
		data() {
			return {

			};
		},
		props:['data']
	}
</script>

<style>
</style>
