import React, { useContext, useMemo } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../http/basketAPI'
import { removeItemFromBasket } from '../../http/itemAPI'
import { Context } from '../../index'
import { ITEM_ROUTE } from '../../utils/consts'
import OrderItem from '../OrderItem'

const Order = ({ show, onHide, items }) => {
    const navigate = useNavigate()
    const { basket } = useContext(Context)
    const create = () => {
        createOrder(items)
        items.map((item) => removeItemFromBasket(item.item.id))
        basket.setItems([])
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Оформить заказ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Количество позиций:{' '}
                {items.reduce((sum, item) => {
                    return item.amount + sum
                }, 0)}
                {items.map((item) => (
                    <OrderItem item={item}></OrderItem>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={create}>
                    Оформить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Order
