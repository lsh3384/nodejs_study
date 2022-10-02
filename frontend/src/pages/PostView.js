import React, {useState} from "react";


import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../modules/ducks";
import { Button, Form, Input, Table, Divider } from "antd";
import axios from "axios";


const PostView = () => {


  return (
    <>
      <h1>제목</h1>
      글쓴이 | 날짜
      <Divider/>
      내용
    </>
  );
};

export default PostView;
