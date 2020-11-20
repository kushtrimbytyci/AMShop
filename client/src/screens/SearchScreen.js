import React, { useEffect } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { searchProducts, resetError } from "../store/actions/productActions";

const SearchScreen = ({match,searchProducts,resetError,products: { searchedProducts, loading, error },}) => {

  useEffect(() => {
    searchProducts(match.params.keyword);
    return () => resetError();
    //  eslint-disable-next-line
  }, [match.params.keyword]);


  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="align-items-end">
          {searchedProducts?.map((product) => {
            return (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, { searchProducts, resetError })(SearchScreen);
