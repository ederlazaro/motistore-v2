import Login from "./login/login";
// import React from "react";
// import axios from "axios";

// const Home = ({ user }) => {
//   return <h1>Welcome, {user}!</h1>;
// };

// Home.getInitialProps = async (context) => {
//   const { token } = localStorage;
//   if (!token) {
//     context.res.writeHead(302, {
//       Location: "/login",
//     });
//     context.res.end();
//     return {};
//   }
//   try {
//     const response = await axios.get("/api/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return { user: response.data };
//   } catch (error) {
//     localStorage.removeItem("token");
//     context.res.writeHead(302, {
//       Location: "/login",
//     });
//     context.res.end();
//     return {};
//   }
// };

// export default Home;

export default function Home() {
  return (
    <>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <Login />
      </main>
    </>
  );
}
