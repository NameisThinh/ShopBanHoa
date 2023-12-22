import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../actions/cartActions";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";

const Product = ({ product, col }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();

  const addToCart = () => {
    dispatch(addItemToCart(product._id, quantity));
    alert.success("Đã thêm vào giỏ hàng");
  };
  return (
    <div className={`col-sm-12 col-md-6 col-lg-4 col-lg-${col}  my-3`}>
      <div className=" card card p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <img
            className="card-img-top mx-auto"
            src={product.images[0].url}
            alt=""
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} đánh giá)</span>
          </div>
          <p className="card-text">{product.price.toLocaleString()}đ</p>
          <div class="container">
            <div class="row  justify-content-center">
              <div className="col">
                <Link
                  to={`/product/${product._id}`}
                  id="view_btn"
                  className="btn btn-inline p-2"
                >
                  <i className="fa fa-eye" aria-hidden="true">
                    <span>&nbsp;</span>
                  </i>
                  Xem chi tiết
                </Link>
              </div>

              <div className="col">
                <button
                  type="button"
                  // id="cart_btn"
                  className="btn btn-danger d-inline p-2"
                  disabled={product.stock === 1}
                  onClick={addToCart}
                >
                  Thêm giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
