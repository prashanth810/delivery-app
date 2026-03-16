import Baseurl from '../baseurl/BaseUrl.js';

// get all products 
export const getproducts = () => {
    return Baseurl.get(`/products`);
}

// get single products
export const getsingleproduct = (id) => {
    return Baseurl.get(`/products/${id}`);
}