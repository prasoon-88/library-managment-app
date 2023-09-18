import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import StudentDetails from './components/StudentDetails'
import Navbar from './components/Navbar'
import Books from "./components/Books"
import Login from './components/Login'
import Members from './components/Members'
import Context from './context'
import IssueBook from "./components/IssueBook"
import Card from './components/Card'
import Setting from './components/Setting'
import StudentBookLog from "./components/StudentBookLog"
import { useState } from "react"

import './App.css'

const App = () => {
  const [studentDetails ,setStudentDetails ] = useState({})
  const [userStatus ,setUserStatus] = useState('');
  const [genDetails,setGenDetails] = useState({});
  return (
    <div className="App">
      <Context.Provider value={{userStatus,setUserStatus,setStudentDetails}}>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard setGenDetails={setGenDetails}/>}/>
                <Route path="/studentList" element={<Members/>}/>
                <Route path="/bookList" element={<Books/>}/>
                <Route path="/setting" element={<Setting/>}/>
                <Route path="/issueBook" element={<IssueBook/>}/>
                <Route path="/:id" element={<StudentDetails details={studentDetails}/>}/>     
                <Route path="/:id/card" element={<Card genDetails={genDetails} student={studentDetails}/>}/>              
                <Route path="/:id/totalBooks" element={<StudentBookLog student={studentDetails} enrollment= {studentDetails.enrollment} list={'totalBooks'} />}/>              
                <Route path="/:id/pendingBooks" element={<StudentBookLog student={studentDetails} enrollment= {studentDetails.enrollment} list={'pendingBooks'}  />}/>              
                <Route path="/:id/returnedBooks" element={<StudentBookLog student={studentDetails} enrollment= {studentDetails.enrollment} list={'returnedBooks'} />}/>              
            </Routes>
        </Router>
        </Context.Provider>
    </div>
  )
}

export default App