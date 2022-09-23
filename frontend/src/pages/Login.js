import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

function Login() {
  const onFinish = (values) => {
    axios.post('http://localhost:3030/user/login_action', {...values})
    console.log("Success:", values);  };

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
