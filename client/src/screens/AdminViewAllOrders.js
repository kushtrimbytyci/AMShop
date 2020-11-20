import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { getAdminOrdersAction } from "../store/actions/orderActions";

const AdminVIewAllOrders = ({getAdminOrdersAction,order: { adminOrdersList }}) => {

  useEffect(() => {
    getAdminOrdersAction();
  }, []);

  return (
    <>
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Client orders</h3>
          </div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DATE</th>
                <th>PRICE</th>
                <th className="text-center">DELIVER</th>
              </tr>
            </thead>
            <tbody>
              {adminOrdersList.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.User.name}</td>
                    <td>{order.createdAt}</td>
                    <td>${order.totalPrice}</td>
                    <td className="d-flex justify-content-around">
                      <Button
                        onClick={async () => {
                          try {
                            await axios.get(`/api/orders/markorderasdelivered?id=${order.id}`);
                            getAdminOrdersAction();
                          } catch (error) {
                            // ignore in development mode
                          }
                        }}
                      >
                        Mark delivered!
                      </Button>
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
    order: state.order,
  };
};

export default connect(mapStateToProps, { getAdminOrdersAction })(
  AdminVIewAllOrders
);
