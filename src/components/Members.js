import { useState } from "react"
import Dropdown from "./Dropdown"
import util from "../utils"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react"
import Mycontext from '../context'
import '../style/Members.css'

const Members = () => {
  const [addVisibility, setaddVisibility] = useState('none');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [yoa, setYoa] = useState('');
  const [branch, setBranch] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [loading, setLoading] = useState(1);
  const [totalPages,setTotalPages] = useState([]);
  const [currPage,setCurrPage] = useState(1);
  const navigate = useNavigate();
  const context = useContext(Mycontext);
  const [studentList, setStudentList] = useState([]);

  const checkUser = () => {
    setTimeout( () => {
      if (auth.currentUser?.email) {
        context.setUserStatus(auth.currentUser.email)
        setLoading(0)
        updateList();
      }
      else {
        navigate('/login')
      }
    }, 2000)
  }

  const updateList = async ()=>{
    try {
      setStudentList(await util.getStudent())
      setTotalPages(Array.from({length:(studentList.length/10)+1},(item,index) => index+1));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkUser();
  }, [currPage,totalPages.length])
  return (
    <div className="members">
      {
        loading ?
          <div className='loading'>
            <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />
          </div>
          :
          <>
            <Dropdown />
            <div className="container">
              <section className="heading">
                <h1>Members</h1>
                <button onClick={() => {
                  setaddVisibility('flex')
                }} className="addMember"> <i class="ri-user-add-line"></i> Add Student</button>
              </section>
              <section className="tableContainer">
                <table>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Enrollment</th>
                      <th>Name</th>
                      <th>Branch</th>
                      <th>Year</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      studentList.length
                      ?
                      studentList.map((student,index)=>
                      ( ((currPage-1)*10 <= (index)) &&  (currPage*10 > (index))) &&
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{student.enrollment}</td>
                        <td>{student.name}</td>
                        <td>{student.branch}</td>
                        <td>{student.yoa}</td>
                        <td><i onClick={()=>{
                          context.setStudentDetails(student)
                          navigate(`/${student.enrollment + ' ' + student.name}`)
                        }} className="ri-information-line" /></td>

                      </tr>
                      )
                      
                      :
                      <tr>
                        
                      </tr>
                    }
                  </tbody>
                </table>
                <div className="pageNavigator">
                                    <p onClick={()=>{
                                        setCurrPage(currPage > 1 ? currPage-1 : currPage)
                                    }}><i class="ri-arrow-left-s-line"></i></p>
                                    {
                                        totalPages.map((page,index)=>(
                                            <div key={index} className="pageBox" id={currPage == index+1?'page':''} onClick={()=>{
                                                setCurrPage(Number(page));
                                            }}>{page}</div>
                                        )) 
                                    }
                                    <p onClick={()=>{
                                        setCurrPage(currPage < (studentList.length/10) ? currPage+1 : currPage)                                        
                                    }}><i class="ri-arrow-right-s-line"></i></p>
                                </div>
              </section>
            </div>
            <div className="addContainer" style={{ display: `${addVisibility}` }}>
              <i id="cross" className="ri-close-line" onClick={() => {
                setaddVisibility('none')
              }} />
              <div className="addSection">
                <h1>Add a new Studnet</h1>
                <div className="addStudentForm">
                  <span>
                    <label htmlFor="name" >Name</label>
                    <input value={name} type="text" onInput={(e) => {
                      setName(e.target.value);
                    }} />
                  </span>
                  <span>
                    <label htmlFor="email" >Email</label>
                    <input value={email} type="email" onInput={(e) => {
                      setEmail(e.target.value);
                    }} />
                  </span>
                  <span>
                    <label htmlFor="phone" >Phone</label>
                    <input value={phone} type="text" onInput={(e) => {
                      setPhone(e.target.value);
                    }} />
                  </span>
                  <span>
                    <label htmlFor="Branch" > Branch</label>
                    <input value={branch} type="text" onInput={(e) => {
                      setBranch(e.target.value);
                    }} />
                  </span>
                  <span>
                    <label htmlFor="name">Enrollment Number</label>
                    <input value={enrollment} type="text" onInput={(e) => {
                      setEnrollment(e.target.value);
                    }} />
                  </span>
                  <span>
                    <label htmlFor="addYear">Addmission Year</label>
                    <input value={yoa} type="text" onInput={(e) => {
                      setYoa(e.target.value);
                    }} />
                  </span>
                </div>
                <button onClick={() => {
                  util.addMember({ name: name, email: email, phone: phone, yoa: yoa, enrollment: enrollment, branch, branch });
                  alert(name, 'is added successfully');
                  setName(''); setEmail(''); setPhone('');
                  setYoa(''); setEnrollment(''); setBranch('');
                  setaddVisibility('none');
                  updateList();
                }}>Add Student</button>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Members