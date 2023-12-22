import React from "react";
import "./Header.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function About() {
  return (
    <section className="about" id="about">
      <h1 className="heading">
        <span>About</span> us
      </h1>
      <div className="row">
        <div className="video-container">
          <h3>Best flower sellers</h3>
        </div>
        <div className="content">
          <h3>Why choose us?</h3>
          <p>
            Shop hoa tươi Flower.vn là một trong những tiệm hoa tươi uy tín nhất
            tại TP HCM, Việt Nam. FlowerCorner.vn cung cấp dịch vụ đặt hoa
            online giao tận nơi tại TP HCM, Hà Nội và trên tất cả các tỉnh –
            thành phố tại Việt Nam. Với hệ thống cửa hàng hoa tươi liên kết rộng
            khắp tất cả các tỉnh – thành phố trên toàn quốc, FlowerCorner.vn có
            thể giúp bạn gửi tặng hoa tươi cho người thân ở bất cứ nơi đâu tại
            Việt Nam. FlowerCorner cam kết mang đến cho bạn những sản phẩm hoa
            tươi chất lượng cao, với mức giá tốt nhất và dịch chuyên nghiệp nhất
            khi sử dụng dịch vụ đặt hoa tươi online giao tận nơi tại Flower.vn..
          </p>
          <Link to="" className="btnn">
            Learn
          </Link>
        </div>
      </div>
    </section>
  );
}
