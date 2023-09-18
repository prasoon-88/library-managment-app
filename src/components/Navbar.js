import { useContext } from 'react';
import '../style/navbar.css';
import { Link ,useNavigate }  from 'react-router-dom';
import Mycontext from '../context';
import util  from '../utils';

const Navbar = (props) => {
  const context = useContext(Mycontext)
  const navigate = useNavigate();
  const userLogout = ()=>{
    util.logout()
    navigate('/')
    context.setUserStatus(false);
  }
  return (
    <ul className='navbar'>
      <li className="logo"><img src="/img/logo.png" alt="" />Vidyadhara</li>
      {
        context.userStatus ?
        <>
        <li className='signIn' onClick={userLogout}>Logout</li> 
        </>       
        : 
        <Link to='/login'><li className='signIn'>Login</li></Link>

      }
    </ul>
  );
};

export default Navbar;
