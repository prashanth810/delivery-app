import Baseurl from '../baseurl/BaseUrl.js';
import BaseUrl from '../baseurl/BaseUrl.js';

export const createordersrazor = (data) => {
    return BaseUrl.post(`/razorpay/create`, data);
}

export const createdordeer = (data) => {
    return BaseUrl.post(`/ordercreate`, data);
}

export const getmyorders = () => {
    return Baseurl.get(`/my-orders`);
}