import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts , getProductAscending } from "../../actions/productActions";
import Product from "./Product";

export default function ProductList({ match }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, error } = useSelector((state) => state.products);
  const keywords = match.params.keyword;



  const [selectedOption, setSelectedOption] = useState('Sắp xếp theo');
 
  const handleSort = (e) =>{
    const value = e.target.value
    setSelectedOption(value)
    if(value==='1'){
      dispatch(getProductAscending());
    }
  }
  // {products
  //   ?.sort((a, b) => a.price - b.price) // Sắp xếp sản phẩm theo giá tăng dần
  //   .map((product) => (
  //     <Product key={product._id} product={product} col={3} />
  //   ))}

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    // dispatch(getProducts(keywords, currentPage));
    // dispatch(getProducts(keywords));
    if (selectedOption === "1") {
      dispatch(getProductAscending());
    } else {
      dispatch(getProducts(keywords));
    }
   
  }, [dispatch, alert, error, keywords,selectedOption]);


  return (
    <Fragment>


      <section id="products" className="container mt-5" >
  <select className="p-2 rounded" onChange={handleSort}>
       <option value="">Sắp xếp theo</option>
       <option value="1">Gia từ cao đến thấp</option>
       <option value="2" >Giá từ thấp đến cao</option>
      
     </select>
     <select className="p-2 rounded mx-2" >
       <option value="">Mức giá</option>
       <option value="100">Dưới 100,000 VNĐ</option>
       <option value="100-200" >Từ 100.000 VNĐ - 200,000 VNĐ</option>
       <option value="300">Từ 300.000 VNĐ trở lên</option>
     </select>

        {
          <div className="row">
            {keywords ? (
              <Fragment>
                <div className="col-6 col-md-9">
                  <div className="row">
                    {products?.map((product) => (
                      <Product key={product._id} product={product} col={4} />
                    ))}
                  </div>
                </div>
              </Fragment>
            ) : (
              products?.map((product) => (
                <Product key={product._id} product={product} col={3}  />
              ))
            )}
          </div>
        }
      
      </section>
    </Fragment>
  );
}
