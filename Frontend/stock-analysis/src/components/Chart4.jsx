import React from 'react'
import { useEffect } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart4 = () => {
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("https://canvasjs.com/data/gallery/javascript/netflix-stock-price.csv");
          const csv = await response.text();
    
          const dataPoints = [];
    
          const csvLines = csv.split(/[\r?\n|\r|\n]+/);
          for (let i = 0; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
              const points = csvLines[i].split(",");
              dataPoints.push({
                x: new Date(
                  parseInt(points[0].split("-")[0]),
                  parseInt(points[0].split("-")[1]) - 1,
                  parseInt(points[0].split("-")[2])
                ),
                y: [
                  parseFloat(points[1]),
                  parseFloat(points[2]),
                  parseFloat(points[3]),
                  parseFloat(points[4])
                ]
              });
            }
          }
    
          const chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            title: {
              text: "Netflix Stock Price in 2016"
            },
            subtitles: [{
              text: "Weekly Averages"
            }],
            axisX: {
              interval: 1,
              valueFormatString: "MMM"
            },
            axisY: {
              prefix: "$",
              title: "Price"
            },
            toolTip: {
              content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
            },
            data: [{
              type: "candlestick",
              yValueFormatString: "$##0.00",
              dataPoints: dataPoints
            }]
          });
    
          chart.render();
        };
    
        fetchData();
      }, []);
  return (
    <div id="chartContainer" style={{ height: 370, width: "30%" }}></div>
  )
}

export default Chart4