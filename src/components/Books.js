import { useState } from "react"
import Dropdown from "./Dropdown"
import util from "../utils"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react"
import Mycontext from '../context'
import '../style/Members.css'

const Books = () => {
    const [addVisibility, setaddVisibility] = useState('none');
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [quant, setQuant] = useState('');
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(1);
    const [bookList, setBookList] = useState([]);
    const [bookId,setBookId] = useState([0,0,0,0]);
    const [totalPages,setTotalPages] = useState([]);
    const [currPage,setCurrPage] = useState(1);
    const context = useContext(Mycontext);
    const navigate = useNavigate();

    const checkUser = () => {
        setTimeout(() => {
            if (auth.currentUser?.email) {
                updateList();
                context.setUserStatus(auth.currentUser.email)
                setLoading(0)
            }
            else {
                navigate('/login')
            }
        }, 2000)
    }
    
    const updateList = async () => {
        try {
            let bookCollection = await util.getBooks()
            setTotalPages(Array.from({length:(bookList.length/10)+1},(item,index) => index+1));
            setBookList(bookCollection);
            console.log(bookCollection)
            bookCollection.forEach((book) => {
                switch (book.id.slice(0,2)){
                    case 'CS':
                        bookId[0]++
                        break;
                    case 'ME':
                        bookId[3]++
                     break;
                     case 'CE':
                        bookId[1]++
                        break;
                    case 'EC':
                        bookId[2]++
                     break;
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect( () => {
        checkUser();
    }, [totalPages.length,currPage])


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
                                <h1>Books</h1>
                                <button onClick={() => {
                                    setaddVisibility('flex')
                                }} className="addMember">  <i class="ri-evernote-line"></i> Add Book</button>
                            </section>
                            <section className="tableContainer">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Id</th>
                                            <th>Book Name</th>
                                            <th>Book Author</th>
                                            <th>Total Quant</th>
                                            <th>Available Quant</th>
                                            {/* <th>Details</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bookList.length
                                                ?
                                                bookList.map((book, index) =>
                                                   ( ((currPage-1)*10 <= (index)) &&  (currPage*10 > (index))) &&
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{book.id}</td>
                                                        <td>{book.name}</td>
                                                        <td>{book.author}</td>
                                                        <td>{book.tcount}</td>
                                                        <td>{book.acount}</td>
                                                        {/* <td><i onClick={() => {
                                                            context.setStudentDetails(book)
                                                            navigate(`/${book.name + ' ' + book.author}`)
                                                        }} className="ri-information-line" /></td> */}
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
                                        setCurrPage(currPage < (bookList.length/10) ? currPage+1 : currPage)                                        
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
                                        <label htmlFor="name" >Book Name</label>
                                        <input value={name} type="text" onInput={(e) => {
                                            setName(e.target.value);
                                        }} />
                                    </span>
                                    <span>
                                        <label htmlFor="phone" >Author Name</label>
                                        <input value={author} type="text" onInput={(e) => {
                                            setAuthor(e.target.value);
                                        }} />
                                    </span>
                                    <span>
                                        <label htmlFor="Branch" > Branch</label>
                                        <input value={branch} type="text" onInput={(e) => {
                                            setBranch(e.target.value);
                                        }} />
                                    </span>
                                    <span>
                                        <label htmlFor="name">Total Quant</label>
                                        <input value={quant} type="number" onInput={(e) => {
                                            setQuant(e.target.value);
                                        }} />
                                    </span>
                                    <span>
                                        <label htmlFor="name">Any Other</label>
                                        <input value={comment} type="text" onInput={(e) => {
                                            setComment(e.target.value);
                                        }} />
                                    </span>
                                </div>
                                <button onClick={() => {
                                    let val = 0;
                                    switch (branch){
                                        case 'CS':
                                            setBookId([bookId[0]+1,bookId[1],bookId[2],bookId[3]])
                                            val = bookId[0];
                                            break;
                                        case 'CE':
                                            setBookId([bookId[0],bookId[1]+1,bookId[2],bookId[3]])
                                            val = bookId[1];
                                            break;   
                                        case 'ME':
                                            setBookId([bookId[0],bookId[1],bookId[2]+1,bookId[3]])
                                            val = bookId[2];
                                            break;  
                                       default:
                                            setBookId([bookId[0],bookId[1],bookId[2],bookId[3]+1])
                                            val = bookId[3];
                                            break;   
                                        
                                    }
                                    util.addBook(branch + (val +1),{ name: name, author: author, comment: comment, acount: quant,tcount: quant, branch, branch });
                                    alert(name , 'is added successfully');
                                    setaddVisibility('none');
                                    updateList();
                                    setAuthor('');
                                    setBranch('');
                                    setName('');
                                    setQuant('');
                                    setComment('');
                                }}>Add Student</button>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Books