import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { ORDER } from "../../../pages/config";
import authHeader from "../../../services/auth-header";
import { useContext } from "react";
import { BalanceContext } from "../../../contexts/Balance";
function SellForm({
  tickerId,
  balance,
  type,
  content,
  tradingType,
  tradingPrice,
  btnColor,
}) {
  // 사용자 관련 데이터 
  const member = useContext(BalanceContext);
  const [price, setPrice] = useState("");
  const [ordType, setOrdType] = useState("limit"); // 기본: 지정가
  const [volume, setVolume] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isVolumeValue, setIsVolumeValue] = useState(false);
  const [isTotalPriceValue, setIsTotalPriceValue] = useState(false);
  const [coin, setCoin] = useState("")
  const [crytocurrencyData, setCrytocurrencyData] = useState("")
  const id = `${tickerId}` - 1;


  useEffect(() => {
    { content && setCrytocurrencyData(content[id])}
}, [content, id]);

  console.log("1111", content)


  const handleChange = (event) => {
    console.log(event.target.value);
    setOrdType(event.target.value);
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

  useEffect(() => {
    if (isVolumeValue && isTotalPriceValue === false) {
      setTotalPrice(price * volume);
    }
    if (isTotalPriceValue && isVolumeValue === false) {
      setVolume((totalPrice / price));
    }
  }, [isTotalPriceValue, isVolumeValue, price, totalPrice, volume]);

  useEffect(() => {
    { crytocurrencyData && setPrice(`${crytocurrencyData.trade_price}`) }
  }, [crytocurrencyData]);

 // console.log("cccc", crytocurrencyData);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${ORDER.ORDER}`,
          {
            englishName: `${crytocurrencyData.english_name}`,
            koreanName: `${crytocurrencyData.korean_name}`,
            market: `${crytocurrencyData.market}`,
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

//  사용자의 코인 개수  
  useEffect(() => {
    { crytocurrencyData && 
     member[0].orderItems && member[0].orderItems.map((item) => { 
       if(item.market.includes(crytocurrencyData.market)) 
        return setCoin(item.volume) 
    })
    return setCoin
  }
    
  }, [crytocurrencyData, member, member.orderItems]);

  console.log("coin", member[0].orderItems)
  
  // console.log("마켓", content.market && content.market.slice(-3));

  return (
    <div className=" ">
      <div className="pt-2 px-4 border-r border-t">
        <div className="font-bold">{tradingType}</div>
        <form className="font-semibold mt-9 h-96 text-gray-600" onSubmit={onSubmit}>
          {/* 주문구분, 주문가능, 매수가격(KRW), 주문수량(GMT), 주문총액(KRW) */}
          <div className="flex justify-between">
            <label className="my-auto ">주문구분</label>
            <label>
              <input
                className="mr-4"
                name="ordType"
                type="checkbox"
                id="limit"
                value="limit"
                checked={ordType === "limit"}
                onChange={handleChange}
              />
              지정가
            </label>
            <label>
              <input
                className="mr-4"
                name="ordType"
                type="checkbox"
                id="market"
                value="market"
                onChange={handleChange}
                checked={ordType === "market"}
              />
              시장가
            </label>
          </div>
          <div className="flex justify-between mt-6">
            <label className="my-auto">주문가능</label>
            {/* 사용자의 자금 출력 */}
            <div className="flex">
              <p className="font-bold text-xl">
                {isNaN(coin) === true
                  ? 0
                  : (coin)}
              </p>
              <p className="text-sm ml-3 my-auto text-gray-600">
                {crytocurrencyData && crytocurrencyData.market.slice(-3)}
              </p>
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
                  value={(totalPrice)}
                  onChange={onChangeTotalPrice}
                />
              </div>
              <div className="mt-14 text-center">
                <button className={btnColor}>{tradingType}</button>
              </div>
            </div>
          )}
          {ordType === "market" && (
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

export default SellForm;
