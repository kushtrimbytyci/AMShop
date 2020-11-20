import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { showModalAction } from "../store/actions/modalActions";
import EditAdminUserListModal from "../components/EditAdminUserListModal";

const AdminUserListScreen = ({ showModalAction }) => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", role: "", id: "" });

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios.get("/api/getallusers");
        setUserList(data.data);
      }
      fetchData();
    } catch (error) {
      // ignore in development mode
    }
  }, []);

  return (
    <>
      <Row className="justify-content-center">
        <Col md={12}>
          <h3>Users</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => {
                return (
                  <tr key={user.name}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td className="d-flex justify-content-around">
                      {" "}
                      <i
                        className="far fa-edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUser({
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            id: user.id,
                          });
                          showModalAction();
                        }}
                      ></i>{" "}
                      <i
                        className="far fa-trash-alt"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          try {
                            await axios.delete( `http://localhost:5000/api/deleteuser/${user.id}`);
                            const { data } = await axios.get("/api/getallusers");
                            setUserList(data.data);
                          } catch (error) {
                            // ignore in development mode
                          }
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <EditAdminUserListModal
            setUserList={setUserList}
            name={user.name}
            email={user.email}
            role={user.role}
            id={user.id}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(null, { showModalAction })(AdminUserListScreen);
