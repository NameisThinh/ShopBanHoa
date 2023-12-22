import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getOrderPrewDetails } from "../../actions/orderActions";

import Loader from "../layout/Loader";

export default function CheckProduct({match}) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [email , setEmail] = useState("")
  const  [number,setNumber ]= useState('')

  const handleNumber=(e)=>{
    setNumber(e.target.value)
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }

  const { loading, order = {} } = useSelector(state => state.orderPrewDetails)
  const {   paymentInfo, user, totalPrice } = order

  const orderId = match.params.id;

  const CheckToProduct = () => {
    if (number && email) {
      dispatch(getOrderPrewDetails(number, email));
    } else {
      alert.error("Please enter order number and email");
    }
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderPrewDetails(orderId));
    }
  }, [dispatch, orderId]);


const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
  return (
    <Fragment>
    <form className="form-input">
      <h1>Kiểm tra đơn hàng</h1>
      <span>
        Nhập mã đơn hàng bạn phía dưới đây để kiểm tra trạng thái đơn hàng hiện
        tại.{" "}
      </span>
      <input type="text" name="id" value={number} placeholder="Mã đơn hàng (ID đơn hàng)" onChange={handleNumber}></input>

      <input type="email" name="eMAIL" value={email} placeholder="Email" onChange={handleEmail}></input>

      <button type="button" onClick={CheckToProduct} className="w-100">
        Kiểm Tra Ngay
      </button>
    </form>
         <div>
      
      {loading ? <Loader></Loader> :(      
        <div>     
            <h2 className="my-5" >Đơn hàng # : {order._id}</h2>
            <h4 className="my-4">Tình trạng thanh toán</h4>
           <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</b></p>
            <h2 className="my-5" >Tên khách hàng {user && user.name}</h2>
            <h2 className="my-5" >Email Khach Hang : {user && user.email}</h2>
            <p><b>Tổng tiền:</b> {totalPrice} VNĐ</p>
        
        </div>
      )}
         </div>
    </Fragment>
  )
}
