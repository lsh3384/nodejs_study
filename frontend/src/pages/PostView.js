import React, {useState, useEffect} from "react";


import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../modules/ducks";
import { Button, Form, Input, Table, Divider } from "antd";
import axios from "axios";


const PostView = () => {
  const postId = useSelector((state)=> state.postId);
  const [postData, setPostData] = useState({});


  // 마운트 될 때 처리
  useEffect(() => {
    const getPostData = async () => {
      let result = await axios.get('http://localhost:3030/post/getPostById', {params: { id: postId}});
      console.log(result);
      setPostData(result.data);
    }
    getPostData();
    
  }, [])

  return (
    <>
      <h2>{postData.title}</h2>
      {postData.writer} | {postData.createdAt.slice(0, 10)}
      <Divider/>
      {postData.content}
    </>
  );
};

export default PostView;
