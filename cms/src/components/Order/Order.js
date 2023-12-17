// @ts-nocheck
import React, { useEffect, useState } from "react";
import
{
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Table,
	UncontrolledDropdown
} from "reactstrap";
import Widget from "../Widget/Widget.js";
import Icon, { SmallDashOutlined } from '@ant-design/icons';

import s from "../../pages/tables/Tables.js";
import { customNumber } from "../../helpers/common/common.js";
import { OrderSearch } from "./OrderSearch.js";
import { Pagination } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import { EMPTY_IMG } from "../../helpers/constant/image.js";

export const Orders = ( props ) =>
{

	const [ open, setOpen ] = useState( false );

	const dropdownOpen = () =>
	{
		setOpen( !open );
	}

	const genStatus = ( status ) =>
	{
		if ( status === 1 ) return <div className="text-warning">Pending</div>;
		else if ( status === 2 ) return <div className="text-primary">Approved</div>;
		else if ( status === 3 ) return <div className="text-success">Success</div>;
		else return <div className="text-danger">Reject/Cancel</div>;
	}

	const genPaymentStatus = ( status ) =>
	{
		if ( status === 1 ) return <div className="text-success">Paid</div>;
		return <div className="text-primary">Unpaid</div>;
	}

	const genShippingStatus = ( status ) =>
	{
		if ( status === 1 ) return <div className="text-warning">Waiting for delivery</div>;
		else if ( status === 2 ) return <div className="text-primary">Delivering</div>;
		else return <div className="text-success">Delivered</div>;
	}

	return (
		<>
			<Widget>
				<div className="p-5">
					<OrderSearch { ...props } />
				</div>
			</Widget >
			<Widget>

				<div className="widget-table-overflow p-5 mt-4">
					<h5>Total: { props.paging.total }</h5>
					<Table className={ `table-striped table-bordered table-hover mb-9` } responsive>
						<thead>
							<tr>
								<th>ID</th>
								<th className="text-nowrap">User</th>
								<th className="text-nowrap text-right">Total price</th>
								<th className="text-nowrap text-right">Total discount</th>
								<th className="text-nowrap text-center">Status</th>
								<th className="text-nowrap text-center">Payment Status</th>
								<th className="text-nowrap text-center">Shipping status</th>
								<th className="text-nowrap text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{
								props.orders?.length > 0 && props.orders.map( ( item, key ) =>
								{
									return (
										< tr key={ key } className="table-product">
											<td>{ item.id }</td>
											<td>
											<span className="font-weight-bold">Username:</span><span> { item.receiver_name } <br /></span>
													<span className="font-weight-bold">Phone:</span><span> { item.receiver_phone } <br /></span>
											</td>
											<td className="text-right">{ customNumber( item.total_price, ',', '₫' ) }</td>
											<td className="text-right">{ customNumber( item.total_discount, ',', '₫' ) }</td>
											<td className="text-center">{ genStatus( item.status ) }</td>
											<td className="text-center">{ genPaymentStatus( item.payment_status ) }</td>
											<td className="text-center">{ genShippingStatus( item.shipping_status ) }</td>
											<td className="text-center">

												<UncontrolledDropdown group>
													<DropdownToggle className="p-0" style={ { border: 'none', borderRadius: 'unset', background: 'none' } }>
														<SmallDashOutlined />
													</DropdownToggle>
													<DropdownMenu className="p-0">
														<DropdownItem href={ `view/${ item.id }` } className="text-nowrap pt-2">
															Chi tiết
														</DropdownItem>
														<DropdownItem href={ `edit/${ item.id }` } className="text-nowrap pt-2">
															Chỉnh sửa
														</DropdownItem>
														{/* { item.status <= 1 &&
															<DropdownItem href="" className="text-nowrap pt-2">
																Duyệt
															</DropdownItem>
														}

														{ item.status === 4 &&
															<DropdownItem href="" className="text-nowrap pt-2">
																Reject/Cancel
															</DropdownItem>
														} */}
													</DropdownMenu>
												</UncontrolledDropdown>
											</td>
										</tr>
									)
								}
								) }

							{
								( !props.orders || props.orders?.length <= 0 ) &&
								<tr>
									<td colSpan={ 9 } style={ { textAlign: "center", backgroundColor: '#ffff' } }>
										<img className="text-center" src={ EMPTY_IMG } style={ { width: "300px", height: "300px" } } />
										<div style={ { color: "#9A9A9A" } }>Data empty</div>
									</td>
								</tr>
							}
						</tbody>
					</Table>
					{
						props.paging.total > 0 &&
						<div className="mx-auto d-flex justify-content-center my-4">
							<Pagination
								onChange={ e =>
									props.getOrdersByFilters( { ...props.paging, page: e, ...props.params } )
								}
								pageSize={ props.paging.page_size }
								defaultCurrent={ props.paging.page }
								total={ props.paging.total }
							/>
						</div>
					}
				</div>

			</Widget >
		</>

	)
}