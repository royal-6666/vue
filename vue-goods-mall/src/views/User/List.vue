<template>
	<div class="box ">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<el-table :data="userData" style="width: 100%">
				<el-table-column prop="id" label="#" width="30">
				</el-table-column>
				<el-table-column prop="avatar" label="头像" sortable width="80">
					<template scope='scope'>
						<el-avatar :src="scope.row.avatar">{{scope.row.avatar}}</el-avatar>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="账号" sortable></el-table-column>
				<el-table-column prop="fullname" label="姓名" width="100" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" sortable width="80"></el-table-column>
				<el-table-column prop="tel" label="手机" sortable></el-table-column>
				<el-table-column  label="角色" sortable>
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{scope.row.role_name}}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="login_time" label="上次登录时间" sortable width="170px">

				</el-table-column>
				<el-table-column prop="login_count" label="登录次数" sortable>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-link>
							<el-button @click="openEdit(scope.row.id)" type="primary" icon="el-icon-edit" size="mini" plain>
							</el-button>
						</el-link>
						<el-link>
							<el-button  @click="del(scope.row.id,scope.$index)" type="danger" icon="el-icon-delete" size="mini" plain>
							</el-button>
						</el-link>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 编辑分类 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
				<el-form-item label="姓名" prop="fullname" required>
					<el-input v-model="editForm.fullname"></el-input>
				</el-form-item>
				<el-form-item label="角色" required prop="role_name">
					<el-select v-model="editForm.role">
						<el-option v-for="item in roleList" :label="item.name" :key="item.id" :value="item.id"></el-option>
					</el-select >
				</el-form-item>
				<el-form-item label="性别" prop="sex" required>
					<el-radio-group v-model="editForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel" required>
					<el-input v-model.number="editForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="头像" required>
					<Upload :action="action" :url='editForm.avatar' @success="handlerUpload($event)" @remove='editForm.avatar=""'></Upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button >取 消</el-button>
				<el-button type="primary" @click="saveUpdate('editForm')">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Admin } from '@/api/index'
	import { Auth } from '@/api/index'
	import Upload from '@/components/Upload.vue'
	export default {
		components: {
			Upload
		},
		data() {
			return {
				action:'/api/upload/avatar',
				userData: [],
				roleList:[],
				editForm: {
					id: '',
					fullname: '',
					sex: '',
					avatar: '',
					tel: '',
					email: '',
					role: '',
				},
				insertModalShow: false,
				editModalShow: false,
				rules:{
					fullname:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					sex:[
						{required: true, message: '请选择性别', trigger: 'change'}
					],
					tel:[
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ pattern:'/^1[34578]\d{10}$/', type:'number', message: '请输入有效的手机号码', trigger: 'blur' }
					],
				}
			}
		},
		created() {
			this.loadList();
			this.loadRole();
		},
		watch: {
			"$route"(to, from) {
				let { id } = to.params;
				this.loadList(id);
			}
		},
		methods: {
			//用户列表
			async loadList() {
				let { status, data } = await Admin.list();
				if (status) {
					this.userData = data;
				}
			},
			//获取角色
			async loadRole() {
				let { status, data } = await Auth.list();
				if (status) {
					this.roleList = data;
				}
			},
			handlerUpload(res) {
				this.editForm.avatar =res.src;
			},
			async openEdit(id){
				this.editModalShow=true;
				let {status,data}=await Admin.message({id});
				if(status){
					this.editForm=data;
				}
			},
			saveUpdate(form){
				this.$refs[form].validate(async valid => {
					if (!valid) {
						return false;
					}
					let { status, msg } = await Admin.update(this.editForm);
					if (status) {
						this.$message.success(msg);
						this.editModalShow=false;
						this.loadList();
					} else {
						this.$message.error(msg);
					}
				});
			},
			//删除用户
			del(id,i){
				this.$confirm("此操作将永久删除该账户，是否继续？",'', {
					type:'warning'
				}).then(async ()=>{
					let{status}=await Admin.remove({id});
					if(status){
						//更新DOM
						this.userData.splice(i,1);
						this.$message.success("删除成功");
					}
				})
				.catch(()=>{
					this.$message.info('取消成功');
				})
			},
		}

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

	.box-card {
		width: 100%;
	}
	.box{
		width: 100%;
	}
</style>
