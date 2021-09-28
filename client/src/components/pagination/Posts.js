import React from 'react';
import {Button} from 'react-bootstrap';
import secondsToHms from './secondsToHms';

const Posts = ({reports, deleteOperation}) => {
  

  return (
    <tbody>
     {reports.map((item) => (
       <tr key = {item.id}>
         <td>{item.operation}</td>
         <td>{secondsToHms(item.time)}</td>
         <td>{item.date}</td>
         <td style={{ textAlign: "center" }}><Button variant="outline-danger" onClick={()=> deleteOperation(item.id)}>X</Button></td>
       </tr>))
       }
    </tbody>
  );
};

export default Posts;