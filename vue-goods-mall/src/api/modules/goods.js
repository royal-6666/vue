import axios from 'axios';
//商品列表
let list =(data) =>axios.get('/api/admin/goods/list',{params:data});
//获取商品详情
let detail=(data) =>axios.get('/api/admin/goods',{params:data});
//发布新商品
let release=(data) =>axios.post('/api/admin/goods',data);
//编辑商品
let edit=(data)=>axios.put('/api/admin/goods',data);
//删除商品
let remove=(data)=>axios.delete('/api/admin/goods',{params:data});
export default{
	list,
	detail,
	release,
	edit,
	remove
}
