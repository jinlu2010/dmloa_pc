<template>
	<el-container>
		<el-aside class="staffMenu" width="200px">
			<StaffMenu></StaffMenu>
		</el-aside>
		<el-main class="staffTable">
			<StaffTable></StaffTable>
		</el-main>
	</el-container>
</template>

<script>
	import StaffMenu from './StaffMenu.vue'
	import StaffTable from './StaffTable.vue'
	
	export default {
		components: {
			StaffMenu,
			StaffTable
		},
		data() {
			return {
				
			}
		},

		methods: {

		}
	}
</script>

<style>
	.staffMenu{
		background-color: #FCFCFC;
		border-right: 1px solid #E5E5E5;
	}
	.staffTable{
		padding:0
	}
</style>
