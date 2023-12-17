import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchParamsProduct } from "../../redux/actions/productActions";

const ShopSearch = (props
) =>
{
	const [ name, setName ] = useState( '' );
	
	return (
		<div className="sidebar-widget">
			<h4 className="pro-sidebar-title">Search </h4>
			<div className="pro-sidebar-search mb-50 mt-25">
				<form className="pro-sidebar-search-form" action="#">
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Search here..." />
					<button onClick={() => props.setParams({...props.params, name: name})}>
						<i className="pe-7s-search" />
					</button>
				</form>
			</div>
		</div>
	);
};

export default ShopSearch;
