<template>
	<div id="staffmenu">
		<h2>部门岗位</h2>
		<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
	</div>
</template>

<script>
	import Bus from './Bus.js'
	
	export default {
		name: 'staffmenu',
		data() {
			return {
				data: [{
					label: '设计部',
					children: [{
						label: '平面设计',
					}]
				}, {
					label: '运营部',
					children: [{
						label: '市场调研',
					}, {
						label: '市场部',
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			};
		},
		methods: {
			handleNodeClick(data) {
				console.log(data.label);
				Bus.$emit('val',data.$treeNodeId);
			}
		}
	}
</script>

<style>
	.el-tree{
		background-color: #FCFCFC;
	}
	.el-tree-node{
		margin-bottom: 10px;
	}
	.el-tree-node__children .el-tree-node{
		margin: 5px 0;
	}
	.el-tree-node__content{
		padding-left: 20px !important;
	}
	
	#staffmenu h2{
		margin: 10px 0 20px 30px;
		font-size: 18px;
	}
	
</style>
