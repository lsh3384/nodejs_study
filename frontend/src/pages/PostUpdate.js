import React, { useState } from "react";

import {useSelector, useDispatch} from 'react-redux';
import store, { changeLogin, changePage } from "../modules/ducks";

import { Button, Form, Input, Upload, Modal, message } from "antd";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";

import config from '../config';

const { TextArea } = Input;


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const PostUpdate = () => {
  const userInfo = useSelector(state => state.userInfo);
  const postInfo = useSelector(state => state.postInfo);
  const currentPage = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const [thumbnailPath, setThumbnailPath] = useState(postInfo.thumbnail);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: config.serverUrl + '/'+ postInfo.thumbnail,
  }]);

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


    // console.log(newFileList)
    setFileList(info.fileList);
    // console.log(event);
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
    let post = {...values, writer: userInfo.id, thumbnail: thumbnailPath, id: postInfo.id};
    axios.post(config.serverUrl + "/post/updatePost", { ...post });
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
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        fields={[
          {
            name: ["title"],
            value: postInfo.title,
          },
          {
            name: ["content"],
            value: postInfo.content,
          },
        ]}
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
          <Input placeholder="제목을 입력해주세요."/>
          {/* <input value={postInfo.title}></input> */}
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
          <TextArea rows={20} placeholder="최대 2500자" maxLength={2500} value={postInfo.content} />
        </Form.Item>

        <Form.Item
          // name="upload"
          label="Upload"
          type="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="thumbnail upload"
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
          {/* <Upload
            name="thumbnail"
            action="http://localhost:3030/post/createThumbnail"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>클릭해서 첨부하기</Button>
          </Upload> */}
        </Form.Item>

        {/* <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            업로드
          </Button>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" danger>
            수정완료
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PostUpdate;
