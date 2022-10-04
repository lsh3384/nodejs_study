import React, { useState } from "react";

import {useSelector, useDispatch} from 'react-redux';
import store, { changeLogin, changePage } from "../modules/ducks";

import { Button, Form, Input, Upload, Modal, message } from "antd";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
const { TextArea } = Input;


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const Post = () => {
  const userInfo = useSelector(state => state.userInfo)
  const dispatch = useDispatch();

  const [thumbnailPath, setThumbnailPath] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info.file.response);
      setThumbnailPath(info.file.response.path);
    }
    
    setFileList(info.fileList);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onFinish = (values) => {
    async function createPost() {
      let post = { ...values, writer: userInfo.id, thumbnail: thumbnailPath };
      axios.post("http://localhost:3030/post/createPost", { ...post });
      console.log("Success:", post);
      dispatch(changePage("postList"));
    }
    
    createPost();
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
          <Upload
            name="thumbnail"
            action="http://localhost:3030/post/createThumbnail"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
          >
            {fileList.length >= 2 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
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
