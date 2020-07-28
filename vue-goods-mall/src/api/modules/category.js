import axios from 'axios';
//删除分类
let remove = (data) => axios.delete('/api/category',{params:data});
//更新分类
let update = (id, data) => axios.put('/api/category', data);
//添加分类
let add = (data) => axios.post('/api/category', data);
//获取子级分类
let all = (data) => axios.get('/api/category/sub', { params: data });
//获取所有树形分类
let sort =(data)=>axios.get('/api/category/all',{params:data});
export default {
	remove,
	update,
	add,
	all,
	sort,
}
