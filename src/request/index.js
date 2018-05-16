import axios from './axios'


let https = {
    /**
     * 验证
     * @param {*} res 
    */
    validResponed(res){
        if (res.status !== 200 || res.statusText.toLowerCase() !== 'ok') {
            return Promise.reject(res.data);
        }
    },
	get(url, params = {}, success, error) {
        if(params) params._ = Date.parse(new Date());  //设置请求不缓存

		axios.get(url, { params: params }).then( res => {
			if(success) success(res.data)
		}).catch( err => {
			if(error) error(err)
		})
	},
	post(url, params = {}, success, error) {
		axios.post(url, params).then( res => {
			if(success) success(res.data)
		}).catch( err => {
			if(error) error(err)
		})
	}
}

export default function(){
    let which, params, success, failure;
    if(typeof arguments[1] === "function"){  //无参数的情况
        which = arguments[0];
        success = arguments[1];
        failure = arguments[2];
    }else{
        which = arguments[0];
        params = arguments[1];
        success = arguments[2];
        failure = arguments[3];
    }

    let keys = which.split('.');
    let obj = null;
    if(keys.length === 1){
        obj = api[keys[0]];
    }else{
        obj = api[keys[0]][keys[1]];
    }

	https[obj.type](obj.url, params, success, failure);
};