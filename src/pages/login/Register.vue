<template>
	<div id="register">
		<h1>段马乐OA管理后台</h1>
		<div class="register-layout">
			<el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="企业名称" prop="companyname">
					<el-input v-model="registerForm.companyname"></el-input>
				</el-form-item>
				<el-form-item label="行业类型" prop="industry">
					<el-select v-model="registerForm.industry" placeholder="请选择行业类型">
						<el-option label="类型一" value="one"></el-option>
						<el-option label="类型二" value="two"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="管理员姓名" prop="adminname">
					<el-input v-model="registerForm.adminname"></el-input>
				</el-form-item>
				<el-form-item label="管理员手机" prop="adminphone">
					<el-input v-model="registerForm.adminphone"></el-input>
				</el-form-item>
				<el-form-item label="管理员账户" prop="adminaccount">
					<el-input v-model="registerForm.adminaccount"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="password">
					<el-input type="password" v-model="registerForm.password"></el-input>
				</el-form-item>
				<el-form-item label="短信验证码">
					<el-input v-model="registerForm.smscode"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="onRegister('registerForm')">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				registerForm: {
					companyname: '',
					industry: '',
					adminname: '',
					adminphone: '',
					adminaccount: '',
					password:'',
					smscode: ''
				},
				rules: {
					companyname: [
						{required: true,message: '请输入公司名称',trigger: 'blur'},
						{min: 6,max: 18,message: '长度在 6 到 18 个字符',trigger: 'blur'}
					],
					industry: [{required: true,message: '请选择行业类型',trigger: 'change'}],
					adminname: [
						{required: true,message: '请输入管理员姓名',trigger: 'blur'},
						{min: 3,max: 5,message: '长度在 3 到 5 个字符',trigger: 'blur'}
					],
					adminphone: [
						{required: true,message: '请输入管理员手机',trigger: 'blur'},
						{min: 11,max: 11,message: '手机号码不正确',trigger: 'blur'}
					],
					adminaccount: [
						{required: true,message: '请输入管理员账户名称',trigger: 'blur'},
						{min: 3,max: 5,message: '长度在 3 到 5 个字符',trigger: 'blur'}
					],
					password: [
						{required: true,message: '请输入密码',trigger: 'blur'},
						{min: 6,max: 18,message: '长度在 6 到 18 个字符',trigger: 'blur'}
					]
				}
			};
		},
		methods: {
			onRegister(formName) {
				let user={
					companyname:this.registerForm.companyname,
					industry:this.registerForm.industry,
					adminname:this.registerForm.adminname,
					adminphone:this.registerForm.adminphone,
					adminaccount:this.registerForm.adminaccount,
					password:this.registerForm.password
				}
				this.$refs[formName].validate((valid) => {
				    if (valid) {
						alert('恭喜您，成功开通！');
						user = JSON.stringify(user);
						sessionStorage.setItem('user', user);
						var account = sessionStorage.getItem('user');
						console.log(account);
						account = JSON.parse(account)
						console.log(account);
						//this.$router.push('/login')
				    } else {
						console.log('error submit!!');
				        return false;
				    }
				});
			}
		}
	}
</script>

<style>
	body{
		background-color: #004343;
	}
</style>
