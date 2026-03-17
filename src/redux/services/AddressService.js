import Baseurl from '../baseurl/BaseUrl.js';

// get my address
export const getalladdress = (id) => {
    return Baseurl.get(`/address/${id}`);
}

// handle delete address
export const handledeleteadd = (id) => {
    return Baseurl.delete(`/address/${id}`);
}

// AddressService.js
export const handleMakeDefaultAddress = (id, userId) => {
    return Baseurl.put(`/address/${id}`, {
        isDefault: true,
        userId: userId
    });
};

// AddressService.js
export const handleCreateAddress = (data) => {
    return Baseurl.post("/address/create", data);
};