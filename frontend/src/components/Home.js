import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import "./layout/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";
import Contact from "./Contact/Contact";
import Page from "../components/layout/Page";
import About from "./layout/About";

import  Deliveries from "./layout/Delivery/Deliveries";

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range);

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

  const keywords = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keywords, currentPage, price, rating));
    //   dispatch(getProducts(keywords));
    // }, [dispatch, alert, error, keywords]);
  }, [dispatch, alert, error, keywords, currentPage, price, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keywords) {
    count = filteredProductsCount;
  }
  return (
    <Fragment>
      <Page></Page>
      <About></About>
      <Deliveries />
      <br />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Website bán hàng trực tuyến"} />
          <h1 id="products_heading" className="container container-fluid">
            &emsp;&emsp;&emsp;
          </h1>
 
          <br></br>
          <h3 className="heading">Sản phẩm</h3>

              <br></br>
          <section id="products" className="container mt-5">
            {
              <div className="row">
                {keywords ? (
                  <Fragment>
          {/* */}
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products?.map((product) => (
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
                  products?.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            }
          </section>
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

      <Contact />
      
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4195585228513!2d106.782527774909!3d10.855659084037605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276e7ea103df%3A0xb6cf10bb7d719327!2sThu%20Duc%20Campus%20Hutech%20khu%20E!5e0!3m2!1svi!2s!4v1686568260119!5m2!1svi!2s"
                  width="100%"
                  height="500"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
