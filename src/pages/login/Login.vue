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
				<el-form-item label="管理员姓名" prop="adminname">
					<el-input v-model="registerForm.adminname"></el-input>
				</el-form-item>
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
				loginsmscode: '', // 短信登录验证码
				registersmscode: '', //注册时的验证码
				activeName: 'first',
				showLogin: true,
				showRegister: false,
				valiBtn:'获取验证码',
				phone:'',
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
					adminaccount: [{required: true,message: '请输入用户名',trigger: 'blur'}],
					adminphone: [{required: true,validator: checkPhone,trigger: 'blur'}],
					password: [{required: true,validator: validatePass,trigger: 'blur'}],
					companyname: [{required: true,message: '请输入公司名称',trigger: 'blur'}],
					industry: [{message: '请选择行业类型',trigger: 'change'}],
					adminname: [{required: true,message: '请输入管理员姓名',trigger: 'blur'}],
					smscode: [{required: true,message: '请输入短信验证码',trigger: 'blur'},]
				},
			};
		},
		methods: {
			LoginPwd: function () {
				let that = this;
				var data = {
					"account": this.loginForm.adminaccount,
					"password": this.loginForm.password
				}
				let LoginInfo = JSON.stringify(data);
				console.log(LoginInfo);
				let params = new URLSearchParams();
				params.append('LoginInfo', LoginInfo);
				this.axios.post('api/loginpwd/',params)
				.then(function (res) {
					console.log(res.data)
					if (res.data.code == 0) {
			            alert(res.data.message)
					} else {
						alert(res.data.message);
						let token = res.data.userid;
						localStorage.setItem('logintoken', token);
						that.$router.push('/index')
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			
			//获取登录短信验证码
			getCodeLogin(){
			   this.$refs['loginForm'].validateField('adminphone', (err) =>{
			        if(err){
			            console.log('未通过', this.loginForm.adminphone)
			            return;
			        }else{
			            console.log('已通过', this.loginForm.adminphone)
						let phone = this.loginForm.adminphone
						this.tackBtn(); //验证码倒数60秒	
						let myurl = 'api/smscode/' + phone + "/"
						this.axios.get(myurl)
						.then(res => {
							console.log('服务端生成的验证码', res.data) 
							this.loginsmscode = res.data
						})
			        }
			    })
			},
			
			//获取注册短信验证码
			getCodeRegister(){
			   this.$refs['registerForm'].validateField('adminphone', (err) =>{
			        if(err){
			            console.log('未通过', this.registerForm.adminphone)
			            return;
			        }else{
			            console.log('已通过', this.registerForm.adminphone)
			            let phone = this.registerForm.adminphone
			            this.tackBtn(); //验证码倒数60秒	
			            let myurl = 'api/smscode/' + phone + "/"
			            this.axios.get(myurl)
			            .then(res => {
			            	console.log('服务端生成的验证码', res.data) 
			            	this.registersmscode = res.data
			            })
			        }
			    })
			},
			
			//验证码倒数60秒
			tackBtn(){       
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
				// 先验证验证码
				if (this.loginForm.smscode == '' || this.loginsmscode == '' || this.loginsmscode != this.loginForm.smscode) {
					alert('验证码不正确');
					return
				}
				let phone = this.loginForm.adminphone;
				let myurl = 'api/loginsms/' + phone + "/";
				this.axios.get(myurl)
				.then(res => {
					console.log(res)
					if (res.data.code == 1) {
						alert('登录成功');
						let token = res.data.userid
						localStorage.setItem('logintoken', token);
						this.$router.push('/index')
						return
					}
					if (res.data.code == 0) {
						alert('该手机号没有注册,请先去注册');
						return
					}
				})
			},
			
			Register: function() {
				if (this.registerForm.smscode == '' || this.registersmscode == '' || this.registersmscode != this.registerForm.smscode) {
					alert('验证码不正确');
					return
				}
				let data={
					company_name:this.registerForm.companyname,
					industry:this.registerForm.industry,
					name:this.registerForm.adminname,
					phone:this.registerForm.adminphone,
					account:this.registerForm.adminaccount,
					password:this.registerForm.password
				}
				let newcompany = JSON.stringify(data);
				console.log(newcompany);
				let params = new URLSearchParams();
				params.append("newcompany", newcompany);
				this.$refs['registerForm'].validate((valid) => {
				    if (valid) {
						this.axios.post('api/register/', params)
						.then(res => {
							console.log(res)
							if (res.data.code == 0) {
								alert('恭喜您，成功开通！');
								let token = res.data.userid;
								// localStorage.setItem('token', token);
							} else {
								this.message = res.data.message
								alert(this.message)
							}
						})
						setTimeout(() => {
							this.showRegister = false
							this.showLogin = true
						}, 3000);
				    } else {
						console.log('error submit!!');
						this.showRegister = true
						this.showLogin = false
				        return false;
				    }
				})
			},
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
</style>
