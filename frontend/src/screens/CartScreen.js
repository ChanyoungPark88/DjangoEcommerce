import React, {useEffect} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

function CartScreen() {
    const {id} = useParams()
    const productId = id
    const location = useLocation()
    const qty = location.state ? Number(location.state) : 1
    // console.log(`productId:${productId}, qty:${qty}`)

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log(cartItems)

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <listGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        ))}
                    </listGroup>
                )}
            </Col>

            <Col md={4}>

            </Col>
        </Row>
    )
}

export default CartScreen