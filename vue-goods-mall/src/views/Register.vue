<template>
	<div class="box">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input v-model="ruleForm.username" prefix-icon="el-icon-user" placeholder="账户名长度在3到15个字符!">
					</el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" prefix-icon="el-icon-key" placeholder="密码至少3位数字!" v-model.number="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="ruleForm.fullname" prefix-icon="el-icon-postcard" placeholder="请填写真实姓名">
					</el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="ruleForm.tel"  prefix-icon="el-icon-mobile"  placeholder="请填写常用手机号码!">
					</el-input>
				</el-form-item>
				<el-form-item label="" prop="type">
					<el-checkbox-group v-model="ruleForm.type">
						<el-checkbox label="同意本站用户协议" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
			</el-form>
			<div class="bottom">
				<router-link to="/login">登录账户</router-link>
				<router-link to="">忘记密码？</router-link>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from '@/api/index';
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',
					fullname: "",
					sex: '男',
					tel: '',
					type: []
				},
				rules: {
					username: [
						{ required: true, message: '请输入账户名称', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 3, type:'number', message: '至少3位数字', trigger: 'blur' }
					],
					fullname: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '请输入正确的姓名', trigger: 'blur' }
					],
					sex: [
						{ required: true, message: '请选择性别', trigger: 'change' }
					],
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ min: 7, max: 11, message: '请输入正确的手机格式', trigger: 'blur' }
					],
					type: [
						{ type: 'array', required: true, message: '请勾选', trigger: 'change' }
					],
				}
			};
		},
		methods: {
			submitForm(ruleForm) {
				this.$refs[ruleForm].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					let { status, msg ,data} = await Admin.register({ ...this.ruleForm });
					if (status) {
						this.$message.success(msg);
						
					} else {
						this.$message.error(msg);
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	/* css作用域 */
	.box {
		width: 100%;
			height: 100vh;
			background: url(../assets/login-bg.jpg) no-repeat center center;
			background-size: cover;
		}
	

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

	.box-card {
		width: 420px;

		position: absolute;
		right: 60px;
		top: 50%;
		transform: translateY(-50%);
	}


	.el-form {
		padding-right: 50px;
		padding-top: 10px;
	}

	.el-button {
		margin-left: 70px;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		padding-top: 20px;
	}

	a {
		color: #000000;
		text-decoration: none;
	}
</style>
