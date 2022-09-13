import { Button, Checkbox, Radio } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// const onChange= (e) => {
//   console.log(e.target);
//   console.log(e.target.value);
// }


const option_1 = [
  {
    label: "A작업",
    value: "A",
  },
  {
    label: "B작업",
    value: "B",
  },
  {
    label: "C작업",
    value: "C",
  },
];

const option_2 = [
  {
    label: "D작업",
    value: "D",
  },
  {
    label: "E작업",
    value: "E",
  },
  {
    label: "F작업",
    value: "F",
  },
];

function Request() {
  const location = useLocation();
  const company = location.state;
  console.log(company);

  const [jobs_1, setJobs_1] = useState([]);
  const [jobs_2, setJobs_2] = useState([]);

  const postData = async () => {
    const result = await axios.post(
      `http://localhost:3030/company/test`, {
        company: company.name,
        jobs: jobs_1.join(jobs_2)
      }
    );
    console.log(jobs_1, jobs_2);
  };

  const onChange_oprion1 = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setJobs_1(checkedValues);
    console.log('jobs_1', jobs_1);
  };
  
  const onChange_oprion2 = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setJobs_2(checkedValues);
    console.log('jobs_2', jobs_2)
  };

  return (
    <div>
      <h1>요청페이지</h1>

      <h2>1번</h2>
      
      <Checkbox.Group
        options={option_1}
        defaultValue={["A"]}
        onChange={onChange_oprion1}
      />
      
      <br></br>
      <h2>2번</h2>
      <Checkbox.Group
        options={option_2}
        defaultValue={["D"]}
        onChange={onChange_oprion2}
      />
      <br></br>
      <br></br>
      <p>
        <Button onClick={postData} type="primary">요청</Button>
      </p>
      
    </div>
  );
}

export default Request;