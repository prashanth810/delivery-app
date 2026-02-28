import Baseurl from "../baseurl/BaseUrl"

export const getcategories = () => {
    return Baseurl.get(`/categories`); // ✅ use the axios instance directly
}