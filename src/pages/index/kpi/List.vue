<template>
	<el-form ref="form" :model="form">
		<div v-for="(item, index) in form.operationItem" :key="index" class="addpost">
			<el-form-item :prop="'operationItem.' + index + '.operationContent'">
				<el-input v-model="item.operationContent" placeholder="运营工作内容"></el-input>
			</el-form-item>
			<el-form-item :prop="'operationItem.' + index + '.operationRate'">
				<el-input v-model="item.operationRate" placeholder="评分标准"></el-input>
			</el-form-item>
			<el-form-item :prop="'operationItem.' + index + '.operationLabel'">
				<el-input v-model="item.operationLabel" placeholder="搜索标签"></el-input>
			</el-form-item>
			<el-form-item>
				<i class="el-icon-delete" @click="deleteItem(item, index)"></i>
			</el-form-item>
		</div>
		<el-button @click="addItem" type="primary">增加</el-button>
	</el-form>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					operationContent: '',
					operationRate: '',
					operationLabel:'',
					operationItem: []
				}
			}
		},
		methods: {
			addItem() {
				this.form.operationItem.push({
					operationContent: '',
					operationRate: '',
					operationLabel:'',
				})
			},
			deleteItem(item, index) {
				this.form.operationItem.splice(index, 1)
			}
		}
	}
</script>

<style>
	
</style>
