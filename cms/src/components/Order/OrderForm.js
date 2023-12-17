// @ts-nocheck
import { Form, Input, Select, message } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Widget from '../Widget/Widget';
import { useForm } from 'antd/lib/form/Form';
import { customNumber, toSlug } from '../../helpers/common/common';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getOrderById, updateOrder } from '../../services/orderService';
import { Table } from 'reactstrap';
import { toggleShowLoading } from '../../redux/actions/common';
import { buildImage, onErrorImage } from '../../services/common';

export const OrderForm = ( props ) =>
{
	const [ form ] = useForm();
	const [ orderInfo, setOrderInfo ] = useState();
	const dispatch = useDispatch();
	const params = useParams();
	const [ id, setId ] = useState( null );
	const [ status, setStatus ] = useState();
	const [ shippingStatus, setShippingStatus ] = useState();
	const [ totalDiscount, setTotalDiscount ] = useState( 0 );
	const [ totalPrice, setTotalPrice ] = useState( 0 );

	const [ transactions, setTransactions ] = useState( [] );
	const isView = props.location?.pathname?.includes( 'view' );

	useEffect( () =>
	{
		setStatus( [
			{ value: 1, label: 'Pending' },
			{ value: 2, label: 'Approved' },
			{ value: 3, label: 'Success' },
			{ value: 4, label: 'Reject/Cancel' },
		] );

		setShippingStatus( [
			{ value: 1, label: 'Waiting for delivery' },
			{ value: 2, label: 'Delivering' },
			{ value: 3, label: 'Delivered' },
		] )
	}, [] );

	useEffect( () =>
	{
		if ( params.id )
		{
			setId( Number( params.id ) );
			getOrderInfo( Number( params.id ) );
		}
	}, [ params.id ] );

	useEffect( () =>
	{
		if ( orderInfo )
		{
			form.setFieldsValue( {
				receiver_name: orderInfo.receiver_name,
				receiver_email: orderInfo.receiver_email,
				receiver_phone: orderInfo.receiver_phone,
				receiver_address: orderInfo.receiver_address,
				status: orderInfo.status,
				shipping_status: orderInfo.shipping_status,
				note: orderInfo.note
			} );
			setTotalDiscount( orderInfo.total_discount )
			setTotalPrice( orderInfo.total_price );
			setTransactions( orderInfo.transactions )
		}
	}, [ orderInfo ] );

	const getOrderInfo = async ( id ) =>
	{
		await getOrderById( id, setOrderInfo, dispatch );
	}

	const validateMessages = {
		required: '${label} is required!',
		types: {
			email: '${label} is not a valid email!',
			number: '${label} is not a valid number!',
			min: '${label} is invalid!',
			max: '${label} is invalid!',
		},
		number: {
			range: '${label} must be between ${min} and ${max}',
		},
	};

	const submitForm = async ( e ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await updateOrder( id, e );
		dispatch( toggleShowLoading( false ) );

		if ( response?.status === 'success' )
		{
			message.success( 'Update order successfully!' );
			window.location.href = '/order'
		} else
		{
			message.error( response?.message );
		}
	}

	const onFieldsChange = ( e ) =>
	{
		if ( e?.length > 0 )
		{
			let value = typeof e[ 0 ].value == 'string' ? e[ 0 ].value : e[ 0 ].value;
			if ( e[ 0 ].name[ 0 ] === 'name' && value != '' )
			{
				let slug = toSlug( value );
				form.setFieldsValue( { slug: slug } );
			}
			let fieldValue = {
				[ String( e[ 0 ].name[ 0 ] ) ]: value
			}
			form.setFieldsValue( fieldValue );
		}
	}

	return (
		<div className="w-75 mx-auto">
			<Widget>
				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ onFieldsChange }
					validateMessages={ validateMessages }
				>
					<div className='mb-3'>

						<Form.Item name="receiver_name" label="Receiver Name"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' readOnly={ isView } placeholder='Enter name' />
						</Form.Item>

						<div className='row'>
							<div className='col-md-6'>
								<Form.Item name="receiver_phone" label="Phone"
									rules={ [ { required: true, min: 10, max: 12 } ] }
									className=' d-block'>
									<Input className='form-control' readOnly={ isView } placeholder='Enter phone' />
								</Form.Item>
							</div>
							<div className='col-md-6'>
								<Form.Item name="receiver_email" readOnly={ isView } label="Receiver Email"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Input className='form-control' readOnly={ isView } placeholder='Enter email' />
								</Form.Item>
							</div>
						</div>

						<Form.Item name="receiver_address" label="Address"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' readOnly={ isView } placeholder='Enter address' />
						</Form.Item>

						<div className='row'>
							<div className='col-md-6'>
								<Form.Item name="status" label="Status"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Select
										placeholder="Select status"
										disabled={ isView }
										style={ { width: '100%' } }
										options={ status }
									/>
								</Form.Item>
							</div>
							<div className='col-md-6'>
								<Form.Item name="shipping_status" label="Shipping status"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Select
										placeholder="Select shipping status"
										disabled={ isView }
										style={ { width: '100%' } }
										options={ shippingStatus }
									/>
								</Form.Item>
							</div>
						</div>

						<div className="widget-table-overflow mt-4">
							<Table className={ `table-striped table-bordered table-hover mb-9` } responsive>
								<thead>
									<tr>
										<th>No</th>
										<th>Image</th>
										<th>Product Name</th>
										<th className='text-right'>Unit Price</th>
										<th className='text-right'>Qty</th>
										<th className='text-right'>Subtotal</th>
									</tr>
								</thead>
								<tbody>
									{ transactions?.length > 0 &&
										transactions.map( ( item, index ) => 
										{
											return (
												<tr key={ index }>
													<td className='text-center'>{ index + 1 }</td>
													<td>{
														<img style={ { border: "1px solid", borderRadius: "10px" } } src={ buildImage( item.avatar ) }
															alt={ item.avatar } width={ 100 }
															height={ 100 } onError={ onErrorImage } />
													}</td>
													<td className='text-break' style={ { maxWidth: "200px" } }>{ item.name }</td>
													<td className='text-right'>{ customNumber( item.price, ',', 'đ' ) }</td>
													<td className='text-right'>{ item.quantity }</td>
													<td className='text-right'>{ customNumber( item.total_price, ',', 'đ' ) }</td>
												</tr>
											);
										}
										)
									}

								</tbody>
							</Table>
						</div>

						<Form.Item name="note" label="Note"
							className=' d-block'>
							<Input.TextArea rows={ 5 } readOnly={ isView } className='form-control' placeholder='Enter note' />
						</Form.Item>
						<Form.Item label="Payment Status">
							<span className={ orderInfo?.payment_status === 1 ? 'text-success' : 'text-primary' }>
								<strong>{ orderInfo?.payment_status === 1 ? 'Paid' : 'UnPaid' }</strong>
							</span>
						</Form.Item>
						<div className='row'>
							<div className='col-md-6 mb-0 d-flex'>
								<h5 className='font-weight-normal'>Total discount:</h5>
								<h5 className='ml-2 font-italic'>{ customNumber( totalDiscount, ',', 'đ' ) }</h5>
							</div>

							<div className='col-md-6 mb-0 d-flex'>
								<h5 className='font-weight-normal'>Total price:</h5>
								<h5 className='ml-2 font-italic'>{ customNumber( totalPrice, ',', 'đ' ) }</h5>
							</div>
						</div>

					</div>

					<div className='d-flex justify-content-center'>
						{ isView ?
							<button type="button" className="btn btn-primary text-center" style={ { marginRight: 10, padding: '10px 10px' } }>
								<Link className="text-white" to="/order"><i className="nc-icon nc-zoom-split mr-2"></i>Go back</Link>
							</button> :
							<button type="submit" className="btn btn-primary text-center" style={ { marginRight: 10, padding: '10px 10px' } }>
								<i className="nc-icon nc-zoom-split mr-2"></i>Update
							</button>
						}


					</div>
				</Form>
			</Widget >
		</div>

	)
}