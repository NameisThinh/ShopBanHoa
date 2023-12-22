import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import Search from "./Search";


const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Đăng xuất thành công");
  };

  return (
    <Fragment>
      <nav className="navbar">
        <div className="col-12 col-md-5">
          <div className="navbar-brand">
            <Link to="/" class="text-light">
              Flowers<span>.</span>
              <i className="bi bi-flower1"></i>
            </Link>
          </div>
          <Link to="/" class="text-light ms-3 col-md-0 fs-5">
            Trang Chủ
          </Link>
          <Link to="/product" class="text-light ms-3 col-md-0 fs-5">
            Sản phẩm
          </Link>
          <Link to="/check-dh" class="text-light ms-3 col-md-0 fs-5">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
            Kiểm tra đơn hàng
          </Link>
        </div>

        <div className="col-12 col-md-3 mt-3 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
          {user && user.role === "admin" ? (
            <p></p>
          ) : (
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <span id="cart" className="ml-3">
                Giỏ hàng
              </span>
              <span className="ml-1" id="cart_count">
                <i class="bi bi-cart4"></i>
                {cartItems.length}
              </span>
            </Link>
          )}

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Trang quản trị
                  </Link>
                )}
                {user && user.role !== "admin" && (
                  <Link className="dropdown-item" to="/orders/me">
                    Đơn đặt hàng
                  </Link>
                )}

                <Link className="dropdown-item" to="/me">
                  Thông tin cá nhân
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Đăng xuất
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-2" id="login_btn">
                <i class="fa fa-lock" aria-hidden="true" ></i>
                Đăng nhập
              </Link>
            )
          )}
        
  
        </div>
             
      </nav>
    </Fragment>
  );
};

export default Header;
