import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { ORDER } from "../../../pages/config";
import authHeader from "../../../services/auth-header";

function Form({
  balance,
  type,
  content,
  tradingType,
  ordTypes,
  tradingPrice,
  btnColor,
}) {
  const [price, setPrice] = useState("");
  const [ordType, setOrdType] = useState("limit"); // 기본: 지정가
  const [volume, setVolume] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isVolumeValue, setIsVolumeValue] = useState(false);
  const [isTotalPriceValue, setIsTotalPriceValue] = useState(false);

  const checkbox = (checkThis) => {
    const checkbox = document.getElementsByName("ordType");
    for (const i = 0; i < checkbox.length; i++) {
      if (checkbox[i] !== checkThis) {
        checkbox[i].checked = false;
      }
      setOrdType(checkThis.value);
    }
  };

  const onChangePrice = useCallback((e) => {
    setPrice(e.target.value);
  }, []);

  const onChangeVolume = useCallback((e) => {
    setVolume(e.target.value);
    setIsVolumeValue(true);
    setIsTotalPriceValue(false);
  }, []);

  const onChangeTotalPrice = useCallback((e) => {
    setIsVolumeValue(false);
    setTotalPrice(e.target.value);
    setIsTotalPriceValue(true);
  }, []);
  console.log("수량", isVolumeValue);
  console.log("가격", isTotalPriceValue);

  useEffect(() => {
    if (isVolumeValue && isTotalPriceValue === false) {
      setTotalPrice(price * volume);
    }

    if (isTotalPriceValue && isVolumeValue === false) {
      setVolume((totalPrice / price).toFixed(8));
    }
  }, [isTotalPriceValue, isVolumeValue, price, totalPrice, volume]);

  useEffect(() => {
    setPrice(`${content.trade_price}`);
  }, [content.trade_price]);
  console.log(content);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${ORDER.ORDER}`,
          {
            englishName: `${content.english_name}`,
            koreanName: `${content.korean_name}`,
            market: `${content.market}`,
            ordType,
            price,
            type: type,
            volume,
          },
          {
            headers: authHeader(),
          }
        )
        .then(
          () => { 
            alert("주문 완료! ");
          },
          (error) => {            
            console.log(error);
          }
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" ">
      <div className="pt-2 px-4 border-r border-t">
        <div className="font-bold">{tradingType}</div>
        <form className="mt-9 h-96" onSubmit={onSubmit}>
          {/* 주문구분, 주문가능, 매수가격(KRW), 주문수량(GMT), 주문총액(KRW) */}
          <div className="flex justify-between">
            <label className="my-auto">주문구분</label>
            {ordTypes.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  className="mr-4"
                  name="ordType"
                  value={item.value}
                  onChange={(e) => checkbox(e.target)}
                />
                {item.title}
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <label className="my-auto">주문가능</label>
            {/* 사용자의 자금 출력 */}
            <div className="flex">
              <p className="font-bold text-xl">
                {Number(balance).toLocaleString()}
              </p>
              <p className="text-sm ml-3 my-auto text-gray-600">KRW</p>
            </div>
          </div>
          {ordType === "limit" && (
            <div>
              <div className="flex justify-between mt-6">
                <label className="my-auto">{tradingPrice}</label>
                <input
                  type="text"
                  className="border rounded-lg w-1/2 h-9 text-right"
                  value={price}
                  onChange={onChangePrice}
                />
              </div>
              <div className="flex justify-between mt-6">
                <label className="my-auto">주문수량</label>
                <input
                  className="border rounded-lg w-1/2 h-9 text-right"
                  value={volume}
                  onChange={onChangeVolume}
                />
              </div>
              <div className="flex justify-between mt-6">
                <label className="my-auto">주문총액</label>
                <input
                  className="border rounded-lg w-1/2 h-9 text-right"
                  value={totalPrice}
                  onChange={onChangeTotalPrice}
                />
              </div>
              <div className="mt-14 text-center">
                <button className={btnColor}>{tradingType}</button>
              </div>
            </div>
          )}
          {(ordType === "price") && (
            <div>
              <div className="flex justify-between mt-6">
                <label className="my-auto">주문총액</label>
                <input
                  className="border rounded-lg w-1/2 h-9 text-right"
                  value={totalPrice}
                  onChange={onChangeTotalPrice}
                />
              </div>
              <div className="mt-44 text-center">
                <button className={btnColor}>{tradingType}</button>
              </div>
            </div>
          )}
            {(ordType === "market") && (
            <div>
              <div className="flex justify-between mt-6">
                <label className="my-auto">주문수량</label>
                <input
                  className="border rounded-lg w-1/2 h-9 text-right"
                  value={volume}
                  onChange={onChangeVolume}
                />
              </div>
              <div className="mt-44 text-center">
                <button className={btnColor}>{tradingType}</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
