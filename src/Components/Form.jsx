
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import "./Form.css";
import { json } from 'react-router-dom';
function Form() {
  const[Error,setError]=useState('');
    const[userInfo,setUserInfo]=useState(
        {
        firstname:"",
        lastname:"",
        option:[],
        CNIC:"",
        number:"",
        email:"",
        password:"",
        confirm_password:"",
        Gender:{
          male:"",
          female:"",
        },
    }
    )
    
    const isValidCNIC=(CNIC)=>{
      const CNICRegex=/^[0-9]{5}-[0-9]{7}-[0-9]$/;
      return CNICRegex.test(CNIC);
    }
    
    const isvalidEmail=(email)=>{
      const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return emailRegex.test(email);
     }

  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for basic phone number validation (10 digits)
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    // Regular expressions for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };
    
     

    const validForm=()=>{
      let newErrors={};
      if(!userInfo.firstname){
          newErrors.firstname="First Name is Required";
      }
      if(!userInfo.lastname){
          newErrors.lastname="Last Name is Requried";
      }
      if(!userInfo.email){
        newErrors.email="Email is Required";
        }
        else if(!isvalidEmail(userInfo.email)){
         newErrors.email="Invalid Email ";
        }
     
  
     
      if(!userInfo.CNIC){
          newErrors.CNIC="CNIC is required";
      }
      
      else if(!isValidCNIC(userInfo.CNIC)){
        newErrors.CNIC="Invalid CNIC";
      }
     
   if(!userInfo.number){
      newErrors.number="Phone Number is Required";
   }
   else if (!isValidPhoneNumber(userInfo.number)) {
    newErrors.number= "Phone number must be 10 digits";
  }
   
   if(!userInfo.password){
      newErrors.password="Password is Required";
  
   }
   else if (!isValidPassword(userInfo.password)) {
    newErrors.password =
      "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
  }

  
   if(!userInfo.confirm_password){
      newErrors.confirm_password="Confirm Password is Required";
   }
   else if (userInfo.confirm_password !== userInfo.password) {
    newErrors.confirm_password = "Password must match";
  }
  if (userInfo.option.length<=0) {
    newErrors.option = "Select at least one interest";
  }
  
   
  
    setError(newErrors);
    
    return Object.keys(newErrors).length===0;
  
     
     
  }     
  
  console.log(Error);
  const formhandler=(event)=>{
    const {name,value}=event.target
   setUserInfo({
        ...userInfo,
        [name]:value,
    });
    };
    const formcheckedhandler = (e) => {
      const {name, checked} = e.target;
      let updatedInterests = [...userInfo.option];
      if (checked) {
        updatedInterests.push(name);
      } else {
        updatedInterests = updatedInterests.filter(
          (option) => option!== name
        );
      }
  
      setUserInfo({
        ...userInfo,
        option: updatedInterests,
      });
    };
  
   
   
  
  const submitform=async(e)=>{
e.preventDefault();
const isvalid=validForm();
const {firstname,lastname,option,CNIC,number,email,password,confirm_password}=userInfo;
if(isvalid){
  let result=await fetch("http://localhost:5000/Register",{
       
      
  method:"post",
  body: JSON.stringify({firstname,lastname,option,CNIC,number,email,password,confirm_password}),
  headers:{
   "content-type" :"application/json",
  }
  
           })
             result=await result.json();
            
            if(result){
              toast.success('Form Submitted Successfully!')
             
            }
   
  }
   

else{
  toast.error('Form Submission Failed')
}
 }

    
  return (
 
  <div className="box">
   
      <h1 className="box2">National Testing Service Pakistan</h1>
      <p className="box4">BULDING STANDARDS IN EDUCATIONAL AND PROFESSIONAL TESTING</p><br />
      <hr />
      <p className="box5">Candidate Portal</p><br />
      <label htmlFor="fname">FIRST NAME </label><br />
      <input type="text" id="size" name='firstname' placeholder="Enter your first name" value={userInfo.firstname} onChange={formhandler}  />
      {Error.firstname && <div className="error">{Error.firstname}</div>} <br />
      <label htmlFor="lname">LAST NAME</label><br />
      <input type="text" placeholder="Enter your Last name" name='lastname' id="size" value={userInfo.lastname}  onChange={formhandler} />
      {Error.lastname && <div className="error">{Error.lastname}</div>}<br />
      <span>Select Option</span><br />
      <span>Pakistani</span>
      <input type="checkbox" name="Pakistani" id="pak"   value={userInfo.option.includes("Pakistani")}  onChange={formcheckedhandler} /> <br />
      <span>Foreigner</span>
      <input type="checkbox" name="Foreigner" id="for"  value={userInfo.option.includes("Foreigner")} onChange={formcheckedhandler} /><br />
      {Error.option && <div className="error">{Error.option}</div>}
      <label htmlFor="CNIC">CNIC/B-form</label> 
      <input type="text"  id="size" name='CNIC'   placeholder="Enter your CNIC number XXXXX-XXXXXXX-X"  value={userInfo.CNIC}  onChange={formhandler}   />
      {Error.CNIC && <div className='error' >{Error.CNIC} </div> }<br />
      <h1 className="box3">*NOTE:-</h1>
      <ul className="box6">
        <li>Please use your own CNIC number for registration</li>
        <li>Please make sure your CNIC is Correct</li>
        <li>CNIC Phone number and Email can not be changed after registration</li>
      </ul><br />
      <label htmlFor="phone ">Mobile Number</label><br />
      <input type="tel"  id="size" placeholder="Enter your phone number" name='number'  value={userInfo.number}  onChange={formhandler}/><br />
      {Error.number && <div className="error">{Error.number}</div>}
      <h1 className="box3">*NOTE:-</h1>
      <ul className="box6">
        <li>Please make sure you have not blocked the Business/unwanted SMS through PTA Instruction by Reg to 3627, if so please unblock by sending sms "Unreg" to 3727 in order to receive SMS alerts from NTS</li>
      </ul>
      
      <label htmlFor="Email">Email</label><br />
    <input type="email" name="email" value={userInfo.email}  placeholder='Enter your Email' onChange={formhandler} id="size" />
    {Error.email &&  <div  className='error' >{Error.email}</div> }<br/>
      <label htmlFor="Password">Password</label><br />
      <input type="password"  id="size" placeholder="Enter your password " name='password' value={userInfo.password} onChange={formhandler} /><br />
      {Error.password && <div className="error">{Error.password}</div>}
      <label htmlFor="Confirm  Password">Confirm Password</label><br />
      <input type="password"  id="size" placeholder="Enter your confirm password" name='confirm_password'  value={userInfo.confirm_password} onChange={formhandler} /><br />
      {Error.confirm_password && <div className="error">{Error.confirm_password}</div>}
      <input type="checkbox" name="check" id="check" />
      <span>I AGREE TO THE TERMS AND CONDITIONS</span><br /><br /><br/>

     
    <button id='sizes' onClick={submitform} >Submit</button>
    <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>

      <hr />
   
  </div>
  


 
  )
}

export default Form