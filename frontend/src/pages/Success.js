import { Button, Result} from 'antd';
import { Link } from "react-router-dom";
import React from 'react';

const App = () => (
  <Result
    status="success"
    title="회원가입이 완료되었습니다!"
    subTitle="로그인 이후 글쓰기 기능 사용 가능합니다."
    extra={[
    //   <Link to='/'>
    //     <Button type="primary" key="console">
    //       메인페이지로 이동
    //     </Button>
    //   </Link>,

      // <Button key="buy">Buy Again</Button>,
    ]}
  />
);

export default App;