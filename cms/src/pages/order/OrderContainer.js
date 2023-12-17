// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { Orders } from "../../components/Order/Order.js";
import { getOrdersByFilter } from "../../services/orderService.js";

export const OrderContainer = () =>
{

	const [ orders, setOrders ] = useState([]);
	const [paging, setPaging] = useState({
		page: 1,
		page_size: 20
	});
	const [params, setParams] = useState({})
	const dispatch = useDispatch();
	
    useEffect(() => {
		getOrdersByFilters(paging, setOrders, setPaging);
	}, []);

	const getOrdersByFilters = async (filter) => {
		await getOrdersByFilter(filter, setOrders, setPaging, dispatch);
	}

    return  <Orders 
                orders={orders} 
                paging={paging} 
                setPaging={setPaging}
                setOrders={setOrders}
				params={params}
				setParams={setParams} 
                getOrdersByFilters={getOrdersByFilters}
	        />
};
