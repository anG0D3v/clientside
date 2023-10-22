import React, { useState } from 'react'
import '../css/schoCategory.css'
import { ScholarCategory } from '../../Api/request.js'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { color } from "../../App";
import { useNavigate } from 'react-router-dom';

function SchoCategory() {
  const [post, setPost] = React.useState([]);
  const navigate = useNavigate()
  const { colorlist } = useContext(color);
  React.useEffect(() => {

    async function Fetch(){
      const req = await ScholarCategory.ScholarshipProgram()
      setPost(req.data.SchoCat)
    }
    Fetch()

  }, [post]);

  const setSchoforForm = (schoname) =>{
    localStorage.setItem('schoId',schoname)
    navigate('/register')
  }

  const schoCat = post?.map((contact, index) => {
    return (
      <div key={index}>
      {contact.status === 'Under Evaluation' ? (null) : (<div className='grid-container'>
    <div className='schoCat'>
      <div className="schoIcon">
      <Avatar
        alt="Remy Sharp"
        src={contact.icon}
        sx={{ width: 56, height: 56 }}
      />
      </div>
      <div className="schoDet">
        <div className='ntitle'><h4>{contact.name}</h4></div>
        <div className='ndate'><h6>{contact.description}</h6></div>
        
      </div>
      <div className='btncontainerscho'>
      {contact.status === 'open' || contact.status === 'Open' ? (<Button onClick={() =>setSchoforForm(contact.name)} variant="contained"><Link className='linkingscho'  >APPLY NOW</Link></Button>)
        : (<Button variant="contained" disabled><Link className='linkingscho' >{contact.status}</Link></Button>)}
      </div>
    </div>
    {(index + 1) % 2 === 0 && <br />}
    </div>)}
    </div>
    );
  });
  
  return (
    <>
    <div style={{width:'100%'}}>
    <h1 className='schohp' style={{backgroundColor:colorlist[0].bgColor,color:colorlist[0].bgColor1}}>Scholarship Program</h1>
    <div className='lschoCat'>
        {schoCat}
    </div>
    </div>
    </>
  )
}

export default SchoCategory