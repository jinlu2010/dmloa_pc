<template>
	<div>
		<el-form ref="form" :model="info" label-width="80px">
			<el-form-item label="企业Logo">
				<el-upload class="avatar-uploader" :show-file-list="false" action="http://upload.qiniup.com" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="postData">
				  <img v-if="info.pic" :src="info.pic" class="avatar" >
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<!-- <div>
					<input @change="uploadInputchange" type="file" id="uploadFileInput" name="uploadFileInput" accept="image/*">
					<img :src="info.pic" style="width:100px">
				</div> -->
			</el-form-item>
			
			<el-form-item label="企业名称">
				<el-input v-model="info.name"></el-input>
			</el-form-item>
			<el-form-item label="行业类型">
				<el-select v-model="info.type" placeholder="请选择行业类型">
					<el-option label="快消品" value="快消品"></el-option>
					<el-option label="美容化妆" value="美容化妆"></el-option>
					<el-option label="企业咨询" value="企业咨询"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="战略目标">
				<el-input type="textarea" v-model="info.goal"></el-input>
			</el-form-item>
			<el-form-item label="人员规模">
				<el-select v-model="info.amount" placeholder="请选择人员规模">
					<el-option label="20人以下" value="20人以下"></el-option>
					<el-option label="21-100人" value="21-100人"></el-option>
					<el-option label="101-500人" value="101-500人"></el-option>
					<el-option label="500人以上" value="500人以上"></el-option>
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
				<el-button type="primary" @click="editCompany">立即提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		data() {
			return {
				imageUrl: '',
				postData: {
					token: ''
				},
				// imgLoadPercent: '',
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
		created(){
			let staffid = window.localStorage.getItem("logintoken");
			let params = new URLSearchParams();
			params.append("staffid", staffid);
			let that = this;
			that.axios.post('api/companylist/', params)
			  .then(function (resp) {
				  console.log("企业列表是",resp.data);
				  that.info.name = resp.data[0].companyname;
				  that.info.type = resp.data[0].type;
				  that.info.goal = resp.data[0].goal;
				  that.info.amount = resp.data[0].amount;
				  that.info.phone = resp.data[0].phone;
				  that.info.address = resp.data[0].address;
				  that.info.email = resp.data[0].email;
				  that.info.pic = resp.data[0].logo;
			  })
			  .catch(function (error) {
				  console.log(error);
			  });
			
			this.get_token()
		},
		methods: {
			get_token() {
				this.axios.get('api/qiniu/').then((result) => {
					console.log('获取的token数据',result.data.uptoken);
					this.postData.token = result.data.uptoken;
			    });
			},
			
			// //触发input change事件
			// uploadInputchange() {
			// 	let file = document.getElementById("uploadFileInput").files[0];   //选择的图片文件
			// 	this.get_token();
			// 	this.uploadImgToQiniu(file);
			// },
			      
			// //上传图片到七牛
			// uploadImgToQiniu(file) {
			// 	let that=this
			// 	const axiosInstance = this.axios.create({ withCredentials: false });    
			// 	//withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
			// 	let data = new FormData();
			// 	data.append('token', that.uptoken);     //七牛需要的token
			// 	data.append('file', file);
			// 	axiosInstance({
			// 		method: 'POST',
			// 		url: 'http://up-z0.qiniup.com',  //上传地址
			// 		data: data,
			// 		contentType: false,
			// 		processData: false,
			// 		timeout: 30000,      //超时时间，因为图片上传有可能需要很久
			// 		onUploadProgress: (e) => {
			// 			//imgLoadPercent 是上传进度，可以用来添加进度条
			// 			var complete = (e.loaded / e.total);
			// 			if (complete < 1) {
			// 				that.imgLoadPercent = (complete * 100).toFixed(2) + '%';
			// 			}
			// 		},
			// 	}).then(data => {
			// 		that.info.pic="http://qwfcd1gd9.hd-bkt.clouddn.com/"+data.data.key
			// 		console.log('图片外链终于取到了', that.info.pic)
			// 		that.imgLoadPercent = '100%';
			//       }).catch(function (err) {
			//           //上传失败
			//     });
			// },
			editCompany() {
				var userid = window.localStorage.getItem("logintoken");
				let data={
					staffid:userid,
					companyname:this.info.name,
					phone:this.info.phone,
					address:this.info.address,
					email:this.info.email,
					logo:this.info.pic,
					type:this.info.type,
					amount:this.info.amount,
					goal:this.info.goal
				}
				let company = JSON.stringify(data);
				let params = new URLSearchParams();
				params.append("company", company);
				this.axios.post('api/editcompany/', params)
				  .then(res => {
				  	console.log(res)
				  	if (res.data.code == 0) {
				  		alert('恭喜您，修改成功！');
						this.reload()
				  	} else {
				  		this.message = res.data.message
				  		alert(this.message)
				  	}
				  })
			},
			handleAvatarSuccess(res, file) {
				this.info.pic = "http://image.xixiplan.com/" + res.key;
				console.log('res是',res)
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
