import React,{useState,useEffect} from 'react'//useEffect used to side effect directly in our component body
import axios from "axios";
import Swal from "sweetalert2";

import { Link, Navigate} from "react-router-dom";

function View() {
    
       const [suppliers,setSuppliers]=useState([]);
       const[value,setValue]=useState("")

       
useEffect(()=>{
       const getAllData=async()=>{
             const res=await axios.get("http://localhost:7000/api/v1/sup");
             setSuppliers(res.data);
             console.log("supplier :",setSuppliers)
       };
       getAllData();
              },[])

   const handleDelete=async(id)=>{
    const result = await Swal.fire({
      title: 'ARE YOU SURE ?',
      text: "DO YOU WANT TO DELETE THIS!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32dd32',
      cancelButtonColor: '#da2424',
      confirmButtonText: 'YES'
    });

    if(result.isConfirmed){await axios.delete(`http://localhost:7000/api/v1/sup/${id}`);
    const newSupplier=suppliers.filter((item)=>{
        return item._id!==id;
        
    });
    setSuppliers(newSupplier);
}else{
    Navigate('/edit');
}
    
   };      
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
  
  return (
    
    <div className="mt-5">
    <div className='container'> 
    <form class="d-flex" role="search"   onSubmit={handleSearch}>
        <input class="form-control me-2"
         type="search"
          placeholder="Sup Name" 
          aria-label="Search"
          value={value}
          onChange={(e)=>setValue(e.target.value)}/>
        <button class="btn btn-outline-success" type="submit">SEARCH</button>
      </form>
    <h2 class="text-center"> <b>ALL SUPPLIER DETAILS </b></h2>
    
    <table className="table">
    
    <thead >
      <tr style={{ backgroundColor:'#0d0d0d' , color:'white'  }}>
              <th scope="col">NO</th>
              <th scope="col">F_Name</th>
              <th scope="col">L_Name</th>
              <th scope="col">P_Name</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE</th>
              <th scope="col">ADDRESS</th>
              
      <th scope="col">EDIT</th>
      <th scope="col">DELETE</th>
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
                            
                            <td> <Link to={`/edit_sup_form/${supplier._id}`}>
                            <button className='btn btn-primary'>EDIT</button>
                          </Link></td>
                           
                            <td> <button onClick={()=>handleDelete(supplier._id)} className='btn  btn-danger'>DELETE</button></td>
                        </tr>

                        )
                       })}
            </tbody>
        </table>      
    </div>

</div>

  )
}

export default View