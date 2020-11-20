import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchProducts, resetError } from "../store/actions/productActions";
import Pagination from "../components/Pagination";

const HomeScreen = ({fetchProducts,resetError,products: { products, productLength, loading, error },}) => {
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchProducts(activePage);
    return () => resetError();
    // eslint-disable-next-line
  }, [activePage]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="align-items-end">
          {products?.map((product) => {
            return (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
      <Row>
        <Col className="d-flex justify-content-center mt-2">
          <Pagination
            active={activePage}
            length={productLength / 4}
            setActivePage={setActivePage}
          />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, { fetchProducts, resetError })(HomeScreen);
