import React, { useState } from 'react'

function Form1() {
    const [userinfo,setInfo]=useState({
        email:"",
        Gender:{
          male:"",
          female:"",
        },
          })
    const [Errors,setErrors]=useState('');
    const formhandler=(event)=>{
    const {name,value}=event.target
    setInfo({
        ...userinfo,
        [name]:value,
    });
    };
    const isvalidEmail=(Email)=>{
     const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
     return emailRegex.test(Email);
    }
    const Validform=()=>{
       let newErrors={};
       if(!userinfo.email){
       newErrors.email="email is required";
       }
       else if(!isvalidEmail(userinfo.email)){
        newErrors.email="invalid email ";
       }
       setErrors(newErrors);
      return Object.keys(newErrors).length===0;
    }
    console.log(Errors);


    const formsubmitt=(event)=>{
   event.preventDefault();
   const ISValid=Validform();
   if(ISValid){
    console.log("form is submitted", userinfo);
   }
   else{
    console.log("form submitted is failed");
   }
   console.log(userinfo);
    }
  return (
    <>
   
    <div>Form1</div>
    <label htmlFor="">Email</label>
    <input type="email" name="email" value={userinfo.email} onChange={formhandler} id="" />
    {Errors.email &&  <div  className='error' >{Errors.email}</div> }
    <label htmlFor="gender">Gender</label><br/>
    <label htmlFor="">Male</label>
   <input type="radio" name="gender"  value={userinfo.Gender.male} onChange={formhandler} /><br/>
   <label htmlFor="">Female</label>
   <input type="radio" name="gender" value={userinfo.Gender.female} onChange={formhandler} />
<div className="button">
    <button onClick={formsubmitt}>submit</button>
    </div>

    </>
  )
}

export default Form1