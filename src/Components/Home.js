import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, Button } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "home", label: "Home", to: "/" },
  // ...(loggedIn
  //   ?
  //    [
  {
    key: "subscription",
    label: "Subscription",
    to: "/subscription?apikey=",
  },
  // ]
  //   : [{ key: "subscription", label: "Subscription", to: "/login" }]),
  { key: "contact", label: "Contact", to: "/contact" },
];
const App = (props) => {
  console.log("propss", props);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem("selectedkey") || "home"
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  //   const keys = localStorage.setItem("selectedKey", selectedKey);
  //   useEffect(() => {
  //     navigate("/");
  //   });

  const handleItemClick = (key) => {
    setSelectedKey(key);
    localStorage.setItem("selectedkey", key);
    // Perform any other logic based on the selected key
  };

  useEffect(() => {
    const fname = localStorage.getItem("fname");
    if (fname) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("fname");
    localStorage.removeItem("headers");
    setLoggedIn(false);
    navigate("/");
    // setSelectedKey('subscription')
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              float: "left",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "32px",
                alignItems: "center",
              }}
            >
              E-Kart
            </div>{" "}
          </div>
          <div style={{ width: "100%" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={selectedKey ? [selectedKey] : []}
              onClick={({ key }) => handleItemClick(key)}
            >
              {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.to}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
          {/* {loggedIn ? ( */}
          <Button
            type="primary"
            onClick={handleLogout}
            style={{ color: "white", width: "100px" }}
          >
            Logout
          </Button>
          {/* ) : ( */}
          {/* <Button
              type="primary"
              onClick={handleLogin}
              style={{ color: "white", width: "100px" }}
            >
              Login
            </Button> */}
          {/* )} */}
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          {props.main}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;