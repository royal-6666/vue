import axios from 'axios';
import {Loading,Message} from 'element-ui';//以服务方式loading
//引进来router实例，可以按照官方文档进行跳转。
import router from '@/router/index';
let loading;//做实例用
// 设置默认的URL
axios.defaults.baseURL="http://localhost:3003/";

// 添加请求拦截器
axios.interceptors.request.use(function (config) {

	//开启loading
	loading=Loading.service({background:"rgba(0,0,0,0.3)"});
	//判断
	if(config.url =='api/admin/register' || config.url == 'api/admin/login'){
			return config; 
		}
		//获取携带的token
		let token=sessionStorage.token;
		//无token值时
		// if(!token){
		// 	Message.error('无效的token请重新登录');
		// 	setTimeout(() =>{
		// 		loading.close();
		// 		router.replace('/login');
		// 	},2000);
			
		// }
		//有token值时
		config.headers.Authorization=`Bearer ${token}`;
		return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	let {data,status}=response;
	//关闭loading
	loading.close();
	//判断后台发回来的状态码
//在这里你可以判断后台返回数据携带的请求码
	return data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });