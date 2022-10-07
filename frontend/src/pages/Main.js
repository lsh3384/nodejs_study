import Login from "./Login";
import Regist from "./Regist";
import Post from "./Post";
import PostView from "./PostView";
import PostUpdate from "./PostUpdate";
import PostList from "./PostList";
import Success from "./Success";
import config from "../config";

import { Button, Menu, Layout } from "antd";

import { useSelector, useDispatch } from "react-redux";
import "./Main.css";
import { UserOutlined } from "@ant-design/icons";

import React, { useState, useEffect  } from "react";
import axios from "axios";
import { changeUserInfo } from "../modules/userInfo";
import { changePage } from "../modules/page";

axios.defaults.withCredentials = true; // withCredentials 전역 설정
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
          postView: <PostView />,
          postUpdate: <PostUpdate />,
          postList: <PostList />,
          success: <Success />,
        }[props.state]
      }
    </>
  );
}

const items = [
  getItem("게시판", "postList", <UserOutlined />),
];

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const currentPage = useSelector((state) => state.page);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const onClick = (e) => {
    console.log("click ", e);
    dispatch(changePage(e.key));
  };

  // 마운트 될 때 처리
  useEffect(() => {
    console.log('!!!!!!!!!!!!!!!!',userInfo.status);
    console.log('!!!!!!!!!!!!!!!!',currentPage.page);
  }, [])


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
              display: "inline-block",
              padding: 0,
            }}
          >
            <div style={{
              marginLeft: "10px",
              marginRight: "20px",
              float: "right",
            }}>
              {userInfo.id ? (
                <>
                  <>{userInfo.id}님</>
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      marginLeft: "10px",
                      marginRight: "30px",
                    }}
                    onClick={async () => {
                      dispatch(
                        changeUserInfo({
                          status: "false",
                          id: "",
                          name: "",
                          auth: "",
                        })
                      );

                      let result = await axios.get(
                        process.env.REACT_APP_SERVER_URL + "/user/logout",
                        {
                          withCredentials: true, // 쿠키 cors 통신 설정
                        }
                      );
                      console.log(result.data);
                      if (result.data.status === "logout_success") {
                        dispatch(changePage("postList"))
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
            </div>

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
              {/* {currentPage} */}
              <Component state={currentPage.page}></Component>
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
