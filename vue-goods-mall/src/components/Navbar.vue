<template>
	<div  class="navbar">
		<div class="photo">
			<img src="@/assets/navbar.png" style="height:60px;line-height: ;" >
			<i class="el-icon-s-fold" style="vertical-align: middle;"></i>
		</div>
		<el-menu :model="ruleForm" class="el-menu-demo" mode="horizontal" background-color="#545c63" text-color="#fff"
		 active-text-color="#ffd04b">
			<el-row class="demo-avatar demo-basic">
				<el-col :span="12">
					<div class="demo-basic--circle">
						<div class="block">
							<el-avatar :src="ruleForm.avatar" style="vertical-align: middle;"></el-avatar>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-submenu index="2">
				<template slot="title">{{ruleForm.username}}</template>
				<el-menu-item index="2-1">消息</el-menu-item>
				<el-menu-item index="2-2">设置</el-menu-item>
				<el-menu-item index="2-3">退出</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	import { Admin } from '@/api/index.js'
	export default {
		data() {
			return {
				ruleForm:{
					id:'',
					username:'',
					password:'',
					fullname:'',
					tel:'',
					avatar:'',
				}
				
			}
		},
		created(){
			this.loadAdmin();
		},
		methods: {
			async loadAdmin(){
				let id=sessionStorage.uid;
				console.log(id);
				let{status,data}=await Admin.message({id});
				if(status){
					this.ruleForm = data
				}
			}
		}
	}
</script>

<style>
	
	.navbar {
		background-color: #545c64;
		color: white;
		line-height: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* 垂直居中 */
	}
	.navbar .photo{
		height: 60px!important;
		display: flex;
		align-items: center;
	}
	.el-menu-demo {
		display: flex;
		position: absolute;
		right: 10px;
		align-items: center;
	}

</style>
