import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, getMe } from "../store/actions/userAction";

const Header = ({user: { isAuthenticated, user: userFromReducer },logout,getMe}) => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      history.push(`/search/${keyword}`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getMe();
    }
    // eslint-disable-next-line
  }, []);

  const userLinks = (
    <>
      <LinkContainer to="/cart">
        <Nav.Link>
          <i className="fas fa-shopping-cart"></i> Cart
        </Nav.Link>
      </LinkContainer>
      <NavDropdown
        title={userFromReducer?.name === undefined ? "" : userFromReducer?.name}
        id="username"
      >
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>

      {userFromReducer?.role === "admin" && (
        <NavDropdown title="Admin Panel" id="username">
          <LinkContainer to="/admin/userlist">
            <NavDropdown.Item>User list</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/productslist">
            <NavDropdown.Item>Products list</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/vieworders">
            <NavDropdown.Item>View orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
    </>
  );

  const guestLinks = (
    <>
      <LinkContainer to="/cart">
        <Nav.Link>
          <i className="fas fa-shopping-cart"></i> Cart
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
        <Nav.Link>
          <i className="fas fa-user"></i> Log in
        </Nav.Link>
      </LinkContainer>
    </>
  );

  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect={false} expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>AMShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline onSubmit={searchHandler}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            <Nav className="ml-auto">
              {isAuthenticated === true ? userLinks : guestLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getMe, logout })(Header);
