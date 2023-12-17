// @ts-nocheck
import { Form, Input, Select, Switch, Table, Upload } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from 'react';
import Widget from '../Widget/Widget';
import { DEFAUT_IMG } from '../../helpers/constant/image';
import { useForm } from 'antd/lib/form/Form';
import { toSlug } from '../../helpers/common/common';
import { getCategoriesByFilter } from '../../services/categoryService';
import { DeleteOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { showProductDetail, submitFormProduct } from '../../services/productService';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { buildImage, timeDelay } from '../../services/common';
import { toggleShowLoading } from '../../redux/actions/common';
import moment from 'moment';

const initOptions = [{
	key: "",
	value: ""
}]
export const ProductForm = ( props ) =>
{
	const [ form ] = useForm();
	const [ status, setStatus ] = useState( [] );
	const [ hot, setHot ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );
	const [ files, setFiles ] = useState( [] );
	let [ attributes, setAttributes ] = useState( initOptions);
	const [ product, setProduct ] = useState( null );
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
		getListCategories();
	}, [] );

	useEffect( () =>
	{
		if ( params.id )
		{
			setId( Number( params.id ) );
			getProduct( Number( params.id ) );
		}
	}, [ params.id ] );


	useEffect( () =>
	{
		if ( product )
		{
			let file = [];
			file.push( {
				uid: file.length,
				name: product?.avatar,
				status: 'done',
				path: product?.avatar,
				url: buildImage( product.avatar ),
				default: true
			} );

			if ( product?.product_images?.length > 0 )
			{
				file = product.product_images.reduce( ( newFile, item ) =>
				{
					if ( item )
					{
						newFile.push( {
							uid: file.length,
							name: item.name,
							status: 'done',
							path: item.path,
							url: buildImage( item.path ),
							default: true
						} );
					}
					return newFile;
				}, file )
			}
			setFiles( file )
			let formValue = {
				name: product.name,
				category_id: product.category_id,
				content: product.content,
				description: product.description,
				status: product.status,
				sale: product.sale,
				hot: product.hot === 1 ? true : false,
				number: product.number,
				price: product.price,
				sale_to: product.sale_to ? moment( product.sale_to ).format( 'yyyy-MM-DD' ) : null,
				slug: product.slug,
				image: file
			}
			form.setFieldsValue( formValue )
			setAttributes(product?.options || initOptions)
		}
	}, [ product ] )

	const getListCategories = async () =>
	{
		const result = await getCategoriesByFilter( { page: 1, page_size: 20, status: 1 }, dispatch );
		await timeDelay( 500 );
		dispatch( toggleShowLoading( false ) );
		if ( result )
		{
			let category = result.categories.reduce( ( newCate, item ) =>
			{
				if ( item )
				{
					newCate.push( {
						value: item.id,
						label: item.name
					} )
				}
				return newCate
			}, [] );
			setCategories( category );
		}
	}

	const getProduct = async ( id ) =>
	{
		await showProductDetail( id, setProduct );
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
		let valueAttributes = attributes?.filter(item => item.key !== "" && item.value !== "")
		await submitFormProduct( id, files, {...e, options: valueAttributes}, dispatch, history );
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
			let fileChoose = e?.fileList.map( item =>
			{
				if ( item.default ) return item;
				item.status = 'done';
				return item;
			} );
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
						<Form.Item name="name" label="Product name"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' placeholder='Enter name' />
						</Form.Item>

						<Form.Item name="slug" label="Product Slug"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='form-control' placeholder='Enter slug' />
						</Form.Item>

						<Form.Item name="category_id" label="Category"
							rules={ [ { required: true } ] } className='d-block'>
							<Select
								placeholder="Select category"
								showSearch
								filterOption={ ( input, option ) => ( option?.label?.toLowerCase() ).includes( input?.toLowerCase() ) }

								style={ { width: '100%' } }
								options={ categories }
							/>
						</Form.Item>
						<Form.Item
							label="Images"
							name="image"
							accept="images/**"
							className='d-block'
							valuePropName="fileList"
							fileList={ files }
							getValueFromEvent={ normFile }
						>
							<Upload action="/upload" listType="picture-card">
								{ files.length <= 5 && <div>
									<PlusOutlined />
									<div style={ { marginTop: 8 } }>Upload</div>
								</div> }
							</Upload>
						</Form.Item>
						<Form.Item name="content" label="Short content"
							className='d-block'>
							<Input.TextArea className='form-control'
								placeholder='Enter content'
								cols={ 10 } rows={ 5 } />
						</Form.Item>
						<Form.Item name="description" label="Description"

							className='d-block'>
							<Input.TextArea className='form-control'
								placeholder='Enter description' cols={ 10 } rows={ 5 } />
						</Form.Item>

						<div className='form-group'>
							<label >Thuộc tính</label>
							<div className='mt-2'>
								<div className="table-item row w-100 mx-auto" style={ { lineHeight: 3, backgroundColor: "#eef5f9", fontWeight: "700", borderBottom: "1px solid #F1F3F8" } }>
									<div className="text-center table-item__id col-5">Key</div>
									<div className="table-item__info col-5 text-center"
										style={ { borderLeft: "1px solid #d9d9d9", borderRight: "1px solid #d9d9d9" } }>
										Value
									</div>
									<div className="table-item__action col-2">Action</div>
								</div>
								{
									attributes?.length > 0 && attributes.map( ( item, key ) =>
									{
										return (
											<div key={ key } className='w-100 mx-auto'>

												<div className="style-scroll" style={ { overflow: "hidden", overflowY: "auto", boxShadow: "1px 0 8px rgba(0, 0, 0, .08) inset;" } }>
													<div className="table-item w-100 mx-auto row py-1" style={ { border: "1px solid #d9d9d9" } }>
														<div className="text-center table-item__id col-5">
															<input className='form-control' defaultValue={ item.key } onChange={ ( e ) =>
															{
																if ( e )
																{
																	attributes[ key ].key = e?.target?.value;
																	setAttributes( attributes );
																}
															} } />
														</div>
														<div className="table-item__info col-5"
															style={ { borderLeft: "1px solid #d9d9d9", borderRight: "1px solid #d9d9d9" } }>
															<input className='form-control' defaultValue={ item.value } onChange={ ( e ) =>
															{
																if ( e )
																{
																	attributes[ key ].value = e?.target?.value;
																	setAttributes( attributes );
																}
															} } />

														</div>
														<div className="table-item__action col-2 d-flex justify-content-center">
															{attributes?.length > 1 && 
															<DeleteOutlined className=" text-danger text-center cursor-pointer"
															 style={{fontSize: "20px"}} onClick={() => {
																let value = attributes.filter((e, index) => index !== key);
																setAttributes(value)
															 }}/> }
														</div>
													</div>
												</div>
											</div>
										);
									} )
								}

								<div className='mt-3'>
									<button type='button' className='btn btn-success' onClick={ () =>
									{
										setAttributes( attributes.concat( { key: "", value: "" } ) )
									} }>
										<PlusCircleOutlined style={{fontSize: "20px"}} />
									</button>
								</div>

							</div>
						</div>

						<div className='row'>

							<div className='col-md-4'>
								<Form.Item name="price" label="Product price"
									rules={ [ { required: true } ] }
									className='d-block'>
									<Input className='form-control' placeholder='Enter price' />
								</Form.Item>
							</div>
							<div className='col-md-4'>
								<Form.Item name="number" label="Product quantity"
									rules={ [ { required: true } ] }
									className='d-block'>
									<Input className='form-control' placeholder='Enter quantity' />
								</Form.Item>
							</div>
							<div className='col-md-4'>
								<Form.Item name="sale" label="Discount"
									className=' d-block'>
									<Input className='form-control' placeholder='Enter discount (%)' />
								</Form.Item>
							</div>
							{/* <div className='col-md-4'>
								<Form.Item name="sale_to" label="Discount to date"
									className=' d-block'>
									<Input type='date' className='form-control' placeholder='Choose time to end discount' />
								</Form.Item>
							</div> */}

							<div className='col-md-4'>
								<Form.Item name="status" label="Status"
									rules={ [ { required: true } ] } className='d-block'>
									<Select
										placeholder="Select status"
										style={ { width: '100%' } }
										options={ status }
									/>
								</Form.Item>
							</div>


						</div>

						<Form.Item name="hot" label="Is hot?" valuePropName="checked">
							<Switch />
						</Form.Item>

					</div >

					<div className='d-flex justify-content-center'>
						<button type="submit" className="btn btn-primary text-center" style={ { marginRight: 10, padding: '10px 10px' } }>
							<i className="nc-icon nc-zoom-split mr-2"></i>{ !id && 'Create' || 'Update' }
						</button>

						{ !id && <button type="button" className="btn btn-secondary text-center" style={ { marginLeft: 10, padding: '10px 10px' } } onClick={ resetForm }>
							<i className="nc-icon nc-refresh-02 mr-2"></i>Reset
						</button> }
					</div>
				</Form >
			</Widget >
		</div >

	)
}