import Request from "./Request";
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

const items = [
  getItem(<Link to="/login">로그인</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/regist">회원가입</Link>, "2", <DesktopOutlined />),
  getItem(<Link to="/company">회사등록</Link>, "3", <UserOutlined />),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              This is gonna be awesome!
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

      <Link to="/login">
        <Button type="primary">로그인</Button>
      </Link>

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Request></Request>
      </Modal>
    </>
  );
}

export default Main;
