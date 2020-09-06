import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('http://127.0.0.1:8080/api/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
