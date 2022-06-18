import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import { CiCircleFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import authServices from "../services/auth.services";
import { setUser } from "../store/account.slice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    setLoading(true);

    const { username, password } = values;
    try {
      const response = await authServices.login(username, password);
      setErorr(false);
      const token = response.data.token;
      localStorage.setItem("token", token);

      dispatch(
        setUser({ id: response.data.id, username: response.data.username })
      );
      navigate("/");
    } catch (err) {
      setErorr(true);
      localStorage.removeItem("token");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-center flex-col min-h-screen bg-gray-100">
        <div
          className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white"
          style={{ width: 500 }}
        >
          <div className="m-6">
            <div>
              <h3 className="text-3xl text-center">Simple Website</h3>
            </div>
            <form className="mb-4" style={{ display: "none" }}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 vazir"
                >
                  Username :
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="username"
                  v-model="username"
                  className="text-center w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400 vazir"
                  >
                    Password :
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  v-model="password"
                  className="text-center w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div>
                <Button type="primary" size="large" block loading={loading}>
                  Login
                </Button>
              </div>
            </form>

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <span>Username :</span>
              <Form.Item
                className="mt-2"
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  size="large"
                  placeholder="Username"
                />
              </Form.Item>
              <span>Password :</span>
              <Form.Item
                className="mt-2s"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  size="large"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="login-form-button mt-2"
                  loading={loading}
                >
                  Log in
                </Button>
                {error && (
                  <Alert
                    className="mt-2"
                    message="Username or password is not correct"
                    showIcon
                    type="error"
                  />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
