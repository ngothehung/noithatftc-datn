import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { checkTimeNow, customNumber } from "../../helpers/func";
import { CheckoutForm } from "../../components/checkout/checkoutForm";

const Checkout = ({ location, cartItems, currency }) => {
    const { pathname } = location;
    let cartTotalPrice = 0;

	const [submit, setSubmit] = useState(false);
	const [form, setForm] = useState({});


    return (
        <Fragment>
            <MetaTags>
                <title>Cửa hàng Nội thất Checkout</title>
                <meta
                    name="description"
                    content="Checkout page of shop react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Checkout
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="checkout-area pt-95 pb-100">
                    <div className="container">
                        {cartItems && cartItems.length >= 1 ? (
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="billing-info-wrap">
                                        <h3>Billing Details</h3>
										<CheckoutForm submit={submit} setSubmit={setSubmit} cartItem={cartItems}/>
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="your-order-area">
                                        <h3>Your order</h3>
                                        <div className="your-order-wrap gray-bg-4">
                                            <div className="your-order-product-info">
                                                <div className="your-order-top">
                                                    <ul>
                                                        <li>Product</li>
                                                        <li>Total</li>
                                                    </ul>
                                                </div>
                                                <div className="your-order-middle">
                                                    <ul>
                                                        {cartItems.map((cartItem, key) => {
                                                            const discountedPrice = (checkTimeNow(cartItem?.sale_to)  && cartItem.sale)? Number(getDiscountPrice(
                                                                cartItem.price,
                                                                cartItem.sale
                                                            )) : null;
                                                            const finalProductPrice = Number((
                                                                cartItem.price 
                                                            ).toFixed(2));
                                                            const finalDiscountedPrice =  Number((
                                                               discountedPrice * currency.currencyRate
                                                            ).toFixed(2));
                                                            discountedPrice != null && discountedPrice != 0
                                                                ? (cartTotalPrice +=
                                                                    finalDiscountedPrice * cartItem.quantity)
                                                                : (cartTotalPrice +=
                                                                    finalProductPrice * cartItem.quantity);
                                                            return (
                                                                <li key={key}>
                                                                    <span className="order-middle-left">
                                                                        {cartItem.name} X {cartItem.quantity}
                                                                    </span>{" "}
                                                                    <span className="order-price">
                                                                        {discountedPrice !== null && discountedPrice != 0
                                                                            ? customNumber((finalDiscountedPrice * cartItem.quantity).toFixed(2), '₫')
                                                                            : customNumber((finalProductPrice * cartItem.quantity).toFixed(2), '₫')}
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="your-order-bottom">
                                                    <ul>
                                                        <li className="your-order-shipping">Shipping</li>
                                                        <li>Free shipping</li>
                                                    </ul>
                                                </div>
                                                <div className="your-order-total">
                                                    <ul>
                                                        <li className="order-total">Total</li>
                                                        <li>
                                                            {customNumber(cartTotalPrice.toFixed(2), '₫')}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="payment-method"></div>
                                        </div>
                                        <div className="place-order mt-25">
                                            <button className="btn-hover" onClick={e => setSubmit(true)}>Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__icon mb-30">
                                            <i className="pe-7s-cash"></i>
                                        </div>
                                        <div className="item-empty-area__text">
                                            No items found in cart to checkout <br />{" "}
                                            <Link to={process.env.PUBLIC_URL + "/shop"}>
                                                Shop Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

Checkout.propTypes = {
    cartItems: PropTypes.array,
    currency: PropTypes.object,
    location: PropTypes.object
};

const mapStateToProps = state => {
    return {
        cartItems: state.cartData,
        currency: state.currencyData
    };
};

export default connect(mapStateToProps)(Checkout);
