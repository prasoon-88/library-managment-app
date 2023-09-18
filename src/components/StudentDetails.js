import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import util from '../utils'
import '../style/StudentDetails.css'

const StudentDetails = (props) => {
  const [student, setStudent] = useState(props.details);
  const [bookDetails , setBookDetails] = useState({ReturnedBooks:[],notReturedBook:[]});
  const [loading, setLoading] = useState(1);
  
  setTimeout(async() => {
    setBookDetails(await util.getStudentBookLog(student.enrollment));
    setLoading(0)    
  }, 2000)
  
  useEffect(()=>{
  },[student,bookDetails])

  return (
    <div style={{ display: 'flex' }}>
      {
        loading ?
        <div className='loading'>
        <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />
      </div> :
          <>
            <Dropdown />
            <div className='studentDetails'>
              <section className="heading">
                <Link to={'/studentList'}> <button id='cardBtn'><i className='fa-solid fa-arrow-left' /> Back</button></Link>
                <h2>Student Details</h2>
                <Link to={`/${student?.enrollment+' '+student?.name}/card`}><button id='cardBtn'><i className='fa-solid fa-print' /> Print Card</button></Link>
              </section>
              <section>
                <div className="personalDetail">
                  <div>
                    <h1>Personal Information</h1>
                    <section>
                      <span>
                        <label htmlFor="">Name</label>
                        <p>{student?.name}</p>
                      </span>
                      <span>
                        <label htmlFor="">Branch</label>
                        <p>{student?.branch}</p>
                      </span>
                      <span>
                        <label htmlFor="">Addmission Year</label>
                        <p>{student?.yoa}</p>
                      </span>
                      <span>
                        <label htmlFor="">Enrollment Number</label>
                        <p>{student?.enrollment}</p>
                      </span>
                      <span>
                        <label htmlFor="">Phone Number</label>
                        <p>+91 {student?.phone}</p>
                      </span>
                      <span>
                        <label htmlFor="">Email id</label>
                        <p>{student?.email}</p>
                      </span>
                    </section>
                  </div>
                  <div>
                    <h3>Scan Me</h3>
                    {/* <img src={`https  ://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${Object.values(student)}`} alt="" /> */}
                    <img src={`https://barcodeapi.org/api/auto/${student?.enrollment}`} alt="" />
                  </div>
                </div>
              </section>
              <section className='bookDetails'>
                <Link to={`/${student?.enrollment + ' ' + student?.name}/totalBooks`}>
                <div className="card" style={{backgroundColor:"rgb(220, 244, 154)"}}>
                  <h1>{bookDetails? bookDetails?.ReturnedBooks?.length + bookDetails?.notReturedBook?.length : 0}</h1>
                  <p>Total Alloted Books</p>
                  <i className='fa-solid fa-users' />
                  <button>More Info <i className='fa-solid fa-arrow-right' /></button>
                </div>
                </Link>
                <Link to={`/${student?.enrollment + ' ' + student?.name}/returnedBooks`}>
                <div className="card" style={{backgroundColor:"rgb(154, 244, 189)"}}>
                  <h1>{bookDetails? bookDetails?.ReturnedBooks?.length: 0}</h1>
                  <p>Returned Books</p>
                  <i className='fa-solid fa-users' />
                  <button>More Info <i className='fa-solid fa-arrow-right' /></button>
                </div>
                </Link>
                <Link to={`/${student?.enrollment + ' ' + student?.name}/pendingBooks`}>
                <div className="card" style={{color:"white"}}>
                  <h1>{bookDetails? bookDetails?.notReturedBook?.length : 0}</h1>
                  <p>Pending Books</p>
                  <i className='fa-solid fa-users' />
                  <button>More Info <i className='fa-solid fa-arrow-right' /></button>
                </div>
                </Link>
              </section>
            </div>
          </>
      }
    </div>
  )
}

export default StudentDetails