import { Link } from 'react-router-dom';
import { Button } from "antd";
import './Main.css'

import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';

const items = [
  {
    label: '요청하기',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'QnA',
    key: 'SubMenu',
    icon: <SettingOutlined />,
  },
  {
    label: (
      <>
        <Link to="/login">
          <Button type="primary">로그인</Button>
        </Link>
      </>
    ),
    key: 'alipay',
  },
];

function Main() {
  const [current, setCurrent] = useState('');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Main;