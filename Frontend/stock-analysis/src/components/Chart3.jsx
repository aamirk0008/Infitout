import React, { useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const Chart3 = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://canvasjs.com/data/docs/ethusd2018.json");
      const data = await response.json();

      const dps1 = [];
      const dps2 = [];
      for (let i = 0; i < data.length; i++) {
        dps1.push({ x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)] });
        dps2.push({ x: new Date(data[i].date), y: Number(data[i].close) });
      }

      const stockChart = new CanvasJS.StockChart("chartContainer", {
        title: {
          text: "Technical Indicators: SMA"
        },
        subtitles: [{
          text: "Simple Moving Average"
        }],
        charts: [{
          axisY: {
            prefix: "$"
          },
          legend: {
            verticalAlign: "top",
            cursor: "pointer",
            itemclick: function (e) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          toolTip: {
            shared: true
          },
          data: [{
            type: "candlestick",
            showInLegend: true,
            name: "Stock Price",
            yValueFormatString: "$#,###.00",
            xValueType: "dateTime",
            dataPoints: dps1
          }],
        }],
        navigator: {
          data: [{
            dataPoints: dps2
          }],
          slider: {
            minimum: new Date(2018, 3, 1),
            maximum: new Date(2018, 5, 1)
          }
        }
      });

      stockChart.render();

      const sma = calculateSMA(dps1, 7);
      stockChart.charts[0].addTo("data", { type: "line", dataPoints: sma, showInLegend: true, yValueFormatString: "$#,###.00", name: "Simple Moving Average" });
    };

    fetchData();
  }, []);

  const calculateSMA = (dps, count) => {
    const avg = (dps) => {
      let sum = 0, count = 0, val;
      for (let i = 0; i < dps.length; i++) {
        val = dps[i].y[3]; sum += val; count++;
      }
      return sum / count;
    };
    let result = [], val;
    count = count || 5;
    for (let i = 0; i < count; i++)
      result.push({ x: dps[i].x, y: null });
    for (let i = count - 1, len = dps.length; i < len; i++) {
      val = avg(dps.slice(i - count + 1, i));
      if (isNaN(val))
        result.push({ x: dps[i].x, y: null });
      else
        result.push({ x: dps[i].x, y: val });
    }
    return result;
  };

  return (
    <div id="chartContainer" style={{ height: 400, width: "35%" }} className='border shadow-2xl'></div>
  );
};

export default Chart3;
