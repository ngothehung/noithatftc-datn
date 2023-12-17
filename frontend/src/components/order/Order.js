import React, { useEffect, useState } from "react";
import { ORDER_SERVICE, buildImage, onErrorImage } from "../../services";
import { Accordion, Card, Table } from "react-bootstrap";
import { customNumber } from "../../helpers/func";
import { Pagination } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";

const Order = (props) => {

    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [paging, setPaging] = useState({
        page: 1,
        page_size: 10,
        total: 0,
        totalPage: 0
    });

    useEffect(() => {
        getOrders(paging);
    }, []);

    const getOrders = async (params) => {
        let eventKey = 0;
        dispatch(toggleShowLoading(true));
        const response = await ORDER_SERVICE.getList(params);
        if (response?.status == 'success' && response?.data) {
            response.data.orders.map(item => {
                item.eventKey = eventKey;
                eventKey++;
            })
            setOrders(response?.data?.orders);
            setPaging(response?.data?.meta);
            dispatch(toggleShowLoading(false));
        }
    };

	const genStatus = ( status ) =>
	{
		if ( status === 1 ) return <p  className="text-warning mb-0 ">Pending</p>;
		else if ( status === 2 ) return <p className="text-primary mb-0">Approved</p>;
		else if ( status === 3 ) return <p className="text-success mb-0">Success</p>;
		else return <p className="text-danger mb-0">Reject/Cancel</p>;
	}

	const genPaymentStatus = ( status ) =>
	{
		if ( status === 1 ) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">Paid</span>;
		return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-primary">Unpaid</span>;
	}

	const genShippingStatus = ( status ) =>
	{
		if ( status === 1 ) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-warning">Waiting for delivery</span>;
		else if ( status === 2 ) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-primary">Delivering</span>;
		else return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">Delivered</span>;
	}

    return (
        <div className="myaccount-area pb-80 pt-100">
                <div className="container">
                    <div className="row">
                        <div className="ml-auto mr-auto col-lg-9">
                            <div className="myaccount-wrapper">
                                <Accordion>
                                    {orders.length > 0 ?
                                        orders.map((item, key1) => (
                                            <div key={key1}>
                                                <Card className="single-my-account mb-20">
                                                    <Card.Header className="panel-heading">
                                                        <Accordion.Toggle variant="link" eventKey={String(item.eventKey)}>
                                                            <h3 className="panel-title">
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        Order {item.id}
                                                                    </div>
                                                                    <div className="col-sm-3 text-right">
                                                                        {customNumber(item.total_price)}
                                                                    </div>
																	<div className="col-sm-3 text-right">
                                                                        {genStatus(item.status)}
                                                                    </div>
                                                                </div>
                                                            </h3>
                                                        </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey={String(item.eventKey)}>
                                                        <Card.Body>
                                                            <div className="myaccount-info-wrapper">
                                                                <div className="mb-5">
                                                                    <h4>Name: {item.receiver_name} - {item.receiver_phone}</h4>
                                                                    <p><span style={{ fontWeight: 600 }}>Address: </span>{item.receiver_address}</p>
                                                                    <p><span style={{ fontWeight: 600 }}>Email: </span>{item.receiver_email}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <h4>Products</h4>
                                                                </div>
                                                                <Table className={`table-striped table-hover mb-5`} responsive>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th className="text-nowrap">Name</th>
                                                                            <th className="text-nowrap">Qty</th>
                                                                            <th className="text-nowrap">Price</th>
                                                                            <th className="text-nowrap">Total price</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {item.transactions.length > 0 &&
                                                                            item.transactions.map((product, key2) => (
                                                                                <tr key={key2}>
                                                                                    <td>
                                                                                        {product.id}.
                                                                                    </td>
                                                                                    <td className="d-flex align-items-center">
                                                                                        <img alt={product.name} 
																						src={buildImage(product.avatar)} onError={onErrorImage} width={90} height={90} className="mr-1" />
                                                                                        {product.name}
                                                                                    </td>
                                                                                    <td>{product.quantity}</td>
                                                                                    <td>{customNumber(product.price)}</td>
                                                                                    <td>{customNumber(product.total_price * product.quantity)}</td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                                <div className="border-top pt-md-3">
                                                                    <div className="row mb-md-3">
                                                                        <div className="col-sm-9">
                                                                            <span style={{ fontWeight: 600, fontSize: 16 }}>TOTAL DISCOUNT:</span>
                                                                        </div>
                                                                        <div className="col-sm-3 text-right">
                                                                            <span style={{ fontWeight: 600, fontSize: 16 }}>{customNumber(item.total_discount) || 0}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-md-3 pt-md-3">
                                                                        <div className="col-sm-9">
                                                                            <span style={{ fontWeight: 600, fontSize: 18, color: 'red' }}>TOTAL PRICE:</span>
                                                                        </div>
                                                                        <div className="col-sm-3 text-right">
                                                                            <span style={{ fontWeight: 600, fontSize: 18, color: 'red' }}>{customNumber(item.total_price)}</span>
                                                                        </div>
                                                                    </div>
																	<div className="row mb-md-3 pt-md-3">
                                                                        <div className="col-sm-9">
                                                                            <span style={{ fontWeight: 600, fontSize: 18 }}>PAYMENT STATUS:</span>
                                                                        </div>
                                                                        <div className="col-sm-3 text-right">
                                                                            {genPaymentStatus(item.payment_status)}
                                                                        </div>
                                                                    </div>
																	<div className="row mb-md-3 pt-md-3">
                                                                        <div className="col-sm-9">
                                                                            <span style={{ fontWeight: 600, fontSize: 18 }}>SHIPPING STATUS:</span>
                                                                        </div>
                                                                        <div className="col-sm-3 text-right">
																		{genShippingStatus(item.shipping_status)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </div>
                                        ))
                                        :
                                        <div className="text-center">
                                            No item order. <br />
                                            <br />
                                            <br />
                                            <br />
                                            <Link to="/" style={{ fontSize: 18, color: '#a771ff' }}>Continue shopping...</Link>
                                        </div>
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    {
                        paging.total > 0 &&
                        <div className="mx-auto d-flex justify-content-center my-4">
                            <Pagination
                                onChange={e =>
                                    getOrders({ ...paging, page: e })
                                }
                                pageSize={paging.page_size}
                                defaultCurrent={paging.page}
                                total={paging.total}
                            />
                        </div>
                    }
                </div>
            </div>
    );
}

export default Order;