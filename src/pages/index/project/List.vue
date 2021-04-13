<template>
	<div class="project">
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 60%">
			<el-table-column prop="name" label="项目名称">
			</el-table-column>
			<el-table-column prop="director" label="项目负责人">
			</el-table-column>
			<el-table-column prop="finishdate" label="截止日期">
			</el-table-column>
			<el-table-column prop="progress" label="完成进度">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small">进度</el-button>
				</template>
			</el-table-column>
		</el-table>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleClick(row) {
				console.log(row);
			}
		},

		data() {
			return {
				tableData: [{
					name: '花开声音',
					director: '王小虎',
					finishdate: '2020-6-30',
					progress: '100%'
				}, {
					name: '花开声音',
					director: '王小虎',
					finishdate: '2020-6-30',
					progress: '100%'
				}, {
					name: '花开声音',
					director: '王小虎',
					finishdate: '2020-6-30',
					progress: '100%'
				}, {
					name: '花开声音',
					director: '王小虎',
					finishdate: '2020-6-30',
					progress: '100%'
				}],
				multipleSelection: []
			}
		}
	}
</script>

<style>
	.project .el-table{
		padding:0;
	}
</style>
