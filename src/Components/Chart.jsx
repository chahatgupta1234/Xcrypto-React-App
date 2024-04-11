import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Legend, } from "chart.js"

ChartJS.register(
    LinearScale, CategoryScale, PointElement, LineElement, Title,  Legend,
)





const Chart = ({arr=[], currSymbol, days}) => {
    const prices=[];
    const date=[];
    // console.log("in chart arr ",arr);

    for(let i=0; i<arr.length; i++) {
        if(days === "24h")
        date.push(new Date(arr[i][0]).toLocaleTimeString() );
        else
        date.push(new Date(arr[i][0]).toLocaleDateString() );
        prices.push(arr[i][1]);
    }

    console.log("dates ",date);


const data={
        labels: date,
        datasets:[{
            label:`Price in ${currSymbol}`,
            data: prices, 
            borderColor: "rgba(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132,0.5)",
        }]
};
  return (

    <Line height={'90vh'} options={
        {
            responsive: true,
        }
    } 
        data={data}
    />

  )
}

export default Chart
