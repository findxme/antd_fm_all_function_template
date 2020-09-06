
import axios from 'axios';

export async function getRequest({ proxy, path }, data) {
    return axios.get('http://127.0.0.1:9092/' + `${proxy}` + '/' + `${path}`, { params: { ...data } })
}

export async function postFormRequest({ proxy, path }, data) {
    console.log(proxy);
    return axios.post('http://127.0.0.1:9092/' + `${proxy}` + '/' + `${path}`, data)
}


export async function postRequest({ proxy, path }, data) {

    return axios.post('http://127.0.0.1:9091/api/v1.0/find/Book/uploadImg', data)
}
