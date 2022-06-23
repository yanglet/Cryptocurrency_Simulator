import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


function Ex({code}) { 
  const [data, setData] = useState([]);
  
  const url = 'http://localhost:9090/v1/api/candles/days?market=KRW-BTC'

  useEffect(() => {
    const temp = [];

    axios.get(url)
      .then(response => {
        response.data.map(item =>  
          { 
            temp.push(
              {
                x: new Date(item.candle_date_time_kst), 
                y: item.prices 
              }
            )
          })
          setData(temp)
      }).catch(e => {
      })
  }, [])
 
  var chart = {
         options: {
          chart: {
            type: 'candlestick',
            height: 350
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      } 

      return (
        <div id="chart">
        <ReactApexChart 
          options={chart.options} 
          series={[{data: data}]}
          type="candlestick" 
          height={350} />
        </div>
      );
    }
export default Ex;
