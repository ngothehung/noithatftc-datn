// @ts-nocheck
import { Button, Form, Input, Select } from 'antd';
import { setField } from "../../services/common";
import { useState } from "react";
import { useEffect } from "react";
import React from 'react';
import { useForm } from 'antd/lib/form/Form';

export const OrderSearch = ( props ) =>
{
	const [ form ] = useForm();
	const [ status, setStatus ] = useState( [] );
	const [ shippingStatus, setShippingStatus ] = useState( [] );

	useEffect( () =>
	{
		setStatus( [
			{ value: 1, label: "Pending" },
			{ value: 2, label: "Approved" },
			{ value: 3, label: "Success" },
			{ value: 4, label: "Reject/Cancel" }
		] );
		setShippingStatus( [
			{ value: 1, label: "Waiting for delivery" },
			{ value: 2, label: "Delivering" },
			{ value: 3, label: "Delivered" },
		] );
	}, [] )


	const submitForm = ( value ) =>
	{
		let params = {};
		if ( value.name )
		{
			value.name = value.name.trim();
		}
		if ( value.id )
		{
			value.id = value.id.trim();
		}
		props.getOrdersByFilters( { ...props.paging, page: 1, ...value } );
		props.setParams( value );
	}

	const resetForm = () =>
	{
		props.getOrdersByFilters( { ...props.paging, page: 1 } );
		props.setParams( {
			id: null,
			product_name: null,
			receiver_name: null,
			status: null,
		} );
		form.resetFields();
	}
	return (
		<Form
			name='search product'
			form={ form }
			onFinish={ submitForm }
		>
			<div className="row mb-1">
				<div className="col-md-3 mb-2 form-group">
					<Form.Item name="id" label="ID" className='mb-0 d-block'>
						<Input className='form-control' placeholder='Enter ID' />
					</Form.Item>
				</div>
				<div className="col-md-3 mb-2 form-group">
					<Form.Item name="product_name" label="Product name" className='mb-0 d-block'>
						<Input className='form-control' placeholder='Enter product name' />
					</Form.Item>
				</div>
				<div className="col-md-3 mb-2 form-group">
					<Form.Item name="receiver_name" label="Receiver name" className='mb-0 d-block'>
						<Input className='form-control' placeholder='Enter receiver name' />
					</Form.Item>
				</div>
				<div className="col-md-3 mb-2 form-group">
					<Form.Item name="receiver_email" label="Receiver email" className='mb-0 d-block'>
						<Input className='form-control' placeholder='Enter receiver email' />
					</Form.Item>
				</div>
				<div className="col-md-3 mb-2 form-group">
					<Form.Item name="receiver_phone" label="Receiver phone" className='mb-0 d-block'>
						<Input className='form-control' placeholder='Enter receiver phone' />
					</Form.Item>
				</div>
				<div className="col-md-3 mb-2">
					<Form.Item name="status" label="Status" className='mb-0 d-block'>
						<Select
							placeholder="Select status"
							style={ { width: '100%' } }
							options={ status }
						/>
					</Form.Item>
				</div>
				<div className="col-md-3 mb-2">
					<Form.Item name="shipping_status" label="Shipping Status" className='mb-0 d-block'>
						<Select
							placeholder="Select shipping status"
							style={ { width: '100%' } }
							options={ shippingStatus }
						/>
					</Form.Item>
				</div>
			</div>

			<button type="submit" className="btn btn-primary" style={ { marginRight: 10, padding: '10px 10px' } }>
				<i className="nc-icon nc-zoom-split mr-2"></i>Search
			</button>

			<button type="button" className="btn btn-secondary" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ resetForm }>
				<i className="nc-icon nc-refresh-02 mr-2"></i>Reset
			</button>
		</Form>
	);
}