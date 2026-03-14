import Baseurl from "../baseurl/BaseUrl"

export const getcategories = (page = 1, limit = 10) => {
    return Baseurl.get(`/categories`, { params: { page, limit } });
}

// get all prodcts by category id
export const handlegetproducts = (categoryId, page = 1, limit = 10) => {
    return Baseurl.get(`/${categoryId}/products`, { params: { page, limit } });
}