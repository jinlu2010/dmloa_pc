<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="部门名称" class="deptname">
				<el-input v-model="form.deptname"></el-input><span>部</span>
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
				let data={
					name:this.form.deptname+'部',
					sense:this.form.deptsense,
					goal:this.form.deptgoal,
					duty:this.form.deptduty,
				}
				let dept = JSON.stringify(data);
				console.log(dept);
				let params = new URLSearchParams();
				params.append("dept", dept);
				this.axios.post('api/addDept/', params)
				.then(res => {
					console.log(res)
					if (res.data.code == 0) {
						alert('恭喜您，创建部门成功！');
						let token = res.data.deptid
						localStorage.setItem('depttoken', token);
					} else {
						this.message = res.data.message
						alert(this.message)
					}
				})
			}	
		}
	}
</script>

<style>
</style>
