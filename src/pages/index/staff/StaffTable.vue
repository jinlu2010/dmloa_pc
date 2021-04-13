<template>
	<div id="stafftable">
		<h2>成员列表</h2>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="姓名" width="80"></el-table-column>
		    <el-table-column prop="post" label="岗位" width="120"></el-table-column>
			<el-table-column prop="dept" label="部门" width="80"></el-table-column>
			<el-table-column prop="phone" label="手机" width="120"></el-table-column>
			<el-table-column prop="email" label="邮箱" width="220"></el-table-column>
			<el-table-column label="操作" width="180">
				<el-button @click="handleClick(scope.row)" type="text" size="small">详细</el-button>
				<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
				<el-button @click="handleClick(scope.row)" type="text" size="small">绩效</el-button>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import Bus from './Bus.js'
	export default {
		name: 'stafftable',
		data() {
			return {
				tableData:[{
					name: '王小虎',
					post: '平面设计师',
					dept: '设计部',
					phone: '13524133134',
					email: 'wangxiaohu@domilore.com'
				}, {
				    name: '王小虎',
				    post: '平面设计师',
				    dept: '设计部',
				    phone: '13524133134',
				    email: 'wangxiaohu@domilore.com'
				}, {
				    name: '王小虎',
				    post: '平面设计师',
				    dept: '设计部',
				    phone: '13524133134',
				    email: 'wangxiaohu@domilore.com'
				}, {
				    name: '王小虎',
				    post: '平面设计师',
				    dept: '设计部',
				    phone: '13524133134',
				    email: 'wangxiaohu@domilore.com'
				}]
			}
		},
		methods: {
		    handleClick(row) {
		        console.log(row);
		    },
			deleteRow(index, rows) {
			    rows.splice(index, 1);
			},
			handleEdit(index, row) {
			    console.log(index, row);
			},
		},
		mounted:function(){
			Bus.$on('val',data =>{
				console.log('接收到的数据是：'+ data);
				if(data===2){
					this.tableData=[
						{
						    name: '王虎',
						    post: '平面设计师',
						    dept: '设计部',
						    phone: '13524133134',
						    email: 'wangxiaohu@domilore.com'
						}
					]
				}else if(data===4){
					this.tableData=[
						{
						    name: '王虎',
						    post: '市场调研',
						    dept: '运营部',
						    phone: '13524133134',
						    email: 'wangxiaohu@domilore.com'
						},
						{
						    name: '王二虎',
						    post: '市场调研',
						    dept: '运营部',
						    phone: '13524133134',
						    email: 'wangxiaohu@domilore.com'
						}
					]
				}
			});
		}
	}
</script>

<style>
	.el-table{
		padding: 10px 20px;
	}
	.el-table::before{
		height: 0;
	}
	#stafftable h2{
		margin: 10px 0 0 30px;
		font-size: 18px;
	}
	.el-table__header-wrapper{
		
	}
</style>
