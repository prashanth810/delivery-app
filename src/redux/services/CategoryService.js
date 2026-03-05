import Baseurl from "../baseurl/BaseUrl"

export const getcategories = () => {
    return Baseurl.get(`/categories`); // ✅ use the axios instance directly
}

// get all prodcts by category id
export const handlegetproducts = (categoryId) => {
    return Baseurl.get(`/${categoryId}/products`);
}
