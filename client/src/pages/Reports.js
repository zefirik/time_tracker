import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Table} from 'react-bootstrap';

function Reports() {
  const id = localStorage.getItem('userID');
  console.log(id);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getUserReports();
  }, []);

  function getUserReports() {
    axios.get(`http://localhost:3001/user/reports/${id}`)
        .then(response => {
        setReports(response.data);
      });
  }
  console.log(reports);

  return (
  
    <Container>
    <div className="time">
    <h1>Reports</h1>
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
         <td>{item.time} sec</td>
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