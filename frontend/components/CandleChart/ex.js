import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


function Ex({code}) { 
  const [chartX, setChartX] = useState([])
  const [chartY, setChartY] = useState([])
  const [data, setData] = useState([])

  const url = 'http://localhost:9090/v1/api/candles/days?market=KRW-BTC'

  useEffect(() => {
    const dataX = [];
    const dataY = [];
    const data = [];
    
    axios.get(url)
      .then(response => {
        response.data.map(item => { 
          dataX.push(new Date(item.candle_date_time_kst));
          dataY.push(item.prices);
        })
        data.push
        setChartX(dataX)
        setChartY(dataY)
      }).catch(e => {
      })
  }, [])
  //  console.log(chartX)
  //  console.log(chartY)
 
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
          series={[{
            data: [
              {
                x: chartX,
                y: chartY
              },
            ]
          }]}
          type="candlestick" 
          height={350} />
        </div>
      );
    }
export default Ex;
