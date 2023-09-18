import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import util from '../utils'
import '../style/ControlPanel.css'

const ControlPannel = (props) => {
  const [time, setTime] = useState('');
  const [generalDetails , setGeneralDetails] = useState({});
  const [randomQuote,setRandomQuote] = useState('');
  const date = new Date();

  const getDate = () => {

    // Format the month, day, and year
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the weekday
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

    // Format the time (hours and minutes) and AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Create the final formatted string
    const formattedDate = `${month} ${day}, ${year} | ${weekday}, ${formattedHours}:${formattedMinutes} ${ampm}`;

    setTime(formattedDate)
  }
  const updateGenDoc = async ()=>{
    props.setGenDetails(await util.getGeneralDetails());
    setGeneralDetails(await util.getGeneralDetails())
  }
  const updateQuote = async ()=>{
    try{
       let response = await fetch('https://api.quotable.io/quotes/random?maxLength=50');
       let data = await response.json()
       setRandomQuote(data[0]);
    } catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    updateQuote();
    updateGenDoc();
    getDate();
  }, [])
  return (
    <div className='controlPanel'>
      <section className="part1">
        <div>
          <h1>Hello, <span className='collageName'>{generalDetails?.name} </span> !</h1>
          <h2>{time}</h2>
        </div>
        <div><Link to={'/issueBook'}><button className='issueBook'><i className="ri-links-fill"></i> Book Issue/Return</button></Link></div>
      </section>
      <section className="part2">
        <div className="box">
          <div>
            <h2>{generalDetails?.totalVisitor}</h2>
            <i className="ri-team-line"></i>
          </div>
          <h4>Total Visitors</h4>
        </div>
        <div className="box">
          <div>
            <h2>{generalDetails?.totalBooks + generalDetails?.issueBooks}</h2>
            <i className="ri-chat-smile-3-fill"></i>
          </div>
          <h4>Total Books</h4>
        </div>
        <div className="box">
          <div>
            <h2>{generalDetails?.issueBooks}</h2>
            <i className="ri-hourglass-line"></i>
          </div>
          <h4>borrowed Books</h4>
        </div>
        <div className="box">
          <div>
            <h2>{generalDetails?.totalStudent}</h2>
            <i className="ri-user-heart-fill"></i>
          </div>
          <h4>Total Students</h4>
        </div>
      </section>
      <section className="part3">
        <h1 className="quate">{randomQuote.content}</h1>
        <p className="quateAuthor">{randomQuote.author}</p>
        {/* <p>Book Request</p>
        <table>
          <thead>
            <tr>            
              <td>S.No.</td>
              <td>Book Name</td>
              <td>Author Name</td>
              <td>Requested By</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Data Struces</td>
              <td>S.T. Balagoswami</td>
              <td>Prasoon Asati</td>
              <td id='check'><p>Check ?</p></td>
            </tr>
          </tbody>
        </table> */}
      </section>
    </div>
  )
}

export default ControlPannel