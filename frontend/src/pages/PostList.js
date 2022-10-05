import { useSelector, useDispatch } from "react-redux";
import { changePage, changePostInfo } from "../modules/ducks";

import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Space } from 'antd';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import config from '../config';

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const [postListData, setPostListData] = useState([])

  const userInfo = useSelector((state) => state.userInfo);
  const currentPage = useSelector((state) => state.page);

  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(changePage("post"));
  };

  // 마운트 될 때 처리
  useEffect(() => {
    let getPostListData = async () => {
      console.log(config.serverUrl + "/post/getAllPosts");
      let result = await axios.get(config.serverUrl+"/post/getAllPosts",                         {
        withCredentials: true, // 쿠키 cors 통신 설정
      });
      // let result = await axios.get("http://localhost:3030/post/getAllPosts");
      console.log(result.data);
      setPostListData(result.data.map((data, i)=> {
        return ({
          ...data,
          key: data.id,
          description: '작성자: ' + data.writer,
          href: `post/postId/${data.id}`,
        })
      }));
    };
    getPostListData();


  }, []);

  // 페이지 이동 처리
  const moveToPage = (id) => {
    dispatch(changePage('postView'));
    dispatch(changePostInfo({id}));
    console.log('page move to '+ id);
  }

  return (
    <>
      {userInfo.status === "login_success" && (
        <Button onClick={onBtnClick}>글쓰기</Button>
      )}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={postListData}
        footer={
          <div>
            {/* <b>ant design</b> footer part */}
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <>
              {(item.thumbnail) &&
                <img
                width={272}
                alt="logo"
                src={(item.thumbnail) ? config.serverUrl + "/" + item.thumbnail : null}
              />
              }

              </>

            }
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.avatar} />}
              title={<a onClick={(e)=> {e.preventDefault();moveToPage(item.id)}} href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </>

  )
};

export default App;
