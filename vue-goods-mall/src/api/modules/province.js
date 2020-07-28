import axios from 'axios';

//获取所有省份
let provinceList =(data) =>axios.get('/api/pcct/province',{params:data});
//获取城市
let city=(data) =>axios.get('/api/pcct/city',{params:data});
//获取县
let county =(data)=>axios.get('/api/pcct/county',{params:data});
export default{
	provinceList,
	city,
	county,
	
}