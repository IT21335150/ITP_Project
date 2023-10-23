import React,{useState,useEffect}from 'react';
import axios from "axios";

function Home() {
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
      
      <h2 class="text-center"><b> ALL SUPPLIER DETAILS</b></h2>
            
                <table class="table">
                    <thead>
                        <tr style={{ backgroundColor:'#0d0d0d' , color:'white'  }}>
                            <th scope="col">NO</th>
                            <th scope="col">F_Name</th>
                            <th scope="col">L-Name</th>
                            <th scope="col">P-Name</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">ADDRESS</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                       {suppliers&& suppliers.map((supplier,index)=>{
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
        
    )
}

export default Home