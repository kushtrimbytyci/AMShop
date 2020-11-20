import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUser, getMe } from "../store/actions/userAction";
import { getAllMyOrders } from "../store/actions/orderActions";

const ProfileScreen = ({history,location,getAllMyOrders,order: { allOfMyOrders },user: { isAuthenticated, error, loading, user, success },updateUser}) => {

  const [userdata, setUserdata] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
    confirmPassword: "",
  });

  const [secError, setSecError] = useState(null);
  const changeHandler = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllMyOrders(user.UserId);
    // eslint-disable-next-line
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userdata.password !== userdata.confirmPassword) {
      setSecError("Passwords do not match");
    } else {
      updateUser({ id: user.id, ...userdata });
    }
    setUserdata({ name: "", email: "", password: "", confirmPassword: "" });
  };


  return (
    <>
      <Row className="justify-content-between">
        <Col md={4}>
          <h3>User Profile</h3>
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
                value={user?.password}
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={changeHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={user?.password}
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={changeHandler}
              ></Form.Control>
            </Form.Group>
            {error && <Message variant="danger">{error}</Message>}
            {secError && <Message variant="danger">{secError}</Message>}
            {success && <Message variant="success">{success}</Message>}
            <Button type="submit" variant="primary" className="btn-block">
              Update info
            </Button>
          </Form>
        </Col>
        <Col md={7} style={{ height: "80vh", overflowY: "scroll" }}>
          <h3>MY ORDERS</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {allOfMyOrders?.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.createdAt}</td>
                    <td>{e.totalPrice}</td>
                    <td>
                      {e.isPaid === false ? (
                        <i className="fas fa-times"></i>
                      ) : (
                        <i className="fas fa-check"></i>
                      )}
                    </td>
                    <td>
                      {e.isDelivered === false ? (
                        <i className="fas fa-times"></i>
                      ) : (
                        <i className="fas fa-check"></i>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    order: state.order,
  };
};
export default connect(mapStateToProps, { updateUser, getMe, getAllMyOrders })(ProfileScreen);
