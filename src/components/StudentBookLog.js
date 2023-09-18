import { useState } from "react"
import Dropdown from "./Dropdown"
import util from "../utils"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import '../style/Members.css'

const StudentBookLog = (props) => {
  const [loading, setLoading] = useState(1);
  const [bookList, setBookList] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const navigate = useNavigate();

  const checkUser = () => {
    setTimeout(() => {
      if (auth.currentUser?.email) {
        updateList();
        setLoading(0)
      }
      else {
        navigate('/login')
      }
    }, 2000)
  }

  const updateList = async () => {
    try {
      let studentBookLog = [(await util.getStudentBookLog(props.enrollment))];
      let booksArr = [];
  
      switch (props.list) {
        case 'totalBooks':
          let totalBooks = studentBookLog[0].ReturnedBooks;
          totalBooks.push(...studentBookLog[0].notReturedBook);
  
          // Use Promise.all to await all promises in the map
          booksArr = await Promise.all(
            totalBooks.map(async (book) => {
              return await util.searchBook('id', book);
            })
          );
          break;
  
        case 'pendingBooks':
          let pendingBooks = studentBookLog[0].notReturedBook;
          // Use Promise.all to await all promises in the map
          booksArr = await Promise.all(
            pendingBooks.map(async (e) => {
              return await util.searchBook('id', e);
            })
          );
          break;
  
        default:
          let returnedList = studentBookLog[0].ReturnedBooks;
          // Use Promise.all to await all promises in the map
          booksArr = await Promise.all(
            returnedList.map(async (e) => {
              return await util.searchBook('id', e);
            })
          );
      }
     
      setBookList(booksArr)
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    checkUser();
  }, [])


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
                <h1>{props.list.toUpperCase()}</h1>
                <button onClick={() => {
                  navigate(-1)
                }} className="addMember">  <i class="ri-arrow-left-line"></i> Back</button>
              </section>
              <section className="tableContainer">
                <table>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Id</th>
                      <th>Book Name</th>
                      <th>Book Author</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bookList.length
                        ?
                        bookList.map((book, index) =>
                          (((currPage - 1) * 10 <= (index)) && (currPage * 10 > (index))) &&
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{book[0]?.id}</td>
                            <td>{book[0]?.name}</td>
                            <td>{book[0]?.author}</td>
                          </tr>
                        )
                        :
                        <tr>

                        </tr>
                    }
                  </tbody>
                </table>
                <div className="pageNavigator">
                  <p onClick={() => {
                    setCurrPage(currPage > 1 ? currPage - 1 : currPage)
                  }}><i class="ri-arrow-left-s-line"></i></p>
                  {
                    totalPages.map((page, index) => (
                      <div key={index} className="pageBox" id={currPage == index + 1 ? 'page' : ''} onClick={() => {
                        setCurrPage(Number(page));
                      }}>{page}</div>
                    ))
                  }
                  <p onClick={() => {
                    setCurrPage(currPage < (bookList.length / 10) ? currPage + 1 : currPage)
                  }}><i class="ri-arrow-right-s-line"></i></p>
                </div>
              </section>
            </div>


          </>
      }
    </div>
  )
}

export default StudentBookLog