import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown'
import '../style/Card.css'

const Card = (props) => {
const [student , setStudent] = useState(props.student);
useEffect(()=>{
  setStudent(props.student);
},[props.student])

const saveAsHighQualityJPG = () => {
  document.querySelector('.navbar').style.display = 'none';
  document.querySelector('.btnContainer').style.display = 'none';
  document.querySelector('.dropdown').style.display = 'none';
  document.querySelector('#card').style.scale = 2.3;
  document.querySelector('#card').style.marginTop = '20%';
  window.print();
  document.querySelector('#card').style.marginTop = '10%';
  document.querySelector('#card').style.scale = 1;
  document.querySelector('.navbar').style.display = 'flex';
  document.querySelector('.btnContainer').style.display = 'grid';
  document.querySelector('.dropdown').style.display = 'flex';
};

  return (
    <div style={{display:'flex'}}>
        <Dropdown/>
        <div className="idCardContainer"> 
                <div className="cardContainer" id='card'>
                  <section className="heading">
                  <img src="/img/cardLogo.png" alt="" />
                    <div>
                    <h1>VIDYADHARA</h1>
                    <h2>{props.genDetails.name}</h2>
                    </div>
                  </section>
                  <section className="main">
                    <div className="box1">
                        <img id='dummyphoto' src="https://www.sn-baustoffmarkt.de/wp-content/uploads/2016/10/dummy-mitarbeiter.png" alt="" />
                        <img id='sign' src="/img/sign.png" alt="" />
                        <p>SIGNATURE</p>
                    </div>
                    <div className="box2">
                        <span>
                          <h2>{student?.name}</h2>
                          <p>STUDENT</p>
                        </span>
                        <span>
                        <p>ENROLLMENT NUMBER : {student?.enrollment}</p>
                        <p>BRANCH NAME : {student?.branch}</p>
                        <p>MOBILE NO. : {student?.phone}</p>
                        </span>
                        <img  id='barCodeImg' src={`https://barcodeapi.org/api/auto/${student?.enrollment}`} alt="" />
                    </div>
                  </section>
                </div>
                <div className="btnContainer">
                <button className="saveCard" onClick={saveAsHighQualityJPG}>Download</button>
                </div>                
        </div>
    </div>
  )
}

export default Card