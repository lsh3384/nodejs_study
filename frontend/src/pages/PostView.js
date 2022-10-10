import React, {useState, useEffect} from "react";

import { useSelector, useDispatch } from "react-redux";

import { changePage } from "../modules/page";
import { changePostInfo } from "../modules/postInfo";

import { Button, Form, Input, Table, Divider } from "antd";
import axios from "axios";
import config from "../config";

import moment from "moment";

const PostView = () => {
  const postInfo = useSelector((state)=> state.postInfo);
  const userInfo = useSelector((state)=> state.userInfo);

  const currentPage = useSelector((state) => state.page);
  const [postData, setPostData] = useState({});
  const dispatch = useDispatch();

  // 마운트 될 때 처리
  useEffect(() => {
    const getPostData = async () => {
      // let result = await axios.get(process.env.REACT_APP_SERVER_URL + '/post/getPostById', {params: { id: postInfo.id}});
      let result = await axios.get('http://nodejs.leesh.kr' + '/post/getPostById', {params: { id: postInfo.id}});
      console.log('poasInfo.id!!!!!!!')
      console.log(postInfo.id);
      console.log(result);
      setPostData(result.data);
      dispatch(changePostInfo({...result.data}))
    }
    getPostData();
  }, [])

  const onUpdateBtnClick = () => {
    dispatch(changePage('postUpdate'));
  }


  const onDeleteBtnClick = () => {
    const deletePost = async () => {
      // let result = await axios.get(process.env.REACT_APP_SERVER_URL + '/post/deletePost', {params: { id: postInfo.id}}, {
        let result = await axios.get('http://nodejs.leesh.kr' + '/post/deletePost', {params: { id: postInfo.id}}, {
        withCredentials: true, // 쿠키 cors 통신 설정
      });
      console.log(result);
      setPostData(result.data);
      dispatch(changePostInfo({...result.data}))
      dispatch(changePage('postList'));
    }
    if (window.confirm('삭제하시겠습니까?')) {
      deletePost();
    }
  }
  return (
    <>
      <h2>{postData.title}</h2>
      {/* {postData.writer} | {postData.createdAt.slice(0, 10)}  */}
      {postData.writer} | {moment(postData.createdAt).format('YYYY-MM-DD HH:mm:ss')}

      {(userInfo.status==="login_success")?
      <>
      <Button htmlType="submit" size="small" style={{marginLeft:"10px"}} danger onClick={onUpdateBtnClick}>
            수정
      </Button>
      <Button type="primary" htmlType="submit" size="small" style={{marginLeft:"10px"}} danger onClick={onDeleteBtnClick}>
            삭제
      </Button>
      </>:<></>}
      <Divider/>
      {/* {(postData.thumbnail) && <img src={process.env.REACT_APP_SERVER_URL + "/" + postData.thumbnail}></img>} */}
      {(postData.thumbnail) && <img src={'http://nodejs.leesh.kr' + "/" + postData.thumbnail}></img>}
      <br/>
      {postData.content}
    </>
  );
};

export default PostView;
