import axios from 'axios';
// export const hostname = 'http://localhost:3000';
export const hostname = 'http://3dcb8fd1658e.ngrok.io/api';

export const login = data => axios.post(`${hostname}/user/login`, data);


export const getAllEployees = () => axios.get(`${hostname}/employee`);
export const getEmployee = id => axios.get(`${hostname}/employee/${id}`);
export const updateEmployee = (data) => axios.put(`${hostname}/employee/`, data);
export const createEmployee = (data) => axios.post(`${hostname}/employee/`, data);

export const getAllTasks = () => axios.get(`${hostname}/task`);
export const getTask = (id) => axios.get(`${hostname}/task/${id}`);
export const deleteTask = (id) => axios.delete(`${hostname}/task/${id}`);
export const updateTask = (data) => axios.put(`${hostname}/task/`, data);
export const createTask = (data) => axios.post(`${hostname}/task/`, data);

export const completeTask = (id) => axios.put(`${hostname}/task/do/`, [id]);


export const check = (data) => axios.post(`${hostname}/check/`, data);