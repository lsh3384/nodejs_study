import React, { useState } from "react";

import {useSelector, useDispatch} from 'react-redux';
import store, { changeLogin, changePage } from "../modules/ducks";

import { Button, Form, Input } from "antd";
import axios from "axios";
const { TextArea } = Input;


const Post = () => {
    const userInfo = useSelector(state => state.userInfo)

  const onFinish = (values) => {

    let post = {...values, writer: userInfo.id,}
    axios.post("http://localhost:3030/post/createPost", { ...post });
    console.log("Success:", post);
    // console.log(values.title);
    // console.log(values.content);
    // console.log(userInfo.id);
    // console.log(userInfo.name);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 1,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="제목"
          name="title"
          rules={[
            {
              required: true,
              message: "제목을 입력해주세요.",
            },
          ]}
        >
          <Input placeholder="제목을 입력해주세요." />
        </Form.Item>
        <Form.Item
          label="내용"
          name="content"
          rules={[
            {
              required: true,
              message: "내용을 입력해주세요.",
            },
          ]}
        >
          <TextArea rows={20} placeholder="최대 2500자" maxLength={2500} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            글작성
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Post;
