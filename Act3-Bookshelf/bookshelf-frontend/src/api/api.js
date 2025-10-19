import axios from "axios";

const API_URL = "http://localhost:3000";

// Books
export const fetchBooks = () => axios.get(`${API_URL}/books`);
export const createBook = (book) => axios.post(`${API_URL}/books`, book);
export const updateBook = (id, book) => axios.put(`${API_URL}/books/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/books/${id}`);

// Authors
export const fetchAuthors = () => axios.get(`${API_URL}/authors`);
export const createAuthor = (author) => axios.post(`${API_URL}/authors`, author);
export const updateAuthor = (id, author) => axios.put(`${API_URL}/authors/${id}`, author);
export const deleteAuthor = (id) => axios.delete(`${API_URL}/authors/${id}`);

// Categories
export const fetchCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (category) => axios.post(`${API_URL}/categories`, category);
export const updateCategory = (id, category) => axios.put(`${API_URL}/categories/${id}`, category);
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);
