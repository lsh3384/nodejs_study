import Login from "./Login";
import Regist from "./Regist";
import Post from "./Post";

// import { Link } from "react-router-dom";
import { Button, Menu, Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import store, { changeLogin, changePage } from "../modules/ducks";
import "./Main.css";

import { UserOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function Component(props) {
  return (
    <>
      {
        {
          main: <></>,
          login: <Login />,
          regist: <Regist />,
          post: <Post />,
        }[props.state]
      }
    </>
  );
}

const items = [
  // getItem(<Link to="/login">로그인</Link>, "1", <PieChartOutlined />),
  // getItem(<Link to="/regist">회원가입</Link>, "2", <DesktopOutlined />),
  // getItem(<Link to="/company">회사등록</Link>, "3", <UserOutlined />),
  // getItem("로그인", "login", <PieChartOutlined />),
  // getItem("회원가입", "regist", <DesktopOutlined />),
  getItem("게시글", "post", <UserOutlined />),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const current = useSelector((state) => state.page);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onClick = (e) => {
    console.log("click ", e);
    console.log("click ", e);
    dispatch(changePage(e.key));
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={onClick}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {userInfo.id ? (
              <>
                <>{userInfo.id}님</>
                <Button
                  type="primary"
                  size="small"
                  style={{
                    marginLeft: "10px",
                  }}
                  onClick={async () => {
                    dispatch(
                      changeLogin({
                        status: "false",
                        id: "",
                        name: "",
                      })
                    );

                    let result = await axios.get(
                      "http://localhost:3030/user/logout"
                    );
                    console.log(result.data);
                    if (result.data.status === "logout_success") {
                      navigate("/")
                    }
                  }}

                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  size="small"
                  style={{
                    marginLeft: "10px",
                  }}
                  onClick={() => dispatch(changePage("login"))}
                >
                  로그인
                </Button>
                <Button
                  type="primary"
                  size="small"
                  style={{
                    marginLeft: "10px",
                  }}
                  onClick={() => dispatch(changePage("regist"))}
                >
                  회원가입
                </Button>
              </>
            )}
          </Header>

          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Component state={current}></Component>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            SH Coorperation ©2022 Created by LEE
          </Footer>
        </Layout>
      </Layout>

    </>
  );
}

export default Main;
