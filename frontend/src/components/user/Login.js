import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg mt-5" onSubmit={submitHandler}>
                <h1 className="mb-3 text-center ">Đăng Nhập</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    placeholder="Nhập Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Mật khẩu</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  ĐĂNG NHẬP
                </button>

                <Link
                  to="/register"
                  className=" mt-4 btn bg-warning text-black p-2"
                >
                  Bạn chưa có tài khoản?  Hãy đăng ký tài khoản .
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
