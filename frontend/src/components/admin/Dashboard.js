import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers } from "../../actions/userActions";


const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );

  // status order

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  let totalAmountall = 0;
  orders &&
    orders.forEach((product) => {
      totalAmountall += product.totalPrice;
    });

  return (
    <Fragment>
      <div class="grid-bg ba-grid anim">
        <div class="inner">
          <div className="row">
            <div className="col-12 col-md-2">
              <Sidebar />
            </div>

            <div className="col-12 col-md-10">
              <h1 className="my-4">Tổng quan</h1>

              {loading ? (
                <Loader />
              ) : (
                <Fragment>
                  <MetaData title={"Admin Dashboard"} />

                  <div className="row pr-4">
                    <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-primary o-hidden h-100">
                        <div className="card-body">
                          <div className="text-center card-font-size">
                            Tổng danh thu
                            <br />{" "}
                            <b>
                              {/* {totalAmount && totalAmount.toLocaleString()}{" "} */}
                              {totalAmountall && totalAmount.toLocaleString()}{" "}
                              VNĐ
                            </b>
                          </div>
                        </div>
                        <Link
                          className="card-footer text-white clearfix small z-1"
                          to="/admin/orders"
                        >
                          <span className="float-left">Xem chi tiết</span>
                          <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-success o-hidden h-100">
                        <div className="card-body">
                          <div className="text-center card-font-size">
                            Tổng sản phẩm
                            <br /> <b>{products && products.length}</b>
                          </div>
                        </div>
                        <Link
                          className="card-footer text-white clearfix small z-1"
                          to="/admin/products"
                        >
                          <span className="float-left">Xem chi tiết</span>
                          <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-danger o-hidden h-100">
                        <div className="card-body">
                          <div className="text-center card-font-size">
                            Tổng hóa đơn
                            <br /> <b>{orders && orders.length}</b>
                          </div>
                        </div>
                        <Link
                          className="card-footer text-white clearfix small z-1"
                          to="/admin/orders"
                        >
                          <span className="float-left">Xem chi tiết</span>
                          <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-info o-hidden h-100">
                        <div className="card-body">
                          <div className="text-center card-font-size">
                            Tổng người dùng
                            <br /> <b>{users && users.length}</b>
                          </div>
                        </div>
                        <Link
                          className="card-footer text-white clearfix small z-1"
                          to="/admin/users"
                        >
                          <span className="float-left">Xem chi tiết</span>
                          <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}

<div className='row'>


</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
