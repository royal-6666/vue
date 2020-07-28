<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>商品分类</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" :load='loadNode' lazy node-key="id" :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" @click.stop='openEditModle(node,data)' icon="el-icon-edit" :disabled="node.level==1" size="mini">
							编辑
						</el-button>
						<el-button type="text" @click.stop='openAddModle(node, data)' icon="el-icon-plus" size="mini">
							添加
						</el-button>
						<el-button type="text" @click.stop='removeList(node,data)' icon="el-icon-delete" size="mini" :disabled="node.level==1" >
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px" required>
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" label-width="120px">
				<Upload :action ="action" :url='insertForm.img' @success="insertUpload($event)" @remove='insertForm.img=""' ></Upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelAdd">取 消</el-button>
				<el-button type="primary" @click='handleInsertNode'>添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px" required>
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" label-width="120px">
					<Upload :action="action" :url='editForm.img' @success="editUpload($event)" @remove='editForm.img=""'></Upload>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click='cancel'>取 消</el-button>
				<el-button type="primary" @click='handleUpload'>确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Category } from '@/api/index';
	import Upload from '@/components/Upload.vue'
	export default {
		components:{
			Upload
		},
		data() {
			return {
				action:'/api/upload/common',
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					pId:'',
					img: '',
				},
				editForm: {
					id: '',
					name: '',
					img: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			}
		},
		create(){
			this.loadInfo(this.$route.params.id);
		},
		watch:{
			'$route'(to, from) {
				let { id } = to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			//获取子级分类
			async loadNode(node, resolve) {
				if (node.level == 0) {
					let { status,data } = await Category.all({pId:0 });
					if(status){
						return resolve(data);
					}
				}
				let pId = node.data.id;
				let { status,data } = await Category.all({pId });
				if (status) {
					return resolve(data);
				}
			},
			editUpload(res) {
				this.editForm.img = res.src;
			},
			insertUpload(res) {
				this.insertForm.img =res.src;
			},

			//打开编辑弹框
			openEditModle(node, data) {
				this.editForm = { ...data };
				this.node = node;
				this.editModalShow = true;
			},
			//编辑状态
			async handleUpload() {
				//表单验证
				//发送数据
				let { status, data, msg } = await Category.update({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					//更新的树状结构
					this.node.data = this.editForm;
					this.editModalShow = false;
				}
			},
			//取消编辑
			cancel(){
				this.editModalShow=false;
			},
			//取消添加
			cancelAdd(){
				this.insertModalShow=false;
			},
			//打开添加弹框
			openAddModle(node, data) {
				this.node = node; //父节点的node节点对象
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
			},
			//添加节点
			async handleInsertNode() {
				//表单校验
				//ajax
				let { status, data, msg } = await Category.add({ ...this.insertForm });
				if (status) {
					this.$message.success(msg);
					//插入新的树状结构
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
					this.insertModalShow = false;
					this.insertForm.name='';
					this.insertForm.pId='';
					this.insertForm.img='';
				}
			},
			//删除分类
			removeList(node,data){
				this.$confirm('此操作将永久删除该分类,是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					let { status,msg} = await Category.remove({...data});
					if (status) {
						this.$refs.tree.remove({ ...data });
						this.$message.success('删除成功');
							
					}
				}).catch(() => {
					this.$message.info('删除失败');
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
