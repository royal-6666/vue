<template>
	<div class="box" style="display: flex; ">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>角色列表</span>
				<el-button @click='openinsertModule' style="float: right; padding: 5px 5px" type="primary" plain>
					<i class="el-icon-circle-plus-outline"></i>
					添加角色</el-button>
			</div>
			<div class="text item">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column label="#" prop="id" width="70">
					</el-table-column>
					<el-table-column label="角色" width="140">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{scope.row.name}}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button @click="editRole(scope.row.id,scope.row.name,scope.$index)" :disabled="scope.row.name == '超级管理员'"
							 size="mini" type="primary" plain><i class="el-icon-edit"></i></el-button>
							<el-button @click="del(scope.row.id,scope.$index)" :disabled="scope.row.name == '超级管理员'" size="mini" type="danger"
							 plain><i class="el-icon-delete"></i></el-button>
							<el-button @click="handleSetting(scope.row.id,scope.$index)"  size="mini" type="primary" plain><i class="el-icon-s-tools"></i></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		<!-- 菜单配置 -->
		<div class="layout">
			<el-card class="box-card box-right" v-show="isShow===true" v-for="(item,index) in options_1st" :key="index">
				<div slot="header" class="clearfix">
					<span class="title-color"><i class='el-icon-collection-tag'></i>{{item.name}}</span>
					<el-switch v-model="item.checked" style="float: right;" @change="toggleAll(item.id,index)"></el-switch>
				</div>
				<ul>
					<li class="listStyle" v-for="(content,idx) in item.children">{{content.name}}
						<el-switch @change="checkedSingle(content.id,idx,index)" v-model="content.checked" style="float: right;"></el-switch>
					</li>
				</ul>
			</el-card>
		</div>
		
	</div>

</template>

<script>
	import { Auth } from '@/api/index.js'
	export default {
		data() {
			return {
				tableData: [],
				isShow: false, //右边框框
				role_id: '', //角色id
				options_1st: [],
				roleMenu:{
					role_id:'',
					menu_id:'',
				}
			}
		},
		created() {
			this.loadList();
		},
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadList(id);
			}
		},
		methods: {
			async loadList() {
				let { status, data } = await Auth.list();
				if (status) {
					this.tableData = data;
				}
			},
			//添加角色
			openinsertModule() {
				this.$prompt("名称", "添加角色", {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符',
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(async ({ value }) => {
						let { status, data } = await Auth.add({ name: value });
						if (status) {
							//更新Dom
							this.tableData.push({ name: value, ...data })
							this.$message.success("添加成功");
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					})
			},
			//删除角色
			del(id, i) {
				this.$confirm("此操作将永久删除该角色及其关联用户，是否继续？", '', {
						type: 'warning'
					}).then(async () => {
						let { status } = await Auth.remove({ id });
						if (status) {
							//更新DOM
							this.tableData.splice(i, 1);
							this.$message.success("删除成功");
						}
					})
					.catch(() => {
						this.$message.info('取消成功');
					})
			},
			//更新角色
			editRole(id, name, index) {
				this.$prompt("名称", "编辑角色", {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符',
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputValue: name
					}).then(async ({ value }) => {
						let { status, data } = await Auth.update(id, { name: value });
						if (status) {
							//更新Dom
							this.tableData[index].name = value;
							this.$message.success("修改成功");
						}
					})
					.catch(() => {
						this.$message.info('取消修改');
					})
			},
		async toggleAll(menu_id, i) {
			if (this.options_1st[i].checked == false) {
				this.roleMenu.role_id = this.role_id;
				this.roleMenu.menu_id = menu_id;
				let { status, data } = await Auth.delmenu(this.roleMenu);
				for (var j = 0; j < this.options_1st[i].children.length; j++) {
					this.options_1st[i].children[j].checked = false;
					var id = this.options_1st[i].children[j].id;
					this.roleMenu.menu_id = id;
					let { status, data } = await Auth.delmenu(this.roleMenu);
				}
			} else {
				this.roleMenu.role_id = this.role_id;
				this.roleMenu.menu_id = menu_id;
				let { status, data } = await auth.addrole(this.roleMenu);
				for (var j = 0; j < this.options_1st[i].children.length; j++) {
					this.options_1st[i].children[j].checked = true;
					var id = this.options_1st[i].children[j].id;
					this.roleMenu.menu_id = id;
					let { status, data } = await Auth.addrole(this.roleMenu);
				}
			}
		},
		async checkedSingle(menu_id, idx, i) {
			if (this.options_1st[idx].children[i].checked == false) {
				this.roleMenu.role_id = this.role_id;
				this.roleMenu.menu_id = menu_id;
				let { status, data } = await Auth.delmenu(this.roleMenu);
				var num = 0
				for (var j = 0; j < this.options_1st[idx].children.length; j++) {
					if (this.options_1st[idx].children[j].checked == true) {
						num++;
					}
				}
				if (num >= 1) {
					this.options_1st[idx].checked = true;
					var ID = this.options_1st[idx].id;
					this.roleMenu.menu_id = ID;
					let { status, data } = await Auth.addrole(this.roleMenu);
				} else {
					this.options_1st[idx].checked = false;
					var ID = this.options_1st[idx].id;
					this.roleMenu.menu_id = ID;
					let { status, data } = await Auth.delmenu(this.roleMenu);
				}
			} else {
				this.roleMenu.role_id = this.role_id;
				this.roleMenu.menu_id = menu_id;
				let { status, data } = await Auth.addrole(this.roleMenu);
				var num = 0;
				for (var j = 0; j < this.options_1st[idx].children.length; j++) {
					if (this.options_1st[idx].children[j].checked === true) {
						num++;
					}
				}
				if (num >= 1) {
					this.options_1st[idx].checked = true;
					var ID = this.options_1st[idx].id;
					this.roleMenu.menu_id = ID;
					let { status, data } = await Auth.addrole(this.roleMenu);
				} else {
					this.options_1st[idx].checked = false;
					var ID = this.options_1st[idx].id;
					this.roleMenu.menu_id = ID;
					let { status, data } = await Auth.delmenu(this.roleMenu);
				}
			}
		},
		async handleSetting(id, index) {
			this.isShow = true;
			this.role_id = id;
			let { status, data } = await Auth.set({ id: id });
			if (status) {
				this.options_1st = data;
			}
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
		width: 450px;
	}
	.list{
		list-style: none;
		padding:6px 0;
	}
	.box-menu{
		display: flex;
		flex-direction: column;
	}
	.layout {
		display: flex;
		flex-direction: column;
		width: calc(100% - 620px);
		margin-left: 20px;
	}
	
	.listStyle {
		padding: 5px 0;
		list-style: none;
		font-size: 14px;
	}
	
</style>
