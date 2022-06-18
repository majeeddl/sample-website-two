import { Divider } from "antd";

const Home = () => {
  return (
    <>
      <Divider orientation="left">Introduction</Divider>

      <div>
        <p>
          This is a simple website that I created to use differents technologies
          for React JS.
        </p>
        <p className="mt-1">
          I used React JS ( React Functional Components), Typescript, Redux(
          redux toolkit ), Ant Design , Bootstrap , and more.
        </p>
        <p className="mt-1">
          I used React Router for routing. I aslo used Socket.io for realtime
          communication between client and server.
        </p>
        <p className="mt-2">
          I used Nest JS for the backend. I used temporary data structures for
          that. The backen's authentication is handled by JWT.
        </p>

        <Divider orientation="left">Structure</Divider>
        <p>
          We have simple routes in this website. Home page is for representing description about project.
        </p>

        <p className="mt-3">Creator : Majeed Douraneesh</p>
      </div>
    </>
  );
};

export default Home;
