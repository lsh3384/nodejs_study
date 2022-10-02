import React, {useState} from "react";


import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../modules/ducks";
import { Button, Form, Input, Table } from "antd";
import axios from "axios";


function test(e) {
  console.log(e);
}

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "title",
    dataIndex: "title",
    render: (text) => <a onClick={test}>{text}</a>,
  },
  {
    title: "writer",
    dataIndex: "writer",
  },
];
const data = [
  {
    key: "1",
    id: "1",
    title: "hello",
    writer: "mr.Lee",
  },
];

const PostList = () => {

  const currentPage = useSelector((state) => state.page);
  const userInfo = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();
  const [selectionType, setSelectionType] = useState("checkbox");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onBtnClick = () => {
    dispatch(changePage('post'));
  }

  return (
    <>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        size={"small"}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      {userInfo.status === "login_success" && (
        <Button onClick={onBtnClick}>글쓰기</Button>
      )}
    </>
  );
};

export default PostList;
