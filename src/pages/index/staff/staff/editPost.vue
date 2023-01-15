<template>
	<div>
		<el-form ref="form" :model="post" label-width="80px">
			<el-form-item label="岗位名称">
				<el-input v-model="post.name"></el-input>
			</el-form-item>
			<el-form-item label="所属部门">
				<el-select v-model="post.dept" placeholder="请选择部门" >
					<el-option v-for="(item,index) in alldeptlist" :key="item.id" :label="item.deptname" :value="item.deptname"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="岗位意义">
				<el-input type="textarea" v-model="post.sense"></el-input>
			</el-form-item>
			<el-form-item label="工作概要">
				<el-input type="textarea" v-model="post.resume"></el-input>
			</el-form-item>
			<el-form-item label="岗位权力">
				<el-input type="textarea" v-model="post.power"></el-input>
			</el-form-item>
			<el-form-item label="技能要求">
				<el-input type="textarea" v-model="post.skill"></el-input>
			</el-form-item>
			<el-form-item label="资产配置">
				<el-input type="textarea" v-model="post.config"></el-input>
			</el-form-item>
			<el-form-item label="招聘要求">
				<el-input type="textarea" v-model="post.recruit"></el-input>
			</el-form-item>
			<el-form-item label="工作环境">
				<el-input type="textarea" v-model="post.condition"></el-input>
			</el-form-item>
			<el-form-item label="发展方向">
				<el-input type="textarea" v-model="post.growth"></el-input>
			</el-form-item>
			<el-form-item label="福利标准">
				<el-input type="textarea" v-model="post.welfare"></el-input>
			</el-form-item>
			<el-form-item label="淘汰标准">
				<el-input type="textarea" v-model="post.oust"></el-input>
			</el-form-item>
			
			<el-form-item label="工作内容">
				<div v-for="(item, index) in post.content" :key="index" class="addpost">
					<el-form-item>
						<el-select v-model="item.type" placeholder="工作类型" class="w90">
							<el-option label="运营工作" value="运营工作"></el-option>
						    <el-option label="管理工作" value="管理工作"></el-option>
						    <el-option label="技能工作" value="技能工作"></el-option>
							<el-option label="岗位工作" value="岗位工作"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input v-model="item.content" placeholder="工作内容"></el-input>
					</el-form-item>
					<el-form-item>
						<el-select v-model="item.kpistandard" placeholder="评分标准" class="w90">
							<el-option label="0-1分" value="1"></el-option>
						    <el-option label="0-2分" value="2"></el-option>
						    <el-option label="0-3分" value="3"></el-option>
							<el-option label="0-4分" value="4"></el-option>
							<el-option label="0-5分" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input v-model="item.label" placeholder="搜索标签"></el-input>
					</el-form-item>
					<el-form-item>
						<i class="el-icon-delete" @click="deleteItem(item, index)"></i>
					</el-form-item>
				</div>
				<el-button @click="addItem" type="primary" plain>新增</el-button>
			</el-form-item>
				
			<el-form-item>
				<el-button type="primary" @click="edit()">立即提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	let id = 1;

	export default {
		data() {
			return {
				alldeptlist: [],
				post: {
					name: '',
					dept: '',
					sense: '',
					resume: '',
					power: '',
					skill: '',
					config: '',
					recruit: '',
					condition: '',
					growth: '',
					welfare: '',
					oust: '',
					content: [
						{
							type:'',
							content: '',
							score: '',
							label:'',
						},
					],
				}
			}
		},
		created(){
			let postid = this.$route.params.id
			let params = new URLSearchParams();
			params.append("postid", postid);
			let that = this;
			that.axios.post('api/contentlist/', params)
			  .then(function (resp) {
				  console.log("岗位是",resp.data);
				  that.post.name = resp.data[0].postname;
				  that.post.dept = resp.data[0].dept['deptname'];
				  that.post.sense = resp.data[0].sense;
				  that.post.resume = resp.data[0].resume;
				  that.post.power = resp.data[0].power;
				  that.post.skill = resp.data[0].skill;
				  that.post.config = resp.data[0].config;
				  that.post.recruit = resp.data[0].recruit;
				  that.post.condition = resp.data[0].condition;
				  that.post.growth = resp.data[0].growth;
				  that.post.welfare = resp.data[0].welfare;
				  that.post.oust = resp.data[0].oust;
				  that.post.content = resp.data[0].content;
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
			addItem: function() {
				this.post.content.push({
					type: '',
					content: '',
					score: '',
					label:'',
				})
			},
			deleteItem: function(item, index) {
				this.post.content.splice(index, 1)
			},
			edit:function(){
				let data={
					id:this.$route.params.id,
					name: this.post.name,
					dept: this.post.dept,
					sense: this.post.sense,
					resume: this.post.resume,
					power: this.post.power,
					skill: this.post.skill,
					config: this.post.config,
					recruit: this.post.recruit,
					condition: this.post.condition,
					growth: this.post.growth,
					welfare: this.post.welfare,
					oust: this.post.oust,
					content:this.post.content,
				}
				let post = JSON.stringify(data);
				console.log(post);
				let params = new URLSearchParams();
				params.append("post", post);
				this.axios.post('api/editpost/', params)
				.then(res => {
					console.log(res)
					if (res.data.code == 0) {
						alert('恭喜您，修改岗位成功！');
						this.$router.push('/staff/list')
					} else {
						this.message = res.data.message
						alert(this.message)
					}
				})
			},
		}
	}
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	.el-dialog{
		width:800px
	}
	.el-dialog__body .el-table{
		padding: 0;
	}
	.addpost{
		width:100%;
		display: block;
		overflow: hidden;
	}
	.addpost .el-form-item{
		float: left;
	}
	.addpost .el-input{
		width:250px
	}
	.addpost .el-form-item__content{
		margin-right: 20px;
		margin-left: 0 !important;
		margin-bottom: 10px;
	}
	.el-button{
		
	}
	.addpost .el-input--suffix{
		width:120px !important;
		margin-right: 0;
	}
</style>
