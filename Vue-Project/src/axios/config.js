import axios from 'axios'
import qs from 'QS'

const url = "http://120.79.200.166:8080/LawyerGarden";

axios.defaults.timeout = 8000;//响应时间
axios.defaults.baseURL = url;//接口地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded :charset=UTF-8';//设置请求头
axios.defaults.retry = 2; //重试次数
axios.defaults.retryDelay = 1000;//重试延时
axios.defaults.shouldRetry = (error) => true;//重试条件，默认只要是错误都需要重试
//请求拦截器
axios.interceptors.request.use(
	(config)=>{
	
	if(config.method === 'post'){
		
		//先对数据进行转换，把对象、数组等数据转换为json字符串
		config.data = JSON.stringify(config.data);
	}
	 return config;
},
	(error)=>{
		//在这里进行错误提示还是在catch中去出现错误提示
		if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
				 mui.toast("连接网络失败，请稍后再试");
				 return Promise.reject(error);
			}
		 return Promise.reject(error);
		//如果发生错误则在axios.get().then().cathc(error=>{})中去处理
	}
)

axios.interceptors.response.use(
	(res) => {
		 if(res.status != '200'){
		 	
   			return Promise.reject(res);
  	}
		 	//console.log(res.data);
  			return res.data;
	},
	(error) => {
		
		console.log(error)
		 if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
				 mui.toast("连接网络失败，请稍后再试");
				 return Promise.reject(error);
			}
  		return Promise.reject(error);
	}
)

axios.interceptors.response.use(undefined, (err) => {
    var config = err.config;
    // 判断是否配置了重试
    if(!config || !config.retry) return Promise.reject(err);

    if(!config.shouldRetry || typeof config.shouldRetry != 'function') {
       return Promise.reject(err);
    }

    //判断是否满足重试条件
    if(!config.shouldRetry(err)) {
      return Promise.reject(err);
    }

    // 设置重置次数，默认为0
    config.__retryCount = config.__retryCount || 0;

    // 判断是否超过了重试次数
    if(config.__retryCount >= config.retry && (plus.networkinfo.getCurrentType()!=plus.networkinfo.CONNECTION_NONE)) {
    		 mui.toast("法y园君正在开小差，稍后再试～");
        return Promise.reject(err);
    }

    //重试次数自增
    config.__retryCount += 1;
	console.log('config.__retryCount ' + config.__retryCount);
    //延时处理
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    //重新发起axios请求
    return backoff.then(function() {
        return axios(config);
    });
});
export function get(url, params = {}){
	return new Promise((reslove,reject) => {
		axios.get(url,{
			params:params
		}).then(
			(response) =>{
				console.log(response);
				reslove(response.data);
		},
			(err) => {
				console.log(err);
				reject(err);
			}
			)
})
}

export function post(url, data = {}){
	return new Promise((reslove,reject) => {
		axios.post(url,data)
		.then(
			(response) => {
				console.log(response);
				reslove(response);
		}).catch(
			(error) => {
				reject(error);
		})
	})
}