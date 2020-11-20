import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOrderDetails, clearSuccess } from "../store/actions/orderActions";

const OrderDetailsScreen = ({match,order: { orderDetails, success, error, loading },user: { user },getOrderDetails,clearSuccess}) => {
  useEffect(() => {
    getOrderDetails(match.params.id);
    clearSuccess();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {match.params.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:user.email`}>{user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {orderDetails?.ShippingAddress?.address},
                {orderDetails?.ShippingAddress?.city},
                {orderDetails?.ShippingAddress?.postalCode},
                {orderDetails?.ShippingAddress?.country}
              </p>
              {orderDetails.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderDetails.isDelivered}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>
                  Method:
                  {orderDetails.paymentMethod}
                </strong>
              </p>
              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetails.paidAt}
                </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>orderDetails Items</h2>
              {orderDetails.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.Products.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.Order_product.quantity} x {item.price} = $
                            {item.Order_product.quantity * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    $
                    {orderDetails?.Products?.reduce((acc, currentItem) =>acc + currentItem.Order_product.quantity * currentItem.price,0)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    order: state.order,
  };
};

export default connect(mapStateToProps, { getOrderDetails, clearSuccess })(OrderDetailsScreen);
