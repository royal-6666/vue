<template>
	<div class="box">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商品列表</span>
			</div>
			<el-table :data="goodsData" style="width: 100%">
				<el-table-column prop="name" label="商品名称" width="500">
						<template scope="scope" >
							<div>
								<img :src="scope.row.img_md" width="100" height="100" class="head_pic" />
							</div>
						<div class="detail">
							<span>{{scope.row.name}}</span>
							<p>商品货号：{{scope.row.articleNo}}</p>
						</div>
						</template>
				</el-table-column>
				<el-table-column prop="price" label="价格" width="80" sortable>
				</el-table-column>
				<el-table-column prop="inventory" width="80" label="库存" sortable>
				</el-table-column>
				<el-table-column prop="create_time" label="发布时间" sortable>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-link :href="`#/goods/edit/${scope.row.id}`">
							<el-button type="primary" icon="el-icon-edit" size="mini"  plain class="am-margin-right-sm">
							</el-button>
						</el-link>
						<el-link>
							<el-button @click="removeGoods(scope.row.id,scope.$index)" type="danger" icon="el-icon-delete" size="mini" plain>
							</el-button>
						</el-link>
					</template>
				</el-table-column>
			</el-table>
			<div class="block" style="display: flex; flex-direction: row-reverse;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				  background :page-size="4" layout="prev, pager, next, sizes ,total" :page-sizes="[4, 8, 12, 16]" :total="11">
				</el-pagination>
			</div>
		</el-card>
	</div>
	
</template>

<script>
	import { Goods } from '@/api/index.js'
	export default {
		data() {
			return {
				goodsData: [],
				currentPage:1,
				pagesize:4,
				pageindex:1,
				sum:11
				
			}
		},
		created() {
			this.loadlist();
		},
		methods: {
			async loadlist() {
				let { status, total, goods } = await Goods.list({});
				if (status) {
					this.goodsData = goods;
				}
			},
			//每页多少条
			async handleSizeChange(val) {
				this.pagesize=val;
				console.log(val);
				let index=this.pageindex;
				let { status, total, goods } = await Goods.list({pageSize:val,pageIndex:index});
				if (status) {
					this.goodsData = goods;
					this.sum=total;
				}
			},
			//当前是第几页
			async handleCurrentChange(val) {
				this.pageindex=val;
				let size =this.pagesize;
				let { status, total, goods } = await Goods.list({pageSize:size,pageIndex:val});
				if (status) {
					this.goodsData = goods;
					this.sum=total;
				}
			},
			removeGoods(id,i){
				this.$confirm("确定要删除该商品吗？删除之后无法恢复","",{
					type:'warning'
				}).then(async ()=>{
					let{status}=await Goods.remove({id});
					if(status){
						this.goodsData.splice(i,1);
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

<style  scoped="scoped">
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
	.cell{
		display: flex;
	}
	.el-link--inner{
		margin-left: 5px;
	}
	.detail{
		padding-left: 6px;
	}
	.box{
		width:100%;
	}
</style>
