<template>
	<div>
		<el-form :model="forgetForm" :rules="rules" ref="forgetForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="管理员手机" prop="adminphone">
				<el-input v-model="forgetForm.adminphone"></el-input>
			</el-form-item>
			<el-form-item label="短信验证码">
				<el-input v-model="forgetForm.smscode"></el-input>
			</el-form-item>
			<el-form-item label="登录密码" prop="password">
				<el-input type="password" v-model="forgetForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkpassword">
				<el-input type="password" v-model="forgetForm.checkpassword" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onReset('forgetForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号码不能为空'));
				}
				setTimeout(() => {
					if (value.length < 11) {
						callback(new Error('手机号码不正确'));
					} else {
						callback();
					}
				}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.forgetForm.checkpassword !== '') {
						this.$refs.forgetForm.validateField('checkpassword');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.forgetForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				forgetForm: {
					adminphone: '',
					password: '',
					checkpassword: '',
					smscode: ''
				},
				rules: {
					adminphone: [{
						validator: checkPhone,
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkpassword: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			onReset(formName) {
				let password = this.forgetForm.password;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('恭喜您，修改成功！');
						sessionStorage.setItem('password', password);
						this.$router.push('/login')
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
</style>
