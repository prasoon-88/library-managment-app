import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db,auth } from '../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { getDoc , doc  } from 'firebase/firestore';
import util from '../utils'

import '../style/login.css'
const Login = () => {
    const navigate = useNavigate();
    const [passVisibility, setPassVisibility] = useState('password');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async()=>{
        try{
            const userRef = doc(db,id,'login');
            const user = await getDoc(userRef);
            if(user.exists() &&  user.data().password === password){
                
                await signInWithEmailAndPassword(auth,id,password);
                alert('Success')
                await util.updateGeneral('totalVisitor',1,1);
                navigate('/dashboard')
            }else{
                alert('Invalid user')
                navigate('/')
            }
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <div className='loginContainer'>
            <div className="login">
                <h1>Login</h1>                
                <span>
                    <input placeholder='User Name' type="text" onInput={(e)=>{
                        setId(e.target.value)
                    }} />
                    <i className='ri-user-line'></i>
                </span>
                <span id='spanToChange'>
                    <input placeholder='Password' type={passVisibility} onInput={(e)=>{
                        setPassword(e.target.value);
                    }} />
                    <i onClick={() => {
                        setPassVisibility(passVisibility === 'password' ? 'text' : 'password')
                    }} style={{ cursor: "pointer" }} className='ri-eye-line'></i>
                </span>
                <button onClick={handleAuth}>Login</button>
            </div>
        </div>
    )
}

export default Login