import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Dropdown.css'

const Dropdown = () => {
  return (
    <div className='dropdown'>
      <Link to={'/dashboard'} id='dropIcon'><i className="ri-dashboard-line"></i></Link>
      <Link to={'/studentList'} id='dropIcon'><i className="ri-user-2-line"></i></Link>
      <Link to={'/bookList'} id='dropIcon'><i className="ri-book-read-line"></i></Link>
      <Link to={'/setting'} id='dropIcon'><i class="ri-chat-heart-line"></i></Link>
      <Link to={'/dashboard'} id='dropIcon'><i className="ri-restart-line"></i></Link>
    </div>
  )
}

export default Dropdown