import React, {useState, useEffect} from "react";

import { useSelector, useDispatch } from "react-redux";
import { changePage, changePostInfo } from "../modules/ducks";
import { Button, Form, Input, Table, Divider } from "antd";
import axios from "axios";
import config from "../config";

import moment from "moment";

const PostView = () => {
  const postInfo = useSelector((state)=> state.postInfo);
  const currentPage = useSelector((state) => state.page);
  const [postData, setPostData] = useState({});
  const dispatch = useDispatch();

  // 마운트 될 때 처리
  useEffect(() => {
    const getPostData = async () => {
      let result = await axios.get(config.serverUrl + '/post/getPostById', {params: { id: postInfo.id}});
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
      let result = await axios.get(config.serverUrl + '/post/deletePost', {params: { id: postInfo.id}});
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
      <Button htmlType="submit" size="small" style={{marginLeft:"10px"}} danger onClick={onUpdateBtnClick}>
            수정
      </Button>
      <Button type="primary" htmlType="submit" size="small" style={{marginLeft:"10px"}} danger onClick={onDeleteBtnClick}>
            삭제
      </Button>
      <Divider/>
      {(postData.thumbnail) && <img src={config.serverUrl + "/" + postData.thumbnail}></img>}
      <br/>
      {postData.content}
    </>
  );
};

export default PostView;
