import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button, Menu, Table } from "antd";
import "./Main.css";

import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

import axios from "axios";


const items = [
  {
    label: "요청하기",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "QnA",
    key: "SubMenu",
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
    key: "alipay",
  },
];

function Main() {
  const [current, setCurrent] = useState("");
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [companyInfos, setCompanyInfos] = useState([]);

  const navigate = useNavigate();
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevState) => {
      console.log(prevState);

      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log(companyInfo.name);
    console.log({ ...companyInfo });
  };

  useEffect(() => {
    let completed = false;
    async function get() {
      const result = await axios.get(
        `http://localhost:3030/company/getAllCompanies`
      );
      console.log(result.data);
      if (!completed) {
        setCompanyInfos(result.data);
      }
    }
    get();
    return () => {
      completed = true;
    };
  }, []);

  const postData = async () => {
    async function get() {
      const result = await axios.get(
        `http://localhost:3030/company/getAllCompanies`
      );
      setCompanyInfos(result.data);
    }

    let result = await axios.post("http://localhost:3030/company/createCompany", {
      ...companyInfo,
    });
    
    console.log('-------------');
    console.log(result);

    get();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const onTableChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />

      <p>
        <input
          className="title-input"
          type="text"
          placeholder="이름"
          onChange={getValue}
          name="name"
        />
      </p>
      <p>
        <input
          className="title-input"
          type="text"
          placeholder="전화번호"
          onChange={getValue}
          name="phone"
        />
      </p>
      <p>
        <input
          className="title-input"
          type="text"
          placeholder="주소"
          onChange={getValue}
          name="address"
        />
      </p>

      <Button onClick={postData} type="primary">
        테스트 데이터 보내기
      </Button>

      <h1>등록된 정보</h1>
      {/* {companyInfos.map((element) => {
        return (
          <div key={element.id}>
            <p>
              {element.name} {element.phone} {element.address}
            </p>
          </div>
        );
      })} */}

      {
        // companyInfos.length &&
        <Table
          columns={columns}
          dataSource={companyInfos}
          onChange={onTableChange}
          rowKey={(render) => render.id}
          pagination={{
            position: ["bottomCenter"],
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { 
                // console.log('clicked!', rowIndex, record);
                
                navigate('/request', { state: record });
              },
            }
          }}
        />
      }
      {/* <Table>dataSource={companyInfos} columns={columns}</Table> */}
    </>
  );
}

export default Main;
