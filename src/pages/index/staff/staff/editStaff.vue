<template>
	<div>
		<el-form ref="form" :model="staff" label-width="80px">
			<el-form-item label="身份">
				<el-radio-group v-model="staff.identity">
					<el-radio label="普通员工" value="普通员工"></el-radio>
					<el-radio label="管理者" value="管理员"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="staff.name"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio-group v-model="staff.gender">
					<el-radio label="男" value="男"></el-radio>
					<el-radio label="女" value="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="出身年月">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="staff.birthday">
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
				<el-select @change="selectChanged" v-model="staff.dept" placeholder="请选择部门">
					<el-option v-for="(item,index) in alldeptlist" :key="item.id" :label="item.deptname" :value="item.deptname"></el-option>
				</el-select>
				<el-select v-model="staff.post" placeholder="请选择岗位">
					<el-option v-for="(item,index) in postlist" :key="item.id" :label="item.postname" :value="item.postname"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="汇报对象">
				<el-select v-model="staff.report" placeholder="请选择汇报对象">
					<el-option v-for="(item,index) in reportlist" :key="item.id" :label="item.name" :value="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="在职状态">
				<el-select v-model="staff.state" placeholder="在职">
					<el-option label="在职" value="在职"></el-option>
					<el-option label="离职" value="离职"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="岗位技能">
				<el-input type="textarea" v-model="staff.skill"></el-input>
			</el-form-item>
			<el-form-item label="岗外技能">
				<el-input type="textarea" v-model="staff.outskill"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="editStaff">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				reportlist: [],
				postlist: [],
				alldeptlist: [],
				staff: {
					identity: '普通员工',
					name:'',
					gender:'男',
					birthday:'',
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
		created(){
			let staffid = this.$route.params.id;
			let params = new URLSearchParams();
			params.append("staffid", staffid);
			let that = this;
			that.axios.post('api/stafflist/', params)
			  .then(function (resp) {
				  console.log("员工是",resp.data);
				  that.staff.identity = resp.data[0].usertype,
				  that.staff.name = resp.data[0].name,
				  that.staff.gender = resp.data[0].gender,
				  that.staff.birthday = resp.data[0].birthday,
				  that.staff.phone = resp.data[0].phone,
				  that.staff.email = resp.data[0].email,
				  that.staff.account = resp.data[0].account
				  that.staff.password = resp.data[0].password,
				  that.staff.dept = resp.data[0].dept['deptname'],
				  that.staff.post = resp.data[0].post['postname'],
				  that.staff.report = resp.data[0].report['name'],
				  that.staff.state = resp.data[0].state,
				  that.staff.skill = resp.data[0].skill,
				  that.staff.outskill = resp.data[0].outskill
			  })
			  .catch(function (error) {
				  console.log(error);
			  });
			  
			that.axios.post("api/reportlist/", params)
			  .then(function (resp) {
			    console.log(resp.data);
			    that.reportlist = resp.data;
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		},
		mounted() {
		    let that = this;
		    that.axios.post("api/alldeptlist/")
		      .then(function (resp) {
		        console.log(resp.data);
		        that.alldeptlist = resp.data;
		      })
		      .catch(function (error) {
		        console.log(error);
		      });
		},
		methods: {
			selectChanged(e) {
				let that = this;
				let deptid= e;
				console.log(deptid);
				let params = new URLSearchParams();
				params.append("deptid", deptid);
				this.axios.post('api/postlist/', params)
				.then(function (resp) {
				  console.log(resp.data);
				  that.postlist = resp.data;
				  if(that.postlist.length == 0){
					  alert('该部门无任何岗位，请先去创建！')
				  }
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			
			editStaff: function() {
				let data={
					id:this.$route.params.id,
					identity:this.staff.identity,
					name:this.staff.name,
					gender:this.staff.gender,
					birthday:this.staff.birthday,
					phone:this.staff.phone,
					email:this.staff.email,
					account:this.staff.account,
					password:this.staff.password,
					dept:this.staff.dept,
					post:this.staff.post,
					report:this.staff.report,
					state:this.staff.state,
					skill:this.staff.skill,
					outskill:this.staff.outskill
				}
				let staff = JSON.stringify(data);
				console.log(staff);
				let params = new URLSearchParams();
				params.append("staff", staff);
				this.axios.post('api/editstaff/', params)
				.then(res => {
					console.log(res)
					if (res.data.code == 0) {
						alert('恭喜您，修改员工成功！');
						this.$router.push('/staff/list')
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
