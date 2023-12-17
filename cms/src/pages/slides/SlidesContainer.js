// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesByFilter } from "../../services/categoryService";
import { Categories } from "../../components/Category/Category";
import { timeDelay } from "../../services/common";
import { toggleShowLoading } from "../../redux/actions/common";
import { SlidesPage } from "../../components/Slide/Slide";
import { getDataByFilter } from "../../services/slideService";

export const SlidesContainer = () =>
{

	const [ datas, setDatas ] = useState( [] );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20
	} );
	const [ params, setParams ] = useState( {} );
	const dispatch = useDispatch();

	useEffect( () =>
	{
		getDatasByFilter( paging );
	}, [] );

	const getDatasByFilter = async ( filter ) =>
	{
		const rs = await getDataByFilter( filter, dispatch );
		await timeDelay(1000 );
		
		dispatch( toggleShowLoading( false ) );
		if ( rs )
		{
			setDatas( rs.slides );
			setPaging( rs.meta );
		}
	}


	return <SlidesPage
		datas={ datas }
		paging={ paging }
		params={ params }
		getDatasByFilter={ getDatasByFilter }
		setParams={ setParams }
		setPaging={ setPaging }
		setDatas={ setDatas }
	/>
};
