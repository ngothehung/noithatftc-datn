import React, { useEffect, useState } from 'react';
import Widget from '../Widget/Widget';
import { Pagination, message } from 'antd';
import
{
	Button,
	Table
} from "reactstrap";
import { StarIcons } from './star';
import { useDispatch } from 'react-redux';
import { toggleShowLoading } from '../../redux/actions/common';
import { timeDelay } from '../../services/common';
import s from "../../pages/tables/Tables.js";
import { VOTE_SERVICE_CMS } from '../../services/voteService'
import { EMPTY_IMG } from '../../helpers/constant/image.js';

export const PageVoting = () =>
{

	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20,
		total: 0
	} );

	const dispatch = useDispatch();
	const [ dataList, setDataList ] = useState( [] );

	useEffect( () =>
	{
		getDataList( { page: paging.page, page_size: paging.page_size } ).then( r => { } );
	}, [] );

	const getDataList = async ( filters ) =>
	{
		try
		{
			dispatch( toggleShowLoading( true ) );
			const response = await VOTE_SERVICE_CMS.getLists( filters );
			await timeDelay( 1000 );
			if ( response?.status === 'success' || response?.status === 200 )
			{
				setDataList( response?.data?.votes );
				setPaging( response?.data?.meta )
			}
			dispatch( toggleShowLoading( false ) );
		} catch ( error )
		{
			console.log( error );
			dispatch( toggleShowLoading( false ) );
		}

	}

	const handleDelete = async ( id ) =>
	{
		console.log( id );
		dispatch( toggleShowLoading( true ) );
		const response = await VOTE_SERVICE_CMS.delete( id );
		if ( response?.status === 'success' || response?.status === 200 )
		{
			message.success( 'Delete review successfully!' );
			getDataList( { page: 1, page_size: 20 } ).then( r => { } );
		} else
		{
			message.error( response?.message || 'Delete review failed!' );
		}
		dispatch( toggleShowLoading( false ) );
	}

	return (
		<Widget>
			<div className="widget-table-overflow p-5 mt-4">
				<Table className={ `table-striped table-bordered table-hover ${ s.statesTable }` } responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>Customer</th>
							<th>Product</th>
							<th className='text-nowrap'>Number Vote</th>
							<th>Content</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{ dataList.length > 0 ? dataList.map( ( item, key ) =>
						{
							return (
								<tr key={ key }>
									<td className='align-middle'>{ key + 1 }</td>
									<td className='text-nowrap align-middle'>
										{ item?.user?.name || 'N/A' }
										{/* <Link className={ '' }
													to={ `/vote/update/${ item._id }` } >
													
												</Link> */}
									</td>
									<td className='align-middle' style={ { maxWidth: '100px' } }>{ item?.product?.name || 'N/A' }</td>
									<td className='align-middle text-nowrap'>
										<StarIcons vote_number={ item?.number } />
									</td>
									<td className='text-break' style={ { maxWidth: '200px' } }>{ item.content }</td>
									<td className='align-middle'>
										<Button className='btn btn-danger'
											onClick={ () => handleDelete( item.id ) }>
											Delete
										</Button>{ ' ' }
									</td>
								</tr>
							)
						} )
							:
							<tr>
								<td colSpan={ 6 } style={ { textAlign: "center", backgroundColor: '#ffff' } }>
									<img className="text-center" src={ EMPTY_IMG } style={ { width: "300px", height: "300px" } } />
									<div style={ { color: "#9A9A9A" } }>Data empty</div>
								</td>
							</tr>
						}

					</tbody>
				</Table>
			</div>
			{
				paging?.total > 0 &&
				<div className="mx-auto d-flex justify-content-center my-4">
					<Pagination
						onChange={ e =>
							getDataList( { ...paging, page: e } )
						}
						pageSize={ paging.page_size }
						defaultCurrent={ paging.page }
						total={ paging.total }
					/>
				</div>
			}
		</Widget>
	);
}
