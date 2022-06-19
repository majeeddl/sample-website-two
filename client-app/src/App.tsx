import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import authServices from "./services/auth.services";

import "./App.css";
import { setUser } from "./store/account.slice";

const Index = lazy(() => import("./views/Index"));
const Login = lazy(() => import("./views/Login"));

function App() {
  const [count, setCount] = useState(0);

  // const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authServices.user();
        const user = response.data;

        dispatch(setUser(user));
      } catch (err) {}
    };

    fetchData();
  });

  // useEffect(() => {
  //   const newSocket: any = io("http://localhost:3000");
  //   setSocket(newSocket);

  //   newSocket.on("connect", function () {
  //     console.log("Connected");

  //     newSocket.emit("events", { test: "test" });
  //     newSocket.emit("identity", 0, (response: any) =>
  //       console.log("Identity:", response)
  //     );
  //   });
  //   newSocket.on("events", function (data: any) {
  //     console.log("event", data);
  //   });
  //   newSocket.on("exception", function (data: any) {
  //     console.log("event", data);
  //   });
  //   newSocket.on("disconnect", function () {
  //     console.log("Disconnected");
  //   });

  //   return () => {
  //     newSocket.close();
  //   };
  // }, [setSocket]);

  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/*" element={<Index></Index>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
