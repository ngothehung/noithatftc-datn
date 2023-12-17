import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { buildImage, getCategories } from "../../services";

const NavMenu = ( { strings, menuWhiteClass, sidebarMenu } ) =>
{
	const [ categories, setCategories ] = useState( [] );
	useEffect( () =>
	{
		getCategories( { page: 1, page_size: 5, status: 1 }, setCategories );
	}, [] );
	console.log(sidebarMenu);
	return (
		<div
			className={ ` ${ sidebarMenu
				? "sidebar-menu"
				: `main-menu ${ menuWhiteClass ? menuWhiteClass : "" }`
				} ` }
		>
			<nav>
				<ul>
					<li>
						<Link to="/home">
							{ strings[ "home" ] }
						</Link>
					</li>
					{/* <li>
						<Link to="/shop">
							{ " " }
							{ strings[ "Products" ] }
							{ sidebarMenu ? (
								<span>
									<i className="fa fa-angle-right"></i>
								</span>
							) : (
								<i className="fa fa-angle-down" />
							) }
						</Link>
					</li> */}
					<li>
						<Link to={ '/shop' }>
							{ " " }
							{ strings[ "Products" ] }
							{ sidebarMenu ? (
								<span>
									<i className="fa fa-angle-right"></i>
								</span>
							) : (
								<i className="fa fa-angle-down" />
							) }
						</Link>
						{ categories?.length > 0 &&
							<ul className="mega-menu category-mega">
								<li className="category-menu">
									<ul className="row">
										{ categories.map( ( item, key ) =>
										{
											return (
												<li className="mega-menu-title col-md-6 col-12" key={ key }>
													<Link to={ `/shop?category_id=${ item.id }` }>
														{ item.name }
													</Link>
												</li>
											);
										} ) }
									</ul>
								</li>

								<li >
									<ul className="mr-1 w-100 d-flex justify-content-center">
										<li className="mega-menu-img">
											<Link to={"/shop" }>
												<img
													className="image-cover"
													src={buildImage(categories[0]?.avatar)}
													alt=""
												/>
											</Link>
										</li>
									</ul>
								</li>
							</ul>
						}
					</li>
				</ul>
			</nav>
		</div>
	);
};

NavMenu.propTypes = {
	menuWhiteClass: PropTypes.string,
	sidebarMenu: PropTypes.bool,
	strings: PropTypes.object
};

export default multilanguage( NavMenu );
