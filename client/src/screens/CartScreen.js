import React, { useEffect } from "react";
import { connect } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {Row,Col,ListGroup,Image,Form,Button,Card,} from "react-bootstrap";
import { addToCart, removeItemFromCart } from "../store/actions/cartActions";

const CartScreen = ({match,location,history,addToCart,removeItemFromCart,cart: { cartItems }}) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      addToCart(productId, quantity);
    }
    // eslint-disable-next-line
  }, [productId, quantity]);

  const checkoutHandler = () => {
    history.push("/shipping");
  };

  
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          addToCart(item.id, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((e) => {
                          return (
                            <option key={e + 1} value={e + 1}>
                              {e + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h4>
                Subtotal (
                {cartItems.reduce(
                  (acc, currentItem) => acc + currentItem.quantity,
                  0
                )}
                ) items
              </h4>
              $
              {cartItems
                .reduce(
                  (acc, currentItem) =>
                    acc + currentItem.quantity * currentItem.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <Button
            type="button"
            className="btn-block"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed to checkout
          </Button>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};


export default connect(mapStateToProps, { addToCart, removeItemFromCart })(CartScreen);
