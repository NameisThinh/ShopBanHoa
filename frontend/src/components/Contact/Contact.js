import React, { useEffect } from "react";
import "./Contact.css";
import { useState } from "react";

import { newMessage,clearErrors } from "../../actions/messageActions";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
export default function Contact() {
  const [messages, setMessage ] = useState({
    name: "",
    email: "",
    phone: "",
    mess: "",
  });

  const { name , email , phone , mess} = messages

    const alert = useAlert()
    const dispatch= useDispatch()

  const { error } = useSelector((state) => state.newMessage)

  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
 
  }, [dispatch, alert , error])

  const HandleSubmit = (e) => {

    e.preventDefault();
    try{
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("message", mess);

    dispatch(newMessage(formData));

    alert.success('Tin nhắn được gửi thành công')
    }catch(err){
      alert.error(err)
    }
   
    setMessage({
      name: "",
      email: "",
      phone: "",
      mess: ""
    });
   
  };

const onChangeMessage = (e)=>{
  setMessage({...messages, [e.target.name]: e.target.value})
}

  return (
    <form className="form-input" >
      <h1>
        Contact <span>Here</span>
      </h1>
      <input type="text" name="name" placeholder="Enter name" value={name} onChange={onChangeMessage}></input>
      <input type="email" name="email" placeholder="example@gmail.com" value={email} onChange={onChangeMessage}></input>
      <input type="phone" name="phone" placeholder="+81" value={phone} onChange={onChangeMessage}></input>
      <textarea
        type="text"
        value={mess}
        name="mess"
        cols="30"
        rows="10"
        placeholder="Type here...."
        onChange={onChangeMessage}
      ></textarea>
      <button type="submit" onClick={HandleSubmit}>Send</button>
    </form>
  );
}
