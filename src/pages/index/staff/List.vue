<template>
	<div>
		<div class="stafflist">
			<div class="staffmenu">
				<h2>部门岗位</h2>
				<el-tree :data="alldeptlist" node-key="id" :expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{ node, data }" >
						<span @click="handleNodeClick(node, data)">{{ node.label }}</span>
				        <span>
							<el-button type="text" size="mini" @click="getdeptid(node, data)">编辑</el-button>
							<el-button type="text" size="mini" @click="remove(node, data)">删除</el-button>
				        </span>
				    </span>
				</el-tree>
			</div>
			
			<div class="stafftable" ref="stafftable">
				<h2>成员列表</h2>
				<el-table :data="stafflist" style="width: 100%">
					<el-table-column prop="name" label="姓名" width="100"></el-table-column>
				    <el-table-column prop="post" label="岗位" width="120"></el-table-column>
					<el-table-column prop="dept" label="部门" width="100"></el-table-column>
					<el-table-column prop="phone" label="手机" width="150"></el-table-column>
					<el-table-column prop="email" label="邮箱" width="250"></el-table-column>
					<el-table-column label="操作" width="120">
						<template slot-scope="scope">
							<el-button @click="handleEdit(scope.row)" type="text" size="small">详细</el-button>
							<el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
							<el-button @click="handleKpi(scope.row)" type="text" size="small">绩效</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!--编辑部门，弹窗-->		
		<el-dialog title="编辑部门" :visible.sync="deptpopup">
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
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="deptpopup = false">取 消</el-button>
		    <el-button type="primary" @click="edit()">确 定</el-button>
		  </div>
		</el-dialog>
		
	</div>
</template>

<script>	
	export default {
		inject: ['reload'],
		data() {
			return {
				stafflist:[],
				alldeptlist:[],
				message:'',
				form: {
					id: '',
					deptname: '',
					deptsense: '',
					deptgoal: '',
					deptduty: '',
				},
				deptpopup:false,
			}
		},
		
		mounted(){
			let that = this
			var userid = window.localStorage.getItem("logintoken")
			console.log(userid)
			
			that.axios.post("api/allstafflist/")
			  .then(function (resp) {
			    console.log(resp.data);
				var staff = resp.data;
				that.stafflist = resp.data;
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
			
			that.axios.post("api/alldeptlist/")
			  .then(function (resp) {
			    console.log(resp.data);
				var post = JSON.stringify(resp.data)
				post = post.replace(/deptname/g, "label")
				post = post.replace(/post/g, "children")
				post = post.replace(/childrenname/g, "label")
				post = JSON.parse(post)
				that.alldeptlist = post
				that.$forceUpdate()
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		},
		
		methods: {
			handleNodeClick(data) {
				console.log(data.label);
				console.log(data.id);
				let that = this;
				if (data.label.indexOf("部") != -1) {
					let deptid = data.id
					let params = new URLSearchParams();
					params.append("deptid", deptid);
					that.axios.post('api/staffdeptlist/', params)
					  .then(function (resp) {
					    console.log(resp.data);
					  	var staff = resp.data;
					  	that.stafflist = resp.data;
					  })			
				}else{
					let postid = data.id;
					let params = new URLSearchParams();
					params.append("postid", postid);
					that.axios.post('api/staffpostlist/', params)
					  .then(function (resp) {
					    console.log(resp.data);
					  	var staff = resp.data;
					  	that.stafflist = resp.data;
					  })
				}
			},
			
			getdeptid(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				let postid = data.id
				let that = this;
				if (data.label.indexOf("部") != -1) {
					this.deptpopup = true;
					let deptid = data.id
					let params = new URLSearchParams();
					params.append("deptid", deptid);
					that.axios.post('api/deptlist/', params)
					  .then(function (resp) {
					    console.log(resp.data);
						that.form.id = resp.data[0].id;
						that.form.deptname = resp.data[0].deptname.replace('部', '');
						that.form.deptsense = resp.data[0].sense;
						that.form.deptgoal = resp.data[0].goal;
						that.form.deptduty = resp.data[0].duty;
					  })
					  .catch(function (error) {
					    console.log(error);
					  });			
				}else{
					this.$router.push({
						name: 'editpost',
						params: {
						   	id: postid
						}
					})
				}
			},
			
			edit:function(){
				let data={
					id:this.form.id,
					name:this.form.deptname+'部',
					sense:this.form.deptsense,
					goal:this.form.deptgoal,
					duty:this.form.deptduty
				}
				let dept = JSON.stringify(data);
				console.log(dept);
				let params = new URLSearchParams();
				params.append("dept", dept);
				this.axios.post('api/editdept/', params)
				.then(res => {
					console.log(res)
					if (res.data.code == 0) {
						alert('恭喜您，修改部门成功！');
						this.reload()
					} else {
						this.message = res.data.message
						alert(this.message)
					}
				})
			},
			
			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				
				let that = this;
				if (data.label.indexOf("部") != -1) {
					let deptid = data.id
					let params = new URLSearchParams();
					params.append("deptid", deptid);
					that.axios.post('api/deldept/', params)
					  .then(function (resp) {
					    if (resp.data.code == 0) {
							alert("删除成功")
							that.reload()
					    } else {
							that.message = resp.data.message
							alert(that.message)
						}
					  })			
				}else{
					let postid = data.id;
					let params = new URLSearchParams();
					params.append("postid", postid);
					that.axios.post('api/delpost/', params)
					  .then(function (resp) {
						if (resp.data.code == 0) {
							alert("删除成功")
							that.reload()
						} else {
							that.message = resp.data.message
							alert(that.message)
						}
					  })
				}
			},
			handleEdit(row) {
				console.log(row.id);
				this.$router.push({
					name: 'editstaff',
					params: {
					   	id: row.id
					}
				})
			},
			handleDelete(index, row) {
				console.log(index, row);
				let that = this;
				let staffid = row.id;
				let params = new URLSearchParams();
				params.append("staffid", staffid);
				that.axios.post('api/delstaff/', params)
				  .then(function (resp) {
				    if (resp.data.code == 0) {
						alert("删除成功")
						that.reload()
				    } else {
						that.message = resp.data.message
						alert(that.message)
					}
				  })
			},
			handleKpi(row) {
				console.log(row.id)
				this.$router.push({
					name: 'staffkpi',
					params: {
					   	id: row.id
					}
				})
			},
		}
	}
</script>

<style>
	.stafflist{
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: stretch;
	}
	.staffmenu{
		background-color: #FCFCFC;
		width: 250px;
		float: left;
		border-right: 1px solid #E5E5E5;
		height: auto;
	}
	.stafftable{
		padding:0;
		float:left;
	}
	.el-table{
		padding: 10px 20px;
	}
	.el-table::before{
		height: 0;
	}
	.stafftable h2{
		margin: 20px 0 0 30px;
		font-size: 18px;
	}

	.el-tree{
		background-color: #FCFCFC;
	}
	.el-tree-node{
		margin-bottom: 10px;
	}
	.el-tree-node__children .el-tree-node{
		margin: 5px 0;
	}
	.el-tree-node__content{
		padding-left: 20px !important;
	}
	
	.staffmenu h2{
		margin: 20px 0 20px 30px;
		font-size: 18px;
	}
	.custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    padding-right: 20px;
	}
</style>
