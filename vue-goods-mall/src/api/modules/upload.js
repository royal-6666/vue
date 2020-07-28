import axios from 'axios'
//删除照片
let del=(data) =>axios.delete('/api/upload',{params:data});
//上传照片

export default{
	del,
	
}