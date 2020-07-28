<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑商品</span>
			</div>
			<el-form ref="goods" :model="goods" label-width="80px">
				<el-form-item label="商品分类">
					<el-col :span="6">
						<el-select v-model="goods.cate_1st">
							<el-option v-for="item in option_1st" :key='item.id' :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="goods.cate_2nd">
							<el-option v-for="item in option_2nd" :key='item.id' :label="item.name" :value="item.id"></el-option>

						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="goods.cate_3rd">
							<el-option v-for="item in option_3rd" :key='item.id' :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-input v-model="goods.name" style="width: 600px;"></el-input>
					<div style="font-size: 10px;color: #8C939D;">商品标题名称长度至少3个字符,最长200个汉字</div>
				</el-form-item>
				<el-form-item label="商品卖点">
					<el-input style="width: 600px;" type="textarea" v-model="goods.hotPoint">
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">商品卖点不能超过140个汉字</div>
				</el-form-item>
				<el-form-item label="商品价格">
					<el-input v-model="goods.price" style="width: 200px;">
						<template slot="append">元</template>
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">
						价格必须是0-999999之间的数字,且不能高于市场价<br>
						此价格为商品实际销售价格,如果商品存在规格，改价格显示最低价格
					</div>
				</el-form-item>
				<el-form-item label="市场价">
					<el-input v-model="goods.marketPrice" style="width: 200px;">
						<template slot="append">元</template>
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">
						价格必须是0-999999之间的数字,此价格仅为市场参考价，请根据实际情况填写
					</div>
				</el-form-item>
				<el-form-item label="成本价">
					<el-input v-model="goods.cost" style="width: 200px;">
						<template slot="append">元</template>
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">
						价格必须是0-999999之间的数字,此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示
					</div>
				</el-form-item>
				<el-form-item label="折扣">
					<el-input v-model="goods.discount" style="width: 200px;">
						<template slot="append">折</template>
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">
						根据销售价与市场价比例自动生成不需要编辑
					</div>
				</el-form-item>
				<el-form-item label="商品库存">
					<el-input v-model="goods.inventory" style="width: 200px;">
						<template slot="append">件</template>
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">
						价格必须是0-999999之间的整数<br>若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写
					</div>
				</el-form-item>
				<el-form-item label="商品货号">
					<el-input v-model="goods.articleNo" style="width: 200px;">
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">
						商品货号是商家管理商品的编号，买家不可见<br>最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点
					</div>
				</el-form-item>
				<el-form-item label="商品主图" prop="img_md">
					<Upload :action="action" :url="goods.img_md" @success="handlerInsert($event)" @remove="goods.img_md = ''"></Upload>
					<div style="font-size: 10px;color: #8C939D;">
						上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中
					</div>
				</el-form-item>
				<el-form-item prop="slider" label="商品轮播图">
					<el-upload action="/api/upload/slider" :file-list="formList" list-type="picture-card" 
					 :on-preview="handlePictureCardPreview" :on-success="sliderSuccess" :on-remove="handleRemove"
					>
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="goods.slider" alt="">
					</el-dialog>

					<div style="font-size: 10px;color: #8C939D;">
						上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中
					</div>
				</el-form-item>
				<div class="goodsdetail">
					商品详情描述

				</div>
				<el-form-item label="商品品牌">
					<el-input v-model="goods.brand" style="width: 600px;"></el-input>
				</el-form-item>
				<el-form-item v-model="goods.img_lg" label="商品描述">
					<div ref="editor" style="text-align:left"></div>
				</el-form-item>
				<div class="goodsdetail">
					商品物流信息
				</div>
				<el-form-item label="所在地">
					<el-col :span="6">
						<el-select v-model="areas.province">
							<el-option v-for="item in area_1st" :key='item.id' :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="areas.city">
							<el-option v-for="item in area_2nd" :key='item.id' :label="item.name" :value="item.id"></el-option>

						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="areas.area">
							<el-option v-for="item in area_3rd" :key='item.id' :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="运费">
					<el-input v-model="goods.freight" style="width: 120px;" value="0">
						<template slot="append">元</template>
					</el-input>
					<div style="font-size: 10px;color: #8C939D;">
						运费设为0，前台商品将显示免运费
					</div>
				</el-form-item>
				<el-button style="margin-left: 70px;" @click="saveGoods('goods')" type="success" size="medium">提交</el-button>
			</el-form>
		</el-card>
	</div>

</template>
<script>
	import Upload from '@/components/Upload.vue'
	import E from 'wangeditor'
	import { Goods } from '@/api/index.js'
	import { Category } from '@/api/index.js'
	export default {
		components: {
			Upload
		},
		props: ['id'],
		data() {
			return {
				action: '/api/upload/goods',
				formList: [],
				goods: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					name: '',
					hotPoint: '',
					price: '',
					marketPrice: '',
					cost: '',
					discount: '',
					inventory: '',
					articleNo: "",
					img_lg: '',
					img_md: '',
					slider: '',
					brand: '',
					detail: '',
					freight: '',
				},
				option_1st: [],
				option_2nd: [],
				option_3rd: [],
				dialogVisible: false,
				disabled: false,
				dialogImageUrl: '',
				area_1st: [],
				area_2nd: [],
				area_3rd: [],
				areas: {
					province: "",
					city: "",
					area: "",
				}
			}
		},
		async created() {
			let options = await this.loadSub(1);
			this.option_1st = options;
			let id = this.id;
			let res = await Goods.detail({ id });
			this.goods = res.data;
			this.goods.slider = this.goods.slider.split(',');
			this.goods.slider.forEach((item, idx) => {
				if (item !== "") {
					this.formList[idx] = {
						url: item
					}
					this.$set(this.formList, idx, this.formList[idx]);
				}
			})
		},
		watch: {
			'goods.cate_1st': async function(val) {
				let options = await this.loadSub(val);
				this.option_2nd = options;
			},
			'goods.cate_2nd': async function(val) {
				let options = await this.loadSub(val);
				this.option_3rd = options;
			}
		},
		async mounted() {
			let product = await this.loadInfo(this.id);
			this.goods = product;
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.goods.slider = html
			}
			editor.customConfig.uploadImgSever = "/api/upload/sever";
			editor.customConfig.uploadFileName = "file";
			editor.create()
			editor.txt.html(this.goods.detail)
		},
		methods: {
			//获取商品详情
			async loadInfo(id) {
				let { status, data } = await Goods.detail({ id });
				if (status) {
					return data;
				}
			},
			//获取子级分类
			async loadSub(id) {
				let pId = id;
				let { status, data } = await Category.all({ pId });
				if (status) {
					return data
				}
			},
			saveGoods(form) {
				this.$refs[form].validate(async valid => {
					if (!valid) {
						return false;
					}
					let { status, msg } = await Goods.edit(this.goods);
					if (status) {
						this.$message.success(msg);
						this.$router.push({path:'/goods/list'});
					} else {
						this.$message.error(msg);
					}
				});
			},
			//上传主图
			handlerInsert(res) {
				this.goods.img_md = res.mdImg;
			},
			//删除图片
			handleRemove(file, fileList) {
				let src = '';
				fileList.forEach((item) => {
					src += (item.url + ',');
				})
				this.goods.slider = src;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//轮播图上传
			sliderSuccess(res, file) {
				console.log(res);
				let { status, src, msg } = res;
				this.goods.slider += (src + ',');
				console.log(this.goods.slider);
			},

		},
		

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

	.goodsdetail {
		height: 40px;
		background-color: #eee;
		line-height: 40px;
		padding-left: 6px;
		margin-bottom: 15px;
	}
</style>
