import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import { Container, Navbar, Nav, Row, Col, NavDropdown } from "react-bootstrap";
import { Breadcrumb, Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHouse,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";

const Home = lazy(() => import("./Home"));
const ProductsIndex = lazy(() => import("./products/Index"));
const Index = () => {
  const { user } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Sample Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item as="li">
                <Nav.Link to="/" as={Link}>
                  <FontAwesomeIcon icon={faHouse} />
                  <span className="ml-2">Home</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link to="/products" as={Link}>
                  <FontAwesomeIcon icon={faBoxArchive} />
                  <span className="ml-0"> Products</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            {!user && (
              <Nav.Link to="/login" as={Link}>
                Login
              </Nav.Link>
            )}

            {user && (
              <NavDropdown
                title={`${user.username}`}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Suspense>
          <Routes>
            <Route index element={<Home></Home>}></Route>
            <Route
              path="products/*"
              element={<ProductsIndex></ProductsIndex>}
            ></Route>
          </Routes>
        </Suspense>
      </Container>

      <div></div>
    </div>
  );
};

export default Index;
