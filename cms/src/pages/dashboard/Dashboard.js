import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import
{
	Col,
	Row,
	Progress,
	Button,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";

import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";

import s from "./Dashboard.module.scss";
import { useDispatch } from "react-redux";
import { DASHBOARD_SERVICE } from "../../services/dashboard.js";
import Charts from "../uielements/charts/Charts.js";
import ApexLineChart from "../uielements/charts/components/ApexLineChart.js";
import RechartsPieChart from "../uielements/charts/components/RechartsPieChart.js";
import { Form, Select } from "antd";
import moment from "moment";

const Dashboard = () =>
{
	const [ checkboxes, setCheckboxes ] = useState( [ true, false ] );
	const [ optionMonth, setOptionMonth ] = useState( [] );

	const toggleCheckbox = ( id ) =>
	{
		setCheckboxes( checkboxes => checkboxes
			.map( ( checkbox, index ) => index === id ? !checkbox : checkbox ) )
	}
	const meals = [ meal1, meal2, meal3 ];

	// const optionMonth = [
	// 	{ value: 1, label: 'Pending' },
	// 	{ value: 2, label: 'Approved' },
	// 	{ value: 3, label: 'Success' },
	// 	{ value: 4, label: 'Reject/Cancel' },
	// ]

	const [ data, setData ] = useState( null );


	const [ params, setParams ] = useState( {} )
	const dispatch = useDispatch();

	useEffect( () =>
	{
		// getDashboard( {} );
		getTime()
	}, [] );

	const getTime = () =>
	{
		let arrayTime = [ ...Array( 12 ) ].reduce( ( newItem, item, index ) =>
		{
			let obj = {
				value: index + 1,
				label: moment().month( index ).format( 'MMMM' )
			};
			newItem.push( obj );
			return newItem
		}, [] );
		setOptionMonth( arrayTime )
	}

	// const getDashboard = async ( filter ) =>
	// {
	// 	await DASHBOARD_SERVICE.getByFilter( filter, setData, dispatch );
	// }
	return null
	return (
		<Row>
			<Col className="pr-grid-col" xs={ 12 } lg={ 12 }>
				<Row className="gutter mb-4">
					<Col className="mb-4 mb-xl-0" xs={ 6 } sm={ 6 } xl={ 4 }>
						<Widget className="widget-p-sm bg-primary text-white">
							<div className={ s.smallWidget }>
								<div className="d-md-flex align-items-center justify-content-md-between">
									<p className="headline-2">Total Customers</p>
									<p className="headline-2">{ data?.totalUser || 0 } <i className="eva eva-people ml-2"></i></p>
								</div>
							</div>
						</Widget>
					</Col>
					<Col xs={ 6 } sm={ 6 } xl={ 4 }>
						<Widget className="widget-p-sm bg-warning text-white">
							<div className={ s.smallWidget }>
								<div className="d-md-flex align-items-center justify-content-md-between">
									<p className="headline-2">Total Products</p>
									<p className="headline-2"> { data?.totalProduct || 0 } <i className="eva eva-list ml-2"></i></p>
								</div>
							</div>
						</Widget>
					</Col>
					<Col xs={ 6 } sm={ 6 } xl={ 4 }>
						<Widget className="widget-p-sm bg-success text-white">
							<div className={ s.smallWidget }>
								<div className="d-md-flex align-items-center justify-content-md-between">
									<p className="headline-2">Total Orders</p>
									<p className="headline-2"> { data?.totalOrder || 0 } <i className="eva eva-layers ml-2"></i></p>
								</div>
							</div>
						</Widget>
					</Col>
				</Row>
				<div className="gutter">

					<Widget className="widget-p-md">
						{/* <div className="d-md-flex align-items-center">
							<div className="headline-3 mb-3 font-weight-bold mr-2">Select Month:</div>
							<Select
								placeholder="Select month"
								className="mb-4"
								size="large"
								onChange={(e) => {
									getDashboard({month: e})
								}}
								options={ optionMonth }
							/>
						</div> */}
						<Row className="gutter mb-4">
							{/* <Col className="mb-4 pr-0 mb-md-0" xs={ 12 } md={ 6 }>
								<h2 className="headline-2 mb-3">Order Sales Amount</h2>
								<ApexLineChart className="pb-4" listDates={data?.listDate} data={data?.listOrderByStatus}/>
							</Col> */}
							<Col className="mb-4 px-0 mb-md-0" xs={ 12 } md={ 12}>
								<h2 className="headline-2 mb-3">Order Status</h2>
								<RechartsPieChart className="pb-4" data={data?.orderByStatus}/>
							</Col>
						</Row>
					</Widget>

				</div>

			</Col>
		</Row >
	)
}

export default Dashboard;
