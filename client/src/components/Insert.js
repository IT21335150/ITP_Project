import React, { useState } from 'react';//useState add a functional components
import axios from "axios";//Communicate with backend, make request and return data from the API
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Insert() {
    const [ render,setRender] = useState(false);

    const [input, setInput] = useState({
        F_name: "",
        L_name: "",
        P_name:"",
        Email: "",
        Phone: "",
        Address: "",
        isValidPhone: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.F_name || !input.L_name || !input.P_name || !input.Email || !input.Phone || !input.Address ) {
            Swal.fire({
              icon: 'error',
              title: 'PLEASE FILL ALL FIELDS',
              text: 'PLEASE FILL IN all required fields before submitting the form',
            });
            return;
          }
          
        Swal.fire({
            icon: "success",
            title: "Supplier Added!",
            confirmButtonText: "OK",
            onConfirm: () => {

            },
        })
          
        await axios.post("http://localhost:7000/api/v1/sup", input);
        console.log("supplier:",input)
        setRender(true)
        setInput({
            F_name: "",
            L_name: "",
            P_name:"",
            Email: "",
            Phone: "",
            Address: "",        
               
        })
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        // let isValidNic = input.isValidNic;
        let isValidPhone = input.isValidPhone
        // if (name === 'nic') {
        //     // NIC validation logic
        //     isValidNic = false;
        //     if (value.length === 10 && value.match(/^\d{9}[vV]$/)) {
        //       isValidNic = true;
        //     } else if (value.length === 12 && value.match(/^\d{12}$/)) {
        //       isValidNic = true;
        //     }
        //   }
          if (name === 'phone') {
            // Check if the input field being updated is the contactNo field 
             isValidPhone = false;
             if (value.length === 10) {
                 isValidPhone = true;
             } 
           }

        setInput(prevFormData => ({
            ...prevFormData,
            [name]: value,
            // isValidNic: isValidNic,
            isValidPhone: isValidPhone,
        }));
        
    };
   
    return (
        <div className='container'>
            
            <form className='con' onSubmit={handleSubmit}>
                <div className='row'>
                    <h2><b>INSERT NEW SUPPLIER</b></h2><br></br>
                    <div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">SUPPLIER FIRST NAME</label>
                        <input
                            name="F_name"
                            value={input.F_name}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">SUPPLIER LAST NAME</label>
                        <input
                            name="L_name"
                            value={input.L_name}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">PRODUCT NAME</label>
                        <input
                            name="P_name"
                            value={input.P_name}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">EMAIL</label>
                        <input
                            name="Email"
                            value={input.Email}
                            onChange={handleInputChange}
                            type="email"
                            class="form-control"
                            id="exampleNic"
                        />
                       
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">PHONE</label>
                        <input
                            name="Phone"
                            value={input.Phone}
                            onChange={handleInputChange}
                            type="phone"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                        {!input.isValidPhone && (
                        <span style={{ color: "red" }}>Invalid Phone Number</span>
                        )}
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">ADDRESS</label>
                        <input
                            name="Address"
                            value={input.Address}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    </div>
                    
                </div>
              
        <div class="my-3">
            <button type="submit" class="btn btn-success me-5">SUBMIT</button>
            <Link to={"/"}><button className='btn btn-danger'>CANCEL</button></Link>
        </div>
            
            </form>
            
        </div>
    )
}

export default Insert