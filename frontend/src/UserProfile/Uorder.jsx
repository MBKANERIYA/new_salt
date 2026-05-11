import API_BASE_URL from '../Utils/apiConfig.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../Utils/formateCurrency';
import Loader from '../Pages/Loader';
import Helmet from '../Components/Helmet';

const Uorder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?._id || localStorage.getItem('guestUserId');

                if (!userId) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/v1/order/getOrders/${userId}`);
                if (response.data.status) {
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            placed: '#2196F3',
            confirmed: '#FF9800',
            shipped: '#9C27B0',
            delivered: '#4CAF50',
            cancelled: '#F44336',
        };
        return colors[status] || '#666';
    };

    const getPaymentBadge = (method) => {
        return method === 'COD' ? 'Cash on Delivery' : method;
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <Helmet title="My Orders">
            <div className='container py-5' style={{ minHeight: '70vh', marginTop: '80px' }}>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h4 className='fw-bold m-0' style={{ color: 'var(--color, #00362A)' }}>
                        <i className='ri-shopping-bag-line me-2'></i>
                        My Orders
                    </h4>
                    <Link to="/Userprofile" className='text-decoration-none' style={{ color: 'var(--color)', fontSize: '13px' }}>
                        <i className='ri-arrow-left-line me-1'></i>
                        Back to Profile
                    </Link>
                </div>

                {loading && <Loader />}

                {!loading && orders.length === 0 && (
                    <div className='text-center py-5'>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'var(--background, #c8e6c9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px'
                        }}>
                            <i className='ri-shopping-bag-line' style={{ fontSize: '40px', color: 'var(--color, #00362A)' }}></i>
                        </div>
                        <h5 className='fw-bold' style={{ color: 'var(--color)' }}>No Orders Yet</h5>
                        <p className='text-muted' style={{ fontSize: '14px' }}>
                            Looks like you haven't placed any orders yet.
                        </p>
                        <Link to="/" className='btn px-4 py-2 mt-2' style={{
                            background: 'var(--background)',
                            color: 'var(--color)',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '13px'
                        }}>
                            Start Shopping
                        </Link>
                    </div>
                )}

                {!loading && orders.map((order) => (
                    <div key={order.orderId} className='order-card-wrapper mb-3'>
                        <div style={{
                            background: '#fff',
                            borderRadius: '14px',
                            border: '1px solid #eee',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}>
                            {/* Order Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px 20px',
                                background: '#fafafa',
                                borderBottom: '1px solid #f0f0f0',
                                flexWrap: 'wrap',
                                gap: '10px'
                            }}>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', letterSpacing: '0.5px' }}>ORDER ID</span>
                                    <p className='m-0 fw-bold' style={{ fontSize: '14px', color: 'var(--color)' }}>{order.orderId}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', letterSpacing: '0.5px' }}>PLACED ON</span>
                                    <p className='m-0' style={{ fontSize: '13px', color: '#333' }}>{formatDate(order.createdAt)}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', letterSpacing: '0.5px' }}>PAYMENT</span>
                                    <p className='m-0' style={{ fontSize: '13px', color: '#333' }}>{getPaymentBadge(order.paymentMethod)}</p>
                                </div>
                                <div>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '5px 14px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        color: '#fff',
                                        background: getStatusColor(order.orderStatus),
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div style={{ padding: '16px 20px' }}>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className='d-flex align-items-center gap-3 py-2' style={{
                                        borderBottom: idx < order.items.length - 1 ? '1px solid #f5f5f5' : 'none'
                                    }}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'cover',
                                                borderRadius: '10px',
                                                border: '1px solid #eee'
                                            }}
                                            onError={(e) => { e.target.src = '/assets/img/placeholder.png'; }}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='m-0 fw-semibold' style={{ fontSize: '13px', color: 'var(--color)' }}>{item.title}</p>
                                            <p className='m-0 text-muted' style={{ fontSize: '11px' }}>
                                                Qty: {item.quantity}
                                                {item.colorBy && ` · Color: ${item.colorBy}`}
                                                {item.size && ` · Size: ${item.size}`}
                                            </p>
                                        </div>
                                        <span className='fw-bold' style={{ fontSize: '13px', color: 'var(--color)' }}>
                                            {formatCurrency(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer - Price Breakdown */}
                            <div style={{
                                padding: '16px 20px',
                                background: 'linear-gradient(135deg, #f8f6f2 0%, #eef7f5 100%)',
                                borderTop: '1px solid #f0f0f0',
                            }}>
                                <div className='d-flex justify-content-between mb-1'>
                                    <span style={{ fontSize: '13px', color: '#666' }}>Subtotal</span>
                                    <span style={{ fontSize: '13px', color: '#333', fontWeight: '500' }}>
                                        {formatCurrency(order.subtotal)}
                                    </span>
                                </div>
                                {order.discountAmount > 0 && (
                                    <div className='d-flex justify-content-between mb-1'>
                                        <span style={{ fontSize: '13px', color: '#4CAF50', fontWeight: '600' }}>
                                            <i className='ri-coupon-line me-1'></i>
                                            Coupon Discount ({order.discount}%)
                                        </span>
                                        <span style={{ fontSize: '13px', color: '#4CAF50', fontWeight: '600' }}>
                                            - {formatCurrency(order.discountAmount)}
                                        </span>
                                    </div>
                                )}
                                <div className='d-flex justify-content-between mb-2'>
                                    <span style={{ fontSize: '13px', color: '#666' }}>Shipping</span>
                                    <span style={{ fontSize: '13px', color: '#8863fb', fontWeight: '600' }}>FREE</span>
                                </div>
                                <div className='d-flex justify-content-between pt-2' style={{ borderTop: '1px dashed #ddd' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color)' }}>Total Amount</span>
                                    <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color)' }}>
                                        {formatCurrency(order.totalAmount)}
                                    </span>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            {order.deliveryDate && (
                                <div style={{
                                    padding: '10px 20px',
                                    borderTop: '1px solid #f0f0f0',
                                    fontSize: '12px',
                                    color: '#666'
                                }}>
                                    <i className='ri-truck-line me-1'></i>
                                    Expected delivery by <strong>{formatDate(order.deliveryDate)}</strong>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Helmet>
    );
};

export default Uorder;
