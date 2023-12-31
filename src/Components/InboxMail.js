import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import InboxDisplay from "./InboxDisplay";
import{inboxActions} from '../Store/inboxSlice';

const InboxMail = () => {
  const dispatch= useDispatch();
  const [inbox, setInbox] = useState([]);
  const loggedInEmail = useSelector((state) => state.auth.email);
  const updatedLoggedInEmail = loggedInEmail;

  useEffect(() => {
    const interval=  setInterval(() => {
      console.log("setintervelid", interval);
      getMail()
  }, 2000);

    return () => {
      console.log("clearintervalid", interval);
      clearInterval(interval);
    };
  });

  const getMail = async () => {
    try {
      const response = await fetch(
        `https://mail-box-3d7e2-default-rtdb.firebaseio.com/mail/${updatedLoggedInEmail}Inbox.json`
      );
      const data = await response.json();
      dispatch(inboxActions.onEmailFetch(data));
        const array = [];
        
        for (const key in data) {
          array.push({
            id: key,
            mail: data[key].mail,
            subject: data[key].subject,
            text: data[key].text,
            seen:data[key].seen
          });
        }
        setInbox(array);
      }
      catch(err){
      alert(err);
    }
  };
  return (
    <div>
      <InboxDisplay data={inbox} />

    </div>
  );
};

export default InboxMail;