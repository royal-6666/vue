<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>订单列表</span>
		</div>
		<el-table :data="orderList" style="width: 100%">
			<el-table-column prop="id" label="#" width="30" ></el-table-column>
			<el-table-column prop="" label="" width="580">
				<template scope="scope">
					<el-table :data="scope.row.goodsList"  style="width: 100%">
						<el-table-column prop="status" label="商品" width="400" >
							<template scope="scope">
								<div>
									<img :src="scope.row.img_md" width="50" height="50" class="head_pic" />
								</div>
								<div class="detail">
									<span>{{scope.row.name}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="goods_price" label="单价" >
						</el-table-column>
						<el-table-column prop="goods_num" label="数量" width="50">
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="payment" label="付款总额" width="80">
			</el-table-column>
			<el-table-column prop="create_time" label="下单时间" sortable>

			</el-table-column>
			<el-table-column prop="status" label="状态" sortable width="120">

			</el-table-column>
			<el-table-column prop="time" label="操作" width="60">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" plain><i class="el-icon-edit"></i></el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
import {Order} from '@/api/index.js'
export default{
	data(){
		return {
			orderList:[],
		}
	},
	created() {
		this.loadList();
	},
	methods:{
		async loadList(){
			let {status,data} =await Order.list();
			if(status){
				this.orderList = data;
			}
		}
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
	.cell{
		display: flex;
	}
	.box-card {
		width: 100%;
	}
	.detail{
		padding-left: 6px;
	}
</style>
