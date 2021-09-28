/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SecondsToHms from '../components/pagination/secondsToHms';
import Posts from '../components/pagination/Posts';
import Pagination from '../components/pagination/Pagination';
import {StoreContext} from '../components/storage/context';
import { AutoSuggest } from 'react-autosuggestions';


import {Container, Table, Button} from 'react-bootstrap';


function Reports() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [cat, setCat] = useState(); // это переменные для автозаполнения в строке поиска
 

  const [reports, setReports] = useState([]);
  const [filterOperation, setFilterOperation] = useState(null);

   //console.log("SEND QUERY",id, filterOperation, startDate, endDate);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

    // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currenReports = reports.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const {state} = useContext(StoreContext);
  const id = state.userData.data.id ;
  
  const totalTime = reports.map((task) => task.time).reduce((a, b) => a + b, 0);
  
  // перебираем входящий массив, чотб найти названия всех дейсвий
  let result = {}; 
  reports.map(function (each) {
    Object.keys(each).map(function (key){
      result[key] = result[key] || [];
      result[key].push(each[key]);
    });
  });
  // достаем уникальные имена действий с помощью нового Сэта
  const catOptions = [...new Set( result.operation )];
  

  useEffect(() => {
    getUserReports();
  }, []);

  function getUserReports() {
    axios.get(`http://localhost:3001/user/reports/`,{ params: {id}})
        .then(response => {
        setReports(response.data[0]);
        console.log("RESPONS FOR FIND",response);
        
      });
  }
 
  function findOperation(){
   axios.get(`http://localhost:3001/user/reports/filter`,{ params: { id, filterOperation, startDate, endDate } })
   .then(response => {
     setReports(response.data[0]);
     //console.log("RESPONS FOR FIND",response);
   });
  }

  function deleteOperation(itemId){
    console.log(itemId);
    axios.delete(`http://localhost:3001/user/reports/filter`,{ params: {itemId}})
        .then(response => {
        //console.log("RESPONS FOR FIND",response.data);
        getUserReports();
      });
    
  }
  console.log(reports);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCat();
  };
 
  return (
  
    <Container>
    <div className="time">
    <h2>Reports</h2>

    </div>
    <div className="d-flex justify-content-center mt-2 align-items-baseline">
    
    <form onSubmit={handleSubmit} onChange={(e) => {setFilterOperation((e.target.value).toLowerCase())} }>
       <AutoSuggest
          name="Please choose your action..."
          options={catOptions}
          value={cat}
          handleChange={setCat}
        />
      </form > 
        <Button className="click" onClick={findOperation}>
          Find
        </Button>
    </div>
    <label className="my-2">date period</label>
    <div className="mb-3">
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
    </div>
    <div>
      <h3 style={{ color: 'white' }}>Total time: {SecondsToHms(totalTime)}</h3>
    </div>
     <div className="table"> 
     <Table striped bordered hover variant="dark">
       <thead>
         <tr>
           <th>operation</th>
           <th>time</th>
           <th>date</th>
           <th></th>
         </tr>
       </thead>
       <Posts reports={currenReports} deleteOperation={deleteOperation} /> 
     </Table>
     <Pagination
        postsPerPage={postsPerPage}
        totalPosts={reports.length}
        paginate={paginate}
      /> 
     </div>
     </Container>
     
  );
}

export default Reports;