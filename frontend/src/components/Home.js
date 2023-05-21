import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import "./layout/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";

import Page from "../components/layout/Page";
import About from "./layout/About";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000000]);

  const [rating, setRating] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {/* /<slideCategoryy /> */}
      <Page></Page>
      <About></About>
      <br />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Website bán hàng trực tuyến"} />

          <h1 id="products_heading" className="container container-fluid">
            &emsp;&emsp;&emsp;
          </h1>
          <h3 className="heading">Sản phẩm</h3>

          {/* <section id="products" className="container mt-5">
            {
              <div className="row">
                {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            }
          </section> */}

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Tiếp"}
                prevPageText={"Trở về"}
                firstPageText={"Đầu tiên"}
                lastPageText={"Cuối cùng"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
