import config from "../config";

import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Space } from "antd";
import {useSelector, useDispatch} from 'react-redux';
import store, { changeLogin, changePage } from "../modules/ducks";

import axios from "axios";



function Login() {
  const history = useNavigate();

  const userInfo = useSelector(state => state.userInfo)
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Success:", values);
    let result = await axios.post(config.serverUrl + '/user/login_action', {...values}, {
      withCredentials: true // 쿠키 cors 통신 설정
    })
    console.log('!!!!', result.data);

    if (result.data.status === "login_success") {
      dispatch(changeLogin({...result.data}));
      dispatch(changePage('postList'));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>로그인 페이지</h1>
      <div style={{ textAlign: "center" }}>
        <Form
          name="basic"
          labelCol={{
            span: 10,
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
            label="아이디"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="pw"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                로그인
              </Button>
              <Link to="/regist">
                <Button type="primary">회원가입</Button>
              </Link>
            </Space>

          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
