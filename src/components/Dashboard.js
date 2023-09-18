import React, { useEffect ,useState, useContext} from 'react'
import Mycontext from '../context'
import Dropdown from './Dropdown'
import ControlPannel from './ControlPannel'
import { useNavigate } from 'react-router-dom'
import {auth} from '../config/firebase'

const Dashboard = (props) => {
  const navigate = useNavigate();
  const context = useContext(Mycontext)
  const [loading,setLoading] = useState(1)

  const checkUser = async ()=>{
    setTimeout(()=>{
      if(auth.currentUser?.email){
        context.setUserStatus(auth.currentUser.email)
        setLoading(0)
      }
      else{
        navigate('/login')
      }
    },2000)
  }
  useEffect(()=>{
    checkUser();
  },[])
  return (
    <div style={{display:"flex"}}>
        {
        loading ?
        <div className='loading'>
            <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />
          </div>
        :
        <>
          <Dropdown/>
          <ControlPannel setGenDetails={props.setGenDetails}/>
        </>
        }
        
    </div>
  )
}

export default Dashboard