import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Select } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import * as S from "./styled";
import FlowerIcon1 from "./images/img1.png";
import FlowerIcon2 from "./images/img2.png";
import DeliveryIcon from "./images/delivery.png";

export default function Deliveries() {
  const host = "https://provinces.open-api.vn/api/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const categories = [
    "Sản phẩm"
  ];

  const [category, setCategory] = useState('Sản phẩm');
  const handleCategoryChange = (value)=>{
    setCategory(value)
  }

  const [Price , setPrice] = useState('Mức Giá')

  const Prices = [
    'Từ 100.000 VNĐ trở xuống',
    'Từ 200.000 VNĐ đến 300.000 VNĐ',
    'Từ 300.000 VNĐ đến 400.000 VNĐ',
    'Từ 500.000 VNĐ trở lên'
  ]
  const handlePriceChange = (value)=>{
    setPrice(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}?depth=1`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const callApiDistrict = async (cityCode) => {
    try {
      const response = await axios.get(`${host}p/${cityCode}?depth=2`);
      setDistricts(response.data.districts);
    } catch (error) {
      console.error("Error fetching districts", error);
    }
  };

  const callApiWard = async (districtCode) => {
    try {
      const response = await axios.get(`${host}d/${districtCode}?depth=2`);
      setWards(response.data.wards);
    } catch (error) {
      console.error("Error fetching wards", error);
    }
  };

  const handleCityChange = (value) => {
    const selectedCityCode = value;
    setSelectedCity(selectedCityCode);
    setSelectedDistrict("");
    setSelectedWard("");
    callApiDistrict(selectedCityCode);
  };
  
  const handleDistrictChange = (value) => {
    const selectedDistrictCode = value;
    setSelectedDistrict(selectedDistrictCode);
    setSelectedWard("");
    callApiWard(selectedDistrictCode);
  };

  const handleWardChange = (value) => {
    setSelectedWard(value);
  };
  return (
    <S.Wrapper>
    <S.Form>
      <S.ImageHeader>
        <img src={FlowerIcon1} alt="flower1"></img>
      </S.ImageHeader>
      <S.Header>PHÍ ĐIỆN HOA</S.Header>
      {/* Lựa chọn  */}
      <Select
        className="mt-3"
        onChange={handleCityChange}
        value={selectedCity}
      >
        <Select.Option value="" disabled>
          Chọn tỉnh thành
        </Select.Option>
        {cities.map((city) => (
          <Select.Option key={city.code} value={city.code}>
            {city.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        className="mt-2"
        onChange={handleDistrictChange}
        value={selectedDistrict}
      >
        <Select.Option value="" disabled>
          Chọn quận huyện
        </Select.Option>
        {districts.map((district) => (
          <Select.Option key={district.code} value={district.code}>
            {district.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        className="mt-2"
        onChange={handleWardChange}
        value={selectedWard}
      >
        <Select.Option value="" disabled>
          Chọn phường xã
        </Select.Option>
        {wards.map((ward) => (
          <Select.Option key={ward.code} value={ward.name}>
            {ward.name}
          </Select.Option>
        ))}
      </Select>
      {/* Mô tả  */}
      <div style={{ textAlign: "center" }}>
        {/* <div>
          Phí chuyển phát :{" "}
          <span style={{ color: "red" }}>
          {/* <em>{shippingFee}</em>đ */}
                   {/* <em>0</em>đ  */}

          {/* </span>
        </div>  */}
        <div style={{ color: "gray" }}>
          (Giao miễn phí nội ô 63 tỉnh thành)
        </div>
      </div>
      <S.ButtonAnimation className="mt-2">
        Fast Delivery <img src={DeliveryIcon} alt="DeliveryIcon"></img>
      </S.ButtonAnimation>
    </S.Form>
    <S.Form>
      <S.ImageHeader>
        <img src={FlowerIcon2} alt="flower1"></img>
      </S.ImageHeader>
      <S.Header>TƯ VẤN CHỌN HOA</S.Header>
      <Select className="mt-4" value={category} onChange={handleCategoryChange}  >
        {categories.map((category)=>
        <Select.Option value={category}/>
        )}
     
      </Select>
      <Select className="mt-4" value={Price} onChange={handlePriceChange}>
      {Prices.map((price)=>
        <Select.Option value={price}/>
        )}
      </Select>
      <S.ButtonAnimation className="mt-4">
        Tìm Ngay Bây Giờ {"><"}
      </S.ButtonAnimation>
    </S.Form>
  </S.Wrapper>
  )
}


