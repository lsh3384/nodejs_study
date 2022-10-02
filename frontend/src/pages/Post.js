import React, { useState } from "react";

import {useSelector, useDispatch} from 'react-redux';
import store, { changeLogin, changePage } from "../modules/ducks";

import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
const { TextArea } = Input;


const Post = () => {
  const userInfo = useSelector(state => state.userInfo)
  const currentPage = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    let post = {...values, writer: userInfo.id,}
    axios.post("http://localhost:3030/post/createPost", { ...post });
    console.log("Success:", post);
    dispatch(changePage('postList'));

    // console.log(values.title);
    // console.log(values.content);
    // console.log(userInfo.id);
    // console.log(userInfo.name);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e?.fileList;
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
            name="upload"
            label="Upload"
            type="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="의뢰리스트 파일 업로드"
          >
            <Upload name="thumbnail" action="http://localhost:3030/post/createThumbnail" listType="picture">
              <Button icon={<UploadOutlined />}>클릭해서 첨부하기</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              업로드
            </Button>
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
