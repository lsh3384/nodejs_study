import { Link } from "react-router-dom";
import { Button, Menu, Table, Modal, Form, Input, Checkbox  } from "antd";
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

    const getValue = (e) => {
    const { name, value } = e.target;
    
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
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };


      const onFinish = (values) => {
        console.log("Success:", values);
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
        // companyInfos.length &&
        <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={companyInfos}
      />
        // <Table rowSelection={rowSelection} columns={columns} dataSource={companyInfos} />
      }
      </>
    );
}

export default Company;