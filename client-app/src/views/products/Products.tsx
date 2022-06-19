import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  List,
  Space,
  Divider,
  Button,
  message,
  Popconfirm,
  notification,
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faSync,
  faBoxArchive,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { fetchProducts } from "../../store/product.slice";

import productServices from "../../services/product.services";

const ProductsView = () => {
  const { user } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const products = useSelector((state: any) => state.products);

  const dispatch: any = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    dispatch(fetchProducts());
  };

  const viewProduct = (id: number) => {
    navigate(`/products/view/${id}`);
  };

  const editProduct = (id: number) => {
    navigate(`/products/update/${id}`);
  };
  const addProduct = (id: number) => {
    navigate(`/products/create`);
  };

  const confirmDelete = async (id: number) => {
    try {
      const response = await productServices.deleteProduct(id);
      notification["success"]({
        message: "Delete Product",
        description: "This product has been deleted successfully",
      });
      getProducts();
    } catch (error) {
      notification["error"]({
        message: "Delete Product",
        description: "Error deleting product",
      });
    }
  };

  return (
    <div>
      <Divider orientation="left">
        <h4>Products</h4>
      </Divider>
      <div>you can see the list of products here.</div>
      {user && (
        <Button className="mt-2" type="primary" onClick={addProduct}>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
          <span className="ml-2">Add New Product</span>
        </Button>
      )}

      <Button className="mt-2 ml-3" type="dashed" onClick={getProducts}>
        <FontAwesomeIcon icon={faSync}></FontAwesomeIcon>{" "}
        <span className="ml-2">Reload</span>
      </Button>

      <Divider></Divider>
      <div className="mt-2">
        <List
          itemLayout="vertical"
          loading={products.loading}
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={products.products}
          rowKey="id"
          footer={
            <div>
              <b className="text-amber-600">Notice:</b> for creating, updating
              and deleting products , you should be logged in.
            </div>
          }
          renderItem={(item: any) => (
            <List.Item
              key={item.id}
              actions={
                user
                  ? [
                      <a onClick={() => editProduct(item.id)}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-amber-500"
                        />
                      </a>,
                      <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => confirmDelete(item.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-rose-500"
                          />
                        </a>
                      </Popconfirm>,
                    ]
                  : []
              }
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<FontAwesomeIcon icon={faBoxArchive} />}
                  />
                }
                title={<a onClick={() => viewProduct(item.id)}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ProductsView;
