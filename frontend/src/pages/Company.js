import { Link } from "react-router-dom";
import { Button, Menu, Table, Modal, Form, Input, Checkbox } from "antd";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

import axios from "axios";

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

function Company() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [companyInfos, setCompanyInfos] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const getValue = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setCompanyInfo((prevState) => {
      console.log(prevState);

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRows(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };


  const onFinish = (values) => {
    console.log("Success:", values);
    postData(values);
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  useEffect(() => {
    let completed = false;
    async function get() {
      const result = await axios.get(
        `http://localhost:3030/company/getAllCompanies`
      );
      console.log(result.data);
      if (!completed) {
        setCompanyInfos(
          result.data.map((row) => {
            return {
              ...row,
              key: row.id,
            };
          })
        );
      }
    }
    get();
    return () => {
      completed = true;
    };
  }, []);

  const postData = async (data) => {
    async function get() {
      const result = await axios.get(
        `http://localhost:3030/company/getAllCompanies`
      );
      setCompanyInfos(result.data);
    }
    console.log(companyInfo);
    let result = await axios.post(
      "http://localhost:3030/company/createCompany",
      {
        ...data,
      }
    );

    console.log("-------------");
    console.log(result);

    get();
  };


  const deleteData = async () => {
    const delete_result = await axios.post(
      'http://localhost:3030/company/deleteCompanies',
      {
        id: selectedRows
      }
    )
    async function deleteRows() {

    }

    const result = await axios.get(
      `http://localhost:3030/company/getAllCompanies`
    );
    setCompanyInfos(
      result.data.map((row) => {
        return {
          ...row,
          key: row.id,
        };
      })
    );
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Form
          name="basic"
          labelCol={{
            span: 9,
          }}
          wrapperCol={{
            span: 4,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="회사명"
            name="name"
            rules={[
              {
                required: true,
                message: "회사명을 입력해주세요!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="전화번호"
            name="phone"
            rules={[
              {
                required: true,
                message: "전화번호를 입력해주세요!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="주소"
            name="address"
            rules={[
              {
                required: true,
                message: "주소를 입력해주세요!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              회사등록
            </Button>
          </Form.Item>
        </Form>
      </div>

      <h1>등록된 정보</h1>
      {
        <>
          <Button type="primary" onClick={deleteData}>
            삭제
          </Button>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={columns}
            dataSource={companyInfos}
            pagination={{
              position: ["bottomCenter"],
            }}
          />
          {/* <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={companyInfos}
          /> */}
        </>
      }
    </>
  );
}

export default Company;
