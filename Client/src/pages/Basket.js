import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import Order from '../components/modals/Order'
import OrderHistory from '../components/modals/OrderHistory'
import OneItem from '../components/OneItem'
import { fetchAllItems } from '../http/basketAPI'
import { removeItemFromBasket } from '../http/itemAPI'
import { Context } from '../index'

const Basket = observer(() => {
    const { basket } = useContext(Context)
    const [orderVisible, setOrderVisible] = useState(false)
    const [orderHistoryVisible, setOrderHistoryVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const items = basket.items

    useEffect(() => {
        fetchAllItems()
            .then((data) => basket.setItems(data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={'grow'} />
    }

    return (
        <Container>
            <div className="d-flex flex-row-reverse">
                <Button
                    className="mt-3"
                    variant={'outline-dark'}
                    onClick={() => setOrderHistoryVisible(true)}
                >
                    История заказов
                </Button>
            </div>
            {orderHistoryVisible ? (
                <OrderHistory
                    show={orderHistoryVisible}
                    onHide={() => setOrderHistoryVisible(false)}
                />
            ) : null}
            <Row className="mt-2 justify-content-md-center">
                <Col md={9}>
                    <Row className="d-flex">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div class="mt-3 col-md-3">
                                    <OneItem key={item.id} item={item.item}></OneItem>
                                    <div>
                                        Кол-во: {item.amount}
                                        {'   '}
                                        <Button
                                            onClick={() => {
                                                removeItemFromBasket(item.item.id)
                                                if (item.amount > 1) {
                                                    basket.setItems(
                                                        items.map((basketItem) => {
                                                            if (
                                                                basketItem.item.id === item.item.id
                                                            ) {
                                                                return {
                                                                    ...basketItem,
                                                                    amount: basketItem.amount - 1,
                                                                }
                                                            } else {
                                                                return basketItem
                                                            }
                                                        })
                                                    )
                                                } else {
                                                    basket.setItems(
                                                        items.filter(
                                                            (basketItem) =>
                                                                basketItem.id !== item.id
                                                        )
                                                    )
                                                }
                                            }}
                                            variant={'outline-danger'}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Row className="mt-2 justify-content-md-center">Пусто</Row>
                        )}
                    </Row>
                    {items.length > 0 ? (
                        <Button
                            className="mt-3"
                            variant={'outline-dark'}
                            onClick={() => setOrderVisible(true)}
                        >
                            Оформить заказ
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Order
                        show={orderVisible}
                        onHide={() => setOrderVisible(false)}
                        items={items}
                    />
                </Col>
            </Row>
        </Container>
    )
})

export default Basket
