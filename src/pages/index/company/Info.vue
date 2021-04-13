<template>
	<div>
		<el-form ref="form" :model="info" label-width="80px">
			<el-form-item label="企业Logo">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="企业名称">
				<el-input v-model="info.name"></el-input>
			</el-form-item>
			<el-form-item label="行业类型">
				<el-select v-model="info.type" placeholder="请选择行业类型">
					<el-option label="快消" value="design"></el-option>
					<el-option label="美容" value="market"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="战略目标">
				<el-input type="textarea" v-model="info.goal"></el-input>
			</el-form-item>
			<el-form-item label="人员规模">
				<el-select v-model="info.amount" placeholder="请选择人员规模">
					<el-option label="10人以下" value="ten"></el-option>
					<el-option label="10-20人" value="twenty"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="info.phone"></el-input>
			</el-form-item>
			<el-form-item label="企业地址">
				<el-input v-model="info.address"></el-input>
			</el-form-item>
			<el-form-item label="联系邮箱">
				<el-input v-model="info.email"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '',
				info: {
					pic: '',
					name: '',
					type: '',
					goal: '',
					amount: '',
					phone: '',
					address: '',
					email: ''
				},
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>
