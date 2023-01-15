<template>
	<div>
		<el-form :model="forgetForm" :rules="rules" ref="forgetForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="管理员手机" prop="adminphone">
				<el-input v-model="forgetForm.adminphone"></el-input>
			</el-form-item>
			<el-form-item label="短信验证码" prop="smscode" class="verification">
				<el-input v-model="forgetForm.smscode"></el-input>
				<el-button @click="getCodeForget">{{valiBtn}}</el-button>
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
				valiBtn:'获取验证码',
				smscode: '', //修改密码时的验证码
				forgetForm: {
					adminphone: '',
					password: '',
					checkpassword: '',
					smscode: ''
				},
				rules: {
					adminphone: [{validator: checkPhone,trigger: 'blur'}],
					password: [{validator: validatePass,trigger: 'blur'}],
					checkpassword: [{validator: validatePass2,trigger: 'blur'}]
				}
			};
		},
		methods: {
			onReset: function() {
				// 先验证验证码
				if (this.forgetForm.smscode == '' || this.smscode == '' || this.smscode != this.forgetForm.smscode) {
					alert('验证码不正确');
				}
				var userid = window.localStorage.getItem("logintoken")
				let data={
					id:userid,
					phone:this.forgetForm.adminphone,
					password:this.forgetForm.password,
				}
				let password = JSON.stringify(data);
				let params = new URLSearchParams();
				params.append("password", password);
				this.$refs['forgetForm'].validate((valid) => {
				    if (valid) {
						this.axios.post('api/editpwd/', params)
						.then(res => {
							console.log(res)
							if (res.data.code == 0) {
								alert('恭喜您，修改成功！');
							} else {
								this.message = res.data.message
								alert(this.message)
							}
						})
				    } else {
						console.log('error submit!!');
				    }
				})
			},
			
			//获取修改密码短信验证码
			getCodeForget(){
			   this.$refs['forgetForm'].validateField('adminphone', (err) =>{
			        if(err){
			            console.log('未通过', this.forgetForm.adminphone)
			            return;
			        }else{
			            console.log('已通过', this.forgetForm.adminphone)
						let phone = this.forgetForm.adminphone
						let staffid = window.localStorage.getItem("logintoken")
						let params = new URLSearchParams();
						params.append("staffid", staffid);
						let that = this;
						that.axios.post('api/stafflist/', params)
						  .then(function (resp) {
							  console.log(resp.data);
							  if(phone == resp.data[0].phone){
								  that.tackBtn(); //验证码倒数60秒	
								  let myurl = 'api/smscode/' + phone + "/"
								  that.axios.get(myurl)
								  .then(res => {
								  	console.log('服务端生成的验证码', res.data) 
								  	that.smscode = res.data
								  })
							  }else{
								  alert('手机号码与注册时的号码不一致，请重新输入！')
							  }
						  })
						  .catch(function (error) {
							  console.log(error);
						  });
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
		}
	}
</script>

<style>
	.verification .el-input{
		width:138px;
		margin-right: 10px;
	}
</style>
