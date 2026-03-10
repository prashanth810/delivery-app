import Baseurl from '../baseurl/BaseUrl.js';

// sign up
export const handlesignup = (data) => {
    return Baseurl.post(`/register`, data);
}

// login
export const handlelogin = (data) => {
    return Baseurl.post(`/login`, data);
}