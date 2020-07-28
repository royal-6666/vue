<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>账户信息</span>
		</div>
		<el-form ref="form" :rules="rules" :model="form" label-width="80px" style="margin-left: 150px;margin-right: 150px;">
			<el-form-item label="账户" prop="username">
				<el-input v-model="form.username" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname" required>
				<el-input v-model="form.fullname"></el-input>
			</el-form-item>
			<el-form-item label="角色" required>
				<el-select v-model="form.role">
					<el-option v-for="item in roleList" :label="item.name" :key="item.id" :value="item.id"></el-option>
				</el-select >
			</el-form-item>

			<el-form-item label="性别" prop="sex" required>
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel" required>
				<el-input v-model="form.tel"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar" required>
				<Upload :action="action" :url='form.avatar' @success="handlerUpload($event)" @remove='form.avatar=""'></Upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary"  @click="saveUpdate('form')">修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>

</template>

<script>
	import Upload from '@/components/Upload.vue'
	import {Admin} from '@/api/index.js'
	import { Auth } from '@/api/index'
	export default {
		components: {
			Upload
		},
		data() {
			return {
				action:'/api/upload/avatar',
				form: {
					username: '',
					fullname: '',
					role: '',
					sex: '',
					tel: '',
					avatar: ''
				},
				roleList:[],
				sizeList: ["large"],
				rules: {
					fullname: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ min: 11, type:'number', message: '请输入有效的手机号码', trigger: 'blur' }
					],
					sex:[
						{required: true, message: '请选择性别', trigger: 'change'}
					]
				}
			}
		},
		created() {
			this.loadRole();
			this.loadAdmin();
		},
		methods: {
			async loadAdmin(){
				let id=sessionStorage.uid;
				let {status,data} =await Admin.message({id});
				if(status){
					this.form=data;
				}
			},
			async loadRole() {
				let { status, data } = await Auth.list();
				if (status) {
					this.roleList = data;
				}
			},
			handlerUpload(res) {
				this.form.avatar =res.src;
			},
			saveUpdate(form){
				this.$refs[form].validate(async valid => {
					if (!valid) {
						return false;
					}
					let { status, msg } = await Admin.update(this.form);
					if (status) {
						this.$message.success(msg);
						
						this.loadAdmin();
					} else {
						this.$message.error(msg);
					}
				});
			},
		},

	}
</script>

<style>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
