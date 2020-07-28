<template>
	<div class="box">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>欢迎登录</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input placeholder="请输入账户名!" prefix-icon="el-icon-user" v-model="ruleForm.username">
					</el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码!" prefix-icon="el-icon-key" show-password v-model.number="ruleForm.password">
					</el-input>
				</el-form-item>
				<el-button type="primary" @click="handlerLogin('ruleForm')">登录</el-button>
			</el-form>
			<div class="bottom">
				<router-link to="/register">注册账户</router-link>
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
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 3, type:'number', message: '密码至少3位数字', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			handlerLogin(ruleForm) {
				this.$refs[ruleForm].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					let { status, msg, data } = await Admin.login({ ...this.ruleForm });
					if (status) {
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;

						sessionStorage.role = data.role;
						this.$message.success(msg);
						let {redirect} =this.$route.query;
						if(redirect){
							this.$router.replace(redirect);
						}else{
							this.$router.replace('/goods/list');
						}
					} else {
						this.$message.error(msg);
					}
				})
			}
		}

	}
</script>

<style>
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
		margin-left: 50px;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		padding-top: 20px;
		font-size: 12px;
	}

	a {
		color: #000000;
		text-decoration: none;
	}
</style>
