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
        <p>We have simple routes in this website.</p>
        <ul>
          <li>1. Home page is for representing description about project.</li>
          <li>
            2. Login page is for logging of user; ( default user : admin ,
            default password : admin){" "}
          </li>
          <li>3. Products page :</li>
          <ul>
            <li>
              3-1 : Products index page represents list of products that we use
              redux for fetching data.We can also delete product in this page.
            </li>
            <li>
              3-2 : Product view page that load product's data. In this page we
              see socket connection that updates the product details.
            </li>
            <li>
              3-3 : Product create page that we can create new product. ( user
              should be logged in )
            </li>
            <li>
              3-4 : Product update page that we can update existing product.(
              user should be logged in )
            </li>
          </ul>
        </ul>

        <div className="mt-3">Creator : Majeed Douraneesh</div>
        <div >Email : majeed.dl@gmail.com</div>
      </div>
    </>
  );
};

export default Home;
