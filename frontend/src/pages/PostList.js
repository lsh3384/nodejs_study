import { useSelector, useDispatch } from "react-redux";

import { changePage } from "../modules/page";
import { changePostInfo } from "../modules/postInfo";

import { Button, List } from 'antd';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

const App = () => {
  const [postListData, setPostListData] = useState([])
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(changePage("post"));
  };

  // 마운트 될 때 처리
  useEffect(() => {
    let getPostListData = async () => {
      let result = await axios.get(process.env.REACT_APP_SERVER_URL+"/post/getAllPosts",
      {
        withCredentials: true, // 쿠키 cors 통신 설정
      });
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
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
            ]}
            extra={
              <>
              {(item.thumbnail) &&
                <img
                width={272}
                alt="logo"
                src={(item.thumbnail) ? process.env.REACT_APP_SERVER_URL + "/" + item.thumbnail : null}
              />
              }
              </>
            }
          >
            <List.Item.Meta
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
