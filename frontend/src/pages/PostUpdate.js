import React, { useState, useEffect } from "react";

import {useSelector, useDispatch} from 'react-redux';
import { Button, Form, Input, Upload, Modal, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {changePage} from '../modules/page';

import axios from "axios";

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
  const dispatch = useDispatch();

  const [thumbnailPath, setThumbnailPath] = useState(postInfo.thumbnail);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    
  ]);

  useEffect(() => {
    if (postInfo.thumbnail.length > 0 && postInfo.thumbnail !== 'NULL') {
      console.log(postInfo.thumbnail.length > 0);
      console.log('thumbnail is not null');
      console.log(postInfo.thumbnail);
      console.log(postInfo.thumbnail.length);
      setFileList([
        {
        uid: postInfo.id,
        name: (postInfo.thumbnail).split('__').slice(-1)[0],
        // name: postInfo.thumbnail,
        status: "done",
        url: process.env.REACT_APP_SERVER_URL + "/" + postInfo.thumbnail,
      }])
    }
  }, [])

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
    let post = {...values, writer: userInfo.id, thumbnail: thumbnailPath, id: postInfo.id};
    axios.post(process.env.REACT_APP_SERVER_URL + "/post/updatePost", { ...post });
    console.log("Success:", post);
    dispatch(changePage('postList'));
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
            {
              // (postInfo.thumbnail !== '' || postInfo.thumbnail !== 'NULL') ?
                (fileList.length >= 2 ? null : uploadButton)
            }
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
          <Button type="primary" htmlType="submit" danger>
            수정완료
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PostUpdate;
