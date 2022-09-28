import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import {useSelector, useDispatch} from 'react-redux';
import store, { changeLogin, changePage } from "../modules/ducks";

import axios from "axios";



function Login() {
  const history = useNavigate();  
  
  const userInfo = useSelector(state => state.userInfo)
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Success:", values);  
    let result = await axios.post('http://localhost:3030/user/login_action', {...values})
    console.log('!!!!', result.data);
    
    if (result.data.status === "login_success") {
      dispatch(changeLogin({...result.data}));
      dispatch(changePage('main'));

    }
    // console.log(store.getState().status);
    // console.log(store.getState());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Link to="/">
        <Button type="primary">홈으로</Button>
      </Link>
      <h1 style={{ textAlign: "center" }}>로그인 페이지</h1>
      <div style={{ textAlign: "center" }}>
        
        <h1 style={{ textAlign: "center" }}>{userInfo.status}</h1>
        { (userInfo.id) && <h1 style={{ textAlign: "center" }}>id: {userInfo.id}</h1> }
        { (userInfo.name) && <h1 style={{ textAlign: "center" }}>name: {userInfo.name}</h1> }
        
        <Form
          name="basic"
          labelCol={{
            span: 9,
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Checkbox>아이디 저장</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
            <Link to="/regist">
              <Button type="primary">회원가입</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
