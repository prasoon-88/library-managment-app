import React, { useState } from 'react'
import Dropdown from './Dropdown'
import emailJs from '@emailjs/browser';
import '../style/Setting.css'

const Setting = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [msg,setMsg] = useState('');

  const handleMsg = (e) =>{
    e.preventDefault();

    const serviceId = 'service_8dzy6dd';
    const templateID = 'template_s3fkm17';
    const publicKey = '2qT47uLHRW4s4XAbM';

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Prasoon Asati',
      message: msg,
    }

    emailJs.send(serviceId, templateID, templateParams, publicKey)
    .then((result) => {
      setName('')
      setEmail('')
      setMsg('')
        console.log(result.text);
        alert('Response Noted Successfully')
    }, (error) => {
        console.log(error.text);
        alert('There Could Be Some Error')
    });
  }
  
  return (
    <div style={{display:"flex"}}>
        <Dropdown/>        
        <div className="contactUs">
        <div className="imgContainer">
            <img src="https://sky.animation.institute/wp-content/uploads/2021/11/Contact-1.png" alt="" />
        </div>
        <br />
            <form onSubmit={handleMsg} class='settingContainer'>
            <h1>Submit a Qurey</h1>
            <input type="text" value={name} placeholder='Name' onInput={(e)=>{
              setName(e.target.value);
            }}/>
            <input type="email" value={email} placeholder='Email' onInput={(e)=>{
              setEmail(e.target.value);
            }}/>
            <textarea placeholder='Message' value={msg}  maxLength="25" cols={'30'} rows={'5'} style={{resize: 'none'}} onInput={(e)=>{
              setMsg(e.target.value);
            }}></textarea>
            <button type="submit">Send</button>
            </form>
        </div>
       
    </div>
  )
}

export default Setting