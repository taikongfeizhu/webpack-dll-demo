import axios from 'axios';

//封装好的get和post接口，调用方法情况action文件
const fetchAPI = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://www.easy-mock.com/mock/593611b991470c0ac101d474' : '/', //设置默认api路径
    timeout: 5000, //设置超时时间
    headers: {'X-Custom-Header': 'foobar'}
});

export default fetchAPI;
