<template>
	<div>
		<el-form ref="form" :model="staff" label-width="80px">
			<el-form-item label="身份">
				<el-radio-group v-model="staff.identity">
					<el-radio label="普通员工"></el-radio>
					<el-radio label="管理者"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="staff.name"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio-group v-model="staff.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="出身年月">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="staff.birth">
					</el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="手机">
				<el-input v-model="staff.phone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="staff.email"></el-input>
			</el-form-item>
			<el-form-item label="账号">
				<el-input v-model="staff.account"></el-input>
			</el-form-item>
			<el-form-item label="初始密码">
				<el-input v-model="staff.password"></el-input>
			</el-form-item>
			<br>
			<el-form-item label="部门岗位">
				<el-select v-model="staff.dept" placeholder="请选择部门">
					<el-option label="设计部" value="shanghai"></el-option>
					<el-option label="市场部" value="beijing"></el-option>
				</el-select>
				<el-select v-model="staff.post" placeholder="请选择岗位">
					<el-option label="平面设计师" value="shanghai"></el-option>
					<el-option label="UI设计师" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="汇报对象">
				<el-select v-model="staff.report" placeholder="请选择汇报对象">
					<el-option label="张小小" value="shanghai"></el-option>
					<el-option label="印雪梅" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="在职状态">
				<el-select v-model="staff.state" placeholder="在职">
					<el-option label="在职" value="on"></el-option>
					<el-option label="离职" value="leave"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="岗位技能">
				<el-input type="textarea" v-model="staff.skill"></el-input>
			</el-form-item>
			<el-form-item label="岗外技能">
				<el-input type="textarea" v-model="staff.outskill"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				staff: {
					identity: '',
					name:'',
					sex:'',
					birth:'',
					phone:'',
					email:'',
					account:'',
					password:'',
					dept:'',
					post:'',
					report:'',
					state:'',
					skill:'',
					outskill:''
				}
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
