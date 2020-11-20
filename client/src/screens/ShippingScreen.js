import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { saveShippingAddress } from "../store/actions/cartActions";

const ShippingScreen = ({saveShippingAddress,history,cart: { shippingAddress },}) => {

  const [shippingInfo, setShippingInfo] = useState({
    address: shippingAddress?.address,
    city: shippingAddress?.city,
    postalCode: shippingAddress?.postalCode,
    country: shippingAddress?.country,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress(shippingInfo);
    history.push("/payment");
  };

  const onChangeHandler = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };


  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={shippingInfo.address}
            type="text"
            required
            placeholder="Enter address"
            name="address"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={shippingInfo.address}
            type="text"
            required
            placeholder="Enter city"
            name="city"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postal-code">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={shippingInfo.address}
            type="text"
            required
            placeholder="Enter postal code"
            name="postalCode"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={shippingInfo.address}
            type="text"
            required
            placeholder="Enter your country"
            name="country"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { saveShippingAddress })(ShippingScreen);
