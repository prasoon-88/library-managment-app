import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import util from '../utils'
import { useNavigate } from 'react-router-dom'
import '../style/IssueBook.css'

const IssueBook = () => {
    const [studentDetail, setStudentDetail] = useState('');
    const [stSearchPara, setStSearchPara] = useState('name')
    const [student, setStudent] = useState({});
    const [bookDetail, setBookDetail] = useState('');
    const [bookSearchPara, setBookSearchPara] = useState('name');
    const [book, setBook] = useState('');
    const navigate = useNavigate();
    const searchStudent = async () => {
        if (studentDetail) {
            setStudent((await util.searchStudent(stSearchPara, studentDetail))[0]);
        }
    }
    const searchBook = async () => {
        if (bookDetail) {
            setBook((await util.searchBook(bookSearchPara, bookDetail.toUpperCase()))[0]);
        }
    }
    useEffect(() => {

    }, [student, book])
    return (
        <div style={{ display: "flex" }}>
            <Dropdown />
            <div className="issueBookContainer">
                <section className='issueHeading'>
                    <h1>Issue/Return Book</h1>
                    <button className="issueBook" onClick={()=>{
                        navigate('/dashboard')
                    }}><i className='ri-arrow-left-line' /> Back</button>
                </section>
                <section className='issueForm'>
                    <h2>Search a Student</h2>
                    <div className="line"></div>
                    <div className="form">
                        <span>
                            <label htmlFor="name" >Search Student</label>
                            <div>
                                <select onChange={(e) => {
                                    setStSearchPara(e.target.value)
                                }}>
                                    <option value="name">Student Name</option>
                                    <option value="enrollment">Enrollemnt</option>
                                </select>
                                <input type="text" value={studentDetail} onInput={(e) => {
                                    setStudentDetail(e.target.value);
                                }} />
                                <button className="search" onClick={searchStudent}><i className="ri-search-2-line"></i></button>
                            </div>
                        </span>
                        <span>
                            <label htmlFor="name" >Search Book</label>
                            <div>
                                <select onChange={(e) => {
                                    setBookSearchPara(e.target.value)
                                }}>
                                    <option value="name">Book Name</option>
                                    <option value="id">Id</option>
                                </select>
                                <input type="text" value={bookDetail} onChange={(e) => [
                                    setBookDetail(e.target.value)
                                ]} />
                                <button className="search" onClick={searchBook}><i className="ri-search-2-line"></i></button>
                            </div>
                        </span>
                        {
                            student?.hasOwnProperty('name') ?
                                <div className='studentContainer'>
                                    <h1>Student Details</h1>
                                    <div>
                                        Name : {student.name}
                                    </div>
                                    <div>
                                        Branch : {student.branch}
                                    </div>
                                    <div>
                                        Year Of Addmission : {student.yoa}
                                    </div>
                                    <div>
                                        Enrollment : {student.enrollment}
                                    </div>
                                    <div>
                                        Ph Number : {student.phone}
                                    </div>
                                </div>
                                : <></>
                        }
                        {
                            student?.hasOwnProperty('name') && book?.hasOwnProperty('name') ?
                                <div className='studentContainer'>
                                    <h1>Book Details</h1>
                                    <div>
                                        Name : {book.name}
                                    </div>
                                    <div>
                                        Author : {book.author}
                                    </div>
                                    <div>
                                        Branch : {book.branch}
                                    </div>
                                    <div>
                                        Availabe Status : {book.acount}
                                    </div>
                                </div>
                                : <></>
                        }
                        {
                            student?.hasOwnProperty('name') && book?.hasOwnProperty('name') ?
                            <><button onClick={()=>[
                                util.issueBook(student.enrollment,book.id),
                                setStudentDetail(''),
                                setBookDetail(''),
                                setStudent(''),
                                setBook('')
                            ]}>Issue Book</button>
                            <button onClick={()=>[
                                util.returnBook(student.enrollment,book.id),
                                setStudentDetail(''),
                                setBookDetail(''),
                                setStudent(''),
                                setBook('')
                            ]}>Return Book</button></>
                            : ''
                        }

                    </div>

                </section>
            </div>
        </div>
    )
}

export default IssueBook