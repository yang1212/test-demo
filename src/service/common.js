import { get } from './request';

export default function getFlightDetail(params) {
  const url = 'http://yapi.demo.qunar.com/mock/81138/carInfoList';
  return new Promise((resolve, reject) => {
    get(url, params).then((res) => {
      resolve(res);
    }).catch((data) => {
      reject(data);
    })
  })
}
