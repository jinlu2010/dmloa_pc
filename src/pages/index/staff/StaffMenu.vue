<template>
	<div id="staffmenu">
		<h2>部门岗位</h2>
		<el-tree :data="data" node-key="id" :expand-on-click-node="false" @node-click="handleNodeClick">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.label }}</span>
		        <span>
		          <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
		        </span>
		    </span>
		</el-tree>
	</div>
</template>

<script>
	import Bus from './Bus.js'
	
	export default {
		name: 'staffmenu',
		data() {
			const data = [{
				id:1,
				label: '设计部',
				children: [{
					id:2,
					label: '平面设计',
			    }]
			}, {
				id:3,
			    label: '运营部',
			    children: [{
					id:4,
					label: '市场调研',
			    }, {
					id:5,
			        label: '市场部',
			    }]
			}];
			return {
				data: JSON.parse(JSON.stringify(data)),
				data: JSON.parse(JSON.stringify(data))
			};
		},
		methods: {
			handleNodeClick(data) {
				console.log(data.label);
				Bus.$emit('val',data.$treeNodeId);
			},
			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},
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
	.custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    padding-right: 20px;
	  }
	
</style>
