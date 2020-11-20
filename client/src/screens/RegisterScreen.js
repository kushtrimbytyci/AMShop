import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { register, clearUserError } from "../store/actions/userAction";

const RegisterScreen = ({history,register,clearUserError,user: { isAuthenticated, error}}) => {
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [secError, setSecError] = useState(null);

  const changeHandler = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      userdata.name === "" ||
      userdata.email === "" ||
      userdata.password === "" ||
      userdata.confirmPassword === ""
    ) {
      setSecError("Please fill all fields");
    } else if (userdata.password !== userdata.confirmPassword) {
      setSecError("Passwords do not match!");
    } else {
      register(userdata);
    }
  };

  useEffect(
    (e) => {
      if (isAuthenticated) {
        history.push("/cart");
      }
      clearUserError();
      // eslint-disable-next-line
    },
    [isAuthenticated]
  );

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userdata.name}
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={changeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userdata.email}
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={changeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userdata.password}
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={changeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={userdata.confirmPassword}
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={changeHandler}
          ></Form.Control>
        </Form.Group>
        {error && <Message variant="danger">{error}</Message>}
        {secError && <Message variant="danger">{secError}</Message>}
        <Button type="submit" variant="primary" className="btn-block">
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New customer?
          <Link className="ml-2 font-weight-bold" to="/register">
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { register, clearUserError })(RegisterScreen);
