import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {fetchProduct,clearProductDetails} from "../store/actions/productActions";
import {Row,Col,Image,Card,Button,ListGroup,Form,} from "react-bootstrap";
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import axios from "axios";

const ProductScreen = ({history,match,products: { product },user: { user, isAuthenticated },fetchProduct,clearProductDetails}) => {

  const [quantity, setQuantity] = useState(1);
  const [productReview, setProductReview] = useState({
    name: user?.name,
    rating: "",
    comment: "",
  });

  const [userReviewedAlreadyError, setUserReviewedAlreadyError] = useState(
    null
  );
  
  useEffect(() => {
    fetchProduct(match.params.id);
    // eslint-disable-next-line
  }, [match]);

  const addToCartHandler = async (_) => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  const productReviewHandler = (e) => {
    setProductReview({ ...productReview, [e.target.name]: e.target.value });
  };

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/products/review/${match.params.id}`,
        productReview
      );
      fetchProduct(match.params.id);
    } catch (error) {
      setUserReviewedAlreadyError(error.response.data.msg);
    }
  };


  return (
    <>
      <Link className="btn btn-light my-3" to="/" onClick={clearProductDetails}>
        Go Back
      </Link>
      {product && Object.keys(product).length === 0 ? (
        <Spinner />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>{product?.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>QTY</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((e) => {
                            return (
                              <option key={e + 1} value={e + 1}>
                                {e + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product?.countInStock === 0}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.Reviews?.length === 0 && <Message>No reviews</Message>}
            {userReviewedAlreadyError && (
              <Message variant="danger">{userReviewedAlreadyError}</Message>
            )}
            <ListGroup variant="flush">
              {product.Reviews.map((review) => {
                return (
                  <ListGroup.Item key={review.id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text={""} />
                    <p>{review.createdAt}</p>
                  </ListGroup.Item>
                );
              })}
              <ListGroup.Item>
                <h2>Write a customer review</h2>
                {!isAuthenticated ? (
                  <Message>
                    Please <Link to="/login">login</Link> to write a review
                  </Message>
                ) : (
                  <Form onSubmit={reviewSubmitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        name="rating"
                        value={productReview.rating}
                        onChange={productReviewHandler}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 -Poor</option>
                        <option value="2">2 -Fair</option>
                        <option value="3">3 -Good</option>
                        <option value="4">4 -Very Good</option>
                        <option value="5">5 -Excellent</option>
                      </Form.Control>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          name="comment"
                          value={productReview.comment}
                          onChange={productReviewHandler}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit">Submit review</Button>
                    </Form.Group>
                  </Form>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchProduct, clearProductDetails })(ProductScreen);
