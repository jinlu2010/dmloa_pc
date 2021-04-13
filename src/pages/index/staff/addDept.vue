<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="部门名称">
				<el-input v-model="form.deptname"></el-input>
			</el-form-item>
			<el-form-item label="部门意义">
				<el-input type="textarea" v-model="form.deptsense"></el-input>
			</el-form-item>
			<el-form-item label="部门目标">
				<el-input type="textarea" v-model="form.deptgoal"></el-input>
			</el-form-item>
			<el-form-item label="部门职能">
			    <el-input type="textarea" v-model="form.deptduty"></el-input>
			  </el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					deptname: '',
					deptsense: '',
					deptgoal: '',
					deptduty: '',
				},
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style>
</style>
