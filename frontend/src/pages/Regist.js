import { Button, Form, Input } from "antd";
import React from "react";

import axios from "axios";

const Regist = () => {
  const onFinish = (values) => {
    axios.post('http://localhost:3030/user/insertUser', {...values})
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>회원가입 페이지</h1>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 4,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="이름"
            name="name"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="이름을 입력해주세요."/>
          </Form.Item>
          <Form.Item
            label="아이디"
            name="id"
            rules={[
              {
                required: true,
                message: "아이디를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="아이디를 입력해주세요."/>
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            label="전화번호"
            name="phone"
            rules={[
              {
                required: true,
                message: "전화번호를 입력해주세요.",
              },
            ]}
          >
            <Input/>
          </Form.Item> */}

          <Form.Item
            label="이메일"
            name="email"
            rules={[
              {
                required: true,
                message: "이메일을 입력해주세요.",
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Regist;
