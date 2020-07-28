import axios from 'axios';
//登录
let login =(data) =>axios.post('/api/admin/login',data);
//注册
let register=(data) =>axios.post('/api/admin/register',data);
//删除管理员
let remove=(data)=>axios.delete('/api/admin/',{params:data});
//获取管理员个人资料
let message=(data) =>axios.get('/api/admin',{params:data});
//获取管理员列表
let list=(data) =>axios.get('/api/admin/list',{params:data});
//更新管理员资料
let update=(data)=>axios.put('/api/admin',data);
export default{
	login,
	register,
	remove,
	message,
	list,
	update,
}