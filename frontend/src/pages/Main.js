import { Link } from 'react-router-dom';
import { Button } from "antd";
import './Main.css'

import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

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
  const [data, setData] = useState('data');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  useEffect( () => {
    let completed = false;
    console.log('using useEffect');
    async function get() {
      const result = await axios.get(
        `http://localhost:3030/user/test`
      );
      console.log(result.data.data);
      if (!completed) setData(result.data.data);
    }
    get();
    return () => {
      completed = true;
    }
  }, []);

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <p>{data}</p>
    </>
  );
}

export default Main;
