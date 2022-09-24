import Login from './Login';
import Request from "./Request";
import Regist from "./Regist";

import { Link } from "react-router-dom";
import { Button, Menu, Modal, Breadcrumb, Layout } from "antd";
import "./Main.css";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import React, { useState } from "react";
import axios from "axios";
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
          login: <Login />,
          regist: <Regist />,
          request: <Request />,
        }[props.state]
      }
    </>
  )
}

const items = [
  // getItem(<Link to="/login">로그인</Link>, "1", <PieChartOutlined />),
  // getItem(<Link to="/regist">회원가입</Link>, "2", <DesktopOutlined />),
  // getItem(<Link to="/company">회사등록</Link>, "3", <UserOutlined />),
  // getItem("로그인", "login", <PieChartOutlined />),
  // getItem("회원가입", "regist", <DesktopOutlined />),
  getItem("회사등록", "request", <UserOutlined />),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = (e) => {
    console.log('click ', e);
    console.log('click ', e);

    setCurrent(e.key);
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
            <Button
              type="primary"
              size="small"
              style={{
                marginLeft: "10px",
              }}
              onClick={()=>setCurrent('login')}
            >
              로그인
            </Button>
            <Button
              type="primary"
              size="small"
              style={{
                marginLeft: "10px",
              }}
              onClick={()=>setCurrent('regist')}
            >
              회원가입
            </Button>
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

      {/* <Link to="/login">
        <Button type="primary">로그인</Button>
      </Link>

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      {/* <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Request></Request>
      </Modal> */}
    </>
  );
}

export default Main;
