//src\utils\request.js
import axios from 'axios';

const request = axios.create({
    //配置根域名
    baseURL: 'http://127.0.0.1:8085',
    //超时时间100秒
    timeout: 200000,
});

export { request };