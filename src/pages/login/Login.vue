<template>
	<div id="login">
		<h1>段马乐OA管理后台</h1>
		<div class="login-layout">
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
							<el-button type="primary" @click="onRegister">注册</el-button>
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
							<el-button @click="getCode">{{valiBtn}}</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="LoginSms">登录</el-button>
							<el-button type="primary" @click="onRegister">注册</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
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
				loginForm: {
					adminaccount: '',
					password: '',
					adminphone: '',
					smscode: ''
				},
				rules: {
					adminaccount: [{
							message: '请输入用户名',
							trigger: 'blur'
						}
					],
					adminphone: [{
						validator: checkPhone,
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
				},
				valiBtn:'获取验证码',
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
			//获取验证码
			//获取验证码 并只验证手机号 是否正确
			getCode(){
			   this.$refs['loginForm'].validateField('adminphone', (err) =>{
			        if(err){
			            console.log('未通过')
			            return;
			        }else{
			            console.log('已通过')
			            this.tackBtn();   //验证码倒数60秒
			            let data = {'phone':this.loginForm.adminphone}  //POST 请求需要 转化为Form
			            this.axios.post('http://47.100.125.167:7080/auth/sms_code', data)
						.then( res => {
			                console.log(res);
							console.log(res.data);
			            })
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
			onSubmit(formName) {  //点击登录 验证手机& 验证码是否符合条件
				this.$refs[formName].validate((valid) => {    // 为表单绑定验证功能
					if (valid) {
						let fd = new FormData();
				        fd.append('phone', this.loginForm.adminphone);
				        fd.append('sms_type', this.loginForm.smscode);
				        this.$axios({
							method: 'POST', data: fd, url: 'http://47.100.125.167:7080/auth/sms_code',
				        }).then(res => {
							console.log(res);
							if (res.data.EID == 0) {
								var token = res.data.Data[0].token;
								localStorage.setItem('token',token);
								this.$message({showClose: true,message: '登录成功',type: 'success'})
								this.$router.push({path:'/indexx'});
				            } else {
								this.$message({showClose: true,message: res.data.Err,type: 'warning'})
							}
				        });
				    } else {
						this.dialogVisible = true;
						return false;
					}
				});
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
			
			onRegister() {
				this.$router.push('/register')
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
