// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserCpn } from "../../components/User/User";
import { USER_SERVICE } from "../../services/userService";

export const UserContainer = () =>
{

	const [ listData, setListData ] = useState( [] );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20
	} );
	const [ params, setParams ] = useState( {} );
	const dispatch = useDispatch();

	useEffect( () =>
	{
		getListData(paging);
	}, [] );

	const getListData = async ( filter ) =>
	{
		const response = await USER_SERVICE.getListData( filter, dispatch );
		if(response) {
			setListData(response.users);
			setPaging(response.meta);
		} else {
			setListData([]);
		}
	}


	return <UserCpn
		listData={ listData }
		paging={ paging }
		params={ params }
		getListData={ getListData }
		setParams={ setParams }
		setPaging={ setPaging }
		setListData={ setListData }
	/>
};
