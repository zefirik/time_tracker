import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {Container, Table, Form, Button} from 'react-bootstrap';

function secondsToHms(d) {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor(d % 3600 / 60);
  let s = Math.floor(d % 3600 % 60);

  let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay; 
}




function Reports() {
  const id = localStorage.getItem('userID');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
 
  const [reports, setReports] = useState([]);
  const [filterOperation, setFilterOperation] = useState('');
  console.log("SEND QUERY",id, filterOperation);

  useEffect(() => {
    getUserReports();
  }, []);

  function getUserReports() {
    axios.get(`http://localhost:3001/user/reports/`,{ params: {id}})
        .then(response => {
        setReports(response.data);
      });
  }

  function findOperation(){
      if(filterOperation !== null && filterOperation !== ""){
      axios.get(`http://localhost:3001/user/reports/filter`,{ params: { id, filterOperation } })
      .then(response => {
      setReports(response.data);
    });
    return;
   }
    getUserReports();

  }

  console.log(reports);

  return (
  
    <Container>
    <div className="time">
    <h2>Reports</h2>
    </div>
    <div className="d-flex justify-content-center mt-2">
    <Form.Control type="text" placeholder="Choose operation" onChange={(e) => {setFilterOperation(e.target.value)}}/> 
        <Button onClick={findOperation} >
          Find
        </Button>
    </div>
    <div className="d-flex justify-content-center my-3">
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
    </div>
     <div className="table"> 
     <Table striped bordered hover variant="dark">
       <thead>
         <tr>
           <th>operation</th>
           <th>time</th>
           <th>date</th>
         </tr>
       </thead>
       <tbody>
       {reports.map((item) => (
       <tr key = {item.id}>
         <td>{item.operation}</td>
         <td>{secondsToHms(item.time)}</td>
         <td>{item.date}</td>
       </tr>))
       }
       </tbody>
     </Table>
     </div>
     
     </Container>
     
  );
}

export default Reports;