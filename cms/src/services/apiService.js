import { message } from 'antd';
import { getItem } from './common';
import axios  from 'axios';

const headers = {
	Authorization: `Bearer ${getItem('access_token_cms')}`,
	'Content-Type': `application/json`
};

export const postMethod =  (path, data) => {
	return  axios.post(`${process.env.REACT_APP_API}${path}`, data, {headers})
		.then(response => response?.data)
		.catch(error => {
			
			if(error?.response?.data?.code === 'LG0401') {
				localStorage.clear();
				window.location.href = '/login';
			}
			throw error?.response?.data || error;
		});
}

export const getMethod =  async (path, params) => {
	return await axios.get(`${process.env.REACT_APP_API}${path}`, {headers, params: params})
		.then(response => response?.data)
		.catch(error => {
			console.log(error?.response?.data, error?.response?.data?.code);
			if(error?.response?.data?.code === 'LG0401') {
				localStorage.clear();
				window.location.href = '/login';
			}
			throw error?.response?.data || error;
		});
}

export const putMethod =  (path, data) => {
	return  axios.put(`${process.env.REACT_APP_API}${path}`, data, {headers})
		.then(response => response?.data)
		.catch(error => {
			if(error?.response?.data?.code === 'LG0401') {
				localStorage.clear();
				window.location.href = '/login';
			}
			throw error?.response?.data || error;
		});
}

export const deleteMethod =  (path) => {
	return  axios.delete(`${process.env.REACT_APP_API}${path}`, {headers})
		.then(response => response?.data)
		.catch(error => {
			if(error?.response?.data?.code === 'LG0401') {
				localStorage.clear();
				window.location.href = '/login';
			}
			throw error?.response?.data || error;
		});
}