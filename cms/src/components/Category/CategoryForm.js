// @ts-nocheck
import { Form, Input, Select, Switch, Upload } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from 'react';
import Widget from '../Widget/Widget';
import { DEFAUT_IMG } from '../../helpers/constant/image';
import { useForm } from 'antd/lib/form/Form';
import { toSlug } from '../../helpers/common/common';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { showCategoryDetail, submitForms } from '../../services/categoryService';
import { buildImage } from '../../services/common';
export const CategoryForm = ( props ) =>
{
	const [ form ] = useForm();
	const [ status, setStatus ] = useState( [] );
	const [ files, setFiles ] = useState( [] );
	const [ data, setData ] = useState( null );
	const dispatch = useDispatch();
	const history = useHistory();
	const params = useParams();
	const [ id, setId ] = useState( null );

	useEffect( () =>
	{
		setStatus( [
			{ value: 1, label: "Active" },
			{ value: 0, label: "Inactive" }
		] );
	}, [] );

	useEffect( () =>
	{
		if ( params.id )
		{
			setId( Number( params.id ) );
			getData( Number( params.id ) );
		}
	}, [ params.id ] );


	useEffect( () =>
	{
		if ( data )
		{
			let file = [];
			file.push( {
				uid: file.length,
				name: data.avatar,
				status: 'done',
				url: buildImage(data.avatar),
				default: true
			} );
			let formValue = {
				name: data.name,
				description: data.description,
				status: data.status || 0,
				hot: data.hot === 1 ? true : false,
				slug: data.slug,
				image: file
			}
			setFiles(file)
			form.setFieldsValue( formValue )

		}
	}, [ data ] )

	const getData = async ( id ) =>
	{
		await showCategoryDetail( id, setData );
	}

	const validateMessages = {
		required: '${label} is required!',
		types: {
			email: '${label} is not a valid email!',
			number: '${label} is not a valid number!',
		},
		number: {
			range: '${label} must be between ${min} and ${max}',
		},
	};

	const submitForm = async ( e ) =>
	{
		await submitForms( id, files, e, dispatch, history );
	}

	const resetForm = () =>
	{
		form.resetFields();
	}

	const onFieldsChange = ( e ) =>
	{
		if ( e.length > 0 )
		{
			let value = typeof e[ 0 ].value === 'string' ? e[ 0 ].value : e[ 0 ].value;
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

	const normFile = ( e ) =>
	{
		if ( e?.fileList )
		{
			let fileChoose = e?.fileList;
			setFiles( fileChoose );
		}
		return e?.fileList;
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
						<Form.Item name="name" label="Category name"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' placeholder='Enter name' />
						</Form.Item>

						<Form.Item name="slug" label="Category Slug"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' placeholder='Enter slug' />
						</Form.Item>
						<Form.Item
							label="Avatar"
							name="image"
							accept="images/**"
							className='d-block'
							valuePropName="fileList"
							fileList={ files }
							getValueFromEvent={ normFile }
						>
							<Upload action="/upload" listType="picture-card">
								{ files.length < 1 && <div>
									<PlusOutlined />
									<div style={ { marginTop: 8 } }>Upload</div>
								</div> }
							</Upload>
						</Form.Item>

						<Form.Item name="description" label="Description"

							className='d-block'>
							<Input.TextArea className='form-control'
								placeholder='Enter description' cols={ 10 } rows={ 5 } />
						</Form.Item>
						<Form.Item name="status" label="Status"
							rules={ [ { required: true } ] } className='d-block'>
							<Select
								placeholder="Select status"
								style={ { width: '100%' } }
								options={ status }
							/>
						</Form.Item>

						{/* <Form.Item name="hot" label="Is hot?" valuePropName="checked">
							<Switch />
						</Form.Item> */}

					</div>

					<div className='d-flex justify-content-center'>
						<button type="submit" className="btn btn-primary text-center" style={ { marginRight: 10, padding: '10px 10px' } }>
							{ !id && 'Create' || 'Update' }
						</button>

						{ !id && <button type="button" className="btn btn-secondary text-center" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ resetForm }>
							Reset
						</button> }
					</div>
				</Form>
			</Widget >
		</div>

	)
}