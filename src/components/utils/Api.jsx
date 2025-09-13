import axios from "axios";

const Api = axios.create({
    baseURL:'https://fakestoreapi.com/'
})

export const getAllProducts = () => {
    return Api.get('products')
}

export const addProduct = (product) => {
    return Api.post("products", product);
}

export const updateProduct = (id, product) => {
    return Api.put(`products/${id}`, product);
}

export const deleteProduct = (id) => {
    return Api.delete(`products/${id}`);
}

export const getAllCategories = () => Api.get('products/categories');
export const getProductsByCategory = (category) => Api.get(`products/category/${category}`);