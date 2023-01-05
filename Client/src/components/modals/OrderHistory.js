import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { fetchAllOrders } from '../../http/basketAPI'
import { ITEM_ROUTE } from '../../utils/consts'
import OrderItem from '../OrderItem'

const OrderHistory = ({ show, onHide }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchAllOrders()
            .then((data) => setOrders(data.reverse()))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Modal show={show} onHide={onHide} centered>
            {console.log(orders)}
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Оформить заказ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <Spinner animation={'grow'} />
                ) : (
                    <>
                        {orders.length > 0 ? (
                            <>
                                {orders.map((order, index) => (
                                    <>
                                        {index !== 0 ? <hr /> : null}
                                        <div>{order.id}</div>
                                        {order.order_items.map((item) => (
                                            <OrderItem item={item}></OrderItem>
                                        ))}
                                    </>
                                ))}
                            </>
                        ) : (
                            <div>Вы не сделали еще ни одного заказа</div>
                        )}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderHistory
