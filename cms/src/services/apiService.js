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
			throw error;
		});
}

export const getMethod =  async (path, params) => {
	return await axios.get(`${process.env.REACT_APP_API}${path}`, {headers, params: params})
		.then(response => response?.data)
		.catch(error => {
			throw error;
			// message.error(error.response?.data)
		});
}

export const putMethod =  (path, data) => {
	return  axios.put(`${process.env.REACT_APP_API}${path}`, data, {headers})
		.then(response => response?.data)
		.catch(error => {
			throw error;
		});
}

export const deleteMethod =  (path) => {
	return  axios.delete(`${process.env.REACT_APP_API}${path}`, {headers})
		.then(response => response?.data)
		.catch(error => {
			throw error;
		});
}