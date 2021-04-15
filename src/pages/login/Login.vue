<template>
	<div id="login">
		<h1>段马乐OA管理后台</h1>
		<div class="login-layout" v-show="showLogin">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="密码登录" name="first">
					<el-form :model="loginForm" status-icon ref="loginForm" label-width="100px"
						class="demo-ruleForm" :rules="rules">
						<el-form-item label="管理员账户" prop="adminaccount">
							<el-input v-model="loginForm.adminaccount"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="loginForm.password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="LoginPwd">登录</el-button>
							<el-button type="primary" @click="ToRegister">注册</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="短信登录" name="second">
					<el-form :model="loginForm" status-icon ref="loginForm" label-width="100px"
						class="demo-ruleForm" :rules="rules">
						<el-form-item label="管理员手机" prop="adminphone">
							<el-input v-model="loginForm.adminphone"></el-input>
						</el-form-item>
						<el-form-item label="短信验证码" prop="smscode" class="verification">
							<el-input v-model="loginForm.smscode"></el-input>
							<el-button @click="getCodeLogin">{{valiBtn}}</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="LoginSms">登录</el-button>
							<el-button type="primary" @click="ToRegister">注册</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="register-layout" v-show="showRegister">
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
				<!--<el-form-item label="管理员姓名" prop="adminname">
					<el-input v-model="registerForm.adminname"></el-input>
				</el-form-item>-->
				<el-form-item label="管理员账户" prop="adminaccount">
					<el-input v-model="registerForm.adminaccount"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="password">
					<el-input type="password" v-model="registerForm.password"></el-input>
				</el-form-item>
				
				<el-form-item label="管理员手机" prop="adminphone">
					<el-input v-model="registerForm.adminphone"></el-input>
				</el-form-item>
				<el-form-item label="短信验证码" prop="smscode" class="verification">
					<el-input v-model="registerForm.smscode"></el-input>
					<el-button @click="getCodeRegister">{{valiBtn}}</el-button>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="Register">注册</el-button>
					<el-button type="text" @click="ToLogin">返回登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

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
					callback();
				}
			};
			return {
				activeName: 'first',
				showLogin: true,
				showRegister: false,
				valiBtn:'获取验证码',
				loginForm: {
					adminaccount: '',
					password: '',
					adminphone: '',
					smscode: ''
				},
				registerForm: {
					companyname: '',
					industry: '',
					adminname: '',
					adminphone: '',
					adminaccount: '',
					password:'',
					smscode: '',
				},
				rules: {
					adminaccount: [
						{required: true,message: '请输入用户名',trigger: 'blur'}
					],
					adminphone: [
						{required: true,validator: checkPhone,trigger: 'blur'},
					],
					password: [
						{required: true,validator: validatePass,trigger: 'blur'},
					],
					companyname: [
						{required: true,message: '请输入公司名称',trigger: 'blur'},
						{min: 6,max: 18,message: '长度在 6 到 18 个字符',trigger: 'blur'}
					],
					industry: [{message: '请选择行业类型',trigger: 'change'}],
					adminname: [
						{required: true,message: '请输入管理员姓名',trigger: 'blur'},
						{min: 3,max: 5,message: '长度在 3 到 5 个字符',trigger: 'blur'}
					],
					smscode: [
						{required: true,message: '请输入短信验证码',trigger: 'blur'},
					]
				},
			};
		},
		methods: {
			LoginPwd: function() {
				let that = this;
				let data = {
					"account": this.loginForm.adminaccount,
					"password": this.loginForm.password
				} // 登录的Schema
				this.axios.post('http://47.100.125.167:7080/auth/login', data)
				.then(res => {
					console.log(res.data)
					console.log(res.config.data)
					if (res.data.code == 0) {
						let token = res.config.data; // 用户的token
						console.log(token)
						/**
						  存储在本地，类似于cookie，后期用于登录验证
						  token 会注册在axios的方法中，具体请看 main.js
						*/
						localStorage.setItem('token', token);
						// 跳转登录后的页面， 或者弹出成功成功
					} else {
						that.message = res.data.message
						alert(that.message)
						// 用户名密码错误， 前端进行处理
					}
				})	
			},
			//获取验证码
			//获取验证码 并只验证手机号 是否正确
			getCodeLogin(){
			   this.$refs['loginForm'].validateField('adminphone', (err) =>{
			        if(err){
			            console.log('未通过')
			            return;
			        }else{
			            console.log('已通过')
			            this.tackBtn();   //验证码倒数60秒
			            let data = {'phone':this.loginForm.adminphone}  //POST 请求需要 转化为Form
			            /*this.axios.post('http://47.100.125.167:7080/auth/sms_code', data)
						.then( res => {
							console.log(res.data);
			            })*/
			        }
			    })
			},
			getCodeRegister(){
			   this.$refs['registerForm'].validateField('adminphone', (err) =>{
			        if(err){
			            console.log('未通过')
			            return;
			        }else{
			            console.log('已通过')
			            this.tackBtn();   //验证码倒数60秒
			            let data = {'phone':this.registerForm.adminphone}  //POST 请求需要 转化为Form
			            /*this.axios.post('http://47.100.125.167:7080/auth/sms_code', data)
						.then( res => {
							console.log(res.data);
			            })*/
			        }
			    })
			},
			tackBtn(){       //验证码倒数60秒
				let time = 60;
				let timer = setInterval(() => {
					if(time == 0){
						clearInterval(timer);
						this.valiBtn = '获取验证码';
						this.disabled = false;
					}else{
						this.disabled = true;
						this.valiBtn = time + '秒后重试';
						time--;
					}
				}, 1000);
			},
			LoginSms: function() {
				let that = this;
				let data = {
					"phone": this.loginForm.adminphone,
					//"password": this.loginForm.password
				} // 登录的Schema
				this.axios.post('http://47.100.125.167:7080/auth/login', data)
				.then(res => {
					console.log(res)
					if (res.data.code == 0) {
						let token = res.data.data.token; // 用户的token
						/**
						  存储在本地，类似于cookie，后期用于登录验证
						  token 会注册在axios的方法中，具体请看 main.js
						*/
						localStorage.setItem('token', token);
						// 跳转登录后的页面， 或者弹出成功成功
					} else {
						that.message = res.data.message
						alert(that.message)
						// 用户名密码错误， 前端进行处理
					}
				})	
			},
			Register: function() {
				let that = this;
				let data={
					company_name:this.registerForm.companyname,
					industry:this.registerForm.industry,
					name:this.registerForm.adminname,
					//phone:this.registerForm.adminphone,
					account:this.registerForm.adminaccount,
					password:this.registerForm.password
				}
				
				this.$refs['registerForm'].validate((valid) => {
				    if (valid) {
						this.axios.post('http://47.100.125.167:7080/auth/register', data)
						.then(res => {
							console.log(res)
							if (res.data.code == 0) {
								alert('恭喜您，成功开通！');
								let token = res.config.data;
								localStorage.setItem('token', token);
							} else {
								that.message = res.data.message
								alert(that.message)
							}
						})
						setTimeout(() => {
							this.showRegister = false
							this.showLogin = true
						}, 3000);
				    } else {
						console.log('error submit!!');
				        return false;
				    }
				})
			},
			/*onLogin() {
				let {adminaccount,password} = this.loginForm;
				if (adminaccount == 'admin' && password == 'admin') {
					sessionStorage.setItem('username', adminaccount);
					this.$router.push('/index')
				} else {
					alert('用户名和密码不匹配')
				}
			},*/
			
			ToRegister() {
				this.showRegister = true
				this.showLogin = false
			},
			ToLogin() {
				this.showRegister = false
				this.showLogin = true
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			
		}
	}
</script>

<style>
	body {
		background-color: #004343;
	}
	.verification .el-input{
		width:138px;
		margin-right: 10px;
	}
	.verification .el-button{
	}
</style>
