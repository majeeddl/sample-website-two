import { useNavigate, useParams } from "react-router-dom";

import {
  Divider,
  Button,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

import productServices from "../../services/product.services";
import { IProduct } from "../../interfaces/product.interface";

const EditProduct = () => {
  const params: any = useParams();
  const navigate = useNavigate();

  const [id] = useState(params.id);

  const [form] = Form.useForm();

  const defaultProduct: IProduct = {
    id: id,
    title: "",
    price: 0,
    description: "",
  };

  const [product, setProduct] = useState(defaultProduct);

  const onFinish = (values: any) => {
    saveData(values);
  };

  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    try {
      const response: any = await productServices.getProduct(
        parseInt(params.id)
      );

      setProduct((prevState: IProduct) => ({ ...prevState, ...response.data }));
      form.setFieldsValue({ ...response.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(id)
      getProduct();
  }, []);

  const saveData =  async (values: any) => {
    setLoading(true);
    if (id) {
      const response: any = await productServices.updateProduct(parseInt(id), values);
      if (response.status === 200) {
        notification["success"]({
          message: "Update Product",
          description: "This product has been updated successfully",
        });
      } else {
        notification["error"]({
          message: "Update Product",
          description: "The update process has failed",
        });
      }
    } else {
      const response: any = await productServices.createProduct(values);
      if (response.status === 200 || response.status === 201) {
        notification["success"]({
          message: "Create Product",
          description: "The new product has been created successfully",
        });
      } else {
        notification["error"]({
          message: "Create Product",
          description: "The create process has failed",
        });
      }
    }
    setLoading(false);
  };

  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <Divider orientation="left">
        <h4> {id ? "Update Product" : "Create Product"}</h4>
      </Divider>
      <Row>
        <Col span={18}>
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ ...product }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please fill the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please fill the description!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please fill the price!" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="default" onClick={goToProducts}>
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                <span className="ml-2">Back to Products</span>
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="ml-2"
              >
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                <span className="ml-2">Save Product</span>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditProduct;
