import Baseurl from '../baseurl/BaseUrl.js';


export const getalladdress = () => {
    return Baseurl.get(`/getaddress`);
}