import axios from 'axios';
//获取子菜单
let menu=(data)=>axios.get('/api/menu/sub',{params:data});
//获取角色列表
let list=(data) =>axios.get('/api/role/list',{params:data});
//添加角色
let add =(data) =>axios.post('/api/role',data);
//删除角色
let remove =(data) =>axios.delete('/api/role',{params:data});
//更新角色
let update =(id,data)=>axios.put('/api/role',data);

//添加子菜单
let increase=(data)=>axios.post('/api/menu',data);

//删除子菜单
let del=(data)=>axios.delete('/api/menu',{params:data});
//编辑子菜单
let edit=(data) =>axios.put('/api/menu',data);
//获取所有的图标
let geticon=(data) =>axios.get('/api/admin/icon/list',{params:data});
//设置子菜单图标
let subicon=(data) =>axios.put('/api/menu/icon',data);
//获取菜单配置
let set=(id)=>axios.get('/api/role/config',{params:id});
//为指定角色增加菜单
let addrole=(data) =>axios.post('/api/role/menu',data);
//删除菜单
let delmenu=(data) =>axios.delete('/api/role/menu',{params:data});
export default{
	menu,
	list,
	add,
	remove,
	update,
	increase,
	del,
	edit,
	geticon,
	subicon,
	set,
	addrole,
	delmenu
}
