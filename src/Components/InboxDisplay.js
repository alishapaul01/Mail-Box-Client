import React from "react";
import Header from "./Header/Header";
import Sidebar from '../SideBar/SideBar'
import classes from './DisplayMail.module.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";


const InboxDisplay = (props) => {
  const [inboxData, setInboxData] = useState([]);
  const [seen, setSeen] = useState(false);
  const loggedInEmail = useSelector((state) => state.auth.email);
   const deleteHandler=(id)=>{
    try {
       axios.delete(
        `https://mail-box-3d7e2-default-rtdb.firebaseio.com/mail/${loggedInEmail}Inbox/${id}.json`
      );
      const result = inboxData.filter((item) => item.id !== id);
      setInboxData(result);
      alert("Sucessfully deleted");
      window.location.reload()

    } catch (err) {
      console.log(err);
    }
  };

  const seenHandler = (id) => {
    axios.patch(
      `https://mail-box-3d7e2-default-rtdb.firebaseio.com/mail/${loggedInEmail}Inbox/${id}.json`,
      {
        seen: true,
      }
    )

    alert('Seen Successfully');
    window.location.reload();
    setSeen(true);
    
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={classes.heading}>Recieved Mails</div>
      <Container>
      <ul>
        {props.data.map((item) => (
          <li key={item.id}>
            <div className={classes.display}>
            <div className={classes.seen}>{item.seen ? '' : <button onClick={seenHandler.bind(null, item.id)}></button>}</div>
                <span className={classes.to}>From:- {item.mail}@gmail.com</span>
                <span className={classes.subject}>{item.subject} </span>
                <span className={classes.text}>{item.text}</span>
              <button onClick={deleteHandler.bind(null, item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </Container>
    </div>
  );
};

export default InboxDisplay;