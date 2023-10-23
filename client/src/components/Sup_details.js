import React,{useState,useEffect,useRef} from 'react'
import axios from "axios";
import {useReactToPrint} from "react-to-print"; //useReactToPrint used to print out the contents


function Sup_details() {
  const[render]=useState(false);
  const [suppliers,setSuppliers]=useState([]);
  const [value, setValue] = useState("");


useEffect(()=>{
     const getAllData=async()=>{
           const res=await axios.get("http://localhost:7000/api/v1/sup");
           setSuppliers(res.data);
     };
     getAllData();
            },[render]);

        const handleSearch = async (e) => {
              e.preventDefault();
              try {
                const res = await axios.get(`http://localhost:7000/api/v1/sup/search?F_name=${value}`);
                setSuppliers(res.data);
                setValue("");
              } catch (error) {
                console.log(error);
              }
            };

            const componentPDF=useRef();
            const generatePDF=useReactToPrint({
                content: ()=>componentPDF.current,
                documentTitle:"supplier Data",
                //onAfterPrint:()=>alert("Data saved in PDF")
            });
            const CompanyLogo = () => {
              return (
                <div className='header'>
                   <img src =  './Icon.jpeg' alt="icon" style={{ maxWidth: '13%', height: 'auto' }} />
                   <p>B4 STORE<br></br>
                   72 Panchikawatta Rd,<br></br>
                   Colombo 01000
                  </p>
                </div>
              );
            };
           
  return (
    
          <div className='container' >
         
    <form class="d-flex" role="search"   onSubmit={handleSearch}>
      <input class="form-control me-2"
       type="search"
        placeholder="Sup Name" 
        aria-label="Search"
        value={value}
        onChange={(e)=>setValue(e.target.value)}/>
      <button class="btn btn-outline-success" type="submit">SEARCH</button>
    </form>
    <button class="btn btn-primary" onClick={generatePDF} >PRINT REPORT</button>
<div ref={componentPDF} style={{width:'100%'}}>
  <CompanyLogo/>
  
<br></br>
            
<h2 class="text-center"><b>ALL SUPPLIER DETAILS</b></h2>

              <table class="table">
                  <thead>
                      <tr style={{ backgroundColor:'#0d0d0d' , color:'white'  }}>
                          <th scope="col">NO</th>
                            <th scope="col">F_NAME</th>
                            <th scope="col">L_NAME</th>
                            <th scope="col">P_NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">ADDRESS</th>
                            
                      </tr>
                  </thead>
                  <tbody>
                     {suppliers && suppliers.map((supplier,index)=>{
                      return (
                        <tr key={supplier._id}>
                        <td>{index + 1}</td>
                          <td>{supplier.F_name}</td>
                          <td>{supplier.L_name}</td>
                          <td>{supplier.P_name}</td>
                          <td>{supplier.Email}</td>
                          <td>{supplier.Phone}</td>
                          <td>{supplier.Address}</td>
                      </tr>
                      )
                     })}
                      
                  </tbody>
              </table>
          </div>
          </div>      
  )
}

export default Sup_details