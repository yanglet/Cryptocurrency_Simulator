import React, { useCallback, useState, } from 'react';
import TestForm from '../components/TestForm';
import useInput from '../../../hooks/useInput';
import TestResult from '../components/TestResult';

function TestContainers(props) {
    const [market, setMarket] = useState("KRW-BTC");
    const [money, onChangeMoney] = useInput("");
    const [time, onChangeTime] = useInput("");
    const [result, setResult] = useState("");
  
    const handleSubmit = useCallback(() => {
     async (e) => {
        e.preventDefault();
        await axios
          .post(`${URL}/tests`, {
            market,
            money,
            time,
          })
          .then(function (response) {
            setResult(JSON.parse(response.data.money));
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    }, [market, money, time]);

    return (
        <div className='grid grid-cols-2'>
            <TestForm handleSubmit={handleSubmit} money={money} onChangeMoney={onChangeMoney}  time={time} onChangeTime={onChangeTime} />
        </div>
    );
}

export default TestContainers;