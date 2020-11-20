import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import {
  showModalAction,
  showCreateProductModalAction,
} from "../store/actions/modalActions";
import EditAdminProductListModal from "../components/EditAdminProductListModal";
import CreateProductAdminModal from "../components/CreateProductAdminModal";

const AdminProductsListScreen = ({showCreateProductModalAction,showModalAction,}) => {

  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    countInStock: "",
    category: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios.get("/api/products");
        setProductList(data.data);
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
          <div className="d-flex justify-content-between align-items-center">
            <h3>Products</h3>
            <Button variant="primary" onClick={showCreateProductModalAction}>
              + Create product
            </Button>
          </div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td className="d-flex justify-content-around">
                      {" "}
                      <i
                        className="far fa-edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          showModalAction();
                          setProduct({
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            brand: product.brand,
                            countInStock: product.countInStock,
                            category: product.category,
                            description: product.description,
                            id: product.id,
                          });
                        }}
                      ></i>{" "}
                      <i
                        className="far fa-trash-alt"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          try {
                            await axios.delete(
                              `/api/products/delete/${product.id}`
                            );
                            const { data } = await axios.get("/api/products");
                            setProductList(data.data);
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
        </Col>
      </Row>
      <EditAdminProductListModal
        setProductList={setProductList}
        name={product.name}
        price={product.price}
        image={product.image}
        brand={product.brand}
        countInStock={product.countInStock}
        category={product.category}
        description={product.description}
        id={product.id}
      />
      <CreateProductAdminModal setProductList={setProductList} />
    </>
  );
};

export default connect(null, { showCreateProductModalAction, showModalAction })(AdminProductsListScreen);
