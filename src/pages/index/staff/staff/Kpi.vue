<template>
	<div id="kpi">
		<h2>绩效考核</h2>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="month" label="月份" width="180"></el-table-column>
		    <el-table-column prop="score" label="评分" width="180"></el-table-column>
			<el-table-column prop="grade" label="评级" width="180"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'kpi',
		data() {
			return {
				tableData:[{
					month: '2021-01',
					score: '300',
					grade: 'A'
				}, {
				    month: '2021-02',
				    score: '300',
				    grade: 'A'
				}, {
				    month: '2021-03',
				    score: '300',
				    grade: 'A'
				}, {
				    month: '2021-04',
				    score: '300',
				    grade: 'A'
				}]
			}
		},
	}
</script>

<style>
	#kpi .el-table{
		padding: 0;
	}
</style>
