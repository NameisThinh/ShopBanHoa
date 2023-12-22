import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Page() {
  return (
    <section className="home" id="home">
      <div className="content">
        <h3>Fresh flower</h3>
        <span>Natural & beatiful flower</span>
        <p>
          Chúng tôi chuyên cung cấp những bông hoa tươi , đẹp . Tập trung những
          bông hoa ở các miền trên đất nước , đảm bảo chất lượng . Uy tín hàng
          đầu
        </p>
        <Link to="/product" className="btnn">
          Shop now
        </Link>
      </div>
    </section>
  );
}
