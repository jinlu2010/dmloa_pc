<template>
	<div id="menu">
		<el-menu default-active="$route.path" class="el-menu-vertical-demo" router>
			<NavItem v-for="v in data" :key="v.id" :data="v"/>
		</el-menu>
	</div>
</template>

<script>
	import NavItem from './NavItem.vue'
	
	export default {
		data() {
			return {
				data: [{
					id:'1',
					label: '导航一',
					children: [{
						id:'4',
						label: '选项一'
					}]
				}, {
					id:'2',
					label: '导航二',
					children: [{
						id:'5',
						label: '选项一'
					}]
				}, {
					id:'3',
					label: '导航三',
				}],
				defaultProps: {
					children: 'children',
					label: 'label',
					id:'id'
				}
			};
		},
		components:{
			NavItem
		},
		methods: {
		}
	}
</script>

<style>
	
</style>
