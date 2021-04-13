<template>
	<div id="breadcrumb">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item v-for="(v,i) in lists" :key="i">
		  <router-link :to="v.path">{{v.meta.title}}</router-link>
		  </el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lists:[]
			}
		},
		created() {
			console.log(this.$route.matched);
			this.lists=this.$route.matched;
		},
		watch:{
			$route(to,from){
				this.lists = to.matched;
			}
		}
	}
</script>

<style>
</style>
