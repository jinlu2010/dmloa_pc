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
				<el-button type="primary" @click="addDept">立即提交</el-button>
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
			addDept: function() {
				let that = this;
				let data={
					name:this.form.deptname,
					intro:this.form.deptsense,
					target:this.form.deptgoal,
					duty:this.form.deptduty,
				}
				this.axios.post('http://47.100.125.167:7080/dept​/create', data)
				.then(res => {
					console.log(res)
					if (res.data.code == 0) {
						alert('恭喜您，创建部门成功！');
						let token = res.data.data.token;
					} else {
						that.message = res.data.message
						alert(that.message)
					}
				})
			}
				
		}
	}
</script>

<style>
</style>
