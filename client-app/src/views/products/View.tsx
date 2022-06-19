import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import io from "socket.io-client";

import { Divider, Row, Col, Button } from "antd";

import productService from "../../services/product.services";
import { IProduct } from "../../interfaces/product.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const ProductView = (props: any) => {
  const params: any = useParams();
  const navigate = useNavigate();

  const defaultProduct: IProduct = {
    id: 0,
    title: "",
    description: "",
    price: 0,
  };
  const [product, setProduct] = useState(defaultProduct);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const response: any = await productService.getProduct(params.id);
    setProduct(response.data);
  };

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket: any = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", function () {
      newSocket.emit("product:get", { id: params.id });
      //   newSocket.emit("identity", 0, (response: any) =>
      //     console.log("Identity:", response)
      //   );
    });
    newSocket.on("product:get", function (data: any) {
      setProduct(data);
      console.log("product", data);
    });
    newSocket.on("exception", function (data: any) {
      console.log("price", data);
    });
    newSocket.on("disconnect", function () {
      console.log("Disconnected");
    });

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  const goProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <Divider orientation="left"> Product View</Divider>

      <div>You can see the product's view here.</div>
      <Row>
        <Col span={18}>
          <table className="mt-10 text-center text-xs w-11/12 rounded-sm shadow-md border-collapse border border-slate-400 sans">
            <thead className="bg-violet-50">
              <tr>
                <th className="border border-slate-300 p-2" colSpan="5">
                  Prodcut Details
                </th>
              </tr>
              <tr>
                <th className="border border-slate-300 p-2">Title</th>
                <th className="border border-slate-300 p-2">Description</th>
                <th className="border border-slate-300 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="sansl">
                <td className="border border-slate-300 p-2">{product.title}</td>
                <td className="border border-slate-300 p-2">
                  {product.description}
                </td>
                <td className="border border-slate-300 p-2">{product.price}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="mt-10">
        <Col>
          <div>
            This price is updating automatically with socket connection every 1
            second. The side effect of socket will be removed when you go from this page.
          </div>
          <div>
            You can see the web socket data from debugger console of browser.
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Button onClick={goProducts}>
          <FontAwesomeIcon icon={faArrowCircleLeft}></FontAwesomeIcon>
          <span className="ml-2">Go To Products </span>
        </Button>
      </Row>
    </>
  );
};

export default ProductView;
