<template>
	<div>
		<el-form ref="form" :model="post" label-width="80px">
			<el-form-item label="岗位名称">
				<el-input v-model="post.name"></el-input>
			</el-form-item>
			<el-form-item label="所属部门">
				<el-select v-model="post.dept" placeholder="请选择部门">
					<el-option label="设计部" value="design"></el-option>
					<el-option label="市场部" value="market"></el-option>
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
				<el-input type="textarea" v-model="post.requirement"></el-input>
			</el-form-item>
			<el-form-item label="资产配置">
				<el-input type="textarea" v-model="post.allocation"></el-input>
			</el-form-item>
			<el-form-item label="招聘要求">
				<el-input type="textarea" v-model="post.employ"></el-input>
			</el-form-item>
			<el-form-item label="工作环境">
				<el-input type="textarea" v-model="post.environment"></el-input>
			</el-form-item>
			<el-form-item label="发展方向">
				<el-input type="textarea" v-model="post.grow"></el-input>
			</el-form-item>
			<el-form-item label="福利标准">
				<el-input type="textarea" v-model="post.welfare"></el-input>
			</el-form-item>
			<el-form-item label="淘汰标准">
				<el-input type="textarea" v-model="post.eliminate"></el-input>
			</el-form-item>
			
			<el-form-item label="运营工作">
				<div v-for="(item, index) in post.operationItem" :key="index" class="addpost">
					<el-form-item :prop="'operationItem.' + index + '.operationContent'">
						<el-input v-model="item.operationContent" placeholder="运营工作内容"></el-input>
					</el-form-item>
					<el-form-item :prop="'operationItem.' + index + '.operationRate'">
						<el-select v-model="item.operationRate" placeholder="评分标准" class="w90">
							<el-option label="0-1分" value="1"></el-option>
						    <el-option label="0-2分" value="2"></el-option>
						    <el-option label="0-3分" value="3"></el-option>
							<el-option label="0-4分" value="4"></el-option>
							<el-option label="0-5分" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :prop="'operationItem.' + index + '.operationLabel'">
						<el-input v-model="item.operationLabel" placeholder="搜索标签"></el-input>
					</el-form-item>
					<el-form-item>
						<i class="el-icon-delete" @click="deleteOperationItem(item, index)"></i>
					</el-form-item>
				</div>
				<el-button @click="addOperationItem" type="primary" plain>新增</el-button>
			</el-form-item>
			
			<el-form-item label="管理工作">
				<div v-for="(item, index) in post.manageItem" :key="index" class="addpost">
					<el-form-item :prop="'manageItem.' + index + '.manageContent'">
						<el-input v-model="item.manageContent" placeholder="管理工作内容"></el-input>
					</el-form-item>
					<el-form-item :prop="'manageItem.' + index + '.manageRate'">
						<el-select v-model="item.manageRate" placeholder="评分标准" class="w90">
							<el-option label="0-1分" value="1"></el-option>
						    <el-option label="0-2分" value="2"></el-option>
						    <el-option label="0-3分" value="3"></el-option>
							<el-option label="0-4分" value="4"></el-option>
							<el-option label="0-5分" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :prop="'manageItem.' + index + '.manageLabel'">
						<el-input v-model="item.manageLabel" placeholder="搜索标签"></el-input>
					</el-form-item>
					<el-form-item>
						<i class="el-icon-delete" @click="deleteManageItem(item, index)"></i>
					</el-form-item>
				</div>
				<el-button @click="addManageItem" type="primary" plain>新增</el-button>
			</el-form-item>
			
			<el-form-item label="技能工作">
				<div v-for="(item, index) in post.skillItem" :key="index" class="addpost">
					<el-form-item :prop="'skillItem.' + index + '.skillContent'">
						<el-input v-model="item.skillContent" placeholder="技能工作内容"></el-input>
					</el-form-item>
					<el-form-item :prop="'skillItem.' + index + '.skillRate'">
						<el-select v-model="item.skillRate" placeholder="评分标准" class="w90">
							<el-option label="0-1分" value="1"></el-option>
						    <el-option label="0-2分" value="2"></el-option>
						    <el-option label="0-3分" value="3"></el-option>
							<el-option label="0-4分" value="4"></el-option>
							<el-option label="0-5分" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :prop="'skillItem.' + index + '.skillLabel'">
						<el-input v-model="item.skillLabel" placeholder="搜索标签"></el-input>
					</el-form-item>
					<el-form-item>
						<i class="el-icon-delete" @click="deleteSkillItem(item, index)"></i>
					</el-form-item>
				</div>
				<el-button @click="addSkillItem" type="primary" plain>新增</el-button>
			</el-form-item>
			
			<el-form-item label="岗外工作">
				<div v-for="(item, index) in post.outskillItem" :key="index" class="addpost">
					<el-form-item :prop="'outskillItem.' + index + '.outskillContent'">
						<el-input v-model="item.outskillContent" placeholder="岗外工作内容"></el-input>
					</el-form-item>
					<el-form-item :prop="'outskillItem.' + index + '.outskillRate'">
						<el-select v-model="item.outskillRate" placeholder="评分标准" class="w90">
							<el-option label="0-1分" value="1"></el-option>
						    <el-option label="0-2分" value="2"></el-option>
						    <el-option label="0-3分" value="3"></el-option>
							<el-option label="0-4分" value="4"></el-option>
							<el-option label="0-5分" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :prop="'outskillItem.' + index + '.outskillLabel'">
						<el-input v-model="item.outskillLabel" placeholder="搜索标签"></el-input>
					</el-form-item>
					<el-form-item>
						<i class="el-icon-delete" @click="deleteOutskillItem(item, index)"></i>
					</el-form-item>
				</div>
				<el-button @click="addOutskillItem" type="primary" plain>新增</el-button>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="">立即提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	let id = 1;

	export default {
		data() {
			return {
				post: {
					name: '',
					dept: '',
					sense: '',
					resume: '',
					power: '',
					requirement: '',
					allocation: '',
					employ: '',
					environment: '',
					grow: '',
					welfare: '',
					eliminate: '',
					operate: '',
					manage: '',
					skill: '',
					outskill: '',
					
					operationContent: '',
					operationRate: '',
					operationLabel:'',
					operationItem: [],
					manageContent: '',
					manageRate: '',
					manageLabel:'',
					manageItem: [],
					skillContent: '',
					skillRate: '',
					skillLabel:'',
					skillItem: [],
					outskillContent: '',
					outskillRate: '',
					outskillLabel:'',
					outskillItem: []
				}
			}
		},
		methods: {
			addOperationItem() {
				this.post.operationItem.push({
					operationContent: '',
					operationRate: '',
					operationLabel:'',
				})
			},
			addManageItem() {
				this.post.manageItem.push({
					manageContent: '',
					manageRate: '',
					manageLabel:'',
				})
			},
			addSkillItem() {
				this.post.skillItem.push({
					skillContent: '',
					skillRate: '',
					skillLabel:'',
				})
			},
			addOutskillItem() {
				this.post.outskillItem.push({
					outskillContent: '',
					outskillRate: '',
					outskillLabel:'',
				})
			},
			deleteOperationItem(item, index) {
				this.post.operationItem.splice(index, 1)
			},
			deleteManageItem(item, index) {
				this.post.manageItem.splice(index, 1)
			},
			deleteSkillItem(item, index) {
				this.post.skillItem.splice(index, 1)
			},
			deleteOutskillItem(item, index) {
				this.post.outskillItem.splice(index, 1)
			}
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
		width:200px
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
