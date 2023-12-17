// @ts-nocheck
import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridTwo from "./ProductGridTwo";

const TabProductFourteen = ( {
	spaceTopClass,
	spaceBottomClass,
	category,
	containerClass,
	extraClass,
	...props
} ) =>
{

	const handleChangeTab = ( key ) =>
	{
		let params = { ...props.params }
		switch ( key )
		{
			case 0:
				params.is_hot = null;
				params.is_sale = null;
				props.setParams( params );
				break;
			case 1:
				params.is_hot = 1;
				params.is_sale = null;
				props.setParams( params );
				break;

			case 2:
				params.is_hot = null;
				params.is_sale = 1;
				props.setParams( params );
				break;
		}
	}
	return (
		<div
			className={ `product-area ${ spaceTopClass ? spaceTopClass : "" } ${ spaceBottomClass ? spaceBottomClass : ""
				} ${ extraClass ? extraClass : "" }` }
		>
			<div className={ `${ containerClass ? containerClass : "container" }` }>
				{/* <SectionTitleThree
					titleText="Featured Products"
					positionClass="text-center"
				/> */}
				<Tab.Container defaultActiveKey="newArrival">
					<Nav
						variant="pills"
						className="product-tab-list-2 pt-30 pb-55 text-center"
					>
						<Nav.Item>
							<Nav.Link eventKey="newArrival" onSelect={ ( e ) =>
							{
								handleChangeTab( 0 )
							} }>
								<h4>Product new</h4>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="bestSeller" onSelect={ ( e ) =>
							{
								handleChangeTab( 1 )
							} }>
								<h4>Product Hot</h4>
							</Nav.Link>
						</Nav.Item>
						{/* <Nav.Item>
							<Nav.Link className="">
								<h4>Giảm giá</h4>
							</Nav.Link>
						</Nav.Item> */}
					</Nav>
					<Tab.Content>
						<Tab.Pane eventKey="newArrival">
							<div className="row">
								<ProductGridTwo
									category={ category }
									products={ props.products }
									type="new"
									spaceBottomClass="mb-25"
								/>
							</div>
						</Tab.Pane>
						<Tab.Pane eventKey="bestSeller">
							<div className="row">
								<ProductGridTwo
									category={ category }
									products={ props.products }
									type="bestSeller"
									spaceBottomClass="mb-25"
								/>
							</div>
						</Tab.Pane>
						<Tab.Pane eventKey="saleItems">
							<div className="row">
								<ProductGridTwo
									category={ category }
									products={ props.products }
									type="saleItems"
									spaceBottomClass="mb-25"
								/>
							</div>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</div>
		</div>
	);
};

TabProductFourteen.propTypes = {
	category: PropTypes.string,
	containerClass: PropTypes.string,
	extraClass: PropTypes.string,
	spaceBottomClass: PropTypes.string,
	spaceTopClass: PropTypes.string,
	products: PropTypes.array
};

export default TabProductFourteen;
